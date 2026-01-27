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
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { ProtectedRoute } from './components/ProtectedRoute';
import { DashboardLayout } from './components/DashboardLayout';
import { Overview } from './pages/dashboard/Overview';
import { AIAssessment } from './pages/dashboard/AIAssessment';
import { Plans } from './pages/dashboard/Plans';

// Blog posts
import { CabinCrewMistakes } from './pages/blog/CabinCrewMistakes';
import { StarMethod } from './pages/blog/StarMethod';
import { EnglishPhrases } from './pages/blog/EnglishPhrases';

// Scroll to top helper
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

const AppContent: React.FC = () => {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');

  return (
    <>
      <ScrollToTop />
      <div className={`min-h-screen bg-white font-sans text-dark ${isDashboard ? '' : 'flex flex-col'}`}>
        {!isDashboard && <Navbar />}
        <main className={isDashboard ? '' : 'flex-grow'}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/book" element={<BookSession />} />
            <Route path="/book" element={<BookSession />} />
            <Route path="/booking-success" element={<BookingSuccess />} />
            <Route path="/login/*" element={<Login />} />
            <Route path="/signup/*" element={<Signup />} />

            <Route path="/dashboard" element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }>
              <Route index element={<Overview />} />
              <Route path="schedule" element={<div className="p-4">Schedule Component Coming Soon</div>} />
              <Route path="assessment" element={<AIAssessment />} />
              <Route path="plans" element={<Plans />} />
            </Route>

            {/* Blog Post Routes */}
            <Route path="/blog/cabin-crew-mistakes" element={<CabinCrewMistakes />} />
            <Route path="/blog/star-method" element={<StarMethod />} />
            <Route path="/blog/english-phrases" element={<EnglishPhrases />} />
          </Routes>
        </main>
        {!isDashboard && <Footer />}
        <WhatsAppButton />
      </div>
    </>
  );
};

export default App;
