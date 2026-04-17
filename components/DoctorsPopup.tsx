'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { X, ArrowRight, Lock } from 'lucide-react';

const STORAGE_KEY = 'doctors_popup_dismissed_at';
const DISMISS_DAYS = 7;
const DELAY_MS = 10_000;

export default function DoctorsPopup() {
  const [visible, setVisible] = useState(false);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      if (localStorage.getItem('doctors_access') === 'true') return;
      const dismissedAt = localStorage.getItem(STORAGE_KEY);
      if (dismissedAt) {
        const days = (Date.now() - Number(dismissedAt)) / (1000 * 60 * 60 * 24);
        if (days < DISMISS_DAYS) return;
      }
    } catch {
      /* localStorage unavailable */
    }

    const showTimer = setTimeout(() => {
      setVisible(true);
      requestAnimationFrame(() => setEntered(true));
    }, DELAY_MS);

    return () => clearTimeout(showTimer);
  }, []);

  const dismiss = () => {
    setEntered(false);
    try {
      localStorage.setItem(STORAGE_KEY, String(Date.now()));
    } catch {
      /* ignore */
    }
    setTimeout(() => setVisible(false), 400);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="EstiTalk for Doctors"
      className={`fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[60] w-[calc(100vw-2rem)] sm:w-[360px] max-w-sm transition-all duration-500 ease-out ${
        entered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
    >
      <div className="relative bg-zinc-950 text-white rounded-sm shadow-2xl overflow-hidden border border-white/10">
        <button
          type="button"
          onClick={dismiss}
          aria-label="Zamknij"
          className="absolute top-3 right-3 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/80 text-white/70 hover:text-white transition-colors backdrop-blur-sm"
        >
          <X size={16} />
        </button>

        <Link href="/for-doctors" className="block group">
          <div className="relative aspect-video w-full overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://res.cloudinary.com/dgcg6hz1d/image/upload/q_auto/f_auto/v1776412173/Kopia_Kopia_Kto_by_nie_chcia%C5%82_byc%CC%81_m%C5%82ody_pie%CC%A8kny_i_jeszcze_w_pe%C5%82ni_si%C5%82_1_uucrjb.png"
              alt="EstiTalk for Doctors"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
            <div className="absolute top-3 left-3 flex items-center gap-2 bg-esti-gold/15 border border-esti-gold/40 backdrop-blur-sm px-2.5 py-1 rounded-full">
              <Lock size={10} className="text-esti-gold" />
              <span className="text-esti-gold text-[9px] font-bold tracking-[0.2em] uppercase">
                For Doctors
              </span>
            </div>
          </div>
        </Link>

        <div className="px-5 pt-4 pb-5">
          <p className="text-esti-gold text-[9px] font-bold tracking-[0.2em] uppercase mb-2">
            Odcinek 1 · tylko dla lekarzy
          </p>
          <h3 className="font-serif text-lg leading-snug mb-2">
            Toksyna botulinowa{' '}
            <span className="text-esti-gold italic">od podstaw do praktyki</span>
          </h3>
          <p className="text-white/60 text-xs font-light leading-relaxed mb-4">
            Prawie godzina wiedzy klinicznej z dr hab. n. med. Joanną Czuwarą. Dostęp jednorazową
            płatnością, bez limitu czasu.
          </p>
          <Link
            href="/for-doctors"
            onClick={() => {
              try {
                localStorage.setItem(STORAGE_KEY, String(Date.now()));
              } catch {
                /* ignore */
              }
            }}
            className="group flex items-center justify-center gap-2 w-full bg-esti-gold text-esti-dark py-3 rounded-sm text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors"
          >
            <span>Kup dostęp</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
