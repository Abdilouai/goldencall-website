import React from 'react';
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
  const path = window.location.pathname;

  let Component = Home;
  if (path === '/') Component = Home;
  else if (path === '/services') Component = Services;
  else if (path === '/about') Component = About;
  else if (path === '/blog') Component = Blog;
  else if (path === '/book') Component = BookSession;
  else if (path === '/booking-success') Component = BookingSuccess;

  return (
    <div className="min-h-screen bg-white font-sans text-dark flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Component />
      </main>
      <Footer />
      <WhatsAppButton />
      {/* These components enable the Vercel Dashboard tracking */}
      <Analytics />
      <SpeedInsights />
    </div>
  );
};

export default App;
