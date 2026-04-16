import Link from 'next/link';
import { Play, ArrowDown, ArrowRight } from 'lucide-react';

const VIDEO_BASE =
  'https://res.cloudinary.com/dgcg6hz1d/video/upload/q_auto/f_auto/v1776376142/Intro_EstiTalk_2_aq5btv';
const POSTER =
  'https://res.cloudinary.com/dgcg6hz1d/image/upload/q_auto,f_auto,so_0/v1776376142/Intro_EstiTalk_2_aq5btv.jpg';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-esti-dark">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={POSTER}
        aria-hidden="true"
      >
        <source src={`${VIDEO_BASE}.webm`} type="video/webm" />
        <source src={`${VIDEO_BASE}.mp4`} type="video/mp4" />
      </video>

      <div
        className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent pointer-events-none"
        aria-hidden="true"
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-2xl flex flex-col gap-6 animate-fade-in-up text-white [text-shadow:_0_2px_24px_rgb(0_0_0_/_40%)]">
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <span className="bg-white/15 backdrop-blur-sm border border-white/20 px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase text-white inline-block">
              Nowy sezon
            </span>
            <Link
              href="/for-doctors"
              className="group flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 hover:border-white/40 px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase text-white transition-all duration-300"
            >
              <Play size={10} fill="currentColor" />
              <span>For Doctors</span>
              <ArrowRight size={10} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <h1 className="font-serif text-6xl md:text-8xl leading-[0.9] text-white">
            Rozmowy <br />
            <span className="italic text-esti-beige">o pięknie</span> <br />
            i nauce.
          </h1>

          <p className="font-sans font-light text-lg md:text-xl text-white/85 max-w-md mt-4 leading-relaxed">
            Dr n. med. Tatiana Jasińska zaprasza do świata medycyny estetycznej, dermatologii i świadomej pielęgnacji.
            Bez tabu, z pasją i naukową precyzją.
          </p>

          <div className="flex flex-col sm:flex-row items-start gap-4 mt-8">
            <Link
              href="/#listen"
              className="group flex items-center gap-3 bg-white text-esti-dark px-8 py-4 rounded-sm hover:bg-esti-beige transition-all duration-300"
            >
              <Play size={16} fill="currentColor" className="group-hover:scale-110 transition-transform" />
              <span className="uppercase tracking-widest text-sm font-medium">Posłuchaj</span>
            </Link>
            <Link
              href="/odcinki"
              className="group flex items-center gap-2 py-4 text-sm uppercase tracking-widest font-medium text-white/80 hover:text-white transition-colors"
            >
              <span>Zobacz odcinki</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-white/70 hidden md:block z-10">
        <ArrowDown size={24} />
      </div>
    </section>
  );
}
