'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { name: 'O prowadzącej', href: '/#about' },
  { name: 'Odcinki', href: '/odcinki' },
  { name: 'Goście', href: '/goscie' },
  { name: 'Tematy', href: '/tematy' },
  { name: 'For Doctors', href: '/for-doctors' },
] as const;

const LOGO_WHITE =
  'https://res.cloudinary.com/dgcg6hz1d/image/upload/q_auto/f_auto/v1776376537/EstiTalk_nowe_logo_bia%C5%82e_4x_fdg62c.png';
const LOGO_BLACK =
  'https://res.cloudinary.com/dgcg6hz1d/image/upload/q_auto/f_auto/v1776376552/EstiTalk_nowe_logo_czarne_fi8dc6.png';

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isHome = pathname === '/';
  const isEpisode = /^\/odcinki\/.+/.test(pathname ?? '');
  const hasHeroVideo = isHome || isEpisode;
  const overHero = hasHeroVideo && !isScrolled && !mobileMenuOpen;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled || !hasHeroVideo
          ? 'bg-esti-light/90 backdrop-blur-md py-4 shadow-sm'
          : 'bg-transparent py-8'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 group" onClick={() => setMobileMenuOpen(false)}>
          <Image
            src={overHero ? LOGO_WHITE : LOGO_BLACK}
            alt="Esti Talk Logo"
            width={120}
            height={48}
            className="h-12 w-auto object-contain transition-opacity duration-300"
            priority
            unoptimized
          />
        </Link>

        <nav
          className={`hidden md:flex items-center gap-12 transition-colors duration-300 ${
            overHero ? 'text-white' : 'text-esti-dark'
          }`}
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm uppercase tracking-widest font-sans font-light transition-colors relative group ${
                overHero ? 'hover:text-esti-beige' : 'hover:text-esti-taupe'
              }`}
            >
              {link.name}
              <span
                className={`absolute -bottom-1 left-0 w-0 h-[1px] transition-all group-hover:w-full ${
                  overHero ? 'bg-white' : 'bg-esti-taupe'
                }`}
              />
            </Link>
          ))}
          <Link
            href="/#newsletter"
            className={`px-6 py-2 border rounded-full text-xs uppercase tracking-widest transition-all duration-300 ${
              overHero
                ? 'border-white text-white hover:bg-white hover:text-esti-dark'
                : 'border-esti-dark text-esti-dark hover:bg-esti-dark hover:text-white'
            }`}
          >
            Subskrybuj
          </Link>
        </nav>

        <button
          className={`md:hidden transition-colors duration-300 ${
            overHero ? 'text-white' : 'text-esti-dark'
          }`}
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
