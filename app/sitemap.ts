import type { MetadataRoute } from 'next';
import { client } from '@/sanity/lib/client';
import {
  EPISODE_SLUGS_QUERY,
  GUEST_SLUGS_QUERY,
  TOPIC_SLUGS_QUERY,
} from '@/sanity/lib/queries';

const BASE_URL = 'https://estitalk.pl';

export const revalidate = 3600;

async function safeFetch(query: string): Promise<string[]> {
  try {
    return (await client.fetch<string[]>(query)) ?? [];
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [episodeSlugs, guestSlugs, topicSlugs] = await Promise.all([
    safeFetch(EPISODE_SLUGS_QUERY),
    safeFetch(GUEST_SLUGS_QUERY),
    safeFetch(TOPIC_SLUGS_QUERY),
  ]);

  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`,        lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE_URL}/odcinki`, lastModified: now, changeFrequency: 'daily',  priority: 0.9 },
    { url: `${BASE_URL}/goscie`,  lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE_URL}/tematy`,  lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
  ];

  const episodeEntries: MetadataRoute.Sitemap = episodeSlugs.map((slug) => ({
    url: `${BASE_URL}/odcinki/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const guestEntries: MetadataRoute.Sitemap = guestSlugs.map((slug) => ({
    url: `${BASE_URL}/goscie/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  const topicEntries: MetadataRoute.Sitemap = topicSlugs.map((slug) => ({
    url: `${BASE_URL}/tematy/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticEntries, ...episodeEntries, ...guestEntries, ...topicEntries];
}
