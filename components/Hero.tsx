import React from 'react';
import { Play, ArrowDown, ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-end lg:items-center gap-12">

          {/* Text Content */}
          <div className="lg:w-1/2 flex flex-col gap-6 animate-fade-in-up">
            <div className="inline-block">
              <span className="bg-esti-beige/30 px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase text-esti-dark mb-4 inline-block">
                Nowy Sezon
              </span>
            </div>
            <h1 className="font-serif text-6xl md:text-8xl leading-[0.9] text-esti-dark">
              Rozmowy <br />
              <span className="italic text-esti-taupe">o pięknie</span> <br />
              i nauce.
            </h1>
            <p className="font-sans font-light text-lg md:text-xl text-esti-taupe max-w-md mt-4 leading-relaxed">
              Dr n. med. Tatiana Jasińska zaprasza do świata medycyny estetycznej, dermatologii i świadomej pielęgnacji. Bez tabu, z pasją i naukową precyzją.
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-4 mt-8">
              {/* Primary CTA */}
              <a
                href="#listen"
                className="group flex items-center gap-3 bg-esti-dark text-white px-8 py-4 rounded-sm hover:bg-esti-dark/80 transition-all duration-300"
              >
                <Play size={16} fill="currentColor" className="group-hover:scale-110 transition-transform" />
                <span className="uppercase tracking-widest text-sm font-medium">Posłuchaj</span>
              </a>
              {/* Secondary link */}
              <a
                href="#episodes"
                className="group flex items-center gap-2 py-4 text-sm uppercase tracking-widest font-medium text-esti-taupe hover:text-esti-dark transition-colors"
              >
                <span>Zobacz odcinki</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Visual Content */}
          <div className="lg:w-1/2 relative mt-12 lg:mt-0">
            <div className="relative aspect-[4/5] md:aspect-[3/4] lg:w-[80%] ml-auto">
              {/* Main Image */}
              <div className="w-full h-full overflow-hidden rounded-2xl relative z-20 shadow-2xl">
                <img
                  src="/images/author.jpg"
                  alt="Dr Tatiana Jasińska"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-[2s]"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
              </div>

              {/* Decorative Elements */}
              <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-esti-beige rounded-full z-10 mix-blend-multiply opacity-80 blur-2xl" />
              <div className="absolute top-20 -right-8 w-64 h-64 border border-esti-taupe/20 rounded-full z-0" />

              {/* Floating Badge — safe on all screen sizes */}
              <div className="absolute bottom-8 left-4 lg:-left-6 lg:bottom-12 z-30 bg-white p-5 shadow-xl max-w-[180px] lg:max-w-[200px]">
                <p className="font-serif text-xl lg:text-2xl italic text-esti-dark leading-snug">"Całe miasto słucha Esti Talk."</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-esti-taupe hidden md:block">
        <ArrowDown size={24} />
      </div>
    </section>
  );
};

export default Hero;
