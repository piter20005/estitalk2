'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Search, ChevronDown, Filter, ArrowLeft } from 'lucide-react';
import EpisodeCard from './EpisodeCard';
import type { Episode } from '@/types';

interface AllEpisodesProps {
  episodes: Episode[];
}

export default function AllEpisodes({ episodes }: AllEpisodesProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  const [selectedSeason, setSelectedSeason] = useState<number | 'all'>('all');
  const [selectedGuest, setSelectedGuest] = useState<string | 'all'>('all');
  const [selectedTopic, setSelectedTopic] = useState<string | 'all'>('all');

  const filteredEpisodes = useMemo(() => {
    let result = [...episodes];

    if (selectedSeason !== 'all') {
      result = result.filter((ep) => ep.season === selectedSeason);
    }

    if (selectedGuest !== 'all') {
      result = result.filter((ep) => ep.guests?.some((g) => g.slug === selectedGuest));
    }

    if (selectedTopic !== 'all') {
      result = result.filter((ep) => ep.topics?.some((t) => t.slug === selectedTopic));
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter((ep) => {
        return (
          ep.title.toLowerCase().includes(q) ||
          (ep.description?.toLowerCase().includes(q) ?? false) ||
          ep.guests?.some((g) => g.name.toLowerCase().includes(q)) ||
          ep.topics?.some((t) => t.name.toLowerCase().includes(q))
        );
      });
    }

    result.sort((a, b) => {
      const dateA = a.publishDate ? new Date(a.publishDate).getTime() : 0;
      const dateB = b.publishDate ? new Date(b.publishDate).getTime() : 0;
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });

    return result;
  }, [episodes, searchQuery, sortOrder, selectedSeason, selectedGuest, selectedTopic]);

  const availableSeasons = useMemo(() => {
    const s = new Set<number>();
    episodes.forEach((ep) => ep.season != null && s.add(ep.season));
    return Array.from(s).sort((a, b) => a - b);
  }, [episodes]);

  const availableGuests = useMemo(() => {
    const m = new Map<string, string>();
    episodes.forEach((ep) => ep.guests?.forEach((g) => m.set(g.slug, g.name)));
    return Array.from(m.entries()).sort((a, b) => a[1].localeCompare(b[1], 'pl'));
  }, [episodes]);

  const availableTopics = useMemo(() => {
    const m = new Map<string, string>();
    episodes.forEach((ep) => ep.topics?.forEach((t) => m.set(t.slug, t.name)));
    return Array.from(m.entries()).sort((a, b) => a[1].localeCompare(b[1], 'pl'));
  }, [episodes]);

  const hasFilters = searchQuery || selectedSeason !== 'all' || selectedGuest !== 'all' || selectedTopic !== 'all';

  return (
    <div className="min-h-screen bg-esti-light pt-24 pb-20">
      <div className="container mx-auto px-6">
        <div className="mb-12">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs uppercase tracking-widest text-esti-taupe hover:text-esti-dark mb-6 transition-colors"
          >
            <ArrowLeft size={16} /> Wróć do strony głównej
          </Link>
          <h1 className="font-serif text-5xl md:text-6xl text-esti-dark mb-6">Wszystkie odcinki</h1>
          <p className="text-gray-600 font-light max-w-xl">
            Przeglądaj archiwum naszych rozmów o pięknie, zdrowiu i nauce. Znajdź temat, który Cię interesuje.
          </p>
        </div>

        <div className="bg-white p-6 shadow-sm rounded-sm mb-12 sticky top-24 z-30 border border-gray-100">
          <div className="flex flex-col gap-4">
            <div className="relative w-full group">
              <Search
                className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-esti-dark transition-colors"
                size={20}
              />
              <input
                type="text"
                placeholder="Szukaj po tytule, opisie, gościu, temacie…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-4 py-2 border-b border-gray-200 outline-none focus:border-esti-dark bg-transparent transition-all font-sans"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              <SelectField icon={<Filter size={16} />} value={selectedSeason} onChange={(v) => setSelectedSeason(v === 'all' ? 'all' : Number(v))}>
                <option value="all">Wszystkie sezony</option>
                {availableSeasons.map((s) => (
                  <option key={s} value={s}>
                    Sezon {s}
                  </option>
                ))}
              </SelectField>

              <SelectField value={selectedGuest} onChange={(v) => setSelectedGuest(v)}>
                <option value="all">Wszyscy goście</option>
                {availableGuests.map(([slug, name]) => (
                  <option key={slug} value={slug}>
                    {name}
                  </option>
                ))}
              </SelectField>

              <SelectField value={selectedTopic} onChange={(v) => setSelectedTopic(v)}>
                <option value="all">Wszystkie tematy</option>
                {availableTopics.map(([slug, name]) => (
                  <option key={slug} value={slug}>
                    {name}
                  </option>
                ))}
              </SelectField>

              <SelectField value={sortOrder} onChange={(v) => setSortOrder(v as 'newest' | 'oldest')}>
                <option value="newest">Najnowsze</option>
                <option value="oldest">Najstarsze</option>
              </SelectField>
            </div>

            {hasFilters && (
              <div className="flex items-center justify-between text-xs text-esti-taupe">
                <span>
                  Znaleziono <strong>{filteredEpisodes.length}</strong> {pluralizeEpisodes(filteredEpisodes.length)}
                </span>
                <button
                  className="underline hover:text-esti-dark"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedSeason('all');
                    setSelectedGuest('all');
                    setSelectedTopic('all');
                  }}
                >
                  Wyczyść filtry
                </button>
              </div>
            )}
          </div>
        </div>

        {filteredEpisodes.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-serif text-2xl text-esti-dark mb-2">Brak wyników</p>
            <p className="text-gray-500">Spróbuj zmienić kryteria wyszukiwania.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-12">
            {filteredEpisodes.map((episode, index) => (
              <div key={episode._id} className="h-full">
                <EpisodeCard episode={episode} index={index} layout="grid" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function SelectField({
  value,
  onChange,
  children,
  icon,
}: {
  value: string | number;
  onChange: (value: string) => void;
  children: React.ReactNode;
  icon?: React.ReactNode;
}) {
  return (
    <div className="relative">
      {icon && <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">{icon}</div>}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full ${icon ? 'pl-10' : 'pl-4'} pr-8 py-3 bg-gray-50 border border-gray-200 rounded-sm text-sm appearance-none focus:outline-none focus:border-esti-taupe cursor-pointer`}
      >
        {children}
      </select>
      <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
    </div>
  );
}

function pluralizeEpisodes(n: number): string {
  if (n === 1) return 'odcinek';
  const lastTwo = n % 100;
  const last = n % 10;
  if (lastTwo >= 12 && lastTwo <= 14) return 'odcinków';
  if (last >= 2 && last <= 4) return 'odcinki';
  return 'odcinków';
}
