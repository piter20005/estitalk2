import React from 'react';
import { ArrowUpRight, Music, Youtube, Podcast } from 'lucide-react';

const Platforms: React.FC = () => {
  const links = [
    {
      name: 'Spotify',
      url: 'https://open.spotify.com/show/4AV3JfVxwT8KfqeVHUYoU0',
      icon: <Music size={32} />,
      color: 'hover:bg-[#1DB954] hover:text-white',
      desc: 'Słuchaj w drodze'
    },
    {
      name: 'Apple Podcasts',
      url: 'https://podcasts.apple.com/pl/podcast/estitalk-rozmowy-o-pi%C4%99knie-z-dr-tatian%C4%85-jasi%C5%84sk%C4%85/id1757956398?l=pl',
      icon: <Podcast size={32} />,
      color: 'hover:bg-[#872EC4] hover:text-white',
      desc: 'Idealne na iOS'
    },
    {
      name: 'YouTube',
      url: 'https://www.youtube.com/playlist?list=PLs36Pjn2gU5a9qx-5F8HgyqujnfOlC4Pt',
      icon: <Youtube size={32} />,
      color: 'hover:bg-[#FF0000] hover:text-white',
      desc: 'Oglądaj wideo'
    }
  ];

  return (
    <section id="listen" className="py-24 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/iphone spotify mockup.png"
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-white/20 pb-6">
          <h2 className="font-serif text-4xl md:text-5xl text-white">
            Dostępne na <br />
            wszystkich platformach
          </h2>
          <p className="text-white/80 font-sans mt-4 md:mt-0 text-right">
            Subskrybuj, aby nie przegapić <br /> żadnego odcinka.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {links.map((platform) => (
            <a
              key={platform.name}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-white/10 backdrop-blur-md border border-white/20 p-8 h-64 flex flex-col justify-between transition-all duration-300 hover:bg-white/20 hover:border-white/40 hover:shadow-2xl hover:-translate-y-1"
            >
              <div className="flex justify-between items-start">
                <span className="text-white group-hover:scale-110 transition-transform duration-300">
                  {platform.icon}
                </span>
                <ArrowUpRight className="text-white opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>

              <div>
                <p className="font-sans text-xs uppercase tracking-widest mb-2 text-white/60 font-medium">
                  {platform.desc}
                </p>
                <h3 className="font-serif text-2xl font-medium text-white">
                  {platform.name}
                </h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Platforms;