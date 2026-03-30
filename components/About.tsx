import React from 'react';
import { Quote } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-esti-light relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">

          {/* Image Column */}
          <div className="w-full lg:w-5/12 relative group">
            <div className="relative z-10 aspect-[3/4] overflow-hidden rounded-sm">
              <img
                src="/images/author 2.png"
                alt="Dr Tatiana Jasińska"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-4 border border-white/30 pointer-events-none" />
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-6 -left-6 w-full h-full border border-esti-gold/30 -z-10 rounded-sm transition-transform duration-500 group-hover:-translate-x-2 group-hover:-translate-y-2" />
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-esti-beige -z-10 rounded-full blur-3xl opacity-50" />
          </div>

          {/* Text Column */}
          <div className="w-full lg:w-7/12">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-12 bg-esti-gold" />
              <span className="font-sans text-xs font-bold tracking-[0.2em] uppercase text-esti-gold">
                O Prowadzącej
              </span>
            </div>

            <h2 className="font-serif text-4xl md:text-5xl text-esti-dark mb-8 leading-tight">
              Dr n. med. <br />
              <span className="italic text-esti-taupe">Tatiana Jasińska</span>
            </h2>

            <div className="space-y-6 text-lg font-light leading-relaxed text-esti-taupe font-sans">
              <p>
                Lekarz z powołania, specjalistka dermatologii i wenerologii, a także ekspertka w dziedzinie medycyny estetycznej.
                Dla Dr Tatiany Jasińskiej medycyna to nie tylko nauka, ale przede wszystkim sztuka dbania o zdrowie, harmonię i pewność siebie swoich pacjentów.
              </p>
              <p>
                Z ogromną pasją łączy najnowszą, popartą badaniami wiedzę medyczną z holistycznym podejściem do piękna.
                W swojej praktyce stawia na naturalność i bezpieczeństwo, wierząc głęboko, że
                świadoma pielęgnacja to fundament długowieczności skóry.
              </p>
            </div>

            <div className="mt-10 p-8 bg-white border-l-2 border-esti-gold shadow-sm relative">
              <Quote size={40} className="absolute top-4 right-4 text-esti-beige opacity-40" />
              <p className="font-serif text-xl italic text-esti-dark leading-relaxed relative z-10">
                "Prawdziwe piękno zaczyna się od zdrowej skóry i akceptacji siebie. Moją misją jest pomóc Ci odkryć to piękno na nowo, opierając się na faktach medycznych, a nie mitach."
              </p>
            </div>

            <div className="mt-12 flex flex-wrap gap-12 items-center">
              <div className="flex flex-col">
                <span className="font-serif text-3xl text-esti-dark">15+ lat</span>
                <span className="text-xs uppercase tracking-widest text-esti-taupe mt-1">Doświadczenia</span>
              </div>
              <div className="w-px h-12 bg-esti-beige hidden sm:block" />
              <div className="flex flex-col">
                <span className="font-serif text-3xl text-esti-dark">PhD</span>
                <span className="text-xs uppercase tracking-widest text-esti-taupe mt-1">Doktor Nauk Medycznych</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
