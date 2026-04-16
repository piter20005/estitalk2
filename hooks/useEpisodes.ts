import { useState, useEffect } from 'react';
import { Episode } from '../types';

const LINKS = {
  spotify: 'https://open.spotify.com/show/4AV3JfVxwT8KfqeVHUYoU0',
  apple: 'https://podcasts.apple.com/pl/podcast/estitalk-rozmowy-o-pi%C4%99knie-z-dr-tatian%C4%85-jasi%C5%84sk%C4%85/id1757956398?l=pl',
  youtube: 'https://www.youtube.com/playlist?list=PLs36Pjn2gU5a9qx-5F8HgyqujnfOlC4Pt'
};

const RSS_URL = 'https://anchor.fm/s/f8d844f8/podcast/rss';

// --- Cache ---
let memoryCache: Episode[] | null = null;

const CACHE_KEY = 'estitalk_episodes_v1';
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 godzina

function readLocalCache(): Episode[] | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { episodes, timestamp } = JSON.parse(raw);
    if (Date.now() - timestamp > CACHE_TTL_MS) return null;
    return (episodes as any[]).map(e => ({ ...e, publishDate: new Date(e.publishDate) }));
  } catch {
    return null;
  }
}

function writeLocalCache(episodes: Episode[]) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ episodes, timestamp: Date.now() }));
  } catch {
    // tryb prywatny lub pełny storage — ignorujemy
  }
}

// --- Parsery ---

function parseXml(xmlText: string): Episode[] {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
  const items = xmlDoc.querySelectorAll('item');

  let channelImage = '';
  const imgTags = xmlDoc.getElementsByTagName('image');
  if (imgTags.length > 0) {
    const urlTag = imgTags[0].getElementsByTagName('url')[0];
    if (urlTag) channelImage = urlTag.textContent || '';
  }
  if (!channelImage) {
    const itunesImage = xmlDoc.getElementsByTagName('itunes:image')[0];
    if (itunesImage) channelImage = itunesImage.getAttribute('href') || '';
  }

  return Array.from(items).map(item => {
    const title = item.querySelector('title')?.textContent || '';
    const descriptionHtml = item.querySelector('description')?.textContent || '';
    const pubDateText = item.querySelector('pubDate')?.textContent || '';
    const link = item.querySelector('link')?.textContent || '';
    const guid = item.querySelector('guid')?.textContent || '';

    const itunesImageNode = item.getElementsByTagName('itunes:image')[0];
    const itunesImage = itunesImageNode ? itunesImageNode.getAttribute('href') : null;

    const itunesSeasonNode = item.getElementsByTagName('itunes:season')[0];
    const season = itunesSeasonNode ? itunesSeasonNode.textContent : '1';

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = descriptionHtml;
    const cleanDescription = tempDiv.textContent || tempDiv.innerText || '';

    const pubDate = new Date(pubDateText);

    return {
      id: guid,
      title,
      description: cleanDescription.trim(),
      duration: pubDate.toLocaleDateString('pl-PL'),
      publishDate: pubDate,
      image: itunesImage || channelImage,
      links: {
        youtube: LINKS.youtube,
        spotify: link || LINKS.spotify,
        apple: LINKS.apple,
      },
      season: season ? parseInt(season) : 1,
    };
  });
}

async function fetchFromProxy(): Promise<Episode[]> {
  const res = await fetch(
    `https://api.allorigins.win/raw?url=${encodeURIComponent(RSS_URL)}`,
    { signal: AbortSignal.timeout(8000) }
  );
  if (!res.ok) throw new Error(`allorigins HTTP ${res.status}`);
  const xml = await res.text();
  const episodes = parseXml(xml);
  if (!episodes.length) throw new Error('Empty feed from proxy');
  return episodes;
}

async function fetchFromRSS(): Promise<Episode[]> {
  return fetchFromProxy();
}

export const useEpisodes = () => {
  const [episodes, setEpisodes] = useState<Episode[]>(() => memoryCache ?? []);
  const [loading, setLoading] = useState(!memoryCache);
  const [error, setError] = useState(false);

  useEffect(() => {
    const refreshInBackground = async () => {
      try {
        const fresh = await fetchFromRSS();
        memoryCache = fresh;
        writeLocalCache(fresh);
        setEpisodes(fresh);
      } catch {
        // Po cichu — użytkownik już widzi dane z cache
      }
    };

    // 1. Modułowy cache — ta sama sesja
    if (memoryCache) {
      refreshInBackground();
      return;
    }

    // 2. localStorage cache — poprzednia wizyta
    const cached = readLocalCache();
    if (cached) {
      memoryCache = cached;
      setEpisodes(cached);
      setLoading(false);
      refreshInBackground();
      return;
    }

    // 3. Pierwsze wejście — normalny fetch ze spinnerem
    (async () => {
      try {
        const fresh = await fetchFromRSS();
        memoryCache = fresh;
        writeLocalCache(fresh);
        setEpisodes(fresh);
      } catch (err) {
        console.error('Failed to fetch episodes from all sources:', err);
        setError(true);
        setEpisodes([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { episodes, loading, error };
};
