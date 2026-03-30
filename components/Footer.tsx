import React from 'react';
import { Instagram, Facebook, Mail } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: 'home' | 'episodes' | 'doctors') => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNavClick = (view: 'home' | 'episodes', href: string) => {
    if (view === 'home') {
      onNavigate('home');
      if (href.startsWith('#')) {
        setTimeout(() => {
          const element = document.querySelector(href);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      onNavigate('episodes');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-esti-dark text-esti-light pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-20">

          <div className="max-w-md">
            <div className="flex items-center gap-2 mb-8">
              <img
                src="/images/logo with transparent background.png"
                alt="Esti Talk Logo"
                className="h-12 w-auto object-contain brightness-0 invert"
              />
            </div>
            <h3 className="font-serif text-3xl mb-6 text-esti-beige">
              Rozmawiamy o tym, <br /> co widać i czego nie widać.
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-12 md:gap-24">
            <div>
              <h4 className="font-sans text-xs font-bold uppercase tracking-widest text-esti-beige mb-6">Menu</h4>
              <ul className="space-y-4 font-light text-sm opacity-80">
                <li><button onClick={() => handleNavClick('home', '#about')} className="hover:text-white transition-colors text-left">O Podcaście</button></li>
                <li><button onClick={() => handleNavClick('episodes', '#')} className="hover:text-white transition-colors text-left">Odcinki</button></li>
                <li><button onClick={() => handleNavClick('home', '#listen')} className="hover:text-white transition-colors text-left">Gdzie słuchać</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-sans text-xs font-bold uppercase tracking-widest text-esti-beige mb-6">Kontakt</h4>
              <ul className="space-y-4 font-light text-sm opacity-80">
                <li><a href="mailto:kontakt@estitalk.pl" className="hover:text-white transition-colors">kontakt@estitalk.pl</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Dla mediów</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Współpraca</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs font-light opacity-50 uppercase tracking-wide">
            &copy; {new Date().getFullYear()} Esti Talk. Wszelkie prawa zastrzeżone.
          </p>

          <div className="flex gap-6">
            <a href="#" className="opacity-60 hover:opacity-100 hover:text-esti-beige transition-all">
              <Instagram size={20} />
            </a>
            <a href="#" className="opacity-60 hover:opacity-100 hover:text-esti-beige transition-all">
              <Facebook size={20} />
            </a>
            <a href="mailto:kontakt@estitalk.pl" className="opacity-60 hover:opacity-100 hover:text-esti-beige transition-all">
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;