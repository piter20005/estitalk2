import type { Metadata } from 'next';
import SochaPresalePage from '@/components/SochaPresalePage';
import { SOCHA_PATRONITE } from '@/lib/sochaPatronite';

export const metadata: Metadata = {
  title: 'EstiTalk z prof. Maciejem Sochą — dalsza część dla Patronów',
  description:
    'Ponad trzy godziny rozmowy o menopauzie, hormonach, seksualności i relacjach. Obejrzyj pierwszą część bezpłatnie, a dalszą część odblokuj w Klubie EstiTalk na Patronite.',
  alternates: {
    canonical: SOCHA_PATRONITE.route,
  },
  openGraph: {
    title: 'Ponad trzy godziny rozmowy z prof. Maciejem Sochą',
    description:
      'Pierwsza część bezpłatnie. Dalsze 1 godz. 47 min rozmowy o hormonach, ciele, seksie, libido i relacjach dla Patronów EstiTalk.',
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
    title: 'EstiTalk z prof. Maciejem Sochą — dalsza część dla Patronów',
    description: 'Pierwsza część na YouTube, a dalsze 1 godz. 47 min rozmowy w Klubie EstiTalk.',
    images: ['/images/studio.png'],
  },
};

export default function PremierePage() {
  return <SochaPresalePage />;
}
