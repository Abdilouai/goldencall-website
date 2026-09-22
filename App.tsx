import React, { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { WhatsAppButton } from './components/WhatsAppButton';

// Only the landing page ships in the initial bundle. Every other route is
// fetched on demand, so a first-time visitor no longer downloads the articles,
// the teacher portal and the admin screens before seeing the home page.
const namedLazy = <T extends string>(loader: () => Promise<any>, name: T) =>
    lazy(() => loader().then(m => ({ default: m[name] })));

const Offers = namedLazy(() => import('./pages/Offers'), 'Offers');
const FrenchCourses = namedLazy(() => import('./pages/FrenchCourses'), 'FrenchCourses');
const ThankYou = namedLazy(() => import('./pages/ThankYou'), 'ThankYou');
const Articles = namedLazy(() => import('./pages/Articles'), 'Articles');
const CabinCrewMistakes = namedLazy(() => import('./pages/articles/CabinCrewMistakes'), 'CabinCrewMistakes');
const StarMethod = namedLazy(() => import('./pages/articles/StarMethod'), 'StarMethod');
const EnglishPhrases = namedLazy(() => import('./pages/articles/EnglishPhrases'), 'EnglishPhrases');
const BusinessEnglish = namedLazy(() => import('./pages/articles/BusinessEnglish'), 'BusinessEnglish');
const Hospitality = namedLazy(() => import('./pages/articles/Hospitality'), 'Hospitality');
const TechEnglish = namedLazy(() => import('./pages/articles/TechEnglish'), 'TechEnglish');
const TeacherLogin = namedLazy(() => import('./pages/TeacherLogin'), 'TeacherLogin');
const TeacherLayout = namedLazy(() => import('./components/teacher/TeacherLayout'), 'TeacherLayout');
const TeacherDashboard = namedLazy(() => import('./pages/teacher/Dashboard'), 'Dashboard');
const MyStudents = namedLazy(() => import('./pages/teacher/MyStudents'), 'MyStudents');
const Meetings = namedLazy(() => import('./pages/teacher/Meetings'), 'Meetings');
const Materials = namedLazy(() => import('./pages/teacher/Materials'), 'Materials');
const TeacherLessons = namedLazy(() => import('./pages/teacher/Lessons'), 'Lessons');
const AdminReassign = namedLazy(() => import('./pages/admin/AdminReassign'), 'AdminReassign');
const AdminLessons = namedLazy(() => import('./pages/admin/AdminLessons'), 'AdminLessons');

// Keeps the viewport height while a route chunk loads, so the footer does not
// jump up and back down.
const RouteFallback = () => <div className="min-h-[60vh]" aria-hidden="true" />;

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

const MainLayout = () => {
  const location = useLocation();
  const isTeacherRoute = location.pathname.startsWith('/teacher') && location.pathname !== '/teacher/login';
  const isAdminRoute = location.pathname.startsWith('/admin');
  
  const isCustomLayout = isTeacherRoute || isAdminRoute;

  if (isCustomLayout) {
      return (
        <Suspense fallback={<RouteFallback />}>
        <Routes>
            <Route path="/teacher" element={<TeacherLayout />}>
                <Route path="dashboard" element={<TeacherDashboard />} />
                <Route path="students" element={<MyStudents />} />
                <Route path="meetings" element={<Meetings />} />
                <Route path="materials" element={<Materials />} />
                <Route path="lessons" element={<TeacherLessons />} />
            </Route>
            <Route path="/admin/reassign" element={
                <div className="min-h-screen bg-dark text-text"><AdminReassign /></div>
            } />
            <Route path="/admin/lessons" element={
                <div className="min-h-screen bg-dark text-text"><AdminLessons /></div>
            } />
        </Routes>
        </Suspense>
      );
  }

  return (
      <div className="min-h-screen bg-dark font-sans text-text flex flex-col">
        <Navbar />
        <main className="flex-grow pt-20">
          <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/formations" element={<Offers />} />
            <Route path="/cours-francais" element={<FrenchCourses />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/articles/cabin-crew-mistakes" element={<CabinCrewMistakes />} />
            <Route path="/articles/star-method" element={<StarMethod />} />
            <Route path="/articles/english-phrases" element={<EnglishPhrases />} />
            <Route path="/articles/business-english" element={<BusinessEnglish />} />
            <Route path="/articles/hospitality" element={<Hospitality />} />
            <Route path="/articles/tech-english" element={<TechEnglish />} />
            <Route path="/teacher/login" element={<TeacherLogin />} />
            <Route path="/thank-you" element={<ThankYou />} />
          </Routes>
          </Suspense>
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <MainLayout />
    </Router>
  );
};

export default App;

