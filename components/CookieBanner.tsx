'use client';

import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { Cookie, X } from 'lucide-react';

const STORAGE_KEY = 'cookie_consent';
const OPEN_EVENT = 'estitalk:open-cookie-settings';

type Consent = 'all' | 'essential' | null;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function applyConsent(consent: Exclude<Consent, null>) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  const granted = consent === 'all';
  window.gtag('consent', 'update', {
    ad_storage: granted ? 'granted' : 'denied',
    ad_user_data: granted ? 'granted' : 'denied',
    ad_personalization: granted ? 'granted' : 'denied',
    analytics_storage: granted ? 'granted' : 'denied',
  });
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Consent;
      if (!stored) setVisible(true);
    } catch {
      setVisible(true);
    }

    const handler = () => setVisible(true);
    window.addEventListener(OPEN_EVENT, handler);
    return () => window.removeEventListener(OPEN_EVENT, handler);
  }, []);

  const choose = useCallback((consent: Exclude<Consent, null>) => {
    try {
      localStorage.setItem(STORAGE_KEY, consent);
    } catch {
      /* ignore */
    }
    applyConsent(consent);
    setVisible(false);
  }, []);

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Zgoda na pliki cookies"
      className="fixed inset-x-0 bottom-0 z-[60] p-4 sm:p-6 pointer-events-none"
    >
      <div className="container mx-auto pointer-events-auto">
        <div className="bg-esti-light border border-esti-taupe/20 shadow-2xl rounded-sm p-6 md:p-7 max-w-3xl mx-auto md:ml-auto md:mr-0">
          <div className="flex items-start gap-4">
            <div className="hidden sm:flex w-10 h-10 rounded-full bg-esti-beige/40 items-center justify-center flex-shrink-0">
              <Cookie size={20} className="text-esti-dark" />
            </div>

            <div className="flex-1 min-w-0">
              <h2 className="font-serif text-lg text-esti-dark mb-2">
                Pliki cookies
              </h2>
              <p className="text-sm text-esti-taupe leading-relaxed font-light">
                Używamy plików cookies, aby zapewnić działanie strony i — za Twoją zgodą — analizować
                ruch (Google Analytics). Możesz w dowolnej chwili zmienić ustawienia. Szczegóły w{' '}
                <Link
                  href="/polityka-prywatnosci"
                  className="underline underline-offset-2 hover:text-esti-dark transition-colors"
                >
                  polityce prywatności
                </Link>
                .
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => choose('all')}
                  className="px-5 py-2.5 bg-esti-dark text-white text-xs font-bold uppercase tracking-widest rounded-sm hover:bg-esti-taupe transition-colors"
                >
                  Akceptuj wszystkie
                </button>
                <button
                  type="button"
                  onClick={() => choose('essential')}
                  className="px-5 py-2.5 border border-esti-taupe/40 text-esti-dark text-xs font-bold uppercase tracking-widest rounded-sm hover:border-esti-dark transition-colors"
                >
                  Tylko niezbędne
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={() => choose('essential')}
              aria-label="Zamknij i zaakceptuj tylko niezbędne"
              className="flex-shrink-0 -mr-2 -mt-2 p-2 text-esti-taupe hover:text-esti-dark transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function openCookieSettings() {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new Event(OPEN_EVENT));
}
