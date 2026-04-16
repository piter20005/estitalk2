import type { Metadata, Viewport } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://estitalk.pl'),
  title: {
    default: 'Esti Talk | Dr Tatiana Jasińska',
    template: '%s | Esti Talk',
  },
  description:
    'Podcast o medycynie estetycznej, dermatologii i pięknie. Dr n. med. Tatiana Jasińska zaprasza do rozmów o świadomej pielęgnacji.',
  openGraph: {
    type: 'website',
    locale: 'pl_PL',
    siteName: 'Esti Talk',
  },
};

export const viewport: Viewport = {
  themeColor: '#D8CAB6',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans text-esti-dark bg-white selection:bg-esti-beige selection:text-esti-dark">
        {children}
      </body>
    </html>
  );
}
