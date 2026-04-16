import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import TopicPage from '@/components/TopicPage';
import { sanityFetch } from '@/sanity/lib/fetch';
import { client } from '@/sanity/lib/client';
import { TOPIC_BY_SLUG_QUERY, TOPIC_SLUGS_QUERY } from '@/sanity/lib/queries';
import type { Topic } from '@/types';

export const revalidate = 60;

interface Params {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(TOPIC_SLUGS_QUERY);
  return (slugs ?? []).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const topic = await sanityFetch<Topic | null>({
    query: TOPIC_BY_SLUG_QUERY,
    params: { slug },
    tags: [`topic:${slug}`],
  });
  if (!topic) return { title: 'Nie znaleziono tematu' };

  return {
    title: topic.name,
    description: topic.description ?? `Odcinki EstiTalk w temacie ${topic.name}.`,
    openGraph: {
      title: topic.name,
      description: topic.description ?? undefined,
    },
  };
}

export default async function Page({ params }: Params) {
  const { slug } = await params;
  const topic = await sanityFetch<Topic | null>({
    query: TOPIC_BY_SLUG_QUERY,
    params: { slug },
    tags: [`topic:${slug}`],
  });

  if (!topic) notFound();
  return <TopicPage topic={topic} />;
}
