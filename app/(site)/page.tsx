import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import Topics from '@/components/Topics';
import About from '@/components/About';
import Philosophy from '@/components/Philosophy';
import EpisodeList from '@/components/EpisodeList';
import DoctorsPromo from '@/components/DoctorsPromo';
import Testimonials from '@/components/Testimonials';
import Newsletter from '@/components/Newsletter';
import Platforms from '@/components/Platforms';
import { sanityFetch } from '@/sanity/lib/fetch';
import { FEATURED_EPISODES_QUERY } from '@/sanity/lib/queries';
import type { Episode } from '@/types';

export const revalidate = 60;

export default async function HomePage() {
  const episodes = await sanityFetch<Episode[]>({
    query: FEATURED_EPISODES_QUERY,
    tags: ['episode'],
  });

  return (
    <>
      <Hero />
      <Marquee />
      <Topics />
      <About />
      <Philosophy />
      <EpisodeList episodes={episodes || []} />
      <DoctorsPromo />
      <Testimonials />
      <Newsletter />
      <Platforms />
    </>
  );
}
