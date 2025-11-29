import React from 'react';
import { Loader2 } from 'lucide-react';
import { useEpisodes } from '../hooks/useEpisodes';
import EpisodeCard from './EpisodeCard';
import { Episode } from '../types';

interface EpisodeListProps {
  onViewAll: () => void;
  onEpisodeClick?: (episode: Episode) => void;
}

const EpisodeList: React.FC<EpisodeListProps> = ({ onViewAll, onEpisodeClick }) => {
  const { episodes, loading } = useEpisodes();
  
  // Get only latest 3 episodes
  const latestEpisodes = episodes.slice(0, 3);

  return (
    <section id="latest-episodes" className="py-24 bg-esti-light relative overflow-hidden">
      {/* Decorative vertical line */}
      <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-esti-dark/5 hidden md:block"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20">
           <div className="bg-esti-light pr-8 relative z-20">
               <span className="text-xs font-bold tracking-[0.2em] text-esti-taupe uppercase mb-2 block">
                 Esti Talk
               </span>
               <h2 className="font-serif text-5xl text-esti-dark">Najnowsze Odcinki</h2>
           </div>
           
           <button 
             onClick={onViewAll}
             className="hidden md:inline-flex items-center gap-2 text-sm uppercase tracking-widest hover:text-esti-taupe transition-colors group bg-esti-light pl-8 relative z-20 cursor-pointer"
           >
             <span>Zobacz wszystkie</span>
             <span className="block w-8 h-px bg-current group-hover:w-12 transition-all"></span>
           </button>
        </div>

        {loading && (
            <div className="flex justify-center items-center py-20">
                <Loader2 className="animate-spin text-esti-taupe" size={40} />
            </div>
        )}

        {!loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
                {latestEpisodes.map((episode, index) => (
                    <EpisodeCard 
                      key={episode.id} 
                      episode={episode} 
                      index={index} 
                      layout="list" 
                      onClick={onEpisodeClick}
                    />
                ))}
            </div>
        )}
        
        {/* Mobile View All Link */}
        <div className="mt-20 text-center md:hidden">
            <button 
              onClick={onViewAll}
              className="inline-block border border-esti-dark px-10 py-4 text-xs uppercase tracking-widest hover:bg-esti-dark hover:text-white transition-all w-full md:w-auto"
            >
             Zobacz wszystkie odcinki
            </button>
        </div>
      </div>
    </section>
  );
};

export default EpisodeList;
