'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import GuestCard from './GuestCard';
import type { Guest } from '@/types';

interface GuestsSliderProps {
  guests: (Guest & { episodeCount?: number })[];
}

export default function GuestsSlider({ guests }: GuestsSliderProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);
    return () => {
      el.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, [updateScrollState, guests.length]);

  const scrollByCards = (direction: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const firstCard = el.querySelector<HTMLElement>('[data-guest-card]');
    const step = firstCard
      ? firstCard.offsetWidth + 32 // card width + gap-8
      : el.clientWidth * 0.8;
    el.scrollBy({ left: direction * step, behavior: 'smooth' });
  };

  if (!guests.length) return null;

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <span className="text-xs font-bold tracking-[0.2em] text-esti-gold uppercase mb-3 block">
              Goście
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-esti-dark">
              Eksperci przy mikrofonie
            </h2>
            <p className="text-esti-taupe font-light text-lg max-w-xl mt-4">
              Specjaliści, eksperci i autorytety, którzy zasiedli w fotelu gościa EstiTalk.
            </p>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => scrollByCards(-1)}
                disabled={!canScrollLeft}
                aria-label="Poprzedni gość"
                className="w-11 h-11 border border-esti-dark/20 flex items-center justify-center hover:bg-esti-dark hover:text-white hover:border-esti-dark transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-inherit"
              >
                <ArrowLeft size={18} />
              </button>
              <button
                type="button"
                onClick={() => scrollByCards(1)}
                disabled={!canScrollRight}
                aria-label="Następny gość"
                className="w-11 h-11 border border-esti-dark/20 flex items-center justify-center hover:bg-esti-dark hover:text-white hover:border-esti-dark transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-inherit"
              >
                <ArrowRight size={18} />
              </button>
            </div>

            <Link
              href="/goscie"
              className="hidden md:inline-flex items-center gap-2 text-sm uppercase tracking-widest hover:text-esti-taupe transition-colors group"
            >
              <span>Zobacz wszystkich</span>
              <span className="block w-8 h-px bg-current group-hover:w-12 transition-all" />
            </Link>
          </div>
        </div>

        <div
          ref={scrollerRef}
          className="no-scrollbar flex gap-8 overflow-x-auto snap-x snap-mandatory -mx-6 px-6 pb-2"
        >
          {guests.map((g) => (
            <div
              key={g._id}
              data-guest-card
              className="snap-start shrink-0 w-[75vw] sm:w-[45vw] md:w-[32vw] lg:w-[23vw] xl:w-[260px]"
            >
              <GuestCard guest={g} />
            </div>
          ))}
        </div>

        <div className="mt-12 text-center md:hidden">
          <Link
            href="/goscie"
            className="inline-block border border-esti-dark px-10 py-4 text-xs uppercase tracking-widest hover:bg-esti-dark hover:text-white transition-all w-full"
          >
            Zobacz wszystkich gości
          </Link>
        </div>
      </div>
    </section>
  );
}
