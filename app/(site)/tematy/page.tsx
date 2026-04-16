import type { Metadata } from 'next';
import Link from 'next/link';
import { sanityFetch } from '@/sanity/lib/fetch';
import { ALL_TOPICS_QUERY } from '@/sanity/lib/queries';
import type { Topic } from '@/types';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Tematy',
  description: 'Przeglądaj odcinki EstiTalk podzielone tematycznie — od dermatologii po psychologię.',
};

function pluralizeEpisodes(count: number): string {
  if (count === 1) return '1 odcinek';
  const mod10 = count % 10;
  const mod100 = count % 100;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return `${count} odcinki`;
  return `${count} odcinków`;
}

export default async function TopicsPage() {
  const topics = await sanityFetch<(Topic & { episodeCount?: number })[]>({
    query: ALL_TOPICS_QUERY,
    tags: ['topic'],
  });

  return (
    <div className="min-h-screen bg-esti-light pt-24 pb-20 animate-fade-in-up">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="mb-16 max-w-2xl">
          <span className="inline-block py-1 px-3 border border-esti-taupe/30 text-[10px] font-bold tracking-[0.2em] uppercase text-esti-taupe mb-4 rounded-sm">
            Archiwum
          </span>
          <h1 className="font-serif text-4xl md:text-6xl text-esti-dark leading-tight mb-6">Tematy</h1>
          <p className="text-lg font-light text-esti-taupe leading-relaxed">
            Wybierz obszar zainteresowań i zobacz powiązane odcinki EstiTalk.
          </p>
        </div>

        {topics && topics.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topics.map((topic) => (
              <Link
                key={topic._id}
                href={`/tematy/${topic.slug}`}
                className="group block p-6 bg-white/60 border border-esti-taupe/20 rounded-lg hover:border-esti-gold hover:shadow-lg transition-all"
              >
                <h2 className="font-serif text-2xl text-esti-dark group-hover:text-esti-gold transition-colors mb-2">
                  {topic.name}
                </h2>
                {topic.description && (
                  <p className="text-sm font-light text-esti-taupe line-clamp-2 mb-4">
                    {topic.description}
                  </p>
                )}
                <span className="inline-block text-[10px] font-bold tracking-[0.2em] uppercase text-esti-taupe">
                  {pluralizeEpisodes(topic.episodeCount ?? 0)}
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="font-serif text-2xl text-esti-dark mb-2">Brak tematów</p>
            <p className="text-esti-taupe text-sm font-light">
              Tematy pojawią się po dodaniu ich w panelu redakcyjnym.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
