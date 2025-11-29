import React, { useEffect } from 'react';
import { ArrowLeft, Calendar, Share2, Music, Youtube, Podcast } from 'lucide-react';
import { Episode } from '../types';

interface EpisodePageProps {
  episode: Episode;
  onBack: () => void;
}

const EpisodePage: React.FC<EpisodePageProps> = ({ episode, onBack }) => {
  // Scroll to top when mounting
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Extract video ID from YouTube URL or guid if standard format
  const getEmbedUrl = (url: string, id: string) => {
    // If it's a playlist link (from fallback), we might need logic, 
    // but usually specific episodes have video IDs.
    // For the RSS feed items, the ID (guid) is usually the video ID or we can try to extract from link
    // However, Anchor RSS often doesn't give YouTube Video IDs directly.
    // If we have a YouTube specific link in the future, we use it.
    // For now, if the ID looks like a YouTube ID (11 chars), use it.
    // Otherwise search or just link out.
    
    // NOTE: Since the RSS feed doesn't guarantee a YouTube Video ID, 
    // and we are using a playlist link for the channel, embedding might be tricky 
    // without specific video IDs. 
    // However, if the `id` from `useEpisodes` (which comes from guid) is a youtube id, we use it.
    // Anchor GUIDs are usually not YT IDs.
    // For the purpose of this UI, if we can't embed, we show a cover image with a play button that links out.
    // IF we are using the fallback data, I used explicit IDs (01, 02...). 
    // Let's assume for this design we show the cover image mainly, 
    // unless we can detect a youtube video ID.
    
    return null; 
  };

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
           <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-gray-500 font-light text-sm">
              <div className="flex items-center gap-2">
                 <Calendar size={16} />
                 <span>{episode.duration}</span>
              </div>
              {/* Add more metadata if available */}
           </div>
        </div>

        {/* Media Player Area */}
        <div className="bg-white p-4 shadow-sm border border-gray-100 rounded-sm mb-12">
            {/* 
               Since we might not have a direct YouTube Embed ID from a generic RSS feed,
               we create a stylish wrapper that looks like a player or links to it.
               If we had the ID, we would use an iframe here.
            */}
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
                    className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300 cursor-pointer z-10"
                  >
                    <Youtube size={32} className="text-esti-dark ml-1" fill="currentColor" />
                  </a>
               </div>
               
               {/* Overlay info */}
               <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
                  <p className="font-sans text-xs uppercase tracking-widest opacity-80 mb-2">Oglądaj na YouTube</p>
               </div>
            </div>
        </div>

        {/* Content Layout */}
        <div className="flex flex-col lg:flex-row gap-16">
           
           {/* Main Description */}
           <div className="lg:w-2/3">
              <h3 className="font-serif text-2xl mb-6 text-esti-dark">O odcinku</h3>
              <div className="prose prose-stone max-w-none font-light leading-relaxed text-gray-700">
                 <p className="whitespace-pre-line text-lg">{episode.description}</p>
              </div>
           </div>

           {/* Sidebar */}
           <div className="lg:w-1/3">
              <div className="sticky top-32 space-y-8">
                 
                 {/* Listen Links Box */}
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

                 {/* Share */}
                 <div className="flex items-center justify-between p-6 bg-esti-beige/20 rounded-sm">
                    <span className="font-sans text-sm font-bold uppercase tracking-widest text-esti-taupe">Udostępnij</span>
                    <button 
                      className="p-2 hover:bg-white rounded-full transition-colors"
                      onClick={() => {
                        if (navigator.share) {
                          navigator.share({
                            title: episode.title,
                            text: episode.description,
                            url: window.location.href,
                          }).catch(console.error);
                        } else {
                           // Fallback or alert
                           alert('Link skopiowany do schowka!');
                           navigator.clipboard.writeText(window.location.href);
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
