// GitHub Action script — fetches podcast RSS and saves as public/episodes.json
// Runs server-side (no CORS), no external dependencies beyond Node.js built-ins.

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const RSS_URL = 'https://anchor.fm/s/f8d844f8/podcast/rss';
const OUTPUT_PATH = path.join(__dirname, '..', 'public', 'episodes.json');

const LINKS = {
  spotify: 'https://open.spotify.com/show/4AV3JfVxwT8KfqeVHUYoU0',
  apple: 'https://podcasts.apple.com/pl/podcast/estitalk-rozmowy-o-pi%C4%99knie-z-dr-tatian%C4%85-jasi%C5%84sk%C4%85/id1757956398?l=pl',
  youtube: 'https://www.youtube.com/playlist?list=PLs36Pjn2gU5a9qx-5F8HgyqujnfOlC4Pt',
};

function fetchUrl(url, redirectCount = 0) {
  return new Promise((resolve, reject) => {
    if (redirectCount > 5) return reject(new Error('Too many redirects'));
    const lib = url.startsWith('https') ? https : http;
    const req = lib.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; podcast-fetcher/1.0)',
        'Accept': 'application/rss+xml, application/xml, text/xml, */*',
      },
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchUrl(res.headers.location, redirectCount + 1).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`HTTP ${res.statusCode} from ${url}`));
      }
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => resolve(data));
      res.on('error', reject);
    });
    req.on('error', reject);
    req.setTimeout(10000, () => { req.destroy(); reject(new Error('Request timeout')); });
  });
}

function extractText(xml, tag) {
  // CDATA variant
  const cdataRe = new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>`, 'i');
  const cdataMatch = xml.match(cdataRe);
  if (cdataMatch) return cdataMatch[1].trim();
  // Plain text variant
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

function parseRSS(xml) {
  // Channel image
  let channelImage = '';
  const chanImgMatch = xml.match(/<image>[\s\S]*?<url>([^<]*)<\/url>/i);
  if (chanImgMatch) channelImage = chanImgMatch[1].trim();
  if (!channelImage) channelImage = extractAttr(xml, 'itunes:image', 'href');

  const episodes = [];
  const itemRe = /<item>([\s\S]*?)<\/item>/gi;
  let m;

  while ((m = itemRe.exec(xml)) !== null) {
    const item = m[1];

    const title = stripHtml(extractText(item, 'title'));
    if (!title) continue;

    const link = extractText(item, 'link');
    const guid = extractText(item, 'guid') || link;
    const pubDateStr = extractText(item, 'pubDate');
    const pubDate = new Date(pubDateStr);
    const description = stripHtml(extractText(item, 'description'));
    const image = extractAttr(item, 'itunes:image', 'href') || channelImage;
    const seasonStr = extractText(item, 'itunes:season');
    const season = parseInt(seasonStr) || 1;

    episodes.push({
      id: guid,
      title,
      description,
      duration: pubDate.toLocaleDateString('pl-PL'),
      publishDate: pubDate.toISOString(),
      image,
      links: {
        spotify: link || LINKS.spotify,
        apple: LINKS.apple,
        youtube: LINKS.youtube,
      },
      season,
    });
  }

  return episodes;
}

async function main() {
  console.log(`Fetching RSS: ${RSS_URL}`);
  const xml = await fetchUrl(RSS_URL);
  console.log(`Fetched ${xml.length} bytes`);

  if (xml.includes('Host not in allowlist') || xml.trim().startsWith('<')) {
    if (!xml.trim().startsWith('<')) {
      throw new Error(`Unexpected response: ${xml.slice(0, 100)}`);
    }
  }

  const episodes = parseRSS(xml);
  console.log(`Parsed ${episodes.length} episodes`);

  if (episodes.length === 0) {
    throw new Error('No episodes found — check the RSS URL');
  }

  const output = {
    episodes,
    updatedAt: new Date().toISOString(),
  };

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2), 'utf8');
  console.log(`Saved to ${OUTPUT_PATH}`);
}

main().catch((err) => {
  console.error('FAILED:', err.message);
  process.exit(1);
});
