// Sync podcast RSS → Sanity episodes
// - Runs in GitHub Actions (or locally with SANITY_WRITE_TOKEN in env)
// - Upserts episode documents keyed by `episode-${md5(guid)}`
// - Overwrites RSS-authoritative fields (title, description, publishDate, platform URLs)
// - Leaves editorial fields untouched (guests, topics, resources, notes, isFeatured, coverImage upload)
//
// Usage:
//   node scripts/sync-rss-to-sanity.js                        # fetches RSS feed internally
//   node scripts/sync-rss-to-sanity.js /tmp/feed.xml          # parses a local XML file
//
// Env:
//   SANITY_PROJECT_ID        or NEXT_PUBLIC_SANITY_PROJECT_ID (defaults to 0hc5qcym)
//   SANITY_DATASET           or NEXT_PUBLIC_SANITY_DATASET    (defaults to production)
//   SANITY_API_VERSION       or NEXT_PUBLIC_SANITY_API_VERSION (defaults to 2026-04-01)
//   SANITY_WRITE_TOKEN       (required; token with Editor permissions)
//   RSS_URL                  (defaults to EstiTalk Anchor feed)

import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import process from 'node:process';
import { createClient } from '@sanity/client';

const RSS_URL = process.env.RSS_URL || 'https://anchor.fm/s/f8d844f8/podcast/rss';

const PLATFORM_DEFAULTS = {
  apple:
    'https://podcasts.apple.com/pl/podcast/estitalk-rozmowy-o-pi%C4%99knie-z-dr-tatian%C4%85-jasi%C5%84sk%C4%85/id1757956398?l=pl',
  youtube: 'https://www.youtube.com/playlist?list=PLs36Pjn2gU5a9qx-5F8HgyqujnfOlC4Pt',
};

/* ------------------------------------------------------------------ */
/* RSS parsing                                                        */
/* ------------------------------------------------------------------ */

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

function stripHtml(html) {
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function parseDurationToSeconds(raw) {
  if (!raw) return null;
  const trimmed = raw.trim();
  if (/^\d+$/.test(trimmed)) return parseInt(trimmed, 10);
  const parts = trimmed.split(':').map((p) => parseInt(p, 10));
  if (parts.some((n) => Number.isNaN(n))) return null;
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
  if (parts.length === 2) return parts[0] * 60 + parts[1];
  return null;
}

function slugify(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ł/g, 'l')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 96);
}

function parseRSS(xml) {
  let channelImage = '';
  const chanImgMatch = xml.match(/<image>[\s\S]*?<url>([^<]*)<\/url>/i);
  if (chanImgMatch) channelImage = chanImgMatch[1].trim();
  if (!channelImage) channelImage = extractAttr(xml, 'itunes:image', 'href');

  const items = [];
  const itemRe = /<item>([\s\S]*?)<\/item>/gi;
  let match;

  while ((match = itemRe.exec(xml)) !== null) {
    const item = match[1];
    const title = stripHtml(extractText(item, 'title'));
    if (!title) continue;

    const link = extractText(item, 'link');
    const guid = extractText(item, 'guid') || link;
    if (!guid) continue;

    const pubDateStr = extractText(item, 'pubDate');
    const pubDate = pubDateStr ? new Date(pubDateStr) : null;
    const publishDate =
      pubDate && !Number.isNaN(pubDate.getTime()) ? pubDate.toISOString() : null;

    items.push({
      guid,
      title,
      description: stripHtml(extractText(item, 'description')),
      publishDate,
      duration: parseDurationToSeconds(extractText(item, 'itunes:duration')),
      coverImageUrl: extractAttr(item, 'itunes:image', 'href') || channelImage || null,
      spotifyUrl: link || null,
      appleUrl: PLATFORM_DEFAULTS.apple,
      youtubeUrl: PLATFORM_DEFAULTS.youtube,
      season: parseInt(extractText(item, 'itunes:season'), 10) || null,
      episodeNumber: parseInt(extractText(item, 'itunes:episode'), 10) || null,
    });
  }

  return items;
}

/* ------------------------------------------------------------------ */
/* Sanity upsert                                                      */
/* ------------------------------------------------------------------ */

function hashGuid(guid) {
  return createHash('md5').update(guid).digest('hex').slice(0, 16);
}

function buildDocId(guid) {
  return `episode-${hashGuid(guid)}`;
}

async function upsertEpisode(client, item) {
  const _id = buildDocId(item.guid);
  const slugCandidate = slugify(item.title) || hashGuid(item.guid);

  // Fields that are safe to (re)create on first write — editorial fields
  // left untouched on later runs via createIfNotExists + scoped patch.
  const seedDoc = {
    _id,
    _type: 'episode',
    guid: item.guid,
    title: item.title,
    slug: { _type: 'slug', current: slugCandidate },
    description: item.description || '',
    publishDate: item.publishDate,
    duration: item.duration,
    coverImageUrl: item.coverImageUrl,
    spotifyUrl: item.spotifyUrl,
    appleUrl: item.appleUrl,
    youtubeUrl: item.youtubeUrl,
    season: item.season,
    episodeNumber: item.episodeNumber,
    isFeatured: false,
    guests: [],
    topics: [],
    resources: [],
  };

  const created = await client.createIfNotExists(seedDoc);

  // Always refresh RSS-authoritative fields. We explicitly DO NOT touch:
  //   guests, topics, resources, notes, isFeatured, coverImage (Sanity asset),
  //   slug.current (editor may have customised it)
  const patch = client
    .patch(_id)
    .set({
      title: item.title,
      description: item.description || '',
      publishDate: item.publishDate,
      duration: item.duration,
      coverImageUrl: item.coverImageUrl,
      spotifyUrl: item.spotifyUrl,
      appleUrl: item.appleUrl,
      youtubeUrl: item.youtubeUrl,
      season: item.season,
      episodeNumber: item.episodeNumber,
    });

  await patch.commit({ autoGenerateArrayKeys: true });

  return {
    _id,
    title: item.title,
    created: created._createdAt === created._updatedAt,
  };
}

/* ------------------------------------------------------------------ */
/* Feed loading                                                       */
/* ------------------------------------------------------------------ */

async function loadFeedXml() {
  const localPath = process.argv[2];
  if (localPath) {
    if (!existsSync(localPath)) {
      throw new Error(`File not found: ${localPath}`);
    }
    return readFileSync(localPath, 'utf8');
  }

  console.log(`Fetching RSS feed from ${RSS_URL}`);
  const res = await fetch(RSS_URL, {
    headers: {
      'User-Agent': 'Podcasts/1450.1.1 CFNetwork/1390 Darwin/22.0.0',
      Accept: 'application/rss+xml, application/xml, text/xml, */*',
    },
  });
  if (!res.ok) throw new Error(`RSS fetch failed: ${res.status} ${res.statusText}`);
  return await res.text();
}

/* ------------------------------------------------------------------ */
/* Entry point                                                        */
/* ------------------------------------------------------------------ */

async function main() {
  const token = process.env.SANITY_WRITE_TOKEN;
  if (!token) {
    console.error('SANITY_WRITE_TOKEN is required');
    process.exit(1);
  }

  const projectId =
    process.env.SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '0hc5qcym';
  const dataset =
    process.env.SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
  const apiVersion =
    process.env.SANITY_API_VERSION ||
    process.env.NEXT_PUBLIC_SANITY_API_VERSION ||
    '2026-04-01';

  const client = createClient({
    projectId,
    dataset,
    apiVersion,
    token,
    useCdn: false,
  });

  const xml = await loadFeedXml();
  if (!xml.trim().startsWith('<')) {
    throw new Error(`Unexpected content: ${xml.slice(0, 100)}`);
  }

  const items = parseRSS(xml);
  console.log(`Parsed ${items.length} episodes from feed`);
  if (items.length === 0) {
    console.error('No episodes parsed — refusing to touch Sanity');
    process.exit(1);
  }

  let created = 0;
  let updated = 0;
  const failures = [];

  for (const item of items) {
    try {
      const result = await upsertEpisode(client, item);
      if (result.created) created += 1;
      else updated += 1;
    } catch (err) {
      console.error(`  ! ${item.title}: ${err.message}`);
      failures.push({ title: item.title, guid: item.guid, error: err.message });
    }
  }

  console.log(`Created ${created}, updated ${updated}, failed ${failures.length}`);
  if (failures.length > 0) {
    process.exit(2);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
