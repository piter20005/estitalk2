/**
 * sync-episodes.js — Reliable podcast episode audio downloader
 *
 * Features:
 *   - Conditional GET on RSS feed (ETag / If-Modified-Since) — skips parsing when unchanged
 *   - JSON state file tracking guid, audio_url, status, size, timestamps
 *   - Parallel downloads with configurable concurrency limit (default: 4)
 *   - Retry with exponential backoff + jitter (for 429 / 5xx)
 *   - HTTP Range requests for resuming interrupted downloads (*.part → rename)
 *   - Integrity check: Content-Length vs actual file size
 *   - Deduplication by GUID (stable across URL changes)
 *   - Merges data/episode-meta.json enrichment into state
 *
 * Usage:
 *   node scripts/sync-episodes.js
 *   node scripts/sync-episodes.js --concurrency 6 --retries 5
 *   node scripts/sync-episodes.js --dry-run        # parse only, no downloads
 *   node scripts/sync-episodes.js --limit 1        # download at most N new episodes
 */

import {
  createWriteStream,
  existsSync,
  mkdirSync,
  readFileSync,
  renameSync,
  statSync,
  writeFileSync,
} from 'fs';
import { get as httpsGet, request as httpsRequest } from 'https';
import { get as httpGet, request as httpRequest } from 'http';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// ── Paths ────────────────────────────────────────────────────────────────────

const RSS_URL    = 'https://anchor.fm/s/f8d844f8/podcast/rss';
const STATE_PATH = join(__dirname, '..', 'data', 'podcast-state.json');
const META_PATH  = join(__dirname, '..', 'data', 'episode-meta.json');
const DL_DIR     = join(__dirname, '..', 'downloads');

// ── CLI args ─────────────────────────────────────────────────────────────────

const args = process.argv.slice(2);
const DRY_RUN     = args.includes('--dry-run');
const CONCURRENCY = parseInt(args[args.indexOf('--concurrency') + 1]) || 4;
const MAX_RETRIES = parseInt(args[args.indexOf('--retries') + 1])     || 3;
const LIMIT       = parseInt(args[args.indexOf('--limit') + 1])       || Infinity;

// ── State ─────────────────────────────────────────────────────────────────────

const EMPTY_STATE = { feedEtag: null, feedLastModified: null, lastChecked: null, episodes: {} };

function loadState() {
  if (!existsSync(STATE_PATH)) return structuredClone(EMPTY_STATE);
  try {
    return JSON.parse(readFileSync(STATE_PATH, 'utf8'));
  } catch (e) {
    console.warn(`Cannot read state file, starting fresh: ${e.message}`);
    return structuredClone(EMPTY_STATE);
  }
}

function saveState(state) {
  mkdirSync(dirname(STATE_PATH), { recursive: true });
  writeFileSync(STATE_PATH, JSON.stringify(state, null, 2), 'utf8');
}

// ── Episode meta ──────────────────────────────────────────────────────────────

function loadMeta() {
  if (!existsSync(META_PATH)) return {};
  try {
    const raw = JSON.parse(readFileSync(META_PATH, 'utf8'));
    const { __comment: _c, __example: _e, ...entries } = raw;
    return entries;
  } catch (e) {
    console.warn(`Cannot parse episode-meta.json: ${e.message}`);
    return {};
  }
}

// ── HTTP helpers ──────────────────────────────────────────────────────────────

/**
 * Low-level HTTP(S) GET that follows redirects (up to 5 hops).
 * Returns a Promise<IncomingMessage>.
 */
function httpGetFollowRedirects(url, headers = {}, redirectsLeft = 5) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const getter = parsed.protocol === 'https:' ? httpsGet : httpGet;

    const req = getter(
      { hostname: parsed.hostname, path: parsed.pathname + parsed.search, headers },
      res => {
        if ([301, 302, 303, 307, 308].includes(res.statusCode)) {
          if (!redirectsLeft) return reject(new Error('Too many redirects'));
          res.resume(); // discard body
          return resolve(httpGetFollowRedirects(res.headers.location, headers, redirectsLeft - 1));
        }
        resolve(res);
      }
    );
    req.on('error', reject);
    req.setTimeout(30_000, () => { req.destroy(); reject(new Error('Request timeout')); });
  });
}

/** Collect all chunks from a readable stream into a string. */
function streamToString(res) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    res.on('data', c => chunks.push(c));
    res.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    res.on('error', reject);
  });
}

// ── RSS feed fetch ────────────────────────────────────────────────────────────

/**
 * Fetches the RSS feed with conditional GET.
 * Returns { notModified: true } or { xml, etag, lastModified }.
 */
async function fetchFeed(url, etag, lastModified) {
  const headers = {
    'User-Agent': 'Podcasts/1450.1.1 CFNetwork/1390 Darwin/22.0.0',
    'Accept': 'application/rss+xml, application/xml, text/xml, */*',
  };
  if (etag)         headers['If-None-Match']     = etag;
  if (lastModified) headers['If-Modified-Since'] = lastModified;

  const res = await httpGetFollowRedirects(url, headers);

  if (res.statusCode === 304) {
    res.resume();
    return { notModified: true };
  }
  if (res.statusCode !== 200) {
    res.resume();
    throw new Error(`RSS fetch failed: HTTP ${res.statusCode}`);
  }

  const xml = await streamToString(res);
  return {
    xml,
    etag:         res.headers['etag']          ?? null,
    lastModified: res.headers['last-modified'] ?? null,
  };
}

// ── RSS parser ────────────────────────────────────────────────────────────────

function extractText(xml, tag) {
  const cdataRe = new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>`, 'i');
  const cdataMatch = xml.match(cdataRe);
  if (cdataMatch) return cdataMatch[1].trim();
  const plainRe = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i');
  const plainMatch = xml.match(plainRe);
  return plainMatch ? plainMatch[1].trim() : '';
}

function extractAttr(xml, tag, attr) {
  const re = new RegExp(`<${tag}[^>]*\\s${attr}="([^"]*)"`, 'i');
  const match = xml.match(re);
  return match ? match[1] : '';
}

/**
 * Returns array of { guid, title, audioUrl, publishedAt, expectedSize }.
 * Only items with an <enclosure> audio URL are included.
 */
function parseItems(xml) {
  const items = [];
  const itemRe = /<item>([\s\S]*?)<\/item>/gi;
  let m;

  while ((m = itemRe.exec(xml)) !== null) {
    const item = m[1];

    const audioUrl = extractAttr(item, 'enclosure', 'url');
    if (!audioUrl) continue; // skip items without audio

    const guid        = extractText(item, 'guid') || audioUrl;
    const title       = extractText(item, 'title').replace(/<[^>]*>/g, '').trim();
    const pubDateStr  = extractText(item, 'pubDate');
    const sizeStr     = extractAttr(item, 'enclosure', 'length');
    const expectedSize = sizeStr ? parseInt(sizeStr) : null;

    items.push({
      guid,
      title,
      audioUrl,
      publishedAt: pubDateStr ? new Date(pubDateStr).toISOString() : null,
      expectedSize,
    });
  }

  return items;
}

// ── Filename helpers ──────────────────────────────────────────────────────────

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/ą/g, 'a').replace(/ć/g, 'c').replace(/ę/g, 'e')
    .replace(/ł/g, 'l').replace(/ń/g, 'n').replace(/ó/g, 'o')
    .replace(/ś/g, 's').replace(/ź|ż/g, 'z')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

function buildFilename(item) {
  const date = item.publishedAt
    ? item.publishedAt.slice(0, 10)
    : 'unknown-date';
  return `${date}_${slugify(item.title)}.mp3`;
}

// ── Downloader ────────────────────────────────────────────────────────────────

/**
 * Downloads a single audio file with HTTP Range resume support.
 * Writes to destPath + '.part', then atomically renames on success.
 * Throws on non-2xx status (caller handles retry).
 */
function downloadFile(audioUrl, destPath) {
  const partPath = destPath + '.part';

  // Detect existing partial download for Range resume
  let startByte = 0;
  if (existsSync(partPath)) {
    startByte = statSync(partPath).size;
    if (startByte > 0) {
      console.log(`  Resuming from byte ${startByte}: ${destPath}`);
    }
  }

  return new Promise((resolve, reject) => {
    const parsed = new URL(audioUrl);
    const isHttps = parsed.protocol === 'https:';
    const requester = isHttps ? httpsRequest : httpRequest;

    const reqHeaders = {
      'User-Agent': 'Podcasts/1450.1.1 CFNetwork/1390 Darwin/22.0.0',
    };
    if (startByte > 0) reqHeaders['Range'] = `bytes=${startByte}-`;

    let redirectsLeft = 5;

    function attemptDownload(url) {
      const p = new URL(url);
      const req = (p.protocol === 'https:' ? httpsRequest : httpRequest)(
        {
          hostname: p.hostname,
          path: p.pathname + p.search,
          method: 'GET',
          headers: reqHeaders,
        },
        res => {
          // Follow redirects
          if ([301, 302, 303, 307, 308].includes(res.statusCode)) {
            res.resume();
            if (!redirectsLeft--) return reject(new Error('Too many redirects'));
            return attemptDownload(res.headers.location);
          }

          // 206 Partial Content — append to existing .part file
          if (res.statusCode === 206) {
            const fileStream = createWriteStream(partPath, { flags: 'a' });
            res.pipe(fileStream);
            fileStream.on('finish', () => finalise(res));
            fileStream.on('error', reject);
            res.on('error', reject);
            return;
          }

          // 200 OK — server doesn't support ranges, start fresh
          if (res.statusCode === 200) {
            startByte = 0; // reset for size check
            const fileStream = createWriteStream(partPath, { flags: 'w' });
            res.pipe(fileStream);
            fileStream.on('finish', () => finalise(res));
            fileStream.on('error', reject);
            res.on('error', reject);
            return;
          }

          res.resume();
          reject(new Error(`Unexpected HTTP ${res.statusCode} for ${url}`));
        }
      );

      req.on('error', reject);
      req.setTimeout(60_000, () => { req.destroy(); reject(new Error('Download timeout')); });
      req.end();
    }

    function finalise(res) {
      // Verify file size if Content-Length was provided
      const contentLength = parseInt(res.headers['content-length']);
      if (!isNaN(contentLength) && contentLength > 0) {
        const partSize = statSync(partPath).size;
        const totalExpected = startByte + contentLength;
        if (partSize < totalExpected) {
          return reject(new Error(
            `Size mismatch: got ${partSize} bytes, expected ${totalExpected}`
          ));
        }
      }
      renameSync(partPath, destPath);
      resolve();
    }

    attemptDownload(audioUrl);
  });
}

// ── Retry ─────────────────────────────────────────────────────────────────────

async function withRetry(fn, maxRetries = 3, baseMs = 2000) {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      if (attempt === maxRetries) throw err;
      const jitter = Math.random() * 1000;
      const delay = baseMs * Math.pow(2, attempt) + jitter;
      console.warn(`  Retry ${attempt + 1}/${maxRetries} in ${Math.round(delay)}ms: ${err.message}`);
      await new Promise(r => setTimeout(r, delay));
    }
  }
}

// ── Concurrency ───────────────────────────────────────────────────────────────

/**
 * Runs an array of zero-argument async task functions with a concurrency cap.
 * Each task function should return a Promise.
 */
async function runConcurrent(taskFns, limit) {
  let index = 0;

  async function worker() {
    while (index < taskFns.length) {
      const i = index++;
      await taskFns[i]();
    }
  }

  const workers = Array.from({ length: Math.min(limit, taskFns.length) }, worker);
  await Promise.all(workers);
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  console.log(`sync-episodes${DRY_RUN ? ' [DRY RUN]' : ''} — concurrency=${CONCURRENCY} retries=${MAX_RETRIES}`);

  const state = loadState();
  const meta  = loadMeta();

  // 1. Fetch RSS with conditional GET
  console.log('Fetching RSS feed…');
  let feedResult;
  try {
    feedResult = await withRetry(
      () => fetchFeed(RSS_URL, state.feedEtag, state.feedLastModified),
      MAX_RETRIES
    );
  } catch (err) {
    console.error(`Failed to fetch RSS: ${err.message}`);
    process.exit(1);
  }

  if (feedResult.notModified) {
    console.log('Feed unchanged (304 Not Modified) — nothing to do.');
    state.lastChecked = new Date().toISOString();
    saveState(state);
    return;
  }

  // Update feed cache headers
  state.feedEtag         = feedResult.etag;
  state.feedLastModified = feedResult.lastModified;
  state.lastChecked      = new Date().toISOString();

  // 2. Parse items
  const items = parseItems(feedResult.xml);
  console.log(`Parsed ${items.length} items from feed`);

  // 3. Identify new / incomplete downloads
  const toDownload = [];
  for (const item of items) {
    const existing = state.episodes[item.guid];
    if (existing?.status === 'complete') continue;

    // Upsert state entry
    state.episodes[item.guid] = {
      guid:         item.guid,
      title:        item.title,
      audioUrl:     item.audioUrl,
      publishedAt:  item.publishedAt,
      expectedSize: item.expectedSize,
      status:       'pending',
      localFile:    null,
      downloadedAt: null,
      // Merge extra metadata
      ...(meta[item.guid] ? { meta: meta[item.guid] } : {}),
      // Preserve any existing partial-download state
      ...( existing && existing.status !== 'complete' ? { status: existing.status } : {}),
    };

    toDownload.push(item);
    if (toDownload.length >= LIMIT) break;
  }

  if (toDownload.length === 0) {
    console.log('All episodes already downloaded.');
    saveState(state);
    return;
  }

  console.log(`${toDownload.length} episode(s) to download`);

  if (DRY_RUN) {
    toDownload.forEach(item => console.log(`  [dry-run] ${item.title}`));
    saveState(state);
    return;
  }

  // Ensure downloads directory exists
  mkdirSync(DL_DIR, { recursive: true });

  // 4. Download in parallel
  let done = 0;
  let failed = 0;

  const tasks = toDownload.map(item => async () => {
    const filename = buildFilename(item);
    const destPath = join(DL_DIR, filename);

    console.log(`[${done + failed + 1}/${toDownload.length}] ${item.title}`);

    try {
      await withRetry(() => downloadFile(item.audioUrl, destPath), MAX_RETRIES);

      const actualSize = statSync(destPath).size;
      if (item.expectedSize && actualSize !== item.expectedSize) {
        console.warn(`  Size mismatch: ${actualSize} vs expected ${item.expectedSize} — keeping file`);
      }

      state.episodes[item.guid] = {
        ...state.episodes[item.guid],
        status:       'complete',
        localFile:    join('downloads', filename),
        downloadedAt: new Date().toISOString(),
      };
      done++;
      console.log(`  ✓ Saved: ${filename} (${(actualSize / 1_048_576).toFixed(1)} MB)`);
    } catch (err) {
      state.episodes[item.guid].status = 'error';
      failed++;
      console.error(`  ✗ Failed: ${item.title} — ${err.message}`);
    }

    // Save state after each episode so progress is never lost
    saveState(state);
  });

  await runConcurrent(tasks, CONCURRENCY);

  console.log(`\nDone: ${done} downloaded, ${failed} failed`);
  if (failed > 0) process.exit(1);
}

main().catch(err => {
  console.error('Unhandled error:', err);
  process.exit(1);
});
