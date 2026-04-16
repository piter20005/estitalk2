import Link from 'next/link';
import { ArrowLeft, Calendar, Music, Youtube, Podcast, ExternalLink, Clock } from 'lucide-react';
import { PortableText } from 'next-sanity';
import SanityImage from './SanityImage';
import YouTubePreviewHero from './YouTubePreviewHero';
import type { Episode } from '@/types';
import {
  formatPublishDate,
  formatDurationSeconds,
  extractSpotifyEpisodeId,
  extractYouTubeId,
} from '@/types';

interface EpisodePageProps {
  episode: Episode;
}

export default function EpisodePage({ episode }: EpisodePageProps) {
  const spotifyEpisodeId = extractSpotifyEpisodeId(episode.spotifyUrl);
  const youtubeVideoId = extractYouTubeId(episode.youtubeUrl);
  const publishDate = formatPublishDate(episode.publishDate);
  const duration = formatDurationSeconds(episode.duration);

  return (
    <div className="min-h-screen bg-esti-light pb-20 animate-fade-in-up">
      <YouTubePreviewHero
        videoId={youtubeVideoId}
        coverImage={episode.coverImage}
        coverImageUrl={episode.coverImageUrl}
        title={episode.title}
      >
        <Link
          href="/odcinki"
          className="group inline-flex items-center gap-2 text-xs uppercase tracking-widest text-white/80 hover:text-white mb-6 transition-colors"
        >
          <div className="p-2 border border-white/40 rounded-full group-hover:border-white transition-colors">
            <ArrowLeft size={14} />
          </div>
          <span>Wróć do listy</span>
        </Link>

        <span className="inline-block py-1 px-3 border border-white/40 text-[10px] font-bold tracking-[0.2em] uppercase text-white/90 mb-4 rounded-sm">
          Sezon {episode.season || 1}
        </span>
        <h1 className="font-serif text-4xl md:text-7xl text-white mb-6 leading-tight">
          {episode.title}
        </h1>

        <div className="flex flex-wrap items-center gap-6 text-white/80 font-light text-sm">
          {publishDate && (
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span>{publishDate}</span>
            </div>
          )}
          {duration && (
            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span>{duration}</span>
            </div>
          )}
        </div>
      </YouTubePreviewHero>

      <div className="container mx-auto px-6 max-w-5xl pt-16">
        <div className="bg-white p-4 shadow-sm border border-gray-100 rounded-sm mb-12">
          {spotifyEpisodeId ? (
            <iframe
              src={`https://open.spotify.com/embed/episode/${spotifyEpisodeId}?utm_source=generator&theme=0`}
              width="100%"
              height="152"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              title={episode.title}
              className="rounded-sm"
            />
          ) : (
            <div className="relative aspect-video w-full bg-black overflow-hidden group">
              <SanityImage
                image={episode.coverImage}
                fallbackUrl={episode.coverImageUrl}
                alt={episode.title}
                width={1280}
                height={720}
                className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity duration-700"
              />
              {episode.youtubeUrl && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <a
                    href={episode.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300"
                  >
                    <Youtube size={32} className="text-esti-dark ml-1" fill="currentColor" />
                  </a>
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
                <p className="font-sans text-xs uppercase tracking-widest opacity-80">Oglądaj na YouTube</p>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-16">
          <div className="lg:w-2/3">
            <h3 className="font-serif text-2xl mb-6 text-esti-dark">O odcinku</h3>
            <div className="prose prose-stone max-w-none font-light leading-relaxed text-esti-taupe">
              <p className="whitespace-pre-line text-lg">{episode.description}</p>
            </div>

            {Boolean(episode.notes) && (
              <div className="mt-8 text-sm text-esti-taupe/80 italic border-l-2 border-esti-taupe/20 pl-4 space-y-2">
                <PortableText value={episode.notes as never} />
              </div>
            )}

            {episode.resources && episode.resources.length > 0 && (
              <div className="mt-12">
                <h3 className="font-serif text-2xl mb-6 text-esti-dark">Linki i zasoby</h3>
                <ul className="space-y-3">
                  {episode.resources.map((r) => (
                    <li key={r.url}>
                      <a
                        href={r.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-esti-taupe hover:text-esti-dark transition-colors group"
                      >
                        <span className="block w-4 h-px bg-esti-taupe/40 group-hover:w-6 group-hover:bg-esti-dark transition-all shrink-0" />
                        <span>{r.label}</span>
                        <ExternalLink size={13} className="opacity-40 group-hover:opacity-80 shrink-0" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="lg:w-1/3">
            <div className="sticky top-32 space-y-8">
              <div className="bg-white p-8 border border-gray-100 shadow-sm rounded-sm">
                <h4 className="font-serif text-xl mb-6 text-esti-dark">Posłuchaj odcinka</h4>
                <div className="flex flex-col gap-4">
                  {episode.spotifyUrl && (
                    <a
                      href={episode.spotifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 border border-gray-200 hover:border-[#1DB954] hover:bg-[#1DB954]/5 transition-all group rounded-sm"
                    >
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-[#1DB954] group-hover:text-white transition-colors">
                        <Music size={20} />
                      </div>
                      <span className="font-medium text-esti-dark">Spotify</span>
                    </a>
                  )}

                  {episode.appleUrl && (
                    <a
                      href={episode.appleUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 border border-gray-200 hover:border-[#872EC4] hover:bg-[#872EC4]/5 transition-all group rounded-sm"
                    >
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-[#872EC4] group-hover:text-white transition-colors">
                        <Podcast size={20} />
                      </div>
                      <span className="font-medium text-esti-dark">Apple Podcasts</span>
                    </a>
                  )}

                  {episode.youtubeUrl && (
                    <a
                      href={episode.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 border border-gray-200 hover:border-[#FF0000] hover:bg-[#FF0000]/5 transition-all group rounded-sm"
                    >
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-[#FF0000] group-hover:text-white transition-colors">
                        <Youtube size={20} />
                      </div>
                      <span className="font-medium text-esti-dark">YouTube</span>
                    </a>
                  )}
                </div>
              </div>

              {episode.guests && episode.guests.length > 0 && (
                <div className="bg-white p-6 border border-gray-100 shadow-sm rounded-sm">
                  <h4 className="font-serif text-lg mb-4 text-esti-dark">Goście odcinka</h4>
                  <ul className="space-y-4">
                    {episode.guests.map((g) => (
                      <li key={g._id}>
                        <Link href={`/goscie/${g.slug}`} className="flex items-center gap-3 group">
                          <div className="w-12 h-12 overflow-hidden rounded-full bg-esti-beige/30 shrink-0">
                            <SanityImage
                              image={g.photo}
                              alt={g.name}
                              width={96}
                              height={96}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                            />
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium text-esti-dark group-hover:text-esti-taupe transition-colors truncate">
                              {g.name}
                            </p>
                            {g.profession && <p className="text-xs text-esti-taupe truncate">{g.profession}</p>}
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {episode.topics && episode.topics.length > 0 && (
                <div className="bg-white p-6 border border-gray-100 shadow-sm rounded-sm">
                  <h4 className="font-serif text-lg mb-3 text-esti-dark">Tematy</h4>
                  <div className="flex flex-wrap gap-2">
                    {episode.topics.map((t) => (
                      <Link
                        key={t._id}
                        href={`/tematy/${t.slug}`}
                        className="text-xs border border-esti-taupe/30 px-3 py-1 text-esti-taupe hover:bg-esti-dark hover:text-white hover:border-esti-dark uppercase tracking-widest rounded-sm transition-colors"
                      >
                        {t.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
