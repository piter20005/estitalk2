'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { ArrowDown } from 'lucide-react';
import SanityImage from './SanityImage';
import type { SanityImageField } from '@/types';

interface YouTubePreviewHeroProps {
  videoId: string | null;
  coverImage?: SanityImageField | null;
  coverImageUrl?: string | null;
  title: string;
  previewSeconds?: number;
  topSlot?: ReactNode;
  children: ReactNode;
}

interface YTPlayer {
  mute: () => void;
  playVideo: () => void;
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
  getCurrentTime: () => number;
  destroy: () => void;
}

interface YTPlayerEvent {
  target: YTPlayer;
  data?: number;
}

interface YTWindow extends Window {
  YT?: {
    Player: new (
      el: HTMLElement | string,
      options: {
        width?: string | number;
        height?: string | number;
        videoId: string;
        host?: string;
        playerVars?: Record<string, number | string>;
        events?: {
          onReady?: (e: YTPlayerEvent) => void;
          onStateChange?: (e: YTPlayerEvent) => void;
          onError?: (e: YTPlayerEvent) => void;
        };
      },
    ) => YTPlayer;
    PlayerState: { ENDED: number };
  };
  onYouTubeIframeAPIReady?: () => void;
}

let ytApiReadyPromise: Promise<void> | null = null;

function loadYouTubeAPI(): Promise<void> {
  if (typeof window === 'undefined') return Promise.reject(new Error('SSR'));
  const w = window as YTWindow;
  if (w.YT?.Player) return Promise.resolve();
  if (ytApiReadyPromise) return ytApiReadyPromise;

  ytApiReadyPromise = new Promise<void>((resolve) => {
    const prev = w.onYouTubeIframeAPIReady;
    w.onYouTubeIframeAPIReady = () => {
      prev?.();
      resolve();
    };
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    tag.async = true;
    document.head.appendChild(tag);
  });
  return ytApiReadyPromise;
}

export default function YouTubePreviewHero({
  videoId,
  coverImage,
  coverImageUrl,
  title,
  previewSeconds = 30,
  topSlot,
  children,
}: YouTubePreviewHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [playerReady, setPlayerReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!videoId || !containerRef.current) return;

    let mounted = true;
    let player: YTPlayer | null = null;
    let interval: ReturnType<typeof setInterval> | null = null;

    const container = containerRef.current;
    container.replaceChildren();
    const target = document.createElement('div');
    target.style.width = '100%';
    target.style.height = '100%';
    container.appendChild(target);

    loadYouTubeAPI()
      .then(() => {
        if (!mounted) return;
        const w = window as YTWindow;
        if (!w.YT?.Player) {
          setFailed(true);
          return;
        }

        player = new w.YT.Player(target, {
          width: '100%',
          height: '100%',
          videoId,
          host: 'https://www.youtube-nocookie.com',
          playerVars: {
            autoplay: 1,
            mute: 1,
            controls: 0,
            modestbranding: 1,
            rel: 0,
            playsinline: 1,
            start: 0,
            disablekb: 1,
            iv_load_policy: 3,
            fs: 0,
            loop: 1,
            playlist: videoId,
            origin: window.location.origin,
          },
          events: {
            onReady: (e) => {
              if (!mounted) return;
              try {
                e.target.mute();
                e.target.playVideo();
              } catch {
                /* ignore */
              }
              setPlayerReady(true);
              interval = setInterval(() => {
                if (!player) return;
                try {
                  if (player.getCurrentTime() >= previewSeconds) {
                    player.seekTo(0, true);
                  }
                } catch {
                  /* player may be mid-destroy */
                }
              }, 500);
            },
            onStateChange: (e) => {
              if (!mounted) return;
              const ended = w.YT?.PlayerState.ENDED;
              if (typeof ended === 'number' && e.data === ended) {
                try {
                  e.target.seekTo(0, true);
                  e.target.playVideo();
                } catch {
                  /* ignore */
                }
              }
            },
            onError: () => {
              if (!mounted) return;
              setFailed(true);
            },
          },
        });
      })
      .catch(() => {
        if (mounted) setFailed(true);
      });

    return () => {
      mounted = false;
      if (interval) clearInterval(interval);
      if (player) {
        try {
          player.destroy();
        } catch {
          /* ignore */
        }
      }
    };
  }, [videoId, previewSeconds]);

  const showVideo = Boolean(videoId) && !failed;
  const videoVisible = showVideo && playerReady;

  return (
    <section className="relative w-full h-screen min-h-[640px] overflow-hidden bg-esti-dark -mt-20">
      {showVideo && (
        <div
          className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${
            videoVisible ? 'opacity-100' : 'opacity-0'
          }`}
          aria-hidden="true"
        >
          <div className="absolute inset-0 scale-[1.35] origin-center [&_iframe]:w-full [&_iframe]:h-full [&_iframe]:block">
            <div ref={containerRef} className="w-full h-full" />
          </div>
        </div>
      )}

      <div
        className={`absolute inset-0 transition-opacity duration-700 ${
          videoVisible ? 'opacity-0' : 'opacity-100'
        }`}
        aria-hidden={videoVisible}
      >
        <SanityImage
          image={coverImage}
          fallbackUrl={coverImageUrl}
          alt={title}
          width={1920}
          height={1080}
          priority
          className="w-full h-full object-cover"
        />
      </div>

      <div
        className="absolute inset-0 bg-gradient-to-b from-esti-dark/70 via-transparent to-transparent pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-esti-dark via-esti-dark/80 via-30% to-transparent pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-esti-dark/60 via-transparent to-transparent pointer-events-none"
        aria-hidden="true"
      />

      {topSlot && (
        <div className="absolute top-36 left-0 right-0 z-10 container mx-auto px-6 max-w-5xl">
          <div className="text-white [text-shadow:_0_2px_16px_rgb(0_0_0_/_50%)]">
            {topSlot}
          </div>
        </div>
      )}

      <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-end pb-20 md:pb-24 max-w-5xl">
        <div className="text-white [text-shadow:_0_2px_24px_rgb(0_0_0_/_50%)] animate-fade-in-up max-w-4xl">
          {children}
        </div>
      </div>

      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/60 hidden md:block animate-bounce pointer-events-none"
        aria-hidden="true"
      >
        <ArrowDown size={22} />
      </div>
    </section>
  );
}
