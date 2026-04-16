import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import GuestPage from '@/components/GuestPage';
import { sanityFetch } from '@/sanity/lib/fetch';
import { client } from '@/sanity/lib/client';
import { GUEST_BY_SLUG_QUERY, GUEST_SLUGS_QUERY } from '@/sanity/lib/queries';
import { urlFor } from '@/sanity/lib/image';
import type { Guest } from '@/types';

export const revalidate = 60;

interface Params {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(GUEST_SLUGS_QUERY);
  return (slugs ?? []).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const guest = await sanityFetch<Guest | null>({
    query: GUEST_BY_SLUG_QUERY,
    params: { slug },
    tags: [`guest:${slug}`],
  });
  if (!guest) return { title: 'Nie znaleziono gościa' };

  const image = guest.photo ? urlFor(guest.photo).width(1200).height(630).url() : undefined;

  return {
    title: guest.name,
    description: guest.shortBio ?? undefined,
    openGraph: {
      title: guest.name,
      description: guest.shortBio ?? undefined,
      images: image ? [image] : undefined,
    },
  };
}

export default async function Page({ params }: Params) {
  const { slug } = await params;
  const guest = await sanityFetch<Guest | null>({
    query: GUEST_BY_SLUG_QUERY,
    params: { slug },
    tags: [`guest:${slug}`],
  });

  if (!guest) notFound();
  return <GuestPage guest={guest} />;
}
