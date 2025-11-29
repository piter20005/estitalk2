import React, { useState } from 'react';
import { Send, Check } from 'lucide-react';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setStatus('success');
      setEmail('');
      // Simulate API call - reset status after 3 seconds
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <section className="py-24 bg-esti-beige relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-64 h-64 border border-white/20 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">

          <div className="w-full lg:w-1/2">
            <div className="relative rounded-sm overflow-hidden shadow-xl aspect-[4/3]">
              <img
                src="/images/studio.png"
                alt="Studio Esti Talk"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-esti-dark/20"></div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <h2 className="font-serif text-4xl md:text-5xl text-esti-dark mb-6">
              Zostań częścią społeczności <br />
              <span className="italic">Esti Talk</span>
            </h2>

            <p className="font-sans text-lg text-esti-dark/80 mb-12 leading-relaxed">
              Dołącz do naszej społeczności i bądź na bieżąco! Otrzymuj powiadomienia o nowych odcinkach,
              ciekawostki ze świata dermatologii oraz ekskluzywne porady od Dr Tatiany Jasińskiej.
            </p>

            <form onSubmit={handleSubmit} className="max-w-md mx-auto lg:mx-0 relative">
              <div className="relative flex items-center border-b border-esti-dark pb-2 transition-colors focus-within:border-white group">
                <input
                  type="email"
                  placeholder="Twój adres email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-transparent border-none outline-none text-esti-dark placeholder-esti-dark/50 font-sans text-lg py-2 pr-12 focus:placeholder-esti-dark/30 transition-all"
                />
                <button
                  type="submit"
                  disabled={status === 'success'}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-esti-dark hover:text-white disabled:text-esti-dark/50 transition-colors p-2"
                  aria-label="Zapisz się"
                >
                  {status === 'success' ? <Check size={24} /> : <Send size={24} strokeWidth={1.5} />}
                </button>
              </div>

              <div className={`absolute left-0 -bottom-10 w-full text-center lg:text-left transition-opacity duration-500 ${status === 'success' ? 'opacity-100' : 'opacity-0'}`}>
                <p className="text-sm font-medium text-esti-dark">
                  Dziękujemy za zapisanie się!
                </p>
              </div>
            </form>

            <p className="mt-12 text-xs text-esti-dark/60 uppercase tracking-widest font-light">
              Dbamy o Twoją prywatność. Zero spamu.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;