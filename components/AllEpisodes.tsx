'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { Search, ChevronDown, ArrowLeft, SlidersHorizontal, X } from 'lucide-react';
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
  const [moreFiltersOpen, setMoreFiltersOpen] = useState(false);

  const compactBarVisible = useCompactBarVisibility();

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

  const hasFilters =
    searchQuery.trim() !== '' ||
    selectedSeason !== 'all' ||
    selectedGuest !== 'all' ||
    selectedTopic !== 'all';

  const clearAll = () => {
    setSearchQuery('');
    setSelectedSeason('all');
    setSelectedGuest('all');
    setSelectedTopic('all');
  };

  return (
    <div className="min-h-screen bg-esti-light pt-24 pb-24">
      {/* Compact auto-hide bar */}
      <div
        className={`fixed top-20 left-0 right-0 z-30 transition-all duration-300 ease-out ${
          compactBarVisible
            ? 'translate-y-0 opacity-100 pointer-events-auto'
            : '-translate-y-full opacity-0 pointer-events-none'
        }`}
        aria-hidden={!compactBarVisible}
      >
        <div className="bg-esti-light/85 backdrop-blur-md border-b border-esti-beige/60 shadow-sm">
          <div className="container mx-auto px-6 py-3 flex items-center gap-4">
            <div className="relative flex-shrink-0 w-full max-w-xs hidden sm:block">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-esti-taupe"
                size={16}
              />
              <input
                type="text"
                placeholder="Szukaj…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm bg-white/70 border border-esti-beige/70 rounded-full outline-none focus:border-esti-dark transition-colors"
              />
            </div>

            <div className="flex-1 min-w-0 overflow-x-auto no-scrollbar">
              <SeasonPills
                seasons={availableSeasons}
                selected={selectedSeason}
                onChange={setSelectedSeason}
                size="sm"
              />
            </div>

            <div className="flex-shrink-0 hidden md:block">
              <SortToggle value={sortOrder} onChange={setSortOrder} size="sm" />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6">
        {/* Hero */}
        <div className="mb-10 md:mb-14">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-esti-taupe hover:text-esti-dark mb-8 transition-colors"
          >
            <ArrowLeft size={16} /> Wróć do strony głównej
          </Link>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-esti-dark mb-6 leading-tight">
            Wszystkie odcinki
          </h1>
          <p className="text-gray-600 font-light max-w-xl text-base md:text-lg leading-relaxed mb-6">
            Przeglądaj archiwum naszych rozmów o pięknie, zdrowiu i nauce. Znajdź temat, który Cię
            interesuje.
          </p>
          <p className="text-xs uppercase tracking-[0.25em] text-esti-taupe">
            {episodes.length} {pluralizeEpisodes(episodes.length)}
            {availableSeasons.length > 0 && (
              <>
                {' · '}
                {availableSeasons.length} {pluralizeSeasons(availableSeasons.length)}
              </>
            )}
          </p>
        </div>

        <div className="h-px bg-esti-beige/60 mb-10" />

        {/* Static filter section */}
        <div className="mb-14 space-y-8">
          {/* Search */}
          <div className="relative max-w-2xl group">
            <Search
              className="absolute left-0 top-1/2 -translate-y-1/2 text-esti-taupe group-focus-within:text-esti-dark transition-colors"
              size={20}
            />
            <input
              type="text"
              placeholder="Szukaj po tytule, opisie, gościu, temacie…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-10 py-3 border-b border-esti-beige focus:border-esti-dark bg-transparent outline-none text-base md:text-lg font-light transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-esti-taupe hover:text-esti-dark transition-colors"
                aria-label="Wyczyść wyszukiwanie"
              >
                <X size={18} />
              </button>
            )}
          </div>

          {/* Pills + sort row */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
            <div className="overflow-x-auto no-scrollbar -mx-6 px-6 lg:mx-0 lg:px-0">
              <SeasonPills
                seasons={availableSeasons}
                selected={selectedSeason}
                onChange={setSelectedSeason}
              />
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <span className="text-xs uppercase tracking-widest text-esti-taupe hidden md:inline">
                Sortuj
              </span>
              <SortToggle value={sortOrder} onChange={setSortOrder} />
            </div>
          </div>

          {/* More filters (collapsible) */}
          {(availableGuests.length > 0 || availableTopics.length > 0) && (
            <div className="border-t border-esti-beige/60 pt-5">
              <button
                type="button"
                onClick={() => setMoreFiltersOpen((v) => !v)}
                className="flex items-center gap-2 text-xs uppercase tracking-widest text-esti-taupe hover:text-esti-dark transition-colors"
                aria-expanded={moreFiltersOpen}
              >
                <SlidersHorizontal size={14} />
                Więcej filtrów
                <ChevronDown
                  size={14}
                  className={`transition-transform ${moreFiltersOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {moreFiltersOpen && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5 animate-fade-in-up">
                  {availableGuests.length > 0 && (
                    <SelectField
                      label="Gość"
                      value={selectedGuest}
                      onChange={(v) => setSelectedGuest(v)}
                    >
                      <option value="all">Wszyscy goście</option>
                      {availableGuests.map(([slug, name]) => (
                        <option key={slug} value={slug}>
                          {name}
                        </option>
                      ))}
                    </SelectField>
                  )}

                  {availableTopics.length > 0 && (
                    <SelectField
                      label="Temat"
                      value={selectedTopic}
                      onChange={(v) => setSelectedTopic(v)}
                    >
                      <option value="all">Wszystkie tematy</option>
                      {availableTopics.map(([slug, name]) => (
                        <option key={slug} value={slug}>
                          {name}
                        </option>
                      ))}
                    </SelectField>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Result summary */}
          {hasFilters && (
            <div className="flex items-center justify-between text-xs uppercase tracking-widest text-esti-taupe">
              <span>
                Znaleziono <strong className="text-esti-dark">{filteredEpisodes.length}</strong>{' '}
                {pluralizeEpisodes(filteredEpisodes.length)}
              </span>
              <button
                type="button"
                onClick={clearAll}
                className="inline-flex items-center gap-1.5 underline decoration-esti-beige underline-offset-4 hover:text-esti-dark hover:decoration-esti-dark transition-colors"
              >
                <X size={12} />
                Wyczyść filtry
              </button>
            </div>
          )}
        </div>

        {/* Episodes */}
        {filteredEpisodes.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-serif text-3xl text-esti-dark mb-3">Brak wyników</p>
            <p className="text-gray-500 font-light mb-6">
              Spróbuj zmienić kryteria wyszukiwania lub wyczyść wszystkie filtry.
            </p>
            <button
              type="button"
              onClick={clearAll}
              className="inline-flex items-center gap-2 px-6 py-2.5 border border-esti-dark rounded-full text-xs uppercase tracking-widest hover:bg-esti-dark hover:text-esti-light transition-colors"
            >
              Wyczyść filtry
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 gap-y-14 lg:gap-y-16">
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

function SeasonPills({
  seasons,
  selected,
  onChange,
  size = 'md',
}: {
  seasons: number[];
  selected: number | 'all';
  onChange: (v: number | 'all') => void;
  size?: 'sm' | 'md';
}) {
  const padding = size === 'sm' ? 'px-4 py-1.5' : 'px-5 py-2';
  const text = size === 'sm' ? 'text-[11px]' : 'text-xs';

  return (
    <div className="flex items-center gap-2 whitespace-nowrap">
      <Pill active={selected === 'all'} onClick={() => onChange('all')} padding={padding} text={text}>
        Wszystkie
      </Pill>
      {seasons.map((s) => (
        <Pill
          key={s}
          active={selected === s}
          onClick={() => onChange(s)}
          padding={padding}
          text={text}
        >
          Sezon {s}
        </Pill>
      ))}
    </div>
  );
}

function Pill({
  active,
  onClick,
  children,
  padding,
  text,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  padding: string;
  text: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`${padding} ${text} uppercase tracking-widest font-sans rounded-full border transition-colors ${
        active
          ? 'bg-esti-dark text-esti-light border-esti-dark'
          : 'bg-transparent text-esti-dark border-esti-beige hover:bg-esti-beige/30 hover:border-esti-taupe'
      }`}
    >
      {children}
    </button>
  );
}

function SortToggle({
  value,
  onChange,
  size = 'md',
}: {
  value: 'newest' | 'oldest';
  onChange: (v: 'newest' | 'oldest') => void;
  size?: 'sm' | 'md';
}) {
  const padding = size === 'sm' ? 'px-3 py-1.5' : 'px-4 py-2';
  const text = size === 'sm' ? 'text-[11px]' : 'text-xs';

  const baseBtn = `${padding} ${text} uppercase tracking-widest font-sans transition-colors`;

  return (
    <div className="inline-flex border border-esti-beige rounded-full overflow-hidden" role="group">
      <button
        type="button"
        onClick={() => onChange('newest')}
        aria-pressed={value === 'newest'}
        className={`${baseBtn} ${
          value === 'newest'
            ? 'bg-esti-dark text-esti-light'
            : 'bg-transparent text-esti-dark hover:bg-esti-beige/30'
        }`}
      >
        Najnowsze
      </button>
      <button
        type="button"
        onClick={() => onChange('oldest')}
        aria-pressed={value === 'oldest'}
        className={`${baseBtn} ${
          value === 'oldest'
            ? 'bg-esti-dark text-esti-light'
            : 'bg-transparent text-esti-dark hover:bg-esti-beige/30'
        }`}
      >
        Najstarsze
      </button>
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  children,
}: {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-[11px] uppercase tracking-widest text-esti-taupe mb-2">
        {label}
      </span>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-4 pr-10 py-3 bg-white/60 border border-esti-beige rounded-sm text-sm appearance-none focus:outline-none focus:border-esti-dark cursor-pointer transition-colors"
        >
          {children}
        </select>
        <ChevronDown
          size={14}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-esti-taupe pointer-events-none"
        />
      </div>
    </label>
  );
}

function useCompactBarVisibility(threshold = 400) {
  const [visible, setVisible] = useState(false);
  const lastYRef = useRef(0);

  useEffect(() => {
    lastYRef.current = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      const goingUp = y < lastYRef.current;
      lastYRef.current = y;

      if (y < threshold) {
        setVisible(false);
      } else if (goingUp) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return visible;
}

function pluralizeEpisodes(n: number): string {
  if (n === 1) return 'odcinek';
  const lastTwo = n % 100;
  const last = n % 10;
  if (lastTwo >= 12 && lastTwo <= 14) return 'odcinków';
  if (last >= 2 && last <= 4) return 'odcinki';
  return 'odcinków';
}

function pluralizeSeasons(n: number): string {
  if (n === 1) return 'sezon';
  const lastTwo = n % 100;
  const last = n % 10;
  if (lastTwo >= 12 && lastTwo <= 14) return 'sezonów';
  if (last >= 2 && last <= 4) return 'sezony';
  return 'sezonów';
}
