import React from 'react';
import { Lock, ArrowRight, CheckCircle } from 'lucide-react';

interface DoctorsPromoProps {
  onNavigate: (view: 'home' | 'episodes' | 'doctors') => void;
}

const DoctorsPromo: React.FC<DoctorsPromoProps> = ({ onNavigate }) => {
  const highlights = [
    'Mechanizm działania toksyny botulinowej na poziomie molekularnym',
    'Punkty wstrzyknięć i dawkowanie w praktyce klinicznej',
    'Powikłania i postępowanie w nagłych przypadkach',
    'Łączenie z innymi zabiegami — protokoły kombinowane',
  ];

  return (
    <section className="bg-zinc-950 py-24">
      <div className="container mx-auto px-6">

        {/* Label */}
        <div className="text-center mb-14">
          <span className="text-esti-gold text-[10px] font-bold tracking-[0.3em] uppercase">
            EstiTalk for Doctors · Odcinek 1
          </span>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">

          {/* Left — locked thumbnail */}
          <div className="w-full lg:w-5/12 shrink-0">
            <button
              onClick={() => onNavigate('doctors')}
              className="relative w-full aspect-video bg-zinc-900 rounded-sm overflow-hidden group block"
              aria-label="Przejdź do odcinka For Doctors"
            >
              {/* Background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-950" />

              {/* Decorative lines */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-1/4 left-0 right-0 h-px bg-esti-gold" />
                <div className="absolute top-3/4 left-0 right-0 h-px bg-esti-gold" />
                <div className="absolute left-1/4 top-0 bottom-0 w-px bg-esti-gold" />
                <div className="absolute left-3/4 top-0 bottom-0 w-px bg-esti-gold" />
              </div>

              {/* Lock icon */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                <div className="w-16 h-16 rounded-full border border-esti-gold/40 flex items-center justify-center bg-esti-gold/10 group-hover:bg-esti-gold/20 group-hover:border-esti-gold/70 transition-all duration-300">
                  <Lock size={24} className="text-esti-gold" />
                </div>
                <span className="text-white/40 text-xs uppercase tracking-widest font-medium group-hover:text-white/60 transition-colors">
                  Kup dostęp, aby odblokować
                </span>
              </div>

              {/* Bottom label */}
              <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-esti-gold text-[10px] font-bold tracking-[0.2em] uppercase">
                  EstiTalk for Doctors
                </p>
                <p className="text-white/80 text-sm font-light mt-1">
                  dr hab. n. med. Joanna Czuwara
                </p>
              </div>
            </button>
          </div>

          {/* Right — content */}
          <div className="flex-1 text-white">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white mb-6 leading-tight">
              Toksyna botulinowa<br />
              <span className="text-esti-gold italic">od podstaw do praktyki</span>
            </h2>

            <p className="text-white/60 font-light leading-relaxed mb-8 text-base md:text-lg max-w-lg">
              Wiedza, której nie znajdziesz w standardowych szkoleniach. Dr hab. Joanna Czuwara, Kierownik Kliniki Dermatologii WUM, dzieli się doświadczeniem klinicznym przeznaczonym wyłącznie dla lekarzy.
            </p>

            <ul className="space-y-3 mb-10">
              {highlights.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-white/70">
                  <CheckCircle size={16} className="text-esti-gold mt-0.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => onNavigate('doctors')}
                className="group flex items-center justify-center gap-3 bg-esti-gold text-white px-8 py-4 rounded-sm hover:bg-esti-gold/80 transition-all duration-300 text-sm font-bold uppercase tracking-widest"
              >
                <span>Kup dostęp</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => onNavigate('doctors')}
                className="flex items-center justify-center gap-2 px-8 py-4 border border-white/20 rounded-sm text-white/60 hover:text-white hover:border-white/40 transition-all duration-300 text-sm uppercase tracking-widest"
              >
                Dowiedz się więcej
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default DoctorsPromo;
