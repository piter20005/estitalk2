// GitHub Action script — parses podcast RSS and saves as public/episodes.json
// Expects a pre-downloaded XML file path as the first CLI argument.
// Usage: node scripts/fetch-episodes.js /tmp/feed.xml

const fs = require('fs');
const path = require('path');

const INPUT_PATH = process.argv[2];
const OUTPUT_PATH = path.join(__dirname, '..', 'public', 'episodes.json');

const LINKS = {
  spotify: 'https://open.spotify.com/show/4AV3JfVxwT8KfqeVHUYoU0',
  apple: 'https://podcasts.apple.com/pl/podcast/estitalk-rozmowy-o-pi%C4%99knie-z-dr-tatian%C4%85-jasi%C5%84sk%C4%85/id1757956398?l=pl',
  youtube: 'https://www.youtube.com/playlist?list=PLs36Pjn2gU5a9qx-5F8HgyqujnfOlC4Pt',
};

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

function main() {
  if (!INPUT_PATH) {
    console.error('Usage: node scripts/fetch-episodes.js <path-to-feed.xml>');
    process.exit(1);
  }

  if (!fs.existsSync(INPUT_PATH)) {
    console.error(`File not found: ${INPUT_PATH}`);
    process.exit(1);
  }

  const xml = fs.readFileSync(INPUT_PATH, 'utf8');
  console.log(`Read ${xml.length} bytes from ${INPUT_PATH}`);

  if (!xml.trim().startsWith('<')) {
    console.error(`Unexpected content: ${xml.slice(0, 100)}`);
    process.exit(1);
  }

  const episodes = parseRSS(xml);
  console.log(`Parsed ${episodes.length} episodes`);

  if (episodes.length === 0) {
    console.error('No episodes found — check the RSS XML');
    process.exit(1);
  }

  const output = {
    episodes,
    updatedAt: new Date().toISOString(),
  };

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2), 'utf8');
  console.log(`Saved to ${OUTPUT_PATH}`);
}

main();
