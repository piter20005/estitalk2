import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import EpisodeCard from './EpisodeCard';
import type { Topic } from '@/types';

interface TopicPageProps {
  topic: Topic;
}

export default function TopicPage({ topic }: TopicPageProps) {
  return (
    <div className="min-h-screen bg-esti-light pt-24 pb-20 animate-fade-in-up">
      <div className="container mx-auto px-6 max-w-6xl">
        <Link
          href="/tematy"
          className="group flex items-center gap-2 text-xs uppercase tracking-widest text-esti-taupe hover:text-esti-dark mb-8 transition-colors"
        >
          <div className="p-2 border border-esti-taupe/30 rounded-full group-hover:border-esti-dark transition-colors">
            <ArrowLeft size={14} />
          </div>
          <span>Wróć do listy tematów</span>
        </Link>

        <div className="mb-16 max-w-2xl">
          <span className="inline-block py-1 px-3 border border-esti-taupe/30 text-[10px] font-bold tracking-[0.2em] uppercase text-esti-taupe mb-4 rounded-sm">
            Temat
          </span>
          <h1 className="font-serif text-4xl md:text-6xl text-esti-dark leading-tight mb-6">{topic.name}</h1>
          {topic.description && (
            <p className="text-lg font-light text-esti-taupe leading-relaxed">{topic.description}</p>
          )}
        </div>

        {topic.episodes && topic.episodes.length > 0 ? (
          <div>
            <div className="flex items-center gap-4 mb-10">
              <div className="h-px w-12 bg-esti-gold" />
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-esti-gold">
                Odcinki w tym temacie
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-12">
              {topic.episodes.map((ep, i) => (
                <EpisodeCard key={ep._id} episode={ep} index={i} layout="grid" />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="font-serif text-2xl text-esti-dark mb-2">Brak odcinków</p>
            <p className="text-esti-taupe text-sm font-light">
              Jeszcze nie mamy odcinków opisanych tym tematem.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
