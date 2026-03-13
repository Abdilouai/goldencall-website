import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Offers } from './pages/Offers';
import { Payment } from './pages/Payment';
import { ThankYou } from './pages/ThankYou';
import { Articles } from './pages/Articles';
import { CabinCrewMistakes } from './pages/articles/CabinCrewMistakes';
import { StarMethod } from './pages/articles/StarMethod';
import { EnglishPhrases } from './pages/articles/EnglishPhrases';
import { BusinessEnglish } from './pages/articles/BusinessEnglish';
import { Hospitality } from './pages/articles/Hospitality';
import { TechEnglish } from './pages/articles/TechEnglish';
import { WhatsAppButton } from './components/WhatsAppButton';

// Scroll to top helper
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash.replace('#', ''));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  return null;
};

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-dark font-sans text-text flex flex-col">
        <Navbar />
        <main className="flex-grow pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/formations" element={<Offers />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/articles/cabin-crew-mistakes" element={<CabinCrewMistakes />} />
            <Route path="/articles/star-method" element={<StarMethod />} />
            <Route path="/articles/english-phrases" element={<EnglishPhrases />} />
            <Route path="/articles/business-english" element={<BusinessEnglish />} />
            <Route path="/articles/hospitality" element={<Hospitality />} />
            <Route path="/articles/tech-english" element={<TechEnglish />} />
            <Route path="/paiement" element={<Payment />} />
            <Route path="/merci" element={<ThankYou />} />
          </Routes>
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </Router>
  );
};

export default App;

