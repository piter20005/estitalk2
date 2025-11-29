import React from 'react';
import { Sparkles, Microscope, Leaf, Brain } from 'lucide-react';

const Topics: React.FC = () => {
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
          <p className="text-gray-600 font-light text-lg">
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
              <div className="absolute top-0 left-0 w-1 h-0 bg-esti-gold group-hover:h-full transition-all duration-500"></div>
              
              <div className="mb-6 text-esti-taupe group-hover:text-esti-dark transition-colors transform group-hover:scale-110 duration-500 origin-left">
                {topic.icon}
              </div>
              
              <h3 className="font-serif text-xl text-esti-dark mb-4 group-hover:translate-x-2 transition-transform duration-300">
                {topic.title}
              </h3>
              
              <p className="font-sans font-light text-sm text-gray-600 leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
                {topic.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Topics;