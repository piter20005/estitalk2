import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Topics from './components/Topics';
import Philosophy from './components/Philosophy';
import EpisodeList from './components/EpisodeList';
import AllEpisodes from './components/AllEpisodes';
import EpisodePage from './components/EpisodePage';
import Platforms from './components/Platforms';
import Testimonials from './components/Testimonials';
import DoctorsVideoPage from './components/DoctorsVideoPage';
import Footer from './components/Footer';
import { Episode } from './types';

const ACCESS_TOKEN = 'estidoctors2025film';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'home' | 'episodes' | 'episode' | 'doctors'>('home');
  const [selectedEpisode, setSelectedEpisode] = useState<Episode | null>(null);
  const [doctorsUnlocked, setDoctorsUnlocked] = useState(false);

  // On mount: check for payment token OR hash-based routing
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('dkey') === ACCESS_TOKEN) {
      setDoctorsUnlocked(true);
      setCurrentView('doctors');
      window.history.replaceState({}, '', '/#doctors');
      return;
    }
    if (window.location.hash === '#doctors') {
      setCurrentView('doctors');
    }
  }, []);

  // Restore smooth scroll behavior for anchor links
  useEffect(() => {
    if (currentView === 'home') {
      const handleAnchorClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const anchor = target.closest('a');
        if (anchor && anchor.getAttribute('href')?.startsWith('#')) {
          e.preventDefault();
          const targetId = anchor.getAttribute('href');
          if (targetId && targetId !== '#') {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
              targetElement.scrollIntoView({ behavior: 'smooth' });
            }
          }
        }
      };
      document.addEventListener('click', handleAnchorClick);
      return () => document.removeEventListener('click', handleAnchorClick);
    }
  }, [currentView]);

  const handleNavigate = (view: 'home' | 'episodes' | 'doctors') => {
    setCurrentView(view);
    setSelectedEpisode(null);
    window.scrollTo(0, 0);
    if (view === 'doctors') {
      window.history.pushState({}, '', '/#doctors');
    } else {
      window.history.pushState({}, '', '/');
    }
  };

  const handleEpisodeClick = (episode: Episode) => {
    setSelectedEpisode(episode);
    setCurrentView('episode');
    window.scrollTo(0, 0);
  };

  return (
    <div className="font-sans text-esti-dark bg-white selection:bg-esti-beige selection:text-esti-dark">
      <Header onNavigate={handleNavigate} />

      <main>
        {currentView === 'home' && (
          <>
            <Hero />

            {/* Infinite Marquee text divider */}
            <div className="bg-esti-dark py-4 overflow-hidden whitespace-nowrap relative flex">
              <div className="animate-scroll flex gap-8 min-w-full">
                {[...Array(10)].map((_, i) => (
                  <span key={i} className="text-esti-beige text-sm font-bold tracking-[0.3em] uppercase opacity-80">
                    Całe miasto słucha Esti Talk &bull;
                  </span>
                ))}
              </div>
              <div className="animate-scroll flex gap-8 min-w-full absolute top-4 left-full">
                {[...Array(10)].map((_, i) => (
                  <span key={`dup-${i}`} className="text-esti-beige text-sm font-bold tracking-[0.3em] uppercase opacity-80">
                    Całe miasto słucha Esti Talk &bull;
                  </span>
                ))}
              </div>
            </div>

            <Topics />
            <About />
            <Philosophy />
            <EpisodeList
              onViewAll={() => handleNavigate('episodes')}
              onEpisodeClick={handleEpisodeClick}
            />
            <Testimonials />
            <Platforms />
          </>
        )}

        {currentView === 'episodes' && (
          <AllEpisodes
            onBack={() => handleNavigate('home')}
            onEpisodeClick={handleEpisodeClick}
          />
        )}

        {currentView === 'episode' && selectedEpisode && (
          <EpisodePage
            episode={selectedEpisode}
            onBack={() => setCurrentView('episodes')}
          />
        )}

        {currentView === 'doctors' && (
          <DoctorsVideoPage
            onBack={() => handleNavigate('home')}
            isUnlocked={doctorsUnlocked}
          />
        )}
      </main>

      {currentView !== 'episode' && <Footer onNavigate={handleNavigate} />}
      {currentView === 'episode' && <Footer onNavigate={handleNavigate} />}
    </div>
  );
};

export default App;
