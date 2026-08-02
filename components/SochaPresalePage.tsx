import Image from 'next/image';
import {
  ArrowRight,
  Check,
  Clock3,
  Crown,
  FileText,
  Headphones,
  HeartHandshake,
  LockKeyhole,
  Play,
  ShieldCheck,
  Sparkles,
  Users,
  Vote,
  Youtube,
} from 'lucide-react';
import { SOCHA_PATRONITE } from '@/lib/sochaPatronite';

const FREE_TOPICS = [
  'Czym różnią się perimenopauza i menopauza',
  'Kiedy mogą pojawić się pierwsze nieoczywiste objawy',
  'Czy regularna miesiączka wyklucza zmiany hormonalne',
  'Jak sen, nastrój, masa ciała i libido zaczynają tworzyć jeden obraz',
  'Kiedy i z czym warto zgłosić się do lekarza',
];

const HORMONE_TOPICS = [
  'Wpływ hormonów na skórę, tkankę łączną i okolice intymne',
  'HTM: kwalifikacja, przeciwwskazania i drogi podania',
  'Testosteron u kobiet: wskazania, obawy i ograniczenia',
  'Pytania, które warto przygotować przed wizytą lekarską',
];

const INTIMACY_TOPICS = [
  'Libido, suchość, ból i zmiany w odczuwaniu przyjemności',
  'Do kogo zgłosić się po pomoc i kiedy problem wymaga diagnostyki',
  'Seksualność bez penetracji i potrzeby seksualne w różnym wieku',
  'Spadek pożądania w długoletniej relacji',
];

const BENEFITS = [
  {
    Icon: Play,
    title: 'Dwa bonusy wideo',
    text: 'Dwie osobne, uporządkowane rozmowy dostępne od razu — nie przypadkowe resztki z montażu.',
  },
  {
    Icon: Headphones,
    title: 'Wersje audio',
    text: 'Słuchasz wygodnie również bez ekranu i wracasz do wybranych rozdziałów wtedy, kiedy chcesz.',
  },
  {
    Icon: FileText,
    title: 'Praktyczny materiał PDF',
    text: 'Mapa objawów i pytań, które pomagają lepiej przygotować się do rozmowy z lekarzem.',
  },
  {
    Icon: Vote,
    title: 'Wpływ na kolejne tematy',
    text: 'Patronki i Patroni głosują na zagadnienia, gości i pytania rozwijane w kolejnych rozmowach.',
  },
];

const FAQ = [
  {
    question: 'Czy pełny odcinek z prof. Maciejem Sochą będzie bezpłatny?',
    answer:
      'Tak. Pełny, zamknięty odcinek o rozpoznawaniu perimenopauzy i pierwszych krokach zostanie opublikowany bezpłatnie na YouTube, Spotify i Apple Podcasts.',
  },
  {
    question: 'Czy odcinek na YouTube urwie się w połowie?',
    answer:
      'Nie. Publiczny materiał ma własny początek, rozwinięcie i zakończenie. Patronite nie odblokowuje końcówki odcinka, lecz dwa osobne pogłębienia tematów, których nie dałoby się dobrze omówić w jednym materiale.',
  },
  {
    question: 'Co otrzymam od razu po dołączeniu do Klubu EstiTalk?',
    answer:
      'Na progu Klub EstiTalk od razu otrzymasz dwa bonusy — „Hormony i ciało” oraz „Seks, libido i relacje” — w wersji wideo i audio, a także rozdziały oraz materiał PDF.',
  },
  {
    question: 'Czy Patronite jest płatnością jednorazową?',
    answer:
      'Nie. Patronite to dobrowolne miesięczne wsparcie. Możesz wybrać próg i zrezygnować ze wsparcia zgodnie z zasadami platformy Patronite.',
  },
  {
    question: 'Czy to jest EstiTalk for Doctors?',
    answer:
      'Nie. Te materiały są przygotowane dla pacjentek i słuchaczy EstiTalk. EstiTalk for Doctors pozostaje osobną, bardziej kliniczną serią przeznaczoną dla lekarzy.',
  },
  {
    question: 'Czy materiał zastępuje konsultację medyczną?',
    answer:
      'Nie. Wszystkie materiały mają charakter edukacyjny i nie zastępują indywidualnej diagnozy, badania ani zaleceń lekarza prowadzącego.',
  },
];

function PatroniteLink({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) {
  const ready = Boolean(SOCHA_PATRONITE.patroniteUrl);

  return (
    <a
      href={SOCHA_PATRONITE.patroniteUrl ?? '#progi'}
      className={className}
      {...(ready ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
    </a>
  );
}

export default function SochaPresalePage() {
  const patroniteReady = Boolean(SOCHA_PATRONITE.patroniteUrl);

  return (
    <div className="bg-esti-light text-esti-dark">
      <section className="relative min-h-[92vh] overflow-hidden bg-esti-dark pb-20 pt-32 text-white">
        <Image
          src="/images/studio.png"
          alt="Studio podcastu EstiTalk"
          fill
          priority
          className="object-cover opacity-45"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-black/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-esti-dark via-transparent to-black/30" />

        <div className="container relative z-10 mx-auto px-6">
          <div className="grid items-center gap-14 lg:grid-cols-[1.18fr_0.82fr]">
            <div className="max-w-3xl">
              <span className="mb-7 inline-flex items-center gap-2 border border-white/25 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] backdrop-blur-sm">
                <Sparkles size={14} className="text-esti-gold" />
                EstiTalk × Patronite
              </span>
              <h1 className="font-serif text-5xl leading-[0.98] sm:text-6xl lg:text-7xl">
                Pełna rozmowa
                <br />
                <span className="italic text-esti-beige">zostaje otwarta.</span>
              </h1>
              <p className="mt-7 max-w-2xl text-lg font-light leading-relaxed text-white/80 sm:text-xl">
                Odcinek EstiTalk z prof. Maciejem Sochą publikujemy w pełnej, zamkniętej formie bezpłatnie. Dla
                społeczności Patronite przygotowujemy od razu dwa osobne pogłębienia: o hormonach i ciele oraz o
                seksie, libido i relacjach.
              </p>

              <div className="mt-9 flex flex-wrap gap-3 text-sm text-white/75">
                <span className="border border-white/20 bg-black/20 px-4 py-2 backdrop-blur-sm">
                  {SOCHA_PATRONITE.publicEpisodeDuration} bezpłatnie
                </span>
                <span className="border border-white/20 bg-black/20 px-4 py-2 backdrop-blur-sm">
                  2 bonusy dla Patronów
                </span>
                <span className="border border-white/20 bg-black/20 px-4 py-2 backdrop-blur-sm">
                  dostępne od razu
                </span>
              </div>

              <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                <a
                  href="#co-otrzymasz"
                  className="group inline-flex items-center justify-center gap-3 bg-esti-gold px-8 py-4 text-sm font-bold uppercase tracking-widest text-esti-dark transition-colors hover:bg-white"
                >
                  Zobacz cały pakiet
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </a>
                <a
                  href="#jak-dzielimy"
                  className="inline-flex items-center gap-2 py-4 text-sm uppercase tracking-widest text-white/75 transition-colors hover:text-white"
                >
                  <Play size={15} fill="currentColor" />
                  Jak dzielimy rozmowę
                </a>
              </div>
            </div>

            <aside className="border border-white/15 bg-black/55 p-7 shadow-2xl backdrop-blur-md sm:p-9">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-esti-gold">Pakiet premierowy</p>
                  <h2 className="mt-3 font-serif text-3xl">Jedna rozmowa. Trzy materiały.</h2>
                </div>
                <HeartHandshake size={32} className="shrink-0 text-esti-gold" />
              </div>

              <div className="mt-7 space-y-4 border-y border-white/15 py-7">
                {[
                  ['Pełny odcinek publiczny', SOCHA_PATRONITE.publicEpisodeDuration],
                  ['Bonus: Hormony i ciało', SOCHA_PATRONITE.hormoneBonusDuration],
                  ['Bonus: Seks, libido i relacje', SOCHA_PATRONITE.intimacyBonusDuration],
                ].map(([title, duration], index) => (
                  <div key={title} className="flex items-start gap-4">
                    <span className="font-serif text-xl italic text-esti-gold">0{index + 1}</span>
                    <div className="flex-1">
                      <p className="font-medium text-white">{title}</p>
                      <p className="mt-1 text-xs font-light text-white/50">{duration}</p>
                    </div>
                    {index === 0 ? (
                      <Youtube size={19} className="text-white/55" />
                    ) : (
                      <LockKeyhole size={18} className="text-esti-gold" />
                    )}
                  </div>
                ))}
              </div>

              <p className="mt-6 text-sm font-light leading-relaxed text-white/60">
                Patronite nie zamyka podcastu. Finansuje jego regularność i pozwala przygotowywać warstwę
                rozszerzoną dla najbardziej zaangażowanej społeczności.
              </p>
            </aside>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container mx-auto px-6">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-esti-gold">Najważniejsza zasada</p>
              <h2 className="mt-4 font-serif text-4xl leading-tight md:text-5xl">Nie zabieramy EstiTalk z YouTube.</h2>
            </div>
            <div className="border-l border-esti-gold pl-7 md:pl-10">
              <p className="text-xl font-light leading-relaxed text-esti-taupe">
                Nie publikujemy pół odcinka i nie każemy płacić za jego zakończenie. Bezpłatny materiał odpowiada na
                konkretny problem i kończy się praktycznym podsumowaniem. Patroni otrzymują większą głębię — nie
                brakujący finał.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="jak-dzielimy" className="scroll-mt-24 bg-esti-light py-24">
        <div className="container mx-auto px-6">
          <div className="mx-auto mb-14 max-w-4xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-esti-gold">Pełny odcinek + dwa bonusy</p>
            <h2 className="mt-4 font-serif text-4xl md:text-5xl">Każdy materiał ma własną obietnicę.</h2>
            <p className="mt-5 text-lg font-light leading-relaxed text-esti-taupe">
              Dzięki temu publiczna rozmowa jest satysfakcjonująca sama w sobie, a materiały patronackie dają
              konkretny powód, żeby wejść głębiej.
            </p>
          </div>

          <div className="mx-auto max-w-6xl space-y-6">
            <article className="grid gap-8 border border-esti-beige bg-white p-7 shadow-sm md:grid-cols-[0.34fr_0.66fr] md:p-10">
              <div>
                <div className="flex items-center gap-3">
                  <Youtube size={22} className="text-esti-gold" />
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-esti-taupe">Pełny odcinek publiczny</p>
                </div>
                <p className="mt-5 font-serif text-5xl italic text-esti-gold">{SOCHA_PATRONITE.publicEpisodeDuration}</p>
                <span className="mt-4 inline-block bg-esti-light px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-esti-dark">
                  YouTube · Spotify · Apple Podcasts
                </span>
              </div>
              <div>
                <h3 className="font-serif text-3xl md:text-4xl">Czy to już perimenopauza?</h3>
                <p className="mt-4 font-light leading-relaxed text-esti-taupe">
                  Objawy, których kobiety i lekarze często nie łączą — oraz pierwsze kroki, kiedy czujesz, że „coś się
                  zmienia”, ale wciąż nie masz jednej odpowiedzi.
                </p>
                <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                  {FREE_TOPICS.map((topic) => (
                    <li key={topic} className="flex items-start gap-3 text-sm leading-relaxed text-esti-dark">
                      <Check size={17} className="mt-0.5 shrink-0 text-esti-gold" />
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>

            <div className="grid gap-6 lg:grid-cols-2">
              <article className="bg-esti-dark p-7 text-white shadow-xl md:p-10">
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-esti-gold">Bonus patronacki 01</p>
                    <h3 className="mt-3 font-serif text-3xl">Hormony i ciało</h3>
                  </div>
                  <span className="border border-white/15 px-3 py-2 text-xs text-white/55">
                    {SOCHA_PATRONITE.hormoneBonusDuration}
                  </span>
                </div>
                <p className="mt-5 text-sm font-light leading-relaxed text-white/65">
                  Pogłębiona rozmowa o tym, jak gospodarka hormonalna wpływa na ciało i jakie pytania warto zadać
                  przed decyzjami dotyczącymi terapii.
                </p>
                <ul className="mt-7 space-y-4 text-sm leading-relaxed text-white/80">
                  {HORMONE_TOPICS.map((topic) => (
                    <li key={topic} className="flex items-start gap-3">
                      <Check size={17} className="mt-0.5 shrink-0 text-esti-gold" />
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 border-l-2 border-esti-gold pl-4 text-sm font-light italic leading-relaxed text-white/55">
                  Po tej części łatwiej nazwiesz swoje objawy i przygotujesz konkretne pytania do lekarza.
                </div>
              </article>

              <article className="bg-esti-dark p-7 text-white shadow-xl md:p-10">
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-esti-gold">Bonus patronacki 02</p>
                    <h3 className="mt-3 font-serif text-3xl">Seks, libido i relacje</h3>
                  </div>
                  <span className="border border-white/15 px-3 py-2 text-xs text-white/55">
                    {SOCHA_PATRONITE.intimacyBonusDuration}
                  </span>
                </div>
                <p className="mt-5 text-sm font-light leading-relaxed text-white/65">
                  Konkretna i pozbawiona zawstydzania rozmowa o zmianach pożądania, bólu, przyjemności i bliskości.
                </p>
                <ul className="mt-7 space-y-4 text-sm leading-relaxed text-white/80">
                  {INTIMACY_TOPICS.map((topic) => (
                    <li key={topic} className="flex items-start gap-3">
                      <Check size={17} className="mt-0.5 shrink-0 text-esti-gold" />
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 border-l-2 border-esti-gold pl-4 text-sm font-light italic leading-relaxed text-white/55">
                  Po tej części łatwiej porozmawiasz o swoich potrzebach — podczas wizyty i we własnej relacji.
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section id="co-otrzymasz" className="scroll-mt-24 bg-white py-24">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-12 lg:grid-cols-[0.78fr_1.22fr]">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-esti-gold">Od razu po dołączeniu</p>
                <h2 className="mt-4 font-serif text-4xl md:text-5xl">Nie czekasz na kolejny miesiąc.</h2>
                <p className="mt-6 font-light leading-relaxed text-esti-taupe">
                  W dniu premiery w Klubie EstiTalk czeka cały pakiet z rozmowy z prof. Maciejem Sochą. Członkostwo
                  daje także dostęp do kolejnych materiałów dodawanych do biblioteki.
                </p>
              </div>

              <div className="grid gap-px overflow-hidden border border-esti-beige bg-esti-beige sm:grid-cols-2">
                {BENEFITS.map(({ Icon, title, text }) => (
                  <div key={title} className="bg-esti-light p-7 md:p-8">
                    <Icon size={24} className="text-esti-gold" />
                    <h3 className="mt-5 font-serif text-2xl">{title}</h3>
                    <p className="mt-3 text-sm font-light leading-relaxed text-esti-taupe">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-esti-beige/35 py-24">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-5xl">
            <div className="mb-14 text-center">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-esti-gold">Jak to działa</p>
              <h2 className="mt-4 font-serif text-4xl md:text-5xl">Trzy proste kroki.</h2>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {[
                {
                  Icon: Users,
                  title: '1. Dołączasz',
                  text: 'Wybierasz na Patronite próg, który najlepiej odpowiada temu, jak chcesz wspierać EstiTalk.',
                },
                {
                  Icon: LockKeyhole,
                  title: '2. Odblokowujesz bibliotekę',
                  text: 'Na progu Klub EstiTalk od razu zyskujesz oba bonusy, audio, rozdziały i materiał PDF.',
                },
                {
                  Icon: Clock3,
                  title: '3. Wracasz, kiedy chcesz',
                  text: 'Korzystasz z materiałów na zasadach Patronite i decydujesz, jak długo pozostajesz Patronem.',
                },
              ].map(({ Icon, title, text }) => (
                <div key={title} className="border-t border-esti-gold pt-7">
                  <Icon size={24} className="mb-5 text-esti-gold" />
                  <h3 className="font-serif text-2xl">{title}</h3>
                  <p className="mt-3 text-sm font-light leading-relaxed text-esti-taupe">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="progi" className="scroll-mt-24 bg-white py-24">
        <div className="container mx-auto px-6">
          <div className="mx-auto mb-14 max-w-4xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-esti-gold">Progi wsparcia</p>
            <h2 className="mt-4 font-serif text-4xl md:text-5xl">Wybierasz, jak chcesz być częścią EstiTalk.</h2>
            <p className="mt-5 text-lg font-light leading-relaxed text-esti-taupe">
              Każdy próg wspiera dalszą produkcję. Pełny pakiet materiałów odblokowuje Klub EstiTalk.
            </p>
          </div>

          <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-3">
            <article className="border border-esti-beige bg-esti-light p-7 md:p-9">
              <HeartHandshake size={25} className="text-esti-gold" />
              <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-esti-taupe">Wspieram EstiTalk</p>
              <p className="mt-3 font-serif text-5xl">{SOCHA_PATRONITE.tiers.supporter} zł</p>
              <p className="mt-1 text-xs text-esti-taupe">miesięcznie</p>
              <p className="mt-6 text-sm font-light leading-relaxed text-esti-taupe">
                Dla osób, które chcą pomagać nam utrzymywać jakość i regularność otwartych odcinków.
              </p>
              <ul className="mt-7 space-y-3 text-sm">
                {['Aktualności zza kulis', 'Ankiety dotyczące kolejnych tematów', 'Podziękowania dla społeczności'].map(
                  (item) => (
                    <li key={item} className="flex items-start gap-3">
                      <Check size={17} className="mt-0.5 shrink-0 text-esti-gold" />
                      <span>{item}</span>
                    </li>
                  )
                )}
              </ul>
            </article>

            <article className="relative border border-esti-gold bg-esti-dark p-7 text-white shadow-2xl md:p-9">
              <span className="absolute right-5 top-0 -translate-y-1/2 bg-esti-gold px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-esti-dark">
                Pełny pakiet
              </span>
              <ShieldCheck size={25} className="text-esti-gold" />
              <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-esti-gold">Klub EstiTalk</p>
              <p className="mt-3 font-serif text-5xl">{SOCHA_PATRONITE.tiers.club} zł</p>
              <p className="mt-1 text-xs text-white/45">miesięcznie</p>
              <p className="mt-6 text-sm font-light leading-relaxed text-white/65">
                Dla osób, które chcą nie tylko wspierać podcast, ale też korzystać z pełnej biblioteki pogłębionych
                rozmów.
              </p>
              <ul className="mt-7 space-y-3 text-sm text-white/85">
                {[
                  'Wszystko z niższego progu',
                  'Oba bonusy z prof. Maciejem Sochą od razu',
                  'Wideo, audio, rozdziały i materiał PDF',
                  'Dostęp do kolejnych materiałów klubowych',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check size={17} className="mt-0.5 shrink-0 text-esti-gold" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="border border-esti-beige bg-esti-light p-7 md:p-9">
              <Crown size={25} className="text-esti-gold" />
              <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-esti-taupe">Mecenas EstiTalk</p>
              <p className="mt-3 font-serif text-5xl">{SOCHA_PATRONITE.tiers.patron} zł</p>
              <p className="mt-1 text-xs text-esti-taupe">miesięcznie</p>
              <p className="mt-6 text-sm font-light leading-relaxed text-esti-taupe">
                Dla osób, które chcą w większym stopniu współfinansować kolejne eksperckie rozmowy.
              </p>
              <ul className="mt-7 space-y-3 text-sm">
                {['Wszystko z Klubu EstiTalk', 'Imię lub nazwa w podziękowaniach', 'Status Mecenasa społeczności'].map(
                  (item) => (
                    <li key={item} className="flex items-start gap-3">
                      <Check size={17} className="mt-0.5 shrink-0 text-esti-gold" />
                      <span>{item}</span>
                    </li>
                  )
                )}
              </ul>
            </article>
          </div>

          <div id="start-patronite" className="mx-auto mt-10 max-w-6xl scroll-mt-28 bg-esti-beige/35 p-7 md:p-9">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-esti-gold">
                  {patroniteReady ? 'Klub EstiTalk jest otwarty' : 'Profil Patronite w przygotowaniu'}
                </p>
                <h3 className="mt-3 font-serif text-3xl">
                  {patroniteReady ? 'Dołącz i odblokuj cały pakiet.' : 'Wkrótce otworzymy zapisy do Klubu EstiTalk.'}
                </h3>
                {!patroniteReady && (
                  <p className="mt-3 max-w-2xl text-sm font-light leading-relaxed text-esti-taupe">
                    Strona pokazuje już pełny model członkostwa. Przycisk dołączenia uruchomimy wraz z oficjalnym
                    profilem EstiTalk na Patronite.
                  </p>
                )}
              </div>
              {patroniteReady ? (
                <PatroniteLink className="group inline-flex shrink-0 items-center justify-center gap-3 bg-esti-dark px-8 py-4 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-esti-gold hover:text-esti-dark">
                  Dołączam na Patronite
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </PatroniteLink>
              ) : (
                <a
                  href="mailto:kontakt@estitalk.pl?subject=Klub%20EstiTalk%20%E2%80%94%20informacja%20o%20starcie"
                  className="group inline-flex shrink-0 items-center justify-center gap-3 bg-esti-dark px-8 py-4 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-esti-gold hover:text-esti-dark"
                >
                  Powiadomcie mnie o starcie
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-esti-dark py-24 text-white">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-3xl">
            <div className="mb-10 text-center">
              <Headphones size={28} className="mx-auto mb-5 text-esti-gold" />
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-esti-gold">Zanim dołączysz</p>
              <h2 className="mt-4 font-serif text-4xl">Najczęstsze pytania</h2>
            </div>

            <div className="space-y-3">
              {FAQ.map((item) => (
                <details key={item.question} className="group border border-white/10 bg-white/5 p-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-5 font-medium">
                    {item.question}
                    <span className="text-2xl font-light text-esti-gold transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="pt-4 text-sm font-light leading-relaxed text-white/65">{item.answer}</p>
                </details>
              ))}
            </div>

            <div className="mt-10 text-center">
              <PatroniteLink className="group inline-flex items-center justify-center gap-3 bg-esti-gold px-8 py-4 text-sm font-bold uppercase tracking-widest text-esti-dark transition-colors hover:bg-white">
                {patroniteReady ? 'Dołączam do Klubu EstiTalk' : 'Zobacz planowane progi'}
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </PatroniteLink>
              <p className="mt-5 text-xs font-light leading-relaxed text-white/45">
                Materiały edukacyjne. Nie stanowią indywidualnej porady ani konsultacji medycznej.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
