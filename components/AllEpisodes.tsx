import React, { useState, useMemo, useEffect } from 'react';
import { Search, ChevronDown, Filter, Loader2, ArrowLeft } from 'lucide-react';
import { useEpisodes } from '../hooks/useEpisodes';
import EpisodeCard from './EpisodeCard';
import { Episode } from '../types';

interface AllEpisodesProps {
  onBack: () => void;
  onEpisodeClick?: (episode: Episode) => void;
  pendingEpisodeId?: string | null;
  onPendingResolved?: () => void;
}

const AllEpisodes: React.FC<AllEpisodesProps> = ({ onBack, onEpisodeClick, pendingEpisodeId, onPendingResolved }) => {
  const { episodes, loading } = useEpisodes();

  // Auto-open episode from direct URL link
  useEffect(() => {
    if (pendingEpisodeId && episodes.length > 0 && onEpisodeClick) {
      const episode = episodes.find(e => e.id === pendingEpisodeId);
      if (episode) {
        onEpisodeClick(episode);
        onPendingResolved?.();
      }
    }
  }, [pendingEpisodeId, episodes]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  const [selectedSeason, setSelectedSeason] = useState<number | 'all'>('all');

  const filteredEpisodes = useMemo(() => {
    let result = [...episodes];

    // Filter by season
    if (selectedSeason !== 'all') {
      result = result.filter(ep => ep.season === selectedSeason);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(ep => 
        ep.title.toLowerCase().includes(query) || 
        ep.description.toLowerCase().includes(query)
      );
    }

    // Sort
    result.sort((a, b) => {
      const dateA = a.publishDate.getTime();
      const dateB = b.publishDate.getTime();
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });

    return result;
  }, [episodes, searchQuery, sortOrder, selectedSeason]);

  // Determine available seasons
  const availableSeasons = useMemo(() => {
     const seasons = new Set(episodes.map(ep => ep.season || 1));
     return Array.from(seasons).sort();
  }, [episodes]);

  return (
    <div className="min-h-screen bg-esti-light pt-24 pb-20">
      <div className="container mx-auto px-6">
        
        {/* Header Section */}
        <div className="mb-12">
           <button 
             onClick={onBack}
             className="flex items-center gap-2 text-xs uppercase tracking-widest text-esti-taupe hover:text-esti-dark mb-6 transition-colors"
           >
             <ArrowLeft size={16} /> Wróć do strony głównej
           </button>
           <h1 className="font-serif text-5xl md:text-6xl text-esti-dark mb-6">Wszystkie Odcinki</h1>
           <p className="text-gray-600 font-light max-w-xl">
             Przeglądaj archiwum naszych rozmów o pięknie, zdrowiu i nauce.
             Znajdź temat, który Cię interesuje.
           </p>
        </div>

        {/* Filters Bar */}
        <div className="bg-white p-6 shadow-sm rounded-sm mb-12 sticky top-24 z-30 border border-gray-100">
           <div className="flex flex-col lg:flex-row gap-6 justify-between items-center">
              
              {/* Search */}
              <div className="relative w-full lg:w-1/3 group">
                 <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-esti-dark transition-colors" size={20} />
                 <input 
                   type="text" 
                   placeholder="Szukaj odcinka..." 
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                   className="w-full pl-8 pr-4 py-2 border-b border-gray-200 outline-none focus:border-esti-dark bg-transparent transition-all font-sans"
                 />
              </div>

              {/* Filters Group */}
              <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                 {/* Season Filter */}
                 <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                       <Filter size={16} className="text-gray-400" />
                    </div>
                    <select 
                      value={selectedSeason}
                      onChange={(e) => setSelectedSeason(e.target.value === 'all' ? 'all' : Number(e.target.value))}
                      className="w-full sm:w-40 pl-10 pr-8 py-3 bg-gray-50 border border-gray-200 rounded-sm text-sm appearance-none focus:outline-none focus:border-esti-taupe cursor-pointer"
                    >
                       <option value="all">Wszystkie Sezony</option>
                       {availableSeasons.map(season => (
                          <option key={season} value={season}>Sezon {season}</option>
                       ))}
                    </select>
                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                 </div>

                 {/* Sort Filter */}
                 <div className="relative">
                    <select 
                      value={sortOrder}
                      onChange={(e) => setSortOrder(e.target.value as 'newest' | 'oldest')}
                      className="w-full sm:w-40 pl-4 pr-8 py-3 bg-gray-50 border border-gray-200 rounded-sm text-sm appearance-none focus:outline-none focus:border-esti-taupe cursor-pointer"
                    >
                       <option value="newest">Najnowsze</option>
                       <option value="oldest">Najstarsze</option>
                    </select>
                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                 </div>
              </div>
           </div>
        </div>

        {/* Content */}
        {loading ? (
           <div className="flex justify-center items-center py-32">
              <Loader2 className="animate-spin text-esti-taupe" size={48} />
           </div>
        ) : error && episodes.length === 0 ? (
           <div className="text-center py-24">
              <p className="font-serif text-2xl text-esti-dark mb-2">Nie udało się załadować odcinków</p>
              <p className="text-esti-taupe font-light mb-8">Sprawdź połączenie z internetem i spróbuj ponownie.</p>
              <button
                onClick={() => window.location.reload()}
                className="text-xs uppercase tracking-widest border border-esti-dark px-8 py-4 hover:bg-esti-dark hover:text-white transition-all"
              >
                Odśwież stronę
              </button>
           </div>
        ) : filteredEpisodes.length === 0 ? (
           <div className="text-center py-20">
              <p className="font-serif text-2xl text-esti-dark mb-2">Brak wyników</p>
              <p className="text-gray-500">Spróbuj zmienić kryteria wyszukiwania.</p>
              <button
                onClick={() => {setSearchQuery(''); setSelectedSeason('all');}}
                className="mt-6 text-sm underline text-esti-taupe hover:text-esti-dark"
              >
                Wyczyść filtry
              </button>
           </div>
        ) : (
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-12">
              {filteredEpisodes.map((episode, index) => (
                 <div key={episode.id} className="h-full">
                    <EpisodeCard 
                       episode={episode} 
                       index={index} 
                       layout="grid" 
                       onClick={onEpisodeClick}
                    />
                 </div>
              ))}
           </div>
        )}

      </div>
    </div>
  );
};

export default AllEpisodes;
