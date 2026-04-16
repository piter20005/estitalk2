'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Search, X } from 'lucide-react';
import GuestCard from './GuestCard';
import type { Guest } from '@/types';

interface AllGuestsProps {
  guests: (Guest & { episodeCount?: number })[];
}

export default function AllGuests({ guests }: AllGuestsProps) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    if (!query.trim()) return guests;
    const q = query.toLowerCase();
    return guests.filter(
      (g) =>
        g.name.toLowerCase().includes(q) ||
        (g.profession?.toLowerCase().includes(q) ?? false) ||
        (g.shortBio?.toLowerCase().includes(q) ?? false)
    );
  }, [guests, query]);

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
          <h1 className="font-serif text-5xl md:text-6xl text-esti-dark mb-6">Goście EstiTalk</h1>
          <p className="text-gray-600 font-light max-w-xl">
            Specjaliści, eksperci i autorytety. Poznaj osoby, które zasiadły w fotelu gościa EstiTalk.
          </p>
        </div>

        <div className="mb-12">
          <div className="relative max-w-2xl group">
            <Search
              className="absolute left-0 top-1/2 -translate-y-1/2 text-esti-taupe group-focus-within:text-esti-dark transition-colors"
              size={20}
            />
            <input
              type="text"
              placeholder="Szukaj po imieniu, profesji…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-9 pr-10 py-3 border-b border-esti-beige focus:border-esti-dark bg-transparent outline-none text-base md:text-lg font-light transition-colors"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-esti-taupe hover:text-esti-dark transition-colors"
                aria-label="Wyczyść wyszukiwanie"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-serif text-2xl text-esti-dark mb-2">Brak gości</p>
            <p className="text-gray-500 text-sm font-light">
              {query ? 'Spróbuj zmienić zapytanie.' : 'Dodaj pierwszego gościa w Sanity Studio (/studio).'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filtered.map((g) => (
              <GuestCard key={g._id} guest={g} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
