import { urlFor } from '@/sanity/lib/image';
import type { Episode, Guest } from '@/types';

export const SITE_URL = 'https://estitalk.pl';
export const PODCAST_NAME = 'Esti Talk';
export const PODCAST_AUTHOR = 'Dr n. med. Tatiana Jasińska';
export const PODCAST_DESCRIPTION =
  'Podcast o medycynie estetycznej, dermatologii i pięknie. Dr n. med. Tatiana Jasińska zaprasza do rozmów o świadomej pielęgnacji.';

const PODCAST_LINKS = [
  'https://open.spotify.com/show/4eD0RIsjAH3PyNMSc09Glo',
  'https://podcasts.apple.com/pl/podcast/esti-talk/id1843480632',
  'https://www.youtube.com/@estitalk',
  'https://www.instagram.com/esti.talk/',
  'https://www.tiktok.com/@estitalk',
];

function durationToIso8601(seconds: number | null | undefined): string | undefined {
  if (!seconds || seconds <= 0) return undefined;
  const total = Math.round(seconds);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  let out = 'PT';
  if (h) out += `${h}H`;
  if (m) out += `${m}M`;
  if (s || (!h && !m)) out += `${s}S`;
  return out;
}

export function podcastSeriesLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'PodcastSeries',
    name: PODCAST_NAME,
    description: PODCAST_DESCRIPTION,
    url: SITE_URL,
    inLanguage: 'pl-PL',
    image: `${SITE_URL}/images/billboard.png`,
    author: {
      '@type': 'Person',
      name: PODCAST_AUTHOR,
    },
    publisher: {
      '@type': 'Person',
      name: PODCAST_AUTHOR,
    },
    sameAs: PODCAST_LINKS,
    webFeed: 'https://anchor.fm/s/106c2ea60/podcast/rss',
  };
}

export function podcastEpisodeLd(episode: Episode) {
  const url = `${SITE_URL}/odcinki/${episode.slug}`;
  const image =
    episode.coverImageUrl ??
    (episode.coverImage ? urlFor(episode.coverImage).width(1200).height(1200).url() : undefined);

  return {
    '@context': 'https://schema.org',
    '@type': 'PodcastEpisode',
    name: episode.title,
    description: episode.description ?? undefined,
    url,
    inLanguage: 'pl-PL',
    datePublished: episode.publishDate ?? undefined,
    duration: durationToIso8601(episode.duration),
    image,
    associatedMedia: episode.spotifyUrl
      ? {
          '@type': 'MediaObject',
          contentUrl: episode.spotifyUrl,
        }
      : undefined,
    partOfSeries: {
      '@type': 'PodcastSeries',
      name: PODCAST_NAME,
      url: SITE_URL,
    },
    partOfSeason: episode.season
      ? {
          '@type': 'PodcastSeason',
          seasonNumber: episode.season,
        }
      : undefined,
    episodeNumber: episode.episodeNumber ?? undefined,
  };
}

export function guestPersonLd(guest: Guest) {
  const url = `${SITE_URL}/goscie/${guest.slug}`;
  const image = guest.photo
    ? urlFor(guest.photo).width(800).height(800).url()
    : undefined;
  const sameAs = (guest.socials ?? [])
    .map((s) => s.url)
    .filter((u): u is string => Boolean(u));

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: guest.name,
    jobTitle: guest.profession ?? undefined,
    description: guest.shortBio ?? undefined,
    url,
    image,
    sameAs: sameAs.length > 0 ? sameAs : undefined,
  };
}

export function jsonLdScript(data: object): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
