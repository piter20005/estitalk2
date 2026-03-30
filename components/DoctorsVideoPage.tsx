import React, { useEffect } from 'react';
import { ArrowLeft, Check, ArrowRight, Play, Lock } from 'lucide-react';

interface DoctorsVideoPageProps {
  onBack: () => void;
}

const DoctorsVideoPage: React.FC<DoctorsVideoPageProps> = ({ onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const benefits = [
    "Early Access do pełnych wywiadów z topowymi ekspertami",
    "„Clinical Notes" – 5 klinicznych wniosków z każdego odcinka",
    "„Expert Insights" – 1-stronicowy PDF dla lekarzy",
    "Dostęp do rozszerzonych materiałów z konferencji",
    "„Monthly Clinical Brief" – comiesięczna piguła aktualnej wiedzy",
    "„Ask The Expert" – miesięczne odpowiedzi na pytania subskrybentów",
    "Dostęp do całego archiwum EstiTalk",
    "-10% na szkolenia EstiAcademy",
    "Dostęp do zamkniętego kanału EstiTalk Doctors Line",
  ];

  return (
    <div className="min-h-screen bg-esti-light pt-24 pb-20 animate-fade-in-up">
      <div className="container mx-auto px-6 max-w-6xl">

        {/* Back navigation */}
        <button
          onClick={onBack}
          className="group flex items-center gap-2 text-xs uppercase tracking-widest text-esti-taupe hover:text-esti-dark mb-10 transition-colors"
        >
          <div className="p-2 border border-esti-taupe/30 rounded-full group-hover:border-esti-dark transition-colors">
            <ArrowLeft size={14} />
          </div>
          <span>Wróć do strony głównej</span>
        </button>

        {/* Header */}
        <div className="mb-12 text-center">
          <span className="inline-block bg-esti-gold/10 text-esti-gold px-4 py-1.5 rounded-full text-xs font-bold tracking-[0.2em] uppercase border border-esti-gold/30 mb-6">
            Premium Access
          </span>
          <h1 className="font-serif text-5xl md:text-7xl text-esti-dark mb-4 leading-tight">
            EstiTalk{' '}
            <span className="italic text-esti-gold">for Doctors</span>
          </h1>
          <p className="font-sans text-lg text-esti-taupe max-w-2xl mx-auto leading-relaxed">
            Subskrypcja premium dla lekarzy, którzy chcą być zawsze 2 kroki przed trendami, protokołami i praktyką kliniczną.
          </p>
        </div>

        {/* Vimeo Video Embed */}
        <div className="mb-16 shadow-2xl rounded-sm overflow-hidden border border-gray-100">
          <div className="relative aspect-video w-full bg-black">
            <iframe
              src="https://player.vimeo.com/video/1178495881?h=24fbc7bee8&title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479"
              className="absolute inset-0 w-full h-full"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
              allowFullScreen
              title="EstiTalk for Doctors"
            />
          </div>
        </div>

        {/* Main Content: Description + Purchase */}
        <div className="flex flex-col lg:flex-row gap-12 mb-20">

          {/* Benefits List */}
          <div className="w-full lg:w-3/5">
            <h2 className="font-serif text-3xl text-esti-dark mb-8">
              Co otrzymujesz w subskrypcji?
            </h2>
            <div className="grid grid-cols-1 gap-3">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-sm hover:bg-white transition-colors border border-transparent hover:border-gray-100 hover:shadow-sm group"
                >
                  <div className="mt-0.5 w-6 h-6 rounded-full bg-esti-gold/15 flex items-center justify-center flex-shrink-0 group-hover:bg-esti-gold group-hover:text-esti-dark transition-colors text-esti-gold">
                    <Check size={14} strokeWidth={3} />
                  </div>
                  <span className="font-sans text-gray-700 group-hover:text-esti-dark transition-colors leading-relaxed">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Purchase Box */}
          <div className="w-full lg:w-2/5">
            <div className="sticky top-32">
              <div className="bg-zinc-900 text-white rounded-sm p-8 shadow-xl relative overflow-hidden">
                {/* Decorative glow */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-esti-gold/10 rounded-full blur-[60px] pointer-events-none" />

                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-6">
                    <Lock size={16} className="text-esti-gold" />
                    <span className="text-xs font-bold tracking-[0.2em] uppercase text-esti-gold">
                      Dostęp Premium
                    </span>
                  </div>

                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-5xl font-serif">39,99 zł</span>
                  </div>
                  <p className="text-sm text-gray-400 uppercase tracking-wider mb-2">/ miesięcznie</p>
                  <p className="text-sm text-gray-400 font-light mb-8 leading-relaxed">
                    Wiedza premium. Szybko, konkretnie i praktycznie — zawsze pod ręką.
                  </p>

                  <a
                    href="https://buy.stripe.com/eVq7sK55mbDG9IFczFgMw02"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-center gap-3 w-full bg-esti-gold text-esti-dark py-4 rounded-sm font-bold uppercase tracking-widest hover:bg-white transition-all duration-300 mb-4"
                  >
                    <span>Kup dostęp</span>
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </a>

                  <p className="text-center text-xs text-gray-500 leading-relaxed">
                    Płatność bezpieczna przez Stripe. Anuluj w dowolnym momencie.
                  </p>

                  <div className="mt-8 pt-8 border-t border-white/10 space-y-3">
                    {[
                      'Natychmiastowy dostęp po zakupie',
                      'Nowe materiały co miesiąc',
                      'Brak zobowiązań — rezygnacja kiedy chcesz',
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm text-gray-300">
                        <Check size={14} className="text-esti-gold flex-shrink-0" strokeWidth={3} />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div className="bg-esti-dark rounded-sm p-10 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-esti-gold/5 pointer-events-none" />
          <div className="relative z-10">
            <Play size={32} className="text-esti-gold mx-auto mb-4" fill="currentColor" />
            <h3 className="font-serif text-3xl md:text-4xl mb-4">
              Gotowy/a dołączyć do grona{' '}
              <span className="text-esti-gold italic">EstiTalk Doctors?</span>
            </h3>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto leading-relaxed">
              Dołącz do społeczności lekarzy, którzy trzymają rękę na pulsie najnowszej wiedzy medycznej.
            </p>
            <a
              href="https://buy.stripe.com/eVq7sK55mbDG9IFczFgMw02"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 bg-esti-gold text-esti-dark px-10 py-4 rounded-sm font-bold uppercase tracking-widest hover:bg-white transition-all duration-300"
            >
              <span>Dołącz teraz — 39,99 zł/mies.</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DoctorsVideoPage;
