import React, { useState, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { Home } from './pages/Home';
import { Services } from './pages/Services';
import { About } from './pages/About';
import { Blog } from './pages/Blog';
import { BookSession } from './pages/BookSession';
import { BookingSuccess } from './pages/BookingSuccess';

const App: React.FC = () => {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setPath(window.location.pathname);
    };

    const originalPushState = window.history.pushState;
    const originalReplaceState = window.history.replaceState;

    window.history.pushState = function(...args: any[]) {
      originalPushState.apply(this, args as any);
      handleLocationChange();
    };

    window.history.replaceState = function(...args: any[]) {
      originalReplaceState.apply(this, args as any);
      handleLocationChange();
    };

    window.addEventListener('popstate', handleLocationChange);
    
    return () => {
      window.history.pushState = originalPushState;
      window.history.replaceState = originalReplaceState;
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  const renderContent = () => {
    switch (path) {
      case '/':
        return <Home />;
      case '/services':
        return <Services />;
      case '/about':
        return <About />;
      case '/blog':
        return <Blog />;
      case '/book':
        return <BookSession />;
      case '/booking-success':
        return <BookingSuccess />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-dark flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {renderContent()}
      </main>
      <Footer />
      <WhatsAppButton />
      {/* Vercel Tracking Components */}
      <Analytics />
      <SpeedInsights />
    </div>
  );
};

export default App;
