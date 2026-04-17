import { ImageResponse } from 'next/og';
import { sanityFetch } from '@/sanity/lib/fetch';
import { EPISODE_BY_SLUG_QUERY } from '@/sanity/lib/queries';
import type { Episode } from '@/types';

export const runtime = 'nodejs';
export const revalidate = 3600;

export const alt = 'Esti Talk — odcinek podcastu';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

interface Params {
  params: Promise<{ slug: string }>;
}

export default async function OpengraphImage({ params }: Params) {
  const { slug } = await params;

  const episode = await sanityFetch<Episode | null>({
    query: EPISODE_BY_SLUG_QUERY,
    params: { slug },
    tags: [`episode:${slug}`],
  });

  const title = episode?.title ?? 'Esti Talk';
  const season = episode?.season ?? null;
  const guests = (episode?.guests ?? []).map((g) => g.name).join(' · ');

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background:
            'linear-gradient(135deg, #1C1917 0%, #2a2422 55%, #4a3d33 100%)',
          padding: '72px 80px',
          fontFamily: 'sans-serif',
          color: '#F8F3EC',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: 460,
            height: 460,
            background:
              'radial-gradient(circle at center, rgba(197,160,101,0.25) 0%, rgba(197,160,101,0) 70%)',
          }}
        />

        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 999,
              background: '#C5A065',
            }}
          />
          <div
            style={{
              fontSize: 22,
              letterSpacing: 8,
              textTransform: 'uppercase',
              color: '#D8CAB6',
            }}
          >
            Esti Talk{season ? `  ·  Sezon ${season}` : ''}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 28,
            maxWidth: 980,
          }}
        >
          <div
            style={{
              fontSize: title.length > 80 ? 56 : 72,
              lineHeight: 1.05,
              fontWeight: 600,
              fontFamily: 'serif',
              letterSpacing: -1,
            }}
          >
            {title}
          </div>
          {guests && (
            <div
              style={{
                fontSize: 28,
                color: '#D8CAB6',
                fontStyle: 'italic',
                opacity: 0.9,
              }}
            >
              z {guests}
            </div>
          )}
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            borderTop: '1px solid rgba(216,202,182,0.25)',
            paddingTop: 24,
          }}
        >
          <div
            style={{
              fontSize: 22,
              color: '#D8CAB6',
              opacity: 0.9,
            }}
          >
            Dr n. med. Tatiana Jasińska
          </div>
          <div
            style={{
              fontSize: 18,
              letterSpacing: 6,
              textTransform: 'uppercase',
              color: '#C5A065',
            }}
          >
            estitalk.pl
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
