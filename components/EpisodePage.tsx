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

  const paragraphs = (episode.description ?? '')
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  const hasGuests = Boolean(episode.guests && episode.guests.length > 0);
  const hasTopics = Boolean(episode.topics && episode.topics.length > 0);
  const hasResources = Boolean(episode.resources && episode.resources.length > 0);
  const hasPlatforms = Boolean(episode.spotifyUrl || episode.appleUrl || episode.youtubeUrl);

  return (
    <div className="min-h-screen bg-esti-light pb-20 animate-fade-in-up">
      <YouTubePreviewHero
        videoId={youtubeVideoId}
        coverImage={episode.coverImage}
        coverImageUrl={episode.coverImageUrl}
        title={episode.title}
        topSlot={
          <Link
            href="/odcinki"
            className="group inline-flex items-center gap-3 text-xs uppercase tracking-widest text-white/80 hover:text-white transition-colors"
          >
            <div className="p-2 border border-white/40 rounded-full group-hover:border-white group-hover:bg-white/10 transition-colors">
              <ArrowLeft size={14} />
            </div>
            <span>Wróć do listy</span>
          </Link>
        }
      >
        <span className="inline-block py-1 px-3 border border-white/40 text-[10px] font-bold tracking-[0.2em] uppercase text-white/90 mb-5 rounded-sm">
          Sezon {episode.season || 1}
        </span>
        <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl text-white mb-6 leading-[1.1] max-w-3xl">
          {episode.title}
        </h1>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-white/75 font-light text-sm">
          {publishDate && (
            <div className="flex items-center gap-2">
              <Calendar size={15} />
              <span>{publishDate}</span>
            </div>
          )}
          {duration && (
            <div className="flex items-center gap-2">
              <Clock size={15} />
              <span>{duration}</span>
            </div>
          )}
        </div>
      </YouTubePreviewHero>

      <div className="container mx-auto px-6 max-w-6xl pt-16 md:pt-20">
        {spotifyEpisodeId && (
          <div className="bg-white p-4 shadow-sm border border-gray-100 rounded-sm mb-14">
            <iframe
              src={`https://open.spotify.com/embed/episode/${spotifyEpisodeId}?utm_source=generator&theme=0`}
              width="100%"
              height="152"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              title={episode.title}
              className="rounded-sm"
            />
          </div>
        )}

        {(hasTopics || hasPlatforms) && (
          <section className="grid gap-12 md:grid-cols-2">
            {hasTopics && (
              <div>
                <h3 className="font-serif text-sm text-esti-taupe uppercase tracking-[0.2em] mb-5">
                  Tematy
                </h3>
                <div className="flex flex-wrap gap-2">
                  {episode.topics!.map((t) => (
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

            {hasPlatforms && (
              <div>
                <h3 className="font-serif text-sm text-esti-taupe uppercase tracking-[0.2em] mb-5">
                  Posłuchaj odcinka
                </h3>
                <div className="flex flex-wrap gap-3">
                  {episode.spotifyUrl && (
                    <a
                      href={episode.spotifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 border border-esti-taupe/25 rounded-sm text-sm font-medium text-esti-dark hover:border-[#1DB954] hover:bg-[#1DB954]/5 transition-colors"
                    >
                      <Music size={16} />
                      <span>Spotify</span>
                    </a>
                  )}
                  {episode.appleUrl && (
                    <a
                      href={episode.appleUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 border border-esti-taupe/25 rounded-sm text-sm font-medium text-esti-dark hover:border-[#872EC4] hover:bg-[#872EC4]/5 transition-colors"
                    >
                      <Podcast size={16} />
                      <span>Apple Podcasts</span>
                    </a>
                  )}
                  {episode.youtubeUrl && (
                    <a
                      href={episode.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 border border-esti-taupe/25 rounded-sm text-sm font-medium text-esti-dark hover:border-[#FF0000] hover:bg-[#FF0000]/5 transition-colors"
                    >
                      <Youtube size={16} />
                      <span>YouTube</span>
                    </a>
                  )}
                </div>
              </div>
            )}
          </section>
        )}

        {hasGuests && (
          <section className="mt-16 pt-12 border-t border-esti-taupe/15">
            <h2 className="font-serif text-3xl text-esti-dark mb-8">Goście odcinka</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {episode.guests!.map((g) => (
                <Link
                  key={g._id}
                  href={`/goscie/${g.slug}`}
                  className="flex items-center gap-4 bg-white border border-gray-100 rounded-sm p-5 hover:shadow-md hover:border-esti-taupe/40 transition-all group"
                >
                  <div className="w-16 h-16 overflow-hidden rounded-full bg-esti-beige/30 shrink-0">
                    <SanityImage
                      image={g.photo}
                      alt={g.name}
                      width={128}
                      height={128}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-esti-dark group-hover:text-esti-taupe transition-colors">
                      {g.name}
                    </p>
                    {g.profession && (
                      <p className="text-xs text-esti-taupe mt-1">{g.profession}</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {hasResources && (
          <section className="mt-16 pt-12 border-t border-esti-taupe/15">
            <h3 className="font-serif text-sm text-esti-taupe uppercase tracking-[0.2em] mb-5">
              Linki i zasoby
            </h3>
            <div className="flex flex-wrap gap-3">
              {episode.resources!.map((r) => (
                <a
                  key={r.url}
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 border border-esti-taupe/25 rounded-sm text-sm text-esti-taupe hover:bg-esti-dark hover:text-white hover:border-esti-dark transition-colors"
                >
                  <span>{r.label}</span>
                  <ExternalLink size={13} className="opacity-60" />
                </a>
              ))}
            </div>
          </section>
        )}

        <section className="mt-16 pt-12 border-t border-esti-taupe/15">
          <span className="block w-12 h-px bg-esti-gold mb-5" aria-hidden="true" />
          <h2 className="font-serif text-3xl md:text-4xl text-esti-dark mb-8">O odcinku</h2>

          <article>
            {paragraphs.length > 0 ? (
              paragraphs.map((p, i) => (
                <p
                  key={i}
                  className="font-sans font-light text-base leading-relaxed text-esti-taupe mb-4"
                >
                  {p}
                </p>
              ))
            ) : (
              episode.description && (
                <p className="font-sans font-light text-base leading-relaxed text-esti-taupe whitespace-pre-line">
                  {episode.description}
                </p>
              )
            )}

            {Boolean(episode.notes) && (
              <div className="mt-10 pl-5 border-l-2 border-esti-gold/60 text-esti-taupe/80 italic space-y-3 text-sm">
                <PortableText value={episode.notes as never} />
              </div>
            )}
          </article>
        </section>
      </div>
    </div>
  );
}
