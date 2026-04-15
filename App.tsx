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
import Newsletter from './components/Newsletter';
import DoctorsVideoPage from './components/DoctorsVideoPage';
import DoctorsPromo from './components/DoctorsPromo';
import Footer from './components/Footer';
import { Episode } from './types';

const ACCESS_TOKEN = 'estidoctors2025film';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'home' | 'episodes' | 'episode' | 'doctors'>('home');
  const [selectedEpisode, setSelectedEpisode] = useState<Episode | null>(null);
  const [doctorsUnlocked, setDoctorsUnlocked] = useState(false);
  const [pendingEpisodeId, setPendingEpisodeId] = useState<string | null>(null);

  // On mount: check localStorage, payment token, and hash routing
  useEffect(() => {
    // Restore doctors access from previous session
    if (localStorage.getItem('doctors_access') === 'true') {
      setDoctorsUnlocked(true);
    }

    // Payment success token
    const params = new URLSearchParams(window.location.search);
    if (params.get('dkey') === ACCESS_TOKEN) {
      setDoctorsUnlocked(true);
      localStorage.setItem('doctors_access', 'true');
      setCurrentView('doctors');
      window.history.replaceState({}, '', '/#doctors');
      return;
    }

    // Hash-based routing
    const hash = window.location.hash;
    if (hash === '#doctors') {
      setCurrentView('doctors');
    } else if (hash.startsWith('#episode/')) {
      const episodeId = decodeURIComponent(hash.replace('#episode/', ''));
      setPendingEpisodeId(episodeId);
      setCurrentView('episodes');
    }
  }, []);

  // Smooth scroll for anchor links on home page
  useEffect(() => {
    if (currentView === 'home') {
      const handleAnchorClick = (e: MouseEvent) => {
        const anchor = (e.target as HTMLElement).closest('a');
        if (anchor && anchor.getAttribute('href')?.startsWith('#')) {
          e.preventDefault();
          const targetId = anchor.getAttribute('href');
          if (targetId && targetId !== '#') {
            document.querySelector(targetId)?.scrollIntoView({ behavior: 'smooth' });
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
    window.history.pushState({}, '', `/#episode/${encodeURIComponent(episode.id)}`);
  };

  return (
    <div className="font-sans text-esti-dark bg-white selection:bg-esti-beige selection:text-esti-dark">
      <Header onNavigate={handleNavigate} />

      <main>
        {currentView === 'home' && (
          <>
            <Hero onNavigate={handleNavigate} />

            {/* Infinite Marquee */}
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

            <Topics onNavigate={handleNavigate} />
            <About />
            <Philosophy />
            <EpisodeList
              onViewAll={() => handleNavigate('episodes')}
              onEpisodeClick={handleEpisodeClick}
            />
            <DoctorsPromo onNavigate={handleNavigate} />
            <Testimonials />
            <Newsletter />
            <Platforms />
          </>
        )}

        {currentView === 'episodes' && (
          <AllEpisodes
            onBack={() => handleNavigate('home')}
            onEpisodeClick={handleEpisodeClick}
            pendingEpisodeId={pendingEpisodeId}
            onPendingResolved={() => setPendingEpisodeId(null)}
          />
        )}

        {currentView === 'episode' && selectedEpisode && (
          <EpisodePage
            episode={selectedEpisode}
            onBack={() => {
              setCurrentView('episodes');
              window.history.pushState({}, '', '/');
            }}
          />
        )}

        {currentView === 'doctors' && (
          <DoctorsVideoPage
            onBack={() => handleNavigate('home')}
            isUnlocked={doctorsUnlocked}
          />
        )}
      </main>

      <Footer onNavigate={handleNavigate} />
    </div>
  );
};

export default App;
