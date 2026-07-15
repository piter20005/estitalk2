import type { Metadata } from 'next';
import SochaPresalePage from '@/components/SochaPresalePage';
import { SOCHA_PRESALE } from '@/lib/sochaPresale';

export const metadata: Metadata = {
  title: 'Menopauza bez tabu — przedsprzedaż',
  description:
    'Przedsprzedaż specjalnego odcinka EstiTalk: dr Tatiana Jasińska rozmawia z prof. Maciejem Sochą o hormonach, menopauzie, seksualności i relacjach.',
  alternates: {
    canonical: SOCHA_PRESALE.route,
  },
  openGraph: {
    title: 'Menopauza bez tabu — EstiTalk z prof. Maciejem Sochą',
    description:
      'Ponad trzy godziny szczerej rozmowy zmieniamy w uporządkowaną premierę. Zamów dwie części premium w przedsprzedaży.',
    url: SOCHA_PRESALE.route,
    type: 'website',
    images: [
      {
        url: '/images/studio.png',
        width: 1200,
        height: 675,
        alt: 'EstiTalk — Menopauza bez tabu',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Menopauza bez tabu — przedsprzedaż EstiTalk',
    description: 'Hormony, ciało, seks i relacje w rozmowie dr Tatiany Jasińskiej z prof. Maciejem Sochą.',
    images: ['/images/studio.png'],
  },
};

type PageProps = {
  searchParams: Promise<{ status?: string }>;
};

const VALID_STATUSES = new Set(['success', 'cancelled', 'terms', 'unavailable', 'error']);

export default async function PremierePage({ searchParams }: PageProps) {
  const params = await searchParams;
  const status = params.status && VALID_STATUSES.has(params.status) ? params.status : undefined;

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: SOCHA_PRESALE.name,
    description:
      'Dostęp do dwóch zredagowanych części premium rozmowy o menopauzie, hormonach, seksualności i relacjach.',
    brand: {
      '@type': 'Brand',
      name: 'EstiTalk',
    },
    offers: {
      '@type': 'Offer',
      price: SOCHA_PRESALE.priceGrossPln,
      priceCurrency: 'PLN',
      availability: 'https://schema.org/PreOrder',
      url: `https://estitalk.pl${SOCHA_PRESALE.route}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd).replace(/</g, '\\u003c') }}
      />
      <SochaPresalePage status={status as 'success' | 'cancelled' | 'terms' | 'unavailable' | 'error' | undefined} />
    </>
  );
}

