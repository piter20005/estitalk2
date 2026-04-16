'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { name: 'O prowadzącej', href: '/#about' },
  { name: 'Odcinki', href: '/odcinki' },
  { name: 'Goście', href: '/goscie' },
  { name: 'Tematy', href: '/tematy' },
  { name: 'For Doctors', href: '/for-doctors' },
] as const;

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-esti-light/90 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-8'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 group" onClick={() => setMobileMenuOpen(false)}>
          <Image
            src="/images/Logo%20black@4x.png"
            alt="Esti Talk Logo"
            width={120}
            height={48}
            className="h-12 w-auto object-contain"
            priority
          />
        </Link>

        <nav className="hidden md:flex items-center gap-12">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm uppercase tracking-widest font-sans font-light hover:text-esti-taupe transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-esti-taupe transition-all group-hover:w-full" />
            </Link>
          ))}
          <Link
            href="/#newsletter"
            className="px-6 py-2 border border-esti-dark rounded-full text-xs uppercase tracking-widest hover:bg-esti-dark hover:text-white transition-all duration-300"
          >
            Subskrybuj
          </Link>
        </nav>

        <button
          className="md:hidden text-esti-dark"
          onClick={() => setMobileMenuOpen((v) => !v)}
          aria-label="Menu"
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <div
        className={`fixed inset-0 bg-esti-light z-40 flex flex-col items-center justify-center gap-8 transition-transform duration-500 ease-in-out md:hidden ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {NAV_LINKS.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className="text-3xl font-serif text-esti-dark"
            onClick={() => setMobileMenuOpen(false)}
          >
            {link.name}
          </Link>
        ))}
      </div>
    </header>
  );
}
