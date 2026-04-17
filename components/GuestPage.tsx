import Link from 'next/link';
import { PortableText } from 'next-sanity';
import { ArrowLeft, Instagram, Linkedin, Globe, Facebook, Youtube, Music } from 'lucide-react';
import SanityImage from './SanityImage';
import EpisodeCard from './EpisodeCard';
import type { Guest } from '@/types';
import { guestPersonLd, jsonLdScript } from '@/lib/jsonLd';

const SOCIAL_ICONS: Record<string, React.ElementType> = {
  instagram: Instagram,
  linkedin: Linkedin,
  website: Globe,
  facebook: Facebook,
  youtube: Youtube,
  tiktok: Music,
};

interface GuestPageProps {
  guest: Guest;
}

export default function GuestPage({ guest }: GuestPageProps) {
  return (
    <div className="min-h-screen bg-esti-light pt-24 pb-20 animate-fade-in-up">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(guestPersonLd(guest)) }}
      />
      <div className="container mx-auto px-6 max-w-6xl">
        <Link
          href="/goscie"
          className="group flex items-center gap-2 text-xs uppercase tracking-widest text-esti-taupe hover:text-esti-dark mb-8 transition-colors"
        >
          <div className="p-2 border border-esti-taupe/30 rounded-full group-hover:border-esti-dark transition-colors">
            <ArrowLeft size={14} />
          </div>
          <span>Wróć do listy gości</span>
        </Link>

        <div className="flex flex-col md:flex-row gap-12 mb-16">
          <div className="w-full md:w-1/3">
            <div className="relative aspect-[3/4] overflow-hidden rounded-sm shadow-xl bg-esti-beige/30">
              <SanityImage
                image={guest.photo}
                alt={guest.name}
                width={800}
                height={1067}
                priority
                sizes="(max-width: 768px) 100vw, 33vw"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="flex-1">
            {guest.profession && (
              <span className="inline-block py-1 px-3 border border-esti-taupe/30 text-[10px] font-bold tracking-[0.2em] uppercase text-esti-taupe mb-4 rounded-sm">
                {guest.profession}
              </span>
            )}
            <h1 className="font-serif text-4xl md:text-6xl text-esti-dark leading-tight mb-6">{guest.name}</h1>

            {guest.shortBio && (
              <p className="text-lg font-light text-esti-taupe leading-relaxed mb-8 max-w-2xl">{guest.shortBio}</p>
            )}

            {Boolean(guest.bio) && (
              <div className="prose prose-stone max-w-none font-light leading-relaxed text-esti-taupe">
                <PortableText value={guest.bio as never} />
              </div>
            )}

            {guest.socials && guest.socials.length > 0 && (
              <div className="flex gap-4 mt-8">
                {guest.socials.map((s, idx) => {
                  if (!s.url || !s.platform) return null;
                  const Icon = SOCIAL_ICONS[s.platform] ?? Globe;
                  return (
                    <a
                      key={`${s.platform}-${idx}`}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.platform}
                      className="w-10 h-10 flex items-center justify-center border border-esti-taupe/30 rounded-full text-esti-taupe hover:text-esti-dark hover:border-esti-dark transition-colors"
                    >
                      <Icon size={18} />
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {guest.episodes && guest.episodes.length > 0 && (
          <div>
            <div className="flex items-center gap-4 mb-10">
              <div className="h-px w-12 bg-esti-gold" />
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-esti-gold">
                Odcinki z udziałem gościa
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-12">
              {guest.episodes.map((ep, i) => (
                <EpisodeCard key={ep._id} episode={ep} index={i} layout="grid" />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
