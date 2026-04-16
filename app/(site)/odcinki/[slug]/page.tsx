import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import EpisodePage from '@/components/EpisodePage';
import { sanityFetch } from '@/sanity/lib/fetch';
import { client } from '@/sanity/lib/client';
import { EPISODE_BY_SLUG_QUERY, EPISODE_SLUGS_QUERY } from '@/sanity/lib/queries';
import type { Episode } from '@/types';

export const revalidate = 60;

interface Params {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(EPISODE_SLUGS_QUERY);
  return (slugs ?? []).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const episode = await sanityFetch<Episode | null>({
    query: EPISODE_BY_SLUG_QUERY,
    params: { slug },
    tags: [`episode:${slug}`],
  });
  if (!episode) return { title: 'Nie znaleziono odcinka' };

  return {
    title: episode.title,
    description: episode.description ?? undefined,
    openGraph: {
      title: episode.title,
      description: episode.description ?? undefined,
      type: 'article',
      images: episode.coverImageUrl ? [episode.coverImageUrl] : undefined,
    },
  };
}

export default async function Page({ params }: Params) {
  const { slug } = await params;
  const episode = await sanityFetch<Episode | null>({
    query: EPISODE_BY_SLUG_QUERY,
    params: { slug },
    tags: [`episode:${slug}`],
  });

  if (!episode) notFound();
  return <EpisodePage episode={episode} />;
}
