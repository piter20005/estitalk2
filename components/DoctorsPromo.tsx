import Link from 'next/link';
import { Lock, ArrowRight, CheckCircle } from 'lucide-react';

const HIGHLIGHTS = [
  'Mechanizm działania toksyny botulinowej na poziomie molekularnym',
  'Punkty wstrzyknięć i dawkowanie w praktyce klinicznej',
  'Powikłania i postępowanie w nagłych przypadkach',
  'Łączenie z innymi zabiegami — protokoły kombinowane',
];

export default function DoctorsPromo() {
  return (
    <section className="bg-zinc-950 py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-14">
          <span className="text-esti-gold text-[10px] font-bold tracking-[0.3em] uppercase">
            EstiTalk for Doctors · Odcinek 1
          </span>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          <div className="w-full lg:w-5/12 shrink-0">
            <Link
              href="/for-doctors"
              className="relative w-full aspect-video rounded-sm overflow-hidden group block"
              aria-label="Przejdź do odcinka For Doctors"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://res.cloudinary.com/dgcg6hz1d/image/upload/q_auto/f_auto/v1776275435/IMG_1118_xhskkm.jpg"
                alt="EstiTalk for Doctors — nagranie"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/65 group-hover:bg-black/55 transition-colors duration-300" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-10">
                <div className="w-16 h-16 rounded-full border border-esti-gold/50 flex items-center justify-center bg-esti-gold/10 group-hover:bg-esti-gold/25 group-hover:border-esti-gold/80 transition-all duration-300">
                  <Lock size={24} className="text-esti-gold" />
                </div>
                <span className="text-white/50 text-xs uppercase tracking-widest font-medium group-hover:text-white/70 transition-colors">
                  Kup dostęp, aby odblokować
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/80 to-transparent z-10">
                <p className="text-esti-gold text-[10px] font-bold tracking-[0.2em] uppercase">EstiTalk for Doctors</p>
                <p className="text-white/80 text-sm font-light mt-1">dr hab. n. med. Joanna Czuwara</p>
              </div>
            </Link>
          </div>

          <div className="flex-1 text-white">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white mb-6 leading-tight">
              Toksyna botulinowa<br />
              <span className="text-esti-gold italic">od podstaw do praktyki</span>
            </h2>

            <p className="text-white/60 font-light leading-relaxed mb-8 text-base md:text-lg max-w-lg">
              Wiedza, której nie znajdziesz w standardowych szkoleniach. Dr hab. Joanna Czuwara, Kierownik Kliniki
              Dermatologii WUM, dzieli się doświadczeniem klinicznym przeznaczonym wyłącznie dla lekarzy.
            </p>

            <ul className="space-y-3 mb-10">
              {HIGHLIGHTS.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-white/70">
                  <CheckCircle size={16} className="text-esti-gold mt-0.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/for-doctors"
                className="group flex items-center justify-center gap-3 bg-esti-gold text-white px-8 py-4 rounded-sm hover:bg-esti-gold/80 transition-all duration-300 text-sm font-bold uppercase tracking-widest"
              >
                <span>Kup dostęp</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/for-doctors"
                className="flex items-center justify-center gap-2 px-8 py-4 border border-white/20 rounded-sm text-white/60 hover:text-white hover:border-white/40 transition-all duration-300 text-sm uppercase tracking-widest"
              >
                Dowiedz się więcej
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
