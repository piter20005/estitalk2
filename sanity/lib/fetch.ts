import type { QueryParams } from 'next-sanity';
import { client } from './client';

/**
 * Server-side fetch helper with ISR + stega support.
 * Use this in Server Components for all Sanity reads.
 */
export async function sanityFetch<QueryResponse>({
  query,
  params = {},
  revalidate = 60,
  tags,
}: {
  query: string;
  params?: QueryParams;
  revalidate?: number | false;
  tags?: string[];
}): Promise<QueryResponse> {
  return client.fetch<QueryResponse>(query, params, {
    next: {
      revalidate: tags ? false : revalidate,
      tags,
    },
  });
}
