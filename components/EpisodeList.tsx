import Link from 'next/link';
import EpisodeCard from './EpisodeCard';
import type { Episode } from '@/types';

interface EpisodeListProps {
  episodes: Episode[];
}

export default function EpisodeList({ episodes }: EpisodeListProps) {
  const latest = episodes.slice(0, 3);

  return (
    <section id="latest-episodes" className="py-24 bg-esti-light relative overflow-hidden">
      <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-esti-dark/5 hidden md:block" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20">
          <div className="bg-esti-light pr-8 relative z-20">
            <span className="text-xs font-bold tracking-[0.2em] text-esti-taupe uppercase mb-2 block">Esti Talk</span>
            <h2 className="font-serif text-5xl text-esti-dark">Najnowsze odcinki</h2>
          </div>

          <Link
            href="/odcinki"
            className="hidden md:inline-flex items-center gap-2 text-sm uppercase tracking-widest hover:text-esti-taupe transition-colors group bg-esti-light pl-8 relative z-20 cursor-pointer"
          >
            <span>Zobacz wszystkie</span>
            <span className="block w-8 h-px bg-current group-hover:w-12 transition-all" />
          </Link>
        </div>

        {latest.length === 0 ? (
          <div className="text-center py-16">
            <p className="font-serif text-xl text-esti-dark mb-2">Brak odcinków do wyświetlenia</p>
            <p className="text-esti-taupe text-sm font-light">Zajrzyj wkrótce!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
            {latest.map((episode, index) => (
              <EpisodeCard key={episode._id} episode={episode} index={index} layout="list" />
            ))}
          </div>
        )}

        <div className="mt-20 text-center md:hidden">
          <Link
            href="/odcinki"
            className="inline-block border border-esti-dark px-10 py-4 text-xs uppercase tracking-widest hover:bg-esti-dark hover:text-white transition-all w-full md:w-auto"
          >
            Zobacz wszystkie odcinki
          </Link>
        </div>
      </div>
    </section>
  );
}
