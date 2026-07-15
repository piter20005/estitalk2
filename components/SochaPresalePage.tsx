import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Headphones,
  LockKeyhole,
  Mail,
  MessageCircleQuestion,
  Play,
  ReceiptText,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { SOCHA_PRESALE } from '@/lib/sochaPresale';

const TOPICS = [
  'Pierwsze, nieoczywiste objawy perimenopauzy: sen, nastrój, stawy i zmiany w ciele',
  'Dlaczego regularna miesiączka nie zawsze kończy rozmowę o zmianach hormonalnych',
  'HTM: pytania o korzyści, ryzyko, czas rozpoczęcia i dobór drogi podania',
  'Wpływ hormonów na skórę, okolice intymne i odczuwanie efektów zabiegów',
  'Testosteron u kobiet — wskazania, ograniczenia i najczęstsze nieporozumienia',
  'Suchość, ból podczas współżycia i sygnały, których nie trzeba normalizować',
  'Libido i bliskość w długoletniej relacji, również bez penetracji',
  'Jak przygotować się do rozmowy z lekarzem i nie zostać samą z objawami',
];

const FAQ = [
  {
    question: 'Co pozostanie dostępne bezpłatnie?',
    answer:
      'Pierwsza, kompletna część rozmowy o objawach perimenopauzy i drodze do rozpoznania zostanie opublikowana bezpłatnie. Przedsprzedaż obejmuje dwa dalsze moduły: „Hormony i ciało” oraz „Seks, libido i relacje”.',
  },
  {
    question: 'Kiedy otrzymam dostęp?',
    answer:
      'Dokładny termin premiery oraz instrukcję dostępu wyślemy na adres e-mail podany podczas płatności. Nie trzeba zakładać dodatkowego konta podczas przedsprzedaży.',
  },
  {
    question: 'Czy moje zamówienie jest zabezpieczone?',
    answer:
      'Tak. Jeżeli materiał nie zostanie opublikowany, otrzymasz zwrot 100% wpłaconej kwoty tą samą metodą płatności.',
  },
  {
    question: 'Czy to jest konsultacja medyczna?',
    answer:
      'Nie. Materiał ma charakter edukacyjny i nie zastępuje indywidualnej diagnozy, badania ani zaleceń lekarza prowadzącego.',
  },
  {
    question: 'Jak wygląda płatność?',
    answer:
      'Płatność jest jednorazowa i obsługiwana przez Stripe. Dostępne metody zależą od ustawień Stripe i urządzenia kupującej osoby. Po płatności otrzymasz potwierdzenie e-mailem.',
  },
];

type PresaleStatus = 'success' | 'cancelled' | 'terms' | 'unavailable' | 'error' | undefined;

const STATUS_CONTENT: Record<Exclude<PresaleStatus, undefined>, { title: string; description: string }> = {
  success: {
    title: 'Dziękujemy — zamówienie jest opłacone.',
    description:
      'Potwierdzenie płatności wysłał Stripe. Informację o terminie premiery i dostępie wyślemy na ten sam adres e-mail.',
  },
  cancelled: {
    title: 'Płatność nie została zakończona.',
    description: 'Nic nie zostało pobrane. Możesz wrócić do zamówienia, kiedy będziesz gotowa lub gotowy.',
  },
  terms: {
    title: 'Potrzebujemy akceptacji zasad przedsprzedaży.',
    description: 'Zaznacz pole pod przyciskiem zamówienia i spróbuj ponownie.',
  },
  unavailable: {
    title: 'Płatność jest chwilowo niedostępna.',
    description: 'Spróbuj ponownie później lub napisz na kontakt@estitalk.pl.',
  },
  error: {
    title: 'Nie udało się uruchomić płatności.',
    description: 'Spróbuj ponownie za chwilę. Jeśli problem się powtórzy, napisz na kontakt@estitalk.pl.',
  },
};

export default function SochaPresalePage({ status }: { status?: PresaleStatus }) {
  const statusContent = status ? STATUS_CONTENT[status] : undefined;
  const isSuccess = status === 'success';

  return (
    <div className="bg-esti-light text-esti-dark">
      <section className="relative min-h-[92vh] overflow-hidden bg-esti-dark pt-32 pb-20 text-white">
        <Image
          src="/images/studio.png"
          alt="Studio podcastu EstiTalk"
          fill
          priority
          className="object-cover opacity-45"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-esti-dark via-transparent to-black/30" />

        <div className="container relative z-10 mx-auto px-6">
          {statusContent && (
            <div
              className={`mb-8 max-w-3xl border px-5 py-4 backdrop-blur-sm ${
                isSuccess
                  ? 'border-emerald-300/40 bg-emerald-950/60'
                  : 'border-esti-gold/40 bg-black/45'
              }`}
              role="status"
            >
              <div className="flex items-start gap-3">
                {isSuccess ? (
                  <CheckCircle2 className="mt-0.5 shrink-0 text-emerald-300" size={22} />
                ) : (
                  <MessageCircleQuestion className="mt-0.5 shrink-0 text-esti-gold" size={22} />
                )}
                <div>
                  <p className="font-semibold text-white">{statusContent.title}</p>
                  <p className="mt-1 text-sm font-light leading-relaxed text-white/70">
                    {statusContent.description}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="grid items-center gap-14 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="max-w-3xl">
              <span className="mb-7 inline-flex items-center gap-2 border border-white/25 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] backdrop-blur-sm">
                <Sparkles size={14} className="text-esti-gold" />
                EstiTalk Special · przedsprzedaż
              </span>
              <h1 className="font-serif text-5xl leading-[0.98] sm:text-6xl lg:text-7xl">
                Menopauza
                <br />
                <span className="italic text-esti-beige">bez tabu.</span>
              </h1>
              <p className="mt-7 max-w-2xl text-lg font-light leading-relaxed text-white/80 sm:text-xl">
                Hormony, ciało, seks i relacje w szczerej rozmowie dr Tatiany Jasińskiej z prof. Maciejem Sochą.
                Ponad trzy godziny materiału dla kobiet, które chcą lepiej rozumieć zachodzące w nich zmiany i
                świadomie rozmawiać o nich z lekarzem.
              </p>
              <div className="mt-9 flex flex-wrap gap-3 text-sm text-white/75">
                <span className="border border-white/20 bg-black/20 px-4 py-2 backdrop-blur-sm">
                  prof. dr hab. n. med. Maciej Socha
                </span>
                <span className="border border-white/20 bg-black/20 px-4 py-2 backdrop-blur-sm">
                  {SOCHA_PRESALE.premiumDuration} premium
                </span>
                <span className="border border-white/20 bg-black/20 px-4 py-2 backdrop-blur-sm">
                  jednorazowy dostęp
                </span>
              </div>
              <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                <a
                  href="#zamow"
                  className="group inline-flex items-center justify-center gap-3 bg-esti-gold px-8 py-4 text-sm font-bold uppercase tracking-widest text-esti-dark transition-colors hover:bg-white"
                >
                  Kupuję dostęp za {SOCHA_PRESALE.priceGrossPln} zł
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </a>
                <a
                  href="#co-otrzymasz"
                  className="inline-flex items-center gap-2 py-4 text-sm uppercase tracking-widest text-white/75 transition-colors hover:text-white"
                >
                  <Play size={15} fill="currentColor" />
                  Zobacz program
                </a>
              </div>
            </div>

            <aside id="zamow" className="scroll-mt-32 bg-esti-light p-7 text-esti-dark shadow-2xl sm:p-9">
              {isSuccess ? (
                <div className="py-6 text-center">
                  <CheckCircle2 size={48} className="mx-auto mb-5 text-emerald-600" />
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">Zamówienie opłacone</p>
                  <h2 className="mt-3 font-serif text-3xl">Jesteś na liście premierowej.</h2>
                  <p className="mt-4 text-sm font-light leading-relaxed text-esti-taupe">
                    Wszystkie informacje otrzymasz na adres e-mail podany podczas płatności.
                  </p>
                  <Link
                    href="/odcinki"
                    className="mt-7 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-esti-dark underline decoration-esti-gold underline-offset-4"
                  >
                    Zobacz bezpłatne odcinki
                    <ArrowRight size={14} />
                  </Link>
                </div>
              ) : (
                <>
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-esti-gold">
                    Cena przedsprzedażowa
                  </p>
                  <div className="mt-4 flex items-end gap-2">
                    <span className="font-serif text-6xl leading-none">{SOCHA_PRESALE.priceGrossPln} zł</span>
                    <span className="pb-1 text-sm text-esti-taupe">brutto</span>
                  </div>
                  <p className="mt-4 text-sm font-light leading-relaxed text-esti-taupe">
                    Jedna płatność. Bez subskrypcji. Informację o premierze otrzymasz e-mailem.
                  </p>

                  <div className="my-7 border-y border-esti-beige py-6">
                    <ul className="space-y-3 text-sm">
                      {[
                        'Moduł 1: Hormony i ciało',
                        'Moduł 2: Seks, libido i relacje',
                        'Materiał podzielony na wygodne rozdziały',
                        'Premiera dla kupujących bez reklam',
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <Check size={17} className="mt-0.5 shrink-0 text-esti-gold" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <form action="/api/socha-presale/checkout" method="post">
                    <label className="mb-5 flex cursor-pointer items-start gap-3 text-xs font-light leading-relaxed text-esti-taupe">
                      <input
                        type="checkbox"
                        name="terms"
                        value="accepted"
                        required
                        className="mt-0.5 h-4 w-4 shrink-0 accent-[#C5A065]"
                      />
                      <span>
                        Akceptuję opisane na tej stronie zasady przedsprzedaży oraz{' '}
                        <Link
                          href="/polityka-prywatnosci"
                          className="font-medium text-esti-dark underline underline-offset-2"
                        >
                          politykę prywatności
                        </Link>
                        .
                      </span>
                    </label>
                    <button
                      type="submit"
                      className="group flex w-full items-center justify-center gap-3 bg-esti-dark px-6 py-4 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-esti-gold hover:text-esti-dark"
                    >
                      Kupuję dostęp za {SOCHA_PRESALE.priceGrossPln} zł
                      <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                    </button>
                  </form>

                  <div className="mt-5 flex items-center justify-center gap-2 text-xs text-esti-taupe">
                    <ShieldCheck size={15} className="text-esti-gold" />
                    Bezpieczna płatność obsługiwana przez Stripe
                  </div>
                </>
              )}
            </aside>
          </div>
        </div>
      </section>

      <section id="co-otrzymasz" className="scroll-mt-24 bg-white py-24">
        <div className="container mx-auto px-6">
          <div className="mx-auto mb-14 max-w-4xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-esti-gold">Jedna rozmowa, trzy części</p>
            <h2 className="mt-4 font-serif text-4xl md:text-5xl">
              Zaczynasz bezpłatnie. Potem sięgasz po wiedzę, która idzie głębiej.
            </h2>
            <p className="mt-5 text-lg font-light leading-relaxed text-esti-taupe">
              Płatny dostęp to nie tylko dłuższa wersja podcastu. To dwa uporządkowane moduły, które pomagają nazwać
              objawy, przygotować konkretne pytania do lekarza i swobodniej rozmawiać o zmianach w intymności.
            </p>
          </div>

          <div className="mx-auto max-w-6xl">
            <div className="grid items-center gap-7 border border-esti-beige bg-esti-light p-7 md:grid-cols-[auto_1fr_auto] md:p-9">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-esti-gold">
                <Play size={21} fill="currentColor" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-esti-taupe">Część bezpłatna</p>
                  <span className="bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-esti-gold">
                    Pełny odcinek
                  </span>
                </div>
                <h3 className="mt-3 font-serif text-3xl">Objawy i droga do rozpoznania</h3>
                <p className="mt-3 max-w-3xl font-light leading-relaxed text-esti-taupe">
                  Nieoczywiste sygnały perimenopauzy, regularna miesiączka, sen, nastrój i moment, w którym pozornie
                  niezwiązane dolegliwości zaczynają układać się w jedną historię.
                </p>
              </div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-esti-taupe">Oglądasz bez opłat</span>
            </div>

            <div className="mt-6 border border-esti-dark bg-esti-dark p-7 text-white shadow-xl md:p-10">
              <div className="mb-9 flex flex-col gap-4 border-b border-white/15 pb-8 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <LockKeyhole size={19} className="text-esti-gold" />
                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-esti-gold">Dostęp premium</p>
                  </div>
                  <h3 className="mt-3 font-serif text-3xl md:text-4xl">Dwa pogłębione moduły po zakupie</h3>
                </div>
                <p className="max-w-sm text-sm font-light leading-relaxed text-white/55">
                  {SOCHA_PRESALE.premiumDuration} materiału podzielonego na wygodne rozdziały.
                </p>
              </div>

              <div className="grid gap-px overflow-hidden bg-white/15 lg:grid-cols-2">
                <article className="bg-esti-dark p-1 pr-0 lg:pr-px">
                  <div className="h-full bg-white/[0.04] p-7 md:p-9">
                    <div className="flex items-center justify-between gap-4">
                      <span className="font-serif text-4xl italic text-esti-gold">01</span>
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/45">Hormony</span>
                    </div>
                    <h4 className="mt-5 font-serif text-3xl">Hormony i ciało</h4>
                    <p className="mt-4 text-sm font-light leading-relaxed text-white/65">
                      HTM bez prostego podziału „za albo przeciw”, testosteron u kobiet oraz wpływ zmian hormonalnych
                      na skórę, śluzówki, okolice intymne i codzienne funkcjonowanie.
                    </p>
                    <ul className="mt-7 space-y-4 text-sm leading-relaxed text-white/80">
                      {[
                        'Uporządkujesz najważniejsze pytania o korzyści, ryzyko i moment rozpoczęcia HTM.',
                        'Zrozumiesz, dlaczego sposób podania i indywidualny wywiad mają znaczenie.',
                        'Dowiesz się, o jakie objawy i możliwości warto zapytać podczas wizyty lekarskiej.',
                      ].map((benefit) => (
                        <li key={benefit} className="flex items-start gap-3">
                          <Check size={17} className="mt-0.5 shrink-0 text-esti-gold" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-8 border-l-2 border-esti-gold pl-4 text-sm font-light italic leading-relaxed text-white/55">
                      Po tej części łatwiej nazwiesz swoje objawy i przygotujesz konkretną listę pytań do lekarza.
                    </div>
                  </div>
                </article>

                <article className="bg-esti-dark p-1 pl-0 lg:pl-px">
                  <div className="h-full bg-white/[0.04] p-7 md:p-9">
                    <div className="flex items-center justify-between gap-4">
                      <span className="font-serif text-4xl italic text-esti-gold">02</span>
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/45">Intymność</span>
                    </div>
                    <h4 className="mt-5 font-serif text-3xl">Seks, libido i relacje</h4>
                    <p className="mt-4 text-sm font-light leading-relaxed text-white/65">
                      Suchość, ból, zmiany pożądania i bliskość w długoletniej relacji — bez zawstydzania i bez
                      sprowadzania seksualności wyłącznie do penetracji.
                    </p>
                    <ul className="mt-7 space-y-4 text-sm leading-relaxed text-white/80">
                      {[
                        'Rozpoznasz sygnały, których nie trzeba akceptować jako „normalnej ceny wieku”.',
                        'Lepiej zrozumiesz, co może wpływać na libido i odczuwanie przyjemności.',
                        'Zyskasz język do rozmowy z lekarzem i partnerem o bólu, potrzebach i bliskości.',
                      ].map((benefit) => (
                        <li key={benefit} className="flex items-start gap-3">
                          <Check size={17} className="mt-0.5 shrink-0 text-esti-gold" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-8 border-l-2 border-esti-gold pl-4 text-sm font-light italic leading-relaxed text-white/55">
                      Po tej części łatwiej nazwiesz tematy, które chcesz skonsultować, oraz te, o których warto
                      porozmawiać w relacji.
                    </div>
                  </div>
                </article>
              </div>

              <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <p className="max-w-2xl text-sm font-light leading-relaxed text-white/55">
                  Materiał edukacyjny nie zastępuje konsultacji, ale pomaga wejść w nią z większą świadomością i
                  lepiej wykorzystać czas rozmowy ze specjalistą.
                </p>
                <a
                  href="#zamow"
                  className="shrink-0 bg-esti-gold px-7 py-4 text-center text-xs font-bold uppercase tracking-widest text-esti-dark transition-colors hover:bg-white"
                >
                  Kupuję oba moduły
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-esti-light py-24">
        <div className="container mx-auto px-6">
          <div className="grid gap-14 lg:grid-cols-[0.72fr_1.28fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-esti-gold">Program rozmowy</p>
              <h2 className="mt-4 font-serif text-4xl md:text-5xl">Pytania, które wiele kobiet zadaje dopiero za późno.</h2>
              <p className="mt-6 font-light leading-relaxed text-esti-taupe">
                Rozmowa nie obiecuje jednej recepty dla wszystkich. Porządkuje objawy, pokazuje zależności i pomaga
                lepiej przygotować się do indywidualnej rozmowy z lekarzem.
              </p>
            </div>
            <div className="grid gap-px overflow-hidden border border-esti-beige bg-esti-beige sm:grid-cols-2">
              {TOPICS.map((topic, index) => (
                <div key={topic} className="flex gap-4 bg-white p-6">
                  <span className="font-serif text-xl italic text-esti-gold">{String(index + 1).padStart(2, '0')}</span>
                  <p className="text-sm font-light leading-relaxed text-esti-dark">{topic}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-5xl">
            <div className="mb-14 text-center">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-esti-gold">Jak to działa</p>
              <h2 className="mt-4 font-serif text-4xl md:text-5xl">Od zamówienia do premiery</h2>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {[
                {
                  Icon: ReceiptText,
                  title: '1. Kupujesz dostęp',
                  text: `Płacisz jednorazowo ${SOCHA_PRESALE.priceGrossPln} zł. Bez subskrypcji i dodatkowych opłat.`,
                },
                {
                  Icon: Mail,
                  title: '2. Otrzymujesz potwierdzenie',
                  text: 'Potwierdzenie zamówienia i wszystkie informacje organizacyjne wysyłamy na adres podany podczas płatności.',
                },
                {
                  Icon: Play,
                  title: '3. Oglądasz pełny materiał',
                  text: 'W dniu premiery otrzymujesz prywatny dostęp do dwóch części premium i możesz wracać do nich w dowolnym momencie.',
                },
              ].map(({ Icon, title, text }) => (
                <div key={title} className="border-t border-esti-gold pt-7">
                  <Icon size={24} className="mb-5 text-esti-gold" />
                  <h3 className="font-serif text-2xl">{title}</h3>
                  <p className="mt-3 text-sm font-light leading-relaxed text-esti-taupe">{text}</p>
                </div>
              ))}
            </div>

            <div className="mt-14 flex flex-col gap-5 bg-esti-beige/35 p-7 sm:flex-row sm:items-center sm:justify-between sm:p-9">
              <div className="flex items-start gap-4">
                <ShieldCheck size={27} className="mt-1 shrink-0 text-esti-gold" />
                <div>
                  <p className="font-serif text-2xl">Zamówienie bez ryzyka</p>
                  <p className="mt-2 max-w-2xl text-sm font-light leading-relaxed text-esti-taupe">
                    Jeśli materiał nie zostanie opublikowany, zwrócimy 100% wpłaconej kwoty tą samą metodą płatności.
                    Bez dodatkowych formularzy i formalności.
                  </p>
                </div>
              </div>
              <a
                href="#zamow"
                className="shrink-0 bg-esti-dark px-7 py-4 text-center text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-esti-gold hover:text-esti-dark"
              >
                Kupuję dostęp za {SOCHA_PRESALE.priceGrossPln} zł
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-esti-dark py-24 text-white">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-3xl">
            <div className="mb-10 text-center">
              <Headphones size={28} className="mx-auto mb-5 text-esti-gold" />
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-esti-gold">Przed zamówieniem</p>
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
            <div className="mt-9 text-center">
              <a
                href="#zamow"
                className="group inline-flex items-center justify-center gap-3 bg-esti-gold px-8 py-4 text-sm font-bold uppercase tracking-widest text-esti-dark transition-colors hover:bg-white"
              >
                Kupuję dostęp za {SOCHA_PRESALE.priceGrossPln} zł
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </a>
              <p className="mt-5 text-xs font-light leading-relaxed text-white/45">
                Materiał edukacyjny. Nie stanowi indywidualnej porady ani konsultacji medycznej.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
