'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  ShoppingBag,
  Lock,
  CheckCircle,
  Stethoscope,
  ReceiptText,
  ShieldCheck,
} from 'lucide-react';

const ACCESS_TOKEN = 'estidoctors2025film';

const TOPICS = [
  'Toksyna botulinowa w łysieniu androgenowym — co mówią doniesienia azjatyckie, gdzie leży granica między wskazaniem medycznym a marketingiem i dlaczego suplementacja cynku to nie jest odpowiedź',
  'Reżim immunologiczny i mechanizm powstawania oporności — dlaczego białka kompleksujące nie są istotą problemu, jak działa pamięć immunologiczna i co oznacza klinicznie przerwa roczna vs dwuletnia',
  'Program lekowy NFZ w leczeniu migren a ryzyko generowania oporności u pacjentów estetycznych — dlaczego wywiad musi obejmować to wskazanie i jak go zebrać',
  'Mikrodawkowanie: wskazania kliniczne dla dolnej powieki, szerokich porów i fazy naczyniowej rosacea, ryzyko immunizacji przy podaniu śródskórnym i pytanie, czy to przyszłość czy zabieranie toksynie przyszłości',
  'Mięsień żwacza i bruksizm — różnicowanie przerostu mięśnia od choroby zwarcia, rola stomatologa i fizjoterapeuty, szyna relaksacyjna, historia chirurgicznego wycinania żwaczy i co toksyna zmieniła w tym paradygmacie',
  'Anatomia szyi: platyzma i mięsień czworoboczny jako układ naczyń połączonych, ryzyko kompensacyjnych bólów głowy przy ostrzyknięciu tylko przedniego rusztowania i dlaczego kwalifikacja musi obejmować badanie całości',
  'Nadpotliwość: wskazania rejestracyjne vs off-label dla rąk, stóp i owłosionej skóry głowy, następstwa funkcjonalne przy rękach, znieczulenie przewodowe jako standard, pocenie kompensacyjne i laser-assisted drug delivery',
  'Sekwencja toksyna + energy based devices: okno dwóch tygodni, kolejność zabiegów, biostymulatory i grzanie skóry oraz ekspozycja słoneczna po toksynie bez mitów',
];

const CLINICAL_OUTCOMES = [
  'Lepiej odróżnisz wskazania oparte na danych od trendów i obietnic marketingowych.',
  'Rozszerzysz wywiad o czynniki wpływające na immunogenność i ryzyko oporności na toksynę.',
  'Uporządkujesz kwalifikację do terapii żwacza, szyi, nadpotliwości i mikrodawkowania.',
  'Świadomiej zaplanujesz kolejność toksyny, biostymulatorów i urządzeń energy based.',
];

const FAQ = [
  {
    question: 'Dla kogo jest ten materiał?',
    answer:
      'Dla lekarzy wykonujących zabiegi z użyciem toksyny botulinowej oraz lekarzy planujących rozszerzenie praktyki. Podczas zakupu wymagane jest podanie siedmiocyfrowego numeru PWZ.',
  },
  {
    question: 'Jak szybko otrzymam dostęp?',
    answer:
      'Natychmiast po skutecznej płatności Stripe przekieruje Cię z powrotem na stronę i odblokuje pełną wersję odcinka.',
  },
  {
    question: 'Jak mogę zapłacić?',
    answer: 'Checkout Stripe obsługuje płatność kartą i BLIK. Cena 199 zł jest ceną brutto i zawiera VAT.',
  },
  {
    question: 'Czy otrzymam fakturę?',
    answer:
      'Tak. Po płatności Stripe automatycznie wygeneruje fakturę PDF. W checkoutcie możesz podać dane firmy i NIP.',
  },
  {
    question: 'Czy dostęp jest ograniczony czasowo?',
    answer: 'Nie. Jest to jednorazowy zakup z dostępem do pełnego odcinka bez limitu czasu.',
  },
];

export default function DoctorsVideoPage() {
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (typeof window === 'undefined') return;
    if (localStorage.getItem('doctors_access') === 'true') {
      setIsUnlocked(true);
      return;
    }

    const params = new URLSearchParams(window.location.search);
    if (params.get('dkey') === ACCESS_TOKEN) {
      setIsUnlocked(true);
      localStorage.setItem('doctors_access', 'true');
      window.history.replaceState({}, '', '/for-doctors');
    }
  }, []);

  return (
    <div className="min-h-screen bg-esti-light pt-24 pb-20 animate-fade-in-up">
      <div className="container mx-auto px-6 max-w-5xl">
        <Link
          href="/"
          className="group flex items-center gap-2 text-xs uppercase tracking-widest text-esti-taupe hover:text-esti-dark mb-10 transition-colors"
        >
          <div className="p-2 border border-esti-taupe/30 rounded-full group-hover:border-esti-dark transition-colors">
            <ArrowLeft size={14} />
          </div>
          <span>Wróć do strony głównej</span>
        </Link>

        <div className="mb-10">
          <span className="inline-block bg-esti-gold/10 text-esti-gold px-4 py-1.5 rounded-full text-xs font-bold tracking-[0.2em] uppercase border border-esti-gold/30 mb-6">
            EstiTalk for Doctors · Odcinek 1
          </span>
          <h1 className="font-serif text-4xl md:text-5xl text-esti-dark leading-tight mb-4">
            Toksyna botulinowa od podstaw do praktyki
          </h1>
          <p className="font-sans text-lg text-esti-taupe">dr hab. n. med. Joanna Czuwara</p>
          <p className="mt-5 max-w-3xl text-gray-700 font-light leading-relaxed">
            Zaawansowana rozmowa kliniczna dla lekarzy: kwalifikacja pacjenta, immunogenność, zastosowania off-label,
            ryzyko powikłań i decyzje, które można przełożyć na codzienną praktykę.
          </p>
          {!isUnlocked && (
            <div className="mt-7 flex flex-col sm:flex-row sm:items-center gap-4">
              <a
                href="#kup-dostep"
                className="inline-flex items-center justify-center gap-3 bg-esti-dark text-white px-7 py-4 rounded-sm font-bold uppercase tracking-widest hover:bg-esti-gold hover:text-esti-dark transition-colors"
              >
                Kup dostęp za 199 zł
                <ArrowRight size={18} />
              </a>
              <div className="text-sm text-esti-taupe">
                <span className="font-semibold text-esti-dark">199 zł brutto</span> · jednorazowa płatność · faktura PDF
              </div>
            </div>
          )}
        </div>

        <div className="mb-12 shadow-xl rounded-sm overflow-hidden">
          {isUnlocked ? (
            <div className="relative aspect-video w-full bg-black">
              <iframe
                src="https://player.vimeo.com/video/1178495881?h=24fbc7bee8&title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479"
                className="absolute inset-0 w-full h-full"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                allowFullScreen
                title="EstiTalk for Doctors – Toksyna botulinowa"
              />
            </div>
          ) : (
            <div className="relative aspect-video w-full bg-esti-dark overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://res.cloudinary.com/dgcg6hz1d/image/upload/q_auto/f_auto/v1776412173/Kopia_Kopia_Kto_by_nie_chcia%C5%82_byc%CC%81_m%C5%82ody_pie%CC%A8kny_i_jeszcze_w_pe%C5%82ni_si%C5%82_1_uucrjb.png"
                alt="EstiTalk for Doctors – podgląd odcinka"
                className="absolute inset-0 w-full h-full object-cover opacity-50"
              />
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

        <div className="flex flex-col lg:flex-row gap-12">
          <div className="w-full lg:w-3/5">
            <div className="mb-10 bg-esti-dark text-white rounded-sm p-7 md:p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <Stethoscope size={24} className="text-esti-gold" />
                <h2 className="font-serif text-2xl">Co wykorzystasz w praktyce</h2>
              </div>
              <ul className="space-y-4">
                {CLINICAL_OUTCOMES.map((outcome) => (
                  <li key={outcome} className="flex items-start gap-3 text-sm text-white/80 font-light leading-relaxed">
                    <CheckCircle size={17} className="mt-0.5 text-esti-gold flex-shrink-0" />
                    {outcome}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-10">
              <h2 className="font-serif text-2xl text-esti-dark mb-4">O odcinku</h2>
              <div className="prose prose-stone max-w-none font-light leading-relaxed text-gray-700 space-y-4">
                <p>
                  W pierwszym odcinku EstiTalk for Doctors rozmawiamy z{' '}
                  <strong className="font-semibold text-esti-dark">dr hab. n. med. Joanną Czuwarą</strong> —
                  specjalistką dermatologii i wenerologii, adiunktem i kierownikiem Pracowni Immunodermatologii
                  Warszawskiego Uniwersytetu Medycznego, wieloletnią prelegentką międzynarodowych konferencji
                  dermatologicznych i estetycznych oraz trenerką w zakresie toksyny botulinowej.
                </p>
                <p>
                  To nie jest rozmowa dla pacjentów. To prawie godzina wiedzy klinicznej, którą wypracowuje się latami
                  przy mikroskopie, w sali konferencyjnej i w gabinecie.
                </p>
              </div>
            </div>

            <div className="mb-10">
              <h3 className="font-serif text-xl text-esti-dark mb-6">W tym odcinku rozmawiamy o:</h3>
              <ul className="space-y-4">
                {TOPICS.map((topic) => (
                  <li key={topic} className="flex items-start gap-3 text-gray-700 font-light leading-relaxed text-sm">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-esti-gold flex-shrink-0" />
                    {topic}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white border border-gray-100 rounded-sm p-6 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-widest text-esti-taupe mb-2">Dla kogo</p>
              <p className="text-gray-700 font-light leading-relaxed text-sm">
                Dla lekarzy wykonujących zabiegi z toksyną botulinową lub planujących rozszerzenie swojej praktyki —
                niezależnie od specjalizacji.
              </p>
            </div>
          </div>

          <div className="w-full lg:w-2/5">
            <div className="sticky top-32">
              {isUnlocked ? (
                <div className="bg-white border border-gray-100 rounded-sm p-8 shadow-sm text-center">
                  <CheckCircle size={36} className="text-green-500 mx-auto mb-4" />
                  <h2 className="font-serif text-2xl text-esti-dark mb-2">Dziękujemy za zakup!</h2>
                  <p className="text-esti-taupe text-sm leading-relaxed">Możesz teraz odtworzyć pełny odcinek powyżej.</p>
                </div>
              ) : (
                <div id="kup-dostep" className="bg-zinc-900 text-white rounded-sm p-8 shadow-xl relative overflow-hidden scroll-mt-32">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-esti-gold/10 rounded-full blur-[60px] pointer-events-none" />
                  <div className="relative z-10">
                    <ShoppingBag size={24} className="text-esti-gold mb-5" />
                    <p className="text-xs uppercase tracking-[0.2em] text-esti-gold font-bold mb-2">Jednorazowy dostęp</p>
                    <h2 className="font-serif text-2xl mb-4">Pełna wersja dla lekarzy</h2>
                    <div className="flex items-end gap-2 mb-2">
                      <span className="font-serif text-5xl leading-none">199 zł</span>
                      <span className="text-gray-400 text-sm pb-1">brutto</span>
                    </div>
                    <p className="text-gray-400 text-sm mb-6 leading-relaxed">VAT w cenie. Faktura PDF po płatności.</p>
                    <a
                      href="https://buy.stripe.com/4gM9AU4AB2l4b386D66AM02"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-center gap-3 w-full bg-esti-gold text-esti-dark py-4 rounded-sm font-bold uppercase tracking-widest hover:bg-white transition-all duration-300 mb-4"
                    >
                      <span>Kup dostęp za 199 zł</span>
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                    <p className="text-center text-xs text-gray-500">Bezpieczna płatność kartą lub BLIK przez Stripe.</p>
                    <div className="mt-6 pt-6 border-t border-white/10 space-y-2">
                      {['Natychmiastowy dostęp po zakupie', 'Wymagany siedmiocyfrowy numer PWZ', 'Dostęp bez limitu czasu'].map((item) => (
                        <div key={item} className="flex items-center gap-2 text-xs text-gray-400">
                          <span className="w-1 h-1 rounded-full bg-esti-gold flex-shrink-0" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-4 p-5 bg-esti-beige/30 border border-esti-beige rounded-sm">
                <p className="text-xs text-esti-taupe leading-relaxed font-light">
                  <span className="font-semibold text-esti-dark">EstiTalk for Doctors</span> to zamknięta podseria
                  podcastu EstiTalk dr Tatiany Jasińskiej, tworzona z myślą o środowisku lekarskim. Wiedza bez filtrów.
                  Rozmowy bez uproszczeń.
                </p>
              </div>

              {!isUnlocked && (
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="bg-white border border-gray-100 p-4 rounded-sm text-center">
                    <ReceiptText size={21} className="mx-auto mb-2 text-esti-gold" />
                    <p className="text-xs text-esti-dark font-semibold">Faktura PDF</p>
                  </div>
                  <div className="bg-white border border-gray-100 p-4 rounded-sm text-center">
                    <ShieldCheck size={21} className="mx-auto mb-2 text-esti-gold" />
                    <p className="text-xs text-esti-dark font-semibold">Płatność Stripe</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <section className="mt-16 pt-12 border-t border-esti-beige">
          <div className="max-w-3xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-esti-gold text-center mb-3">Przed zakupem</p>
            <h2 className="font-serif text-3xl text-esti-dark text-center mb-8">Najczęstsze pytania</h2>
            <div className="space-y-3">
              {FAQ.map((item) => (
                <details key={item.question} className="group bg-white border border-gray-100 rounded-sm p-5 shadow-sm">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-esti-dark">
                    {item.question}
                    <span className="text-esti-gold text-xl font-light group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="pt-4 text-sm text-gray-600 font-light leading-relaxed">{item.answer}</p>
                </details>
              ))}
            </div>
            {!isUnlocked && (
              <div className="mt-8 text-center">
                <a
                  href="#kup-dostep"
                  className="inline-flex items-center justify-center gap-3 bg-esti-gold text-esti-dark px-8 py-4 rounded-sm font-bold uppercase tracking-widest hover:bg-esti-dark hover:text-white transition-colors"
                >
                  Kup dostęp za 199 zł brutto
                  <ArrowRight size={18} />
                </a>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
