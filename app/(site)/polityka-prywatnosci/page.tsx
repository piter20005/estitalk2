import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Polityka prywatności',
  description:
    'Zasady przetwarzania danych osobowych użytkowników serwisu EstiTalk oraz informacje o plikach cookies.',
  robots: { index: true, follow: true },
};

const LAST_UPDATED = '17 kwietnia 2026';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-esti-light pt-24 pb-20 animate-fade-in-up">
      <div className="container mx-auto px-6 max-w-3xl">
        <Link
          href="/"
          className="group flex items-center gap-2 text-xs uppercase tracking-widest text-esti-taupe hover:text-esti-dark mb-10 transition-colors"
        >
          <div className="p-2 border border-esti-taupe/30 rounded-full group-hover:border-esti-dark transition-colors">
            <ArrowLeft size={14} />
          </div>
          <span>Wróć do strony głównej</span>
        </Link>

        <header className="mb-12">
          <h1 className="font-serif text-4xl md:text-5xl text-esti-dark leading-tight mb-4">
            Polityka prywatności
          </h1>
          <p className="text-sm text-esti-taupe">Ostatnia aktualizacja: {LAST_UPDATED}</p>
        </header>

        <article className="space-y-10 text-esti-taupe font-light leading-relaxed">
          <Section title="1. Administrator danych">
            <p>
              Administratorem danych osobowych zbieranych za pośrednictwem serwisu{' '}
              <strong className="text-esti-dark">estitalk.pl</strong> jest{' '}
              <span className="text-esti-dark font-medium">
                [DO UZUPEŁNIENIA: pełna nazwa firmy / dane osoby fizycznej prowadzącej działalność]
              </span>
              , z siedzibą pod adresem{' '}
              <span className="text-esti-dark font-medium">[DO UZUPEŁNIENIA: adres siedziby]</span>,
              NIP: <span className="text-esti-dark font-medium">[DO UZUPEŁNIENIA: NIP]</span>.
            </p>
            <p>
              Kontakt z administratorem:{' '}
              <a
                href="mailto:kontakt@estitalk.pl"
                className="text-esti-dark underline underline-offset-2 hover:text-esti-gold transition-colors"
              >
                kontakt@estitalk.pl
              </a>
              .
            </p>
          </Section>

          <Section title="2. Zakres i cele przetwarzania danych">
            <p>Twoje dane osobowe przetwarzamy w następujących celach:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong className="text-esti-dark">Newsletter</strong> — wysyłka informacji o nowych
                odcinkach i wydarzeniach (na podstawie Twojej zgody, art. 6 ust. 1 lit. a RODO).
                Przetwarzamy adres e-mail.
              </li>
              <li>
                <strong className="text-esti-dark">Statystyki i analityka</strong> — Google Analytics
                w trybie zanonimizowanym (na podstawie Twojej zgody wyrażonej w bannerze cookies).
              </li>
              <li>
                <strong className="text-esti-dark">Sprzedaż dostępu do treści premium</strong>{' '}
                (sekcja „For Doctors") — realizacja umowy zakupu (art. 6 ust. 1 lit. b RODO).
                Płatność obsługuje Stripe.
              </li>
              <li>
                <strong className="text-esti-dark">Korespondencja</strong> — odpowiedzi na zapytania
                kierowane na adres e-mail (art. 6 ust. 1 lit. f RODO — uzasadniony interes).
              </li>
            </ul>
          </Section>

          <Section title="3. Odbiorcy danych — podmioty trzecie">
            <p>Korzystamy z następujących dostawców, którym powierzamy przetwarzanie danych:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong className="text-esti-dark">Google Ireland Ltd.</strong> — Google Analytics
                (statystyki ruchu).
              </li>
              <li>
                <strong className="text-esti-dark">Formspree, Inc.</strong> — obsługa formularza
                newslettera (USA, transfer na podstawie Standardowych Klauzul Umownych UE).
              </li>
              <li>
                <strong className="text-esti-dark">Sanity.io</strong> — system zarządzania treścią
                (CMS).
              </li>
              <li>
                <strong className="text-esti-dark">Netlify, Inc.</strong> — hosting strony.
              </li>
              <li>
                <strong className="text-esti-dark">Cloudinary Ltd.</strong> — hosting mediów (wideo,
                obrazy).
              </li>
              <li>
                <strong className="text-esti-dark">Stripe Payments Europe Ltd.</strong> — płatności
                online za dostęp do treści premium.
              </li>
              <li>
                <strong className="text-esti-dark">Vimeo, Inc.</strong> — odtwarzanie wideo dla
                lekarzy.
              </li>
            </ul>
          </Section>

          <Section title="4. Okres przechowywania danych">
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Dane subskrybentów newslettera — do momentu wycofania zgody (rezygnacji z
                subskrypcji).
              </li>
              <li>
                Dane analityczne (Google Analytics) — zgodnie z domyślnym ustawieniem GA4
                (maksymalnie 14 miesięcy).
              </li>
              <li>
                Dane transakcji — przez okres wymagany przepisami prawa podatkowego (5 lat od końca
                roku obrotowego).
              </li>
              <li>Korespondencja e-mail — przez okres niezbędny do udzielenia odpowiedzi i ewentualnej kontynuacji rozmowy.</li>
            </ul>
          </Section>

          <Section title="5. Twoje prawa">
            <p>Zgodnie z RODO przysługują Ci następujące prawa:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>prawo dostępu do swoich danych oraz uzyskania ich kopii;</li>
              <li>prawo do sprostowania (poprawiania) danych;</li>
              <li>prawo do usunięcia danych („prawo do bycia zapomnianym");</li>
              <li>prawo do ograniczenia przetwarzania;</li>
              <li>prawo do przenoszenia danych;</li>
              <li>prawo do wniesienia sprzeciwu wobec przetwarzania;</li>
              <li>prawo do wycofania zgody w dowolnym momencie (bez wpływu na zgodność z prawem przetwarzania dokonanego przed wycofaniem);</li>
              <li>
                prawo do wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych (
                <a
                  href="https://uodo.gov.pl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-esti-dark underline underline-offset-2 hover:text-esti-gold transition-colors"
                >
                  uodo.gov.pl
                </a>
                ).
              </li>
            </ul>
            <p>
              Aby skorzystać ze swoich praw, napisz do nas na{' '}
              <a
                href="mailto:kontakt@estitalk.pl"
                className="text-esti-dark underline underline-offset-2 hover:text-esti-gold transition-colors"
              >
                kontakt@estitalk.pl
              </a>
              .
            </p>
          </Section>

          <Section title="6. Pliki cookies">
            <p>
              Strona używa plików cookies w celu zapewnienia jej prawidłowego działania oraz — za
              Twoją zgodą — analizy ruchu. Stosujemy następujące kategorie:
            </p>
            <div className="space-y-4">
              <div>
                <h3 className="text-esti-dark font-medium mb-1">
                  Niezbędne (zawsze aktywne)
                </h3>
                <p className="text-sm">
                  Wymagane do działania strony i zapamiętania Twoich preferencji dot. cookies.
                  Przykład: <code className="text-xs bg-esti-beige/30 px-1.5 py-0.5 rounded">cookie_consent</code>{' '}
                  (localStorage, bezterminowo do czasu wyczyszczenia przeglądarki).
                </p>
              </div>
              <div>
                <h3 className="text-esti-dark font-medium mb-1">
                  Analityczne (wymagają zgody)
                </h3>
                <p className="text-sm">
                  Google Analytics 4: <code className="text-xs bg-esti-beige/30 px-1.5 py-0.5 rounded">_ga</code>,{' '}
                  <code className="text-xs bg-esti-beige/30 px-1.5 py-0.5 rounded">_ga_*</code> — pomagają nam
                  zrozumieć, jak korzystasz ze strony. Czas życia: do 2 lat. IP jest anonimizowane.
                </p>
              </div>
            </div>
            <p>
              W każdej chwili możesz zmienić swoją decyzję, klikając „Ustawienia cookies" w stopce
              lub kasując ciasteczka w ustawieniach przeglądarki.
            </p>
          </Section>

          <Section title="7. Bezpieczeństwo">
            <p>
              Stosujemy odpowiednie środki techniczne i organizacyjne chroniące Twoje dane przed
              utratą, nieautoryzowanym dostępem lub ujawnieniem (m.in. szyfrowanie HTTPS, ograniczony
              dostęp do systemów, regularne aktualizacje oprogramowania).
            </p>
          </Section>

          <Section title="8. Zmiany polityki prywatności">
            <p>
              Niniejsza polityka może być aktualizowana. O istotnych zmianach poinformujemy w
              widocznym miejscu na stronie. Data ostatniej aktualizacji znajduje się na początku tego
              dokumentu.
            </p>
          </Section>
        </article>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-serif text-2xl text-esti-dark mb-4">{title}</h2>
      <div className="space-y-4 text-base">{children}</div>
    </section>
  );
}
