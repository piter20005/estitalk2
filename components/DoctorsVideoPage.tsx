import React, { useEffect } from 'react';
import { ArrowLeft, ArrowRight, ShoppingBag, Lock, CheckCircle } from 'lucide-react';

interface DoctorsVideoPageProps {
  onBack: () => void;
  isUnlocked: boolean;
}

const topics = [
  'Toksyna botulinowa w łysieniu androgenowym — co mówią doniesienia azjatyckie, gdzie leży granica między wskazaniem medycznym a marketingiem i dlaczego suplementacja cynku to nie jest odpowiedź',
  'Reżim immunologiczny i mechanizm powstawania oporności — dlaczego białka kompleksujące nie są istotą problemu, jak działa pamięć immunologiczna i co oznacza klinicznie przerwa roczna vs dwuletnia',
  'Program lekowy NFZ w leczeniu migren a ryzyko generowania oporności u pacjentów estetycznych — dlaczego wywiad musi obejmować to wskazanie i jak go zebrać',
  'Mikrodawkowanie: wskazania kliniczne dla dolnej powieki, szerokich porów i fazy naczyniowej rosacea, ryzyko immunizacji przy podaniu śródskórnym i pytanie, czy to przyszłość czy zabieranie toksynie przyszłości',
  'Mięsień żwacza i bruksizm — różnicowanie przerostu mięśnia od choroby zwarcia, rola stomatologa i fizjoterapeuty, szyna relaksacyjna, historia chirurgicznego wycinania żwaczy i co toksyna zmieniła w tym paradygmacie',
  'Anatomia szyi: platyzma i mięsień czworoboczny jako układ naczyń połączonych, ryzyko kompensacyjnych bólów głowy przy ostrzyknięciu tylko przedniego rusztowania i dlaczego kwalifikacja musi obejmować badanie całości',
  'Nadpotliwość: wskazania rejestracyjne vs off-label dla rąk, stóp i owłosionej skóry głowy, następstwa funkcjonalne przy rękach, znieczulenie przewodowe jako standard, pocenie kompensacyjne i laser-assisted drug delivery',
  'Sekwencja toksyna + energy based devices: okno dwóch tygodni, kolejność zabiegów, biostymulatory i grzanie skóry oraz ekspozycja słoneczna po toksynie bez mitów',
];

const DoctorsVideoPage: React.FC<DoctorsVideoPageProps> = ({ onBack, isUnlocked }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-esti-light pt-24 pb-20 animate-fade-in-up">
      <div className="container mx-auto px-6 max-w-5xl">

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
        <div className="mb-10">
          <span className="inline-block bg-esti-gold/10 text-esti-gold px-4 py-1.5 rounded-full text-xs font-bold tracking-[0.2em] uppercase border border-esti-gold/30 mb-6">
            EstiTalk for Doctors · Odcinek 1
          </span>
          <h1 className="font-serif text-4xl md:text-5xl text-esti-dark leading-tight mb-4">
            Toksyna botulinowa od podstaw do praktyki
          </h1>
          <p className="font-sans text-lg text-esti-taupe">
            dr hab. n. med. Joanna Czuwara
          </p>
        </div>

        {/* Video area */}
        <div className="mb-12 shadow-xl rounded-sm overflow-hidden">
          {isUnlocked ? (
            <div className="relative aspect-video w-full bg-black">
              <iframe
                src="https://player.vimeo.com/video/1178495881?h=24fbc7bee8&title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479"
                className="absolute inset-0 w-full h-full"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                allowFullScreen
                title="EstiTalk for Doctors – Toksyna botulinowa"
              />
            </div>
          ) : (
            <div className="relative aspect-video w-full bg-esti-dark overflow-hidden">
              {/* Thumbnail image */}
              <img
                src="/images/studio.png"
                alt="EstiTalk for Doctors – podgląd odcinka"
                className="absolute inset-0 w-full h-full object-cover opacity-40"
              />
              {/* Lock overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-10">
                <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-sm">
                  <Lock size={26} className="text-esti-gold" />
                </div>
                <p className="text-white/70 text-sm font-sans tracking-wide">
                  Kup dostęp, aby obejrzeć pełny odcinek
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Main layout */}
        <div className="flex flex-col lg:flex-row gap-12">

          {/* Left: description */}
          <div className="w-full lg:w-3/5">

            {/* Guest bio */}
            <div className="mb-10">
              <h2 className="font-serif text-2xl text-esti-dark mb-4">O odcinku</h2>
              <div className="prose prose-stone max-w-none font-light leading-relaxed text-gray-700 space-y-4">
                <p>
                  W pierwszym odcinku EstiTalk for Doctors rozmawiamy z <strong className="font-semibold text-esti-dark">dr hab. n. med. Joanną Czuwarą</strong> — specjalistką dermatologii i wenerologii, adiunktem i kierownikiem Pracowni Immunodermatologii Warszawskiego Uniwersytetu Medycznego, wieloletnią prelegentką międzynarodowych konferencji dermatologicznych i estetycznych oraz trenerką w zakresie toksyny botulinowej.
                </p>
                <p>
                  To nie jest rozmowa dla pacjentów. To prawie godzina wiedzy klinicznej, którą wypracowuje się latami przy mikroskopie, w sali konferencyjnej i w gabinecie.
                </p>
              </div>
            </div>

            {/* Topics */}
            <div className="mb-10">
              <h3 className="font-serif text-xl text-esti-dark mb-6">W tym odcinku rozmawiamy o:</h3>
              <ul className="space-y-4">
                {topics.map((topic, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-700 font-light leading-relaxed text-sm">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-esti-gold flex-shrink-0" />
                    {topic}
                  </li>
                ))}
              </ul>
            </div>

            {/* For whom */}
            <div className="bg-white border border-gray-100 rounded-sm p-6 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-widest text-esti-taupe mb-2">Dla kogo</p>
              <p className="text-gray-700 font-light leading-relaxed text-sm">
                Dla lekarzy wykonujących zabiegi z toksyną botulinową lub planujących rozszerzenie swojej praktyki — niezależnie od specjalizacji.
              </p>
            </div>
          </div>

          {/* Right: purchase / success */}
          <div className="w-full lg:w-2/5">
            <div className="sticky top-32">
              {isUnlocked ? (
                <div className="bg-white border border-gray-100 rounded-sm p-8 shadow-sm text-center">
                  <CheckCircle size={36} className="text-green-500 mx-auto mb-4" />
                  <h2 className="font-serif text-2xl text-esti-dark mb-2">
                    Dziękujemy za zakup!
                  </h2>
                  <p className="text-esti-taupe text-sm leading-relaxed">
                    Możesz teraz odtworzyć pełny odcinek powyżej.
                  </p>
                </div>
              ) : (
                <div className="bg-zinc-900 text-white rounded-sm p-8 shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-esti-gold/10 rounded-full blur-[60px] pointer-events-none" />
                  <div className="relative z-10">
                    <ShoppingBag size={24} className="text-esti-gold mb-5" />
                    <h2 className="font-serif text-2xl mb-1">
                      Kup dostęp do odcinka
                    </h2>
                    <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                      Jednorazowa płatność. Dostęp do pełnej wersji bez limitu czasu.
                    </p>
                    <a
                      href="https://buy.stripe.com/5kQeVe2st1h00ou3qU6AM00"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-center gap-3 w-full bg-esti-gold text-esti-dark py-4 rounded-sm font-bold uppercase tracking-widest hover:bg-white transition-all duration-300 mb-4"
                    >
                      <span>Kup teraz</span>
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                    <p className="text-center text-xs text-gray-500">
                      Płatność bezpieczna przez Stripe.
                    </p>
                    <div className="mt-6 pt-6 border-t border-white/10 space-y-2">
                      {['Natychmiastowy dostęp po zakupie', 'Wiedza kliniczna bez uproszczeń', 'Prawie godzina rozmowy z ekspertem'].map((item, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-gray-400">
                          <span className="w-1 h-1 rounded-full bg-esti-gold flex-shrink-0" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Series info */}
              <div className="mt-4 p-5 bg-esti-beige/30 border border-esti-beige rounded-sm">
                <p className="text-xs text-esti-taupe leading-relaxed font-light">
                  <span className="font-semibold text-esti-dark">EstiTalk for Doctors</span> to zamknięta podseria podcastu EstiTalk dr Tatiany Jasińskiej, tworzona z myślą o środowisku lekarskim. Wiedza bez filtrów. Rozmowy bez uproszczeń.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DoctorsVideoPage;
