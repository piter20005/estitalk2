'use client';

import { useState } from 'react';
import { Send, Check, AlertCircle, Loader2 } from 'lucide-react';

// Aby aktywować newsletter:
// 1. Wejdź na https://formspree.io i utwórz darmowe konto
// 2. Utwórz nowy formularz i skopiuj ID (np. "xyzabcde")
// 3. Podmień poniższe YOUR_FORM_ID na swoje ID
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status === 'loading') return;

    setStatus('loading');
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="newsletter" className="py-24 bg-esti-beige relative overflow-hidden">
      <div className="absolute top-0 left-0 w-64 h-64 border border-white/20 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="w-full lg:w-1/2">
            <div className="relative rounded-sm overflow-hidden shadow-xl aspect-[4/3]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/studio.png"
                alt="Studio Esti Talk"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-esti-dark/20" />
            </div>
          </div>

          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <h2 className="font-serif text-4xl md:text-5xl text-esti-dark mb-6">
              Zostań częścią społeczności <br />
              <span className="italic">Esti Talk</span>
            </h2>

            <p className="font-sans text-lg text-esti-dark/80 mb-12 leading-relaxed">
              Dołącz do naszej społeczności i bądź na bieżąco! Otrzymuj powiadomienia o nowych odcinkach, ciekawostki
              ze świata dermatologii oraz ekskluzywne porady od Dr Tatiany Jasińskiej.
            </p>

            <form onSubmit={handleSubmit} className="max-w-md mx-auto lg:mx-0">
              {status === 'success' ? (
                <div className="flex items-center gap-3 py-4 text-esti-dark">
                  <Check size={20} className="text-green-600 flex-shrink-0" />
                  <p className="font-sans font-medium">Dziękujemy! Zostałeś/aś zapisany/a.</p>
                </div>
              ) : (
                <>
                  <div className="relative flex items-center border-b border-esti-dark pb-2 focus-within:border-white transition-colors">
                    <input
                      type="email"
                      placeholder="Twój adres email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={status === 'loading'}
                      className="w-full bg-transparent border-none outline-none text-esti-dark placeholder-esti-dark/50 font-sans text-lg py-2 pr-12 disabled:opacity-50 transition-all"
                    />
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="absolute right-0 top-1/2 -translate-y-1/2 text-esti-dark hover:text-white disabled:opacity-50 transition-colors p-2"
                      aria-label="Zapisz się"
                    >
                      {status === 'loading' ? <Loader2 size={22} className="animate-spin" /> : <Send size={22} strokeWidth={1.5} />}
                    </button>
                  </div>
                  {status === 'error' && (
                    <div className="flex items-center gap-2 mt-3 text-red-700 text-sm">
                      <AlertCircle size={16} />
                      <span>Coś poszło nie tak. Spróbuj ponownie.</span>
                    </div>
                  )}
                </>
              )}
            </form>

            <p className="mt-8 text-xs text-esti-dark/60 uppercase tracking-widest font-light">
              Dbamy o Twoją prywatność. Zero spamu.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
