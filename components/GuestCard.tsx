import Link from 'next/link';
import SanityImage from './SanityImage';
import type { Guest } from '@/types';

interface GuestCardProps {
  guest: Guest & { episodeCount?: number };
}

export default function GuestCard({ guest }: GuestCardProps) {
  return (
    <Link
      href={`/goscie/${guest.slug}`}
      className="group flex flex-col bg-white border border-gray-100 rounded-sm overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-esti-beige/20">
        <SanityImage
          image={guest.photo}
          alt={guest.name}
          width={600}
          height={800}
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
        />
        <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/70 to-transparent text-white">
          {typeof guest.episodeCount === 'number' && guest.episodeCount > 0 && (
            <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-esti-beige">
              {guest.episodeCount} {pluralizeEpisode(guest.episodeCount)}
            </span>
          )}
        </div>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-serif text-2xl text-esti-dark mb-1 group-hover:text-esti-taupe transition-colors">
          {guest.name}
        </h3>
        {guest.profession && (
          <p className="text-xs uppercase tracking-widest text-esti-taupe mb-3">{guest.profession}</p>
        )}
        {guest.shortBio && (
          <p className="font-light text-sm text-esti-taupe/90 leading-relaxed line-clamp-3">{guest.shortBio}</p>
        )}
      </div>
    </Link>
  );
}

function pluralizeEpisode(n: number): string {
  if (n === 1) return 'odcinek';
  const lastTwo = n % 100;
  const last = n % 10;
  if (lastTwo >= 12 && lastTwo <= 14) return 'odcinków';
  if (last >= 2 && last <= 4) return 'odcinki';
  return 'odcinków';
}
