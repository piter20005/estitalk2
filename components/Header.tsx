import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  onNavigate: (view: 'home' | 'episodes' | 'doctors') => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (view: 'home' | 'episodes', href: string) => {
    setMobileMenuOpen(false);

    // If navigating to home section
    if (view === 'home') {
      onNavigate('home');
      // If it's a hash link, we need to wait for render then scroll
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

  const navLinks = [
    { name: 'O Prowadzącej', href: '#about', view: 'home' as const },
    { name: 'Odcinki', href: '#episodes', view: 'episodes' as const }, // Links to Episodes Page
    { name: 'Posłuchaj', href: '#listen', view: 'home' as const },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-esti-light/90 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-8'
        }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <button onClick={() => handleNavClick('home', '#root')} className="flex items-center gap-2 group">
          {/* Logo Mark */}
          <img
            src="/images/Logo%20black@4x.png"
            alt="Esti Talk Logo"
            className="h-12 w-auto object-contain"
          />
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-12">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => handleNavClick(link.view, link.href)}
              className="text-sm uppercase tracking-widest font-sans font-light hover:text-esti-taupe transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-esti-taupe transition-all group-hover:w-full"></span>
            </button>
          ))}
          <button
            onClick={() => handleNavClick('home', '#listen')}
            className="px-6 py-2 border border-esti-dark rounded-full text-xs uppercase tracking-widest hover:bg-esti-dark hover:text-white transition-all duration-300"
          >
            Subskrybuj
          </button>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-esti-dark"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-esti-light z-40 flex flex-col items-center justify-center gap-8 transition-transform duration-500 ease-in-out md:hidden ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {navLinks.map((link) => (
          <button
            key={link.name}
            onClick={() => handleNavClick(link.view, link.href)}
            className="text-3xl font-serif text-esti-dark"
          >
            {link.name}
          </button>
        ))}
      </div>
    </header>
  );
};

export default Header;