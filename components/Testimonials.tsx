import React from 'react';
import { Star, Quote } from 'lucide-react';

const Testimonials: React.FC = () => {
  const reviews = [
    {
      author: "Anna M.",
      role: "Słuchaczka Spotify",
      text: "Nareszcie podcast, który traktuje temat urody poważnie, a nie powierzchownie. Dr Tatiana tłumaczy wszystko w sposób niezwykle przystępny. Mój ulubiony odcinek o hormonach!",
      featured: true,
    },
    {
      author: "Katarzyna W.",
      role: "Słuchaczka Apple Podcasts",
      text: "Uwielbiam ten spokój i merytorykę. Żadnego naganiania na zabiegi, tylko czysta wiedza. Słucham w drodze do pracy i zawsze dowiaduję się czegoś nowego o swojej skórze.",
      featured: false,
    },
    {
      author: "Piotr",
      role: "Słuchacz YouTube",
      text: "Konkretnie, rzeczowo i z klasą. Widać ogromne doświadczenie. Cenię za obalanie mitów, które krążą w internecie. Polecam każdemu, kto chce świadomie o siebie zadbać.",
      featured: false,
    },
  ];

  return (
    <section className="py-24 bg-esti-beige/10">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-esti-dark mb-4">Głos słuchaczy</h2>
          <div className="w-16 h-px bg-esti-taupe mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div
              key={index}
              className={`p-10 shadow-sm rounded-sm flex flex-col relative ${
                review.featured
                  ? 'bg-esti-dark text-white'
                  : 'bg-white'
              }`}
            >
              <Quote
                size={28}
                className={`mb-6 flex-shrink-0 ${review.featured ? 'text-esti-gold' : 'text-esti-beige'}`}
              />

              <div className="flex gap-1 mb-6 text-esti-gold">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" />
                ))}
              </div>

              <p className={`font-sans font-light mb-8 italic leading-relaxed flex-grow ${
                review.featured ? 'text-white/80' : 'text-esti-taupe'
              }`}>
                {review.text}
              </p>

              <div className="mt-auto">
                <p className={`font-serif text-lg ${review.featured ? 'text-white' : 'text-esti-dark'}`}>
                  {review.author}
                </p>
                <p className={`text-xs uppercase tracking-widest mt-1 ${
                  review.featured ? 'text-white/50' : 'text-esti-taupe/70'
                }`}>
                  {review.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
