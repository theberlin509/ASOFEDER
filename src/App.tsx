import React, { useState } from 'react';
import { PageId, Language } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

import { Home } from './pages/Home';
import { About } from './pages/About';
import { Programs } from './pages/Programs';
import { Projects } from './pages/Projects';
import { Partners } from './pages/Partners';
import { Gallery } from './pages/Gallery';
import { Blog } from './pages/Blog';
import { Faq } from './pages/Faq';
import { Contact } from './pages/Contact';
import { Donate } from './pages/Donate';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [currentLang, setCurrentLang] = useState<Language>('fr');

  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={handleNavigate} currentLang={currentLang} />;
      case 'about':
        return <About onNavigate={handleNavigate} currentLang={currentLang} />;
      case 'programs':
        return <Programs onNavigate={handleNavigate} currentLang={currentLang} />;
      case 'projects':
        return <Projects onNavigate={handleNavigate} currentLang={currentLang} />;
      case 'partners':
        return <Partners onNavigate={handleNavigate} currentLang={currentLang} />;
      case 'gallery':
        return <Gallery onNavigate={handleNavigate} currentLang={currentLang} />;
      case 'blog':
        return <Blog onNavigate={handleNavigate} currentLang={currentLang} />;
      case 'faq':
        return <Faq onNavigate={handleNavigate} currentLang={currentLang} />;
      case 'contact':
        return <Contact onNavigate={handleNavigate} currentLang={currentLang} />;
      case 'donate':
        return <Donate onNavigate={handleNavigate} currentLang={currentLang} />;
      default:
        return <Home onNavigate={handleNavigate} currentLang={currentLang} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8faf7] text-slate-800 font-['Plus_Jakarta_Sans',sans-serif] selection:bg-[#006b2d] selection:text-white">
      {/* Top Sticky Header */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        currentLang={currentLang}
        onSelectLang={setCurrentLang}
      />

      {/* Main Page Area */}
      <main className="flex-1 w-full">
        {renderPage()}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} currentLang={currentLang} />
    </div>
  );
}
