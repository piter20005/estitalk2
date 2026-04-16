import React, { useEffect } from 'react';
import { ArrowLeft, Calendar, Share2, Music, Youtube, Podcast, ExternalLink } from 'lucide-react';
import { Episode } from '../types';

interface EpisodePageProps {
  episode: Episode;
  onBack: () => void;
}

// Extract Spotify episode ID from a Spotify episode URL
// e.g. https://open.spotify.com/episode/4B2JZKtODZR0M6n3hXVZQ6 → 4B2JZKtODZR0M6n3hXVZQ6
const getSpotifyEpisodeId = (url: string): string | null => {
  const match = url.match(/open\.spotify\.com\/episode\/([a-zA-Z0-9]+)/);
  return match ? match[1] : null;
};

const EpisodePage: React.FC<EpisodePageProps> = ({ episode, onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const spotifyEpisodeId = getSpotifyEpisodeId(episode.links.spotify);

  return (
    <div className="min-h-screen bg-esti-light pt-24 pb-20 animate-fade-in-up">
      <div className="container mx-auto px-6 max-w-5xl">

        {/* Navigation */}
        <button
          onClick={onBack}
          className="group flex items-center gap-2 text-xs uppercase tracking-widest text-esti-taupe hover:text-esti-dark mb-8 transition-colors"
        >
          <div className="p-2 border border-esti-taupe/30 rounded-full group-hover:border-esti-dark transition-colors">
            <ArrowLeft size={14} />
          </div>
          <span>Wróć do listy</span>
        </button>

        {/* Header */}
        <div className="mb-10 text-center md:text-left">
          <span className="inline-block py-1 px-3 border border-esti-taupe/30 text-[10px] font-bold tracking-[0.2em] uppercase text-esti-taupe mb-4 rounded-sm">
            Sezon {episode.season || 1}
          </span>
          <h1 className="font-serif text-4xl md:text-6xl text-esti-dark mb-6 leading-tight">
            {episode.title}
          </h1>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-esti-taupe font-light text-sm">
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span>{episode.duration}</span>
            </div>
          </div>
        </div>

        {/* Media Player */}
        <div className="bg-white p-4 shadow-sm border border-gray-100 rounded-sm mb-12">
          {spotifyEpisodeId ? (
            /* Spotify embed player */
            <iframe
              src={`https://open.spotify.com/embed/episode/${spotifyEpisodeId}?utm_source=generator&theme=0`}
              width="100%"
              height="152"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              title={episode.title}
              className="rounded-sm"
            />
          ) : (
            /* Fallback: cover image linking to YouTube */
            <div className="relative aspect-video w-full bg-black overflow-hidden group">
              <img
                src={episode.image}
                alt={episode.title}
                className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity duration-700"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <a
                  href={episode.links.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300"
                >
                  <Youtube size={32} className="text-esti-dark ml-1" fill="currentColor" />
                </a>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
                <p className="font-sans text-xs uppercase tracking-widest opacity-80">Oglądaj na YouTube</p>
              </div>
            </div>
          )}
        </div>

        {/* Content Layout */}
        <div className="flex flex-col lg:flex-row gap-16">

          {/* Main Description */}
          <div className="lg:w-2/3">
            <h3 className="font-serif text-2xl mb-6 text-esti-dark">O odcinku</h3>
            <div className="prose prose-stone max-w-none font-light leading-relaxed text-esti-taupe">
              <p className="whitespace-pre-line text-lg">{episode.description}</p>
            </div>

            {/* Notes */}
            {episode.notes && (
              <p className="mt-8 text-sm text-esti-taupe/70 italic border-l-2 border-esti-taupe/20 pl-4">
                {episode.notes}
              </p>
            )}

            {/* Resources */}
            {episode.resources && episode.resources.length > 0 && (
              <div className="mt-12">
                <h3 className="font-serif text-2xl mb-6 text-esti-dark">Linki i zasoby</h3>
                <ul className="space-y-3">
                  {episode.resources.map(r => (
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

          {/* Sidebar */}
          <div className="lg:w-1/3">
            <div className="sticky top-32 space-y-8">

              {/* Listen Links */}
              <div className="bg-white p-8 border border-gray-100 shadow-sm rounded-sm">
                <h4 className="font-serif text-xl mb-6 text-esti-dark">Posłuchaj odcinka</h4>
                <div className="flex flex-col gap-4">
                  <a
                    href={episode.links.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 border border-gray-200 hover:border-[#1DB954] hover:bg-[#1DB954]/5 transition-all group rounded-sm"
                  >
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-[#1DB954] group-hover:text-white transition-colors">
                      <Music size={20} />
                    </div>
                    <span className="font-medium text-esti-dark">Spotify</span>
                  </a>

                  <a
                    href={episode.links.apple}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 border border-gray-200 hover:border-[#872EC4] hover:bg-[#872EC4]/5 transition-all group rounded-sm"
                  >
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-[#872EC4] group-hover:text-white transition-colors">
                      <Podcast size={20} />
                    </div>
                    <span className="font-medium text-esti-dark">Apple Podcasts</span>
                  </a>

                  <a
                    href={episode.links.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 border border-gray-200 hover:border-[#FF0000] hover:bg-[#FF0000]/5 transition-all group rounded-sm"
                  >
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-[#FF0000] group-hover:text-white transition-colors">
                      <Youtube size={20} />
                    </div>
                    <span className="font-medium text-esti-dark">YouTube</span>
                  </a>
                </div>
              </div>

              {/* Guest */}
              {episode.guest && (
                <div className="bg-white p-6 border border-gray-100 shadow-sm rounded-sm">
                  <h4 className="font-serif text-lg mb-2 text-esti-dark">Gość odcinka</h4>
                  <p className="text-esti-taupe font-light">{episode.guest}</p>
                </div>
              )}

              {/* Topics */}
              {episode.topics && episode.topics.length > 0 && (
                <div className="bg-white p-6 border border-gray-100 shadow-sm rounded-sm">
                  <h4 className="font-serif text-lg mb-3 text-esti-dark">Tematy</h4>
                  <div className="flex flex-wrap gap-2">
                    {episode.topics.map(t => (
                      <span
                        key={t}
                        className="text-xs border border-esti-taupe/30 px-3 py-1 text-esti-taupe uppercase tracking-widest rounded-sm"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Share */}
              <div className="flex items-center justify-between p-6 bg-esti-beige/20 rounded-sm">
                <span className="font-sans text-sm font-bold uppercase tracking-widest text-esti-taupe">Udostępnij</span>
                <button
                  className="p-2 hover:bg-white rounded-full transition-colors"
                  onClick={() => {
                    const url = window.location.href;
                    if (navigator.share) {
                      navigator.share({ title: episode.title, url }).catch(console.error);
                    } else {
                      navigator.clipboard.writeText(url);
                      alert('Link skopiowany do schowka!');
                    }
                  }}
                >
                  <Share2 size={20} className="text-esti-dark" />
                </button>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default EpisodePage;
