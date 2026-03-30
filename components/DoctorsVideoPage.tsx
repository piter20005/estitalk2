import React, { useEffect } from 'react';
import { ArrowLeft, ArrowRight, ShoppingBag, Lock, CheckCircle } from 'lucide-react';

interface DoctorsVideoPageProps {
  onBack: () => void;
  isUnlocked: boolean;
}

const DoctorsVideoPage: React.FC<DoctorsVideoPageProps> = ({ onBack, isUnlocked }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-esti-light pt-24 pb-20 animate-fade-in-up">
      <div className="container mx-auto px-6 max-w-4xl">

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
        <div className="mb-10 text-center">
          <span className="inline-block bg-esti-gold/10 text-esti-gold px-4 py-1.5 rounded-full text-xs font-bold tracking-[0.2em] uppercase border border-esti-gold/30 mb-6">
            EstiTalk for Doctors
          </span>
          <h1 className="font-serif text-5xl md:text-6xl text-esti-dark leading-tight">
            Film premium
          </h1>
        </div>

        {/* Video area */}
        <div className="mb-10 shadow-xl rounded-sm overflow-hidden">
          {isUnlocked ? (
            /* Unlocked: full Vimeo embed */
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
          ) : (
            /* Locked: placeholder with lock icon */
            <div className="relative aspect-video w-full bg-zinc-900 flex flex-col items-center justify-center gap-4">
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
                <Lock size={28} className="text-esti-gold" />
              </div>
              <p className="text-white/60 text-sm font-sans tracking-wide">
                Kup dostęp, aby obejrzeć film
              </p>
            </div>
          )}
        </div>

        {isUnlocked ? (
          /* Success state */
          <div className="bg-white border border-gray-100 shadow-sm rounded-sm p-8 text-center">
            <CheckCircle size={36} className="text-green-500 mx-auto mb-4" />
            <h2 className="font-serif text-2xl text-esti-dark mb-2">
              Dziękujemy za zakup!
            </h2>
            <p className="text-esti-taupe text-sm">
              Możesz teraz odtworzyć film powyżej.
            </p>
          </div>
        ) : (
          /* Purchase CTA */
          <div className="bg-zinc-900 text-white rounded-sm p-10 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-esti-gold/10 rounded-full blur-[80px] pointer-events-none" />
            <div className="relative z-10">
              <ShoppingBag size={28} className="text-esti-gold mx-auto mb-4" />
              <h2 className="font-serif text-3xl md:text-4xl mb-3">
                Kup dostęp do filmu
              </h2>
              <p className="text-gray-400 mb-8 max-w-md mx-auto text-sm leading-relaxed">
                Jednorazowa płatność — dostęp do pełnej wersji bez limitu czasu.
              </p>
              <a
                href="https://buy.stripe.com/eVq7sK55mbDG9IFczFgMw02"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 bg-esti-gold text-esti-dark px-10 py-4 rounded-sm font-bold uppercase tracking-widest hover:bg-white transition-all duration-300"
              >
                <span>Kup teraz</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <p className="mt-6 text-xs text-gray-500">
                Płatność bezpieczna przez Stripe.
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default DoctorsVideoPage;
