import React from 'react';
import { Star } from 'lucide-react';

const Testimonials: React.FC = () => {
  const reviews = [
    {
      author: "Anna M.",
      role: "Słuchaczka Spotify",
      text: "Nareszcie podcast, który traktuje temat urody poważnie, a nie powierzchownie. Dr Tatiana tłumaczy wszystko w sposób niezwykle przystępny. Mój ulubiony odcinek o hormonach!",
    },
    {
      author: "Katarzyna W.",
      role: "Słuchaczka Apple Podcasts",
      text: "Uwielbiam ten spokój i merytorykę. Żadnego naganiania na zabiegi, tylko czysta wiedza. Słucham w drodze do pracy i zawsze dowiaduję się czegoś nowego o swojej skórze.",
    },
    {
      author: "Piotr",
      role: "Słuchacz YouTube",
      text: "Konkretnie, rzeczowo i z klasą. Widać ogromne doświadczenie. Cenię za obalanie mitów, które krążą w internecie. Polecam każdemu, kto chce świadomie o siebie zadbać.",
    }
  ];

  return (
    <section className="py-24 bg-esti-beige/10">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl text-esti-dark mb-4">Głos słuchaczy</h2>
          <div className="w-16 h-px bg-esti-taupe mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div key={index} className="bg-white p-10 shadow-sm rounded-sm flex flex-col items-center text-center relative">
               {/* Quote Icon decorative */}
               <div className="text-6xl text-esti-beige absolute top-4 left-6 font-serif opacity-50">"</div>
               
               <div className="flex gap-1 mb-6 text-esti-gold">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
               </div>
               
               <p className="font-sans font-light text-gray-600 mb-8 italic relative z-10 leading-relaxed">
                 {review.text}
               </p>
               
               <div className="mt-auto">
                 <p className="font-serif text-lg text-esti-dark">{review.author}</p>
                 <p className="text-xs uppercase tracking-widest text-gray-400 mt-1">{review.role}</p>
               </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;