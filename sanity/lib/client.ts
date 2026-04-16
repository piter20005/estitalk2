import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId, readToken } from '../env';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // useCdn must be false when the client is authenticated with a token
  // (the CDN does not cache authenticated responses anyway).
  useCdn: !readToken,
  token: readToken,
  perspective: 'published',
  stega: { studioUrl: '/studio' },
});
