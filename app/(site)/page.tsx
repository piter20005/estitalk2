import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import Topics from '@/components/Topics';
import About from '@/components/About';
import Philosophy from '@/components/Philosophy';
import EpisodeList from '@/components/EpisodeList';
import GuestsSlider from '@/components/GuestsSlider';
import DoctorsPromo from '@/components/DoctorsPromo';
import DoctorsPopup from '@/components/DoctorsPopup';
import Testimonials from '@/components/Testimonials';
import Newsletter from '@/components/Newsletter';
import Platforms from '@/components/Platforms';
import { sanityFetch } from '@/sanity/lib/fetch';
import { ALL_GUESTS_QUERY, FEATURED_EPISODES_QUERY } from '@/sanity/lib/queries';
import type { Episode, Guest } from '@/types';
import { jsonLdScript, podcastSeriesLd } from '@/lib/jsonLd';

export const revalidate = 60;

export default async function HomePage() {
  const [episodes, guests] = await Promise.all([
    sanityFetch<Episode[]>({
      query: FEATURED_EPISODES_QUERY,
      tags: ['episode'],
    }),
    sanityFetch<(Guest & { episodeCount?: number })[]>({
      query: ALL_GUESTS_QUERY,
      tags: ['guest'],
    }),
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(podcastSeriesLd()) }}
      />
      <Hero />
      <Marquee />
      <Topics />
      <About />
      <Philosophy />
      <EpisodeList episodes={episodes || []} />
      <GuestsSlider guests={guests || []} />
      <DoctorsPromo />
      <Testimonials />
      <Newsletter />
      <Platforms />
      <DoctorsPopup />
    </>
  );
}
