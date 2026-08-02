import type { Metadata } from 'next';
import SochaPresalePage from '@/components/SochaPresalePage';
import { SOCHA_PATRONITE } from '@/lib/sochaPatronite';

export const metadata: Metadata = {
  title: 'Klub EstiTalk — pełny podcast i materiały dla Patronów',
  description:
    'Pełny odcinek EstiTalk z prof. Maciejem Sochą pozostaje bezpłatny. Patroni otrzymują od razu dwa pogłębione materiały o hormonach, ciele, seksie, libido i relacjach.',
  alternates: {
    canonical: SOCHA_PATRONITE.route,
  },
  openGraph: {
    title: 'Pełny EstiTalk bezpłatnie. Dodatkowa wiedza dla Patronów.',
    description:
      'Jedna rozmowa z prof. Maciejem Sochą, jeden pełny odcinek publiczny i dwa osobne bonusy dla społeczności EstiTalk.',
    url: SOCHA_PATRONITE.route,
    type: 'website',
    images: [
      {
        url: '/images/studio.png',
        width: 1200,
        height: 675,
        alt: 'EstiTalk z prof. Maciejem Sochą',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Klub EstiTalk — rozmowa z prof. Maciejem Sochą',
    description: 'Pełny odcinek na YouTube oraz dwa pogłębione materiały dla Patronów.',
    images: ['/images/studio.png'],
  },
};

export default function PremierePage() {
  return <SochaPresalePage />;
}
