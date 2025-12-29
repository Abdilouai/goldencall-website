import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { Home } from './pages/Home';
import { Services } from './pages/Services';
import { About } from './pages/About';
import { Blog } from './pages/Blog';
import { BookSession } from './pages/BookSession';
import { BookingSuccess } from './pages/BookingSuccess';
import { usePageTracking } from './hooks/usePageTracking';

// Scroll to top and track analytics
const ScrollToTopAndTrack = () => {
  const { pathname } = useLocation();
  usePageTracking(); // Add analytics tracking

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
};

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTopAndTrack />
      <div className="min-h-screen bg-white font-sans text-dark flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/book" element={<BookSession />} />
            <Route path="/booking-success" element={<BookingSuccess />} />
          </Routes>
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </Router>
  );
};

export default App;
