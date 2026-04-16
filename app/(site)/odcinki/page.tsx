import type { Metadata } from 'next';
import AllEpisodes from '@/components/AllEpisodes';
import { sanityFetch } from '@/sanity/lib/fetch';
import { ALL_EPISODES_QUERY } from '@/sanity/lib/queries';
import type { Episode } from '@/types';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Wszystkie odcinki',
  description: 'Archiwum rozmów EstiTalk — szukaj po tytule, gościu, temacie i sezonie.',
};

export default async function EpisodesPage() {
  const episodes = await sanityFetch<Episode[]>({
    query: ALL_EPISODES_QUERY,
    tags: ['episode'],
  });

  return <AllEpisodes episodes={episodes || []} />;
}
