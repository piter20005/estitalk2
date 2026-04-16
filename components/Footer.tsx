import Image from 'next/image';
import Link from 'next/link';
import { Mail, Facebook } from 'lucide-react';
import TikTokIcon from './icons/TikTokIcon';

export default function Footer() {
  return (
    <footer className="bg-esti-dark text-esti-light pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-20">
          <div className="max-w-md">
            <div className="flex items-center gap-2 mb-8">
              <Image
                src="/images/logo with transparent background.png"
                alt="Esti Talk Logo"
                width={120}
                height={48}
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
                <li><Link href="/#about" className="hover:text-white transition-colors">O podcaście</Link></li>
                <li><Link href="/odcinki" className="hover:text-white transition-colors">Odcinki</Link></li>
                <li><Link href="/goscie" className="hover:text-white transition-colors">Goście</Link></li>
                <li><Link href="/tematy" className="hover:text-white transition-colors">Tematy</Link></li>
                <li><Link href="/#listen" className="hover:text-white transition-colors">Gdzie słuchać</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-sans text-xs font-bold uppercase tracking-widest text-esti-beige mb-6">Kontakt</h4>
              <ul className="space-y-4 font-light text-sm opacity-80">
                <li><a href="mailto:kontakt@estitalk.pl" className="hover:text-white transition-colors">kontakt@estitalk.pl</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs font-light opacity-50 uppercase tracking-wide">
            &copy; {new Date().getFullYear()} Esti Talk. Wszelkie prawa zastrzeżone.
          </p>
          <div className="flex gap-6">
            <a
              href="https://www.tiktok.com/@estitalk"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="opacity-60 hover:opacity-100 hover:text-esti-beige transition-all"
            >
              <TikTokIcon size={20} />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61578986545628"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="opacity-60 hover:opacity-100 hover:text-esti-beige transition-all"
            >
              <Facebook size={20} />
            </a>
            <a
              href="mailto:kontakt@estitalk.pl"
              aria-label="Email"
              className="opacity-60 hover:opacity-100 hover:text-esti-beige transition-all"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
