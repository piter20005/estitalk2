import React from 'react';
import { Sparkles, Microscope, Leaf, Brain, ArrowRight } from 'lucide-react';

interface TopicsProps {
  onNavigate: (view: 'home' | 'episodes' | 'doctors') => void;
}

const Topics: React.FC<TopicsProps> = ({ onNavigate }) => {
  const topics = [
    {
      title: 'Medycyna Estetyczna',
      desc: 'Fakty, mity i bezpieczeństwo zabiegów. Rozmawiamy o tym, jak mądrze korzystać z dobrodziejstw medycyny, zachowując naturalne rysy twarzy.',
      icon: <Sparkles size={32} strokeWidth={1} />,
    },
    {
      title: 'Dermatologia Kliniczna',
      desc: 'Zdrowie skóry od podstaw. Diagnozujemy problemy, omawiamy terapie trądziku, przebarwień i chorób skóry okiem lekarza praktyka.',
      icon: <Microscope size={32} strokeWidth={1} />,
    },
    {
      title: 'Świadoma Pielęgnacja',
      desc: 'Składniki aktywne i rutyny, które działają. Uczymy czytać składy i dobierać produkty do realnych potrzeb Twojej skóry, nie trendów.',
      icon: <Leaf size={32} strokeWidth={1} />,
    },
    {
      title: 'Psychologia & Wellbeing',
      desc: 'Piękno zaczyna się w głowie. Poruszamy tematy samooceny, presji społecznej i wpływu wyglądu na nasze samopoczucie psychiczne.',
      icon: <Brain size={32} strokeWidth={1} />,
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <span className="text-xs font-bold tracking-[0.2em] text-esti-gold uppercase mb-4 block">
            Tematyka
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-esti-dark mb-6">
            O czym rozmawiamy?
          </h2>
          <p className="text-esti-taupe font-light text-lg">
            Esti Talk to holistyczne spojrzenie na człowieka.
            Łączymy twardą wiedzę medyczną z delikatnością dbania o siebie.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {topics.map((topic, index) => (
            <div
              key={index}
              className="group p-8 border border-gray-100 bg-esti-light/30 hover:bg-white hover:shadow-xl transition-all duration-500 rounded-sm relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-1 h-0 bg-esti-gold group-hover:h-full transition-all duration-500" />

              <div className="mb-6 text-esti-taupe group-hover:text-esti-dark transition-colors transform group-hover:scale-110 duration-500 origin-left">
                {topic.icon}
              </div>

              <h3 className="font-serif text-xl text-esti-dark mb-4 group-hover:translate-x-2 transition-transform duration-300">
                {topic.title}
              </h3>

              <p className="font-sans font-light text-sm text-esti-taupe leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
                {topic.desc}
              </p>
            </div>
          ))}
        </div>

        {/* 5th card — For Doctors premium episode */}
        <div className="mt-8">
          <div className="bg-esti-dark border border-esti-gold/30 p-8 md:p-12 rounded-sm flex flex-col md:flex-row items-start md:items-center gap-8">
            <div className="flex-1">
              <span className="text-esti-gold text-[10px] font-bold tracking-[0.25em] uppercase mb-3 block">
                Tylko dla lekarzy
              </span>
              <h3 className="font-serif text-2xl md:text-3xl text-white mb-3">
                Toksyna botulinowa — dr hab. Joanna Czuwara
              </h3>
              <p className="text-white/60 font-light text-sm leading-relaxed max-w-xl">
                Ekskluzywny odcinek dla lekarzy. Szczegółowa wiedza kliniczna z zakresu neurotoksyn — od mechanizmu działania po zaawansowane protokoły terapeutyczne.
              </p>
            </div>
            <button
              onClick={() => onNavigate('doctors')}
              className="shrink-0 group flex items-center gap-3 bg-esti-gold text-white px-8 py-4 rounded-sm hover:bg-esti-gold/80 transition-all duration-300 text-sm font-bold uppercase tracking-widest"
            >
              <span>Zobacz odcinek</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Topics;
