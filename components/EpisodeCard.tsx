import Link from 'next/link';
import { Play, Music, Youtube, Podcast } from 'lucide-react';
import SanityImage from './SanityImage';
import type { Episode } from '@/types';
import { formatPublishDate, formatDurationSeconds } from '@/types';

interface EpisodeCardProps {
  episode: Episode;
  index: number;
  layout?: 'list' | 'grid';
}

export default function EpisodeCard({ episode, index, layout = 'list' }: EpisodeCardProps) {
  const href = `/odcinki/${episode.slug}`;
  const badge = formatDurationSeconds(episode.duration) || formatPublishDate(episode.publishDate);

  return (
    <div className={`group flex flex-col ${layout === 'list' ? (index % 2 !== 0 ? 'md:mt-32' : '') : 'h-full'}`}>
      <Link
        href={href}
        className="relative overflow-hidden mb-6 aspect-[16/9] bg-gray-100 shadow-sm rounded-sm cursor-pointer block"
      >
        <SanityImage
          image={episode.coverImage}
          fallbackUrl={episode.coverImageUrl}
          alt={episode.title}
          width={960}
          height={540}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105 filter grayscale-[20%] group-hover:grayscale-0"
        />

        <div className="absolute inset-0 bg-esti-dark/10 group-hover:bg-esti-dark/30 transition-colors flex items-center justify-center">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center transform scale-90 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 shadow-2xl">
            <Play size={24} className="ml-1 text-esti-dark" fill="currentColor" />
          </div>
        </div>

        {badge && (
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md text-esti-dark px-3 py-1 text-xs font-bold tracking-widest uppercase">
            {badge}
          </div>
        )}
      </Link>

      <div className={`pr-4 relative flex flex-col flex-grow ${layout === 'grid' ? 'justify-between' : ''}`}>
        {layout === 'list' && (
          <span className="absolute -left-12 -top-12 text-[8rem] font-serif text-esti-beige opacity-30 select-none hidden md:block leading-none z-0">
            {String(index + 1).padStart(2, '0')}
          </span>
        )}

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-sans tracking-widest text-esti-taupe border-b border-esti-taupe pb-0.5">
              SEZON {episode.season || 1}
            </span>
          </div>

          <Link href={href}>
            <h3 className="font-serif text-2xl mb-3 group-hover:text-esti-taupe transition-colors leading-tight line-clamp-2 cursor-pointer">
              {episode.title}
            </h3>
          </Link>

          {episode.description && (
            <p className="text-gray-600 font-light leading-relaxed mb-6 line-clamp-3 text-sm md:text-base">
              {episode.description}
            </p>
          )}

          {episode.guests && episode.guests.length > 0 && (
            <p className="text-xs uppercase tracking-widest text-esti-taupe/80 mb-4">
              Gość:{' '}
              {episode.guests.map((g, i) => (
                <span key={g._id}>
                  <Link href={`/goscie/${g.slug}`} className="underline hover:text-esti-dark">
                    {g.name}
                  </Link>
                  {i < episode.guests!.length - 1 ? ', ' : ''}
                </span>
              ))}
            </p>
          )}

          <div className="flex items-center gap-6 pt-5 border-t border-gray-200 mt-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Oglądaj:</span>
            <div className="flex gap-4">
              {episode.youtubeUrl && (
                <a
                  href={episode.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-esti-dark hover:text-[#FF0000] transition-colors transform hover:-translate-y-1 duration-300"
                  title="YouTube"
                >
                  <Youtube size={20} strokeWidth={1.5} />
                </a>
              )}
              {episode.spotifyUrl && (
                <a
                  href={episode.spotifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-esti-dark hover:text-[#1DB954] transition-colors transform hover:-translate-y-1 duration-300"
                  title="Spotify"
                >
                  <Music size={20} strokeWidth={1.5} />
                </a>
              )}
              {episode.appleUrl && (
                <a
                  href={episode.appleUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-esti-dark hover:text-[#872EC4] transition-colors transform hover:-translate-y-1 duration-300"
                  title="Apple Podcasts"
                >
                  <Podcast size={20} strokeWidth={1.5} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
