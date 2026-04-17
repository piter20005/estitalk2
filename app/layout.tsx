import type { Metadata, Viewport } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

const GA_MEASUREMENT_ID = 'G-YTSDB38NH5';

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

const SITE_URL = 'https://estitalk.pl';
const DEFAULT_OG_IMAGE = '/images/billboard.png';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Esti Talk | Dr Tatiana Jasińska',
    template: '%s | Esti Talk',
  },
  description:
    'Podcast o medycynie estetycznej, dermatologii i pięknie. Dr n. med. Tatiana Jasińska zaprasza do rozmów o świadomej pielęgnacji.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'pl_PL',
    siteName: 'Esti Talk',
    url: SITE_URL,
    title: 'Esti Talk | Dr Tatiana Jasińska',
    description:
      'Podcast o medycynie estetycznej, dermatologii i pięknie. Dr n. med. Tatiana Jasińska zaprasza do rozmów o świadomej pielęgnacji.',
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'Esti Talk — podcast Dr Tatiany Jasińskiej',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Esti Talk | Dr Tatiana Jasińska',
    description:
      'Podcast o medycynie estetycznej, dermatologii i świadomej pielęgnacji.',
    images: [DEFAULT_OG_IMAGE],
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
        <Script id="google-consent-mode" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('consent', 'default', {
              ad_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied',
              analytics_storage: 'denied',
              functionality_storage: 'granted',
              security_storage: 'granted',
              wait_for_update: 500,
            });
            try {
              var stored = localStorage.getItem('cookie_consent');
              if (stored === 'all') {
                gtag('consent', 'update', {
                  ad_storage: 'granted',
                  ad_user_data: 'granted',
                  ad_personalization: 'granted',
                  analytics_storage: 'granted',
                });
              }
            } catch (e) {}
          `}
        </Script>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', { anonymize_ip: true });
          `}
        </Script>
      </body>
    </html>
  );
}
