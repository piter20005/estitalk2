import type { Image } from 'sanity';

/* ----------------------------- Sanity types ----------------------------- */

export interface SanityImageField extends Image {
  alt?: string;
}

export interface TopicRef {
  _id: string;
  name: string;
  slug: string;
}

export interface GuestRef {
  _id: string;
  name: string;
  slug: string;
  profession?: string | null;
  photo?: SanityImageField | null;
}

export interface EpisodeResource {
  label: string;
  url: string;
}

export interface Episode {
  _id: string;
  guid: string;
  title: string;
  slug: string;
  description: string | null;
  publishDate: string | null;     // ISO string
  duration: number | null;        // seconds
  coverImage?: SanityImageField | null;
  coverImageUrl?: string | null;
  spotifyUrl?: string | null;
  appleUrl?: string | null;
  youtubeUrl?: string | null;
  season: number | null;
  episodeNumber: number | null;
  isFeatured: boolean | null;
  resources: EpisodeResource[] | null;
  notes?: unknown;                // PortableText blocks
  guests: GuestRef[] | null;
  topics: TopicRef[] | null;
}

export interface GuestSocial {
  platform?: string;
  url?: string;
}

export interface Guest {
  _id: string;
  name: string;
  slug: string;
  profession?: string | null;
  shortBio?: string | null;
  photo?: SanityImageField | null;
  socials?: GuestSocial[] | null;
  bio?: unknown;                  // PortableText blocks (only on detail page)
  episodes?: Episode[];           // only on detail page
}

export interface Topic {
  _id: string;
  name: string;
  slug: string;
  description?: string | null;
  episodeCount?: number;
  episodes?: Episode[];
}

/* ------------------------ Helper: format helpers ----------------------- */

export function formatDurationSeconds(sec: number | null | undefined): string {
  if (!sec || sec <= 0) return '';
  const m = Math.round(sec / 60);
  if (m < 60) return `${m} min`;
  const h = Math.floor(m / 60);
  const rem = m % 60;
  return rem ? `${h} h ${rem} min` : `${h} h`;
}

export function formatPublishDate(iso: string | null | undefined): string {
  if (!iso) return '';
  try {
    return new Date(iso).toLocaleDateString('pl-PL', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  } catch {
    return '';
  }
}

/* ----------------------------- Spotify helper --------------------------- */

export const extractSpotifyEpisodeId = (url: string | null | undefined): string | null => {
  if (!url) return null;
  const m = url.match(/open\.spotify\.com\/episode\/([a-zA-Z0-9]+)/);
  return m ? m[1] : null;
};

/* ----------------------------- YouTube helper --------------------------- */

export const extractYouTubeId = (url: string | null | undefined): string | null => {
  if (!url) return null;
  const patterns = [
    /youtu\.be\/([A-Za-z0-9_-]{11})/,
    /youtube\.com\/watch\?(?:[^&]*&)*v=([A-Za-z0-9_-]{11})/,
    /youtube\.com\/embed\/([A-Za-z0-9_-]{11})/,
    /youtube\.com\/shorts\/([A-Za-z0-9_-]{11})/,
  ];
  for (const re of patterns) {
    const m = url.match(re);
    if (m) return m[1];
  }
  return null;
};
