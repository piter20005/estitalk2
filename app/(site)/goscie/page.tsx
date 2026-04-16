import type { Metadata } from 'next';
import AllGuests from '@/components/AllGuests';
import { sanityFetch } from '@/sanity/lib/fetch';
import { ALL_GUESTS_QUERY } from '@/sanity/lib/queries';
import type { Guest } from '@/types';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Goście',
  description: 'Poznaj ekspertów, którzy wystąpili w podcaście EstiTalk.',
};

export default async function GuestsPage() {
  const guests = await sanityFetch<(Guest & { episodeCount?: number })[]>({
    query: ALL_GUESTS_QUERY,
    tags: ['guest'],
  });

  return <AllGuests guests={guests || []} />;
}
