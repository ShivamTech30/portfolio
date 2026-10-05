import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Loader from './components/Loader';
import ScrollToTop from './components/ScrollToTop';
import ShivamAssistant from './components/ShivamAssistant';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Projects = lazy(() => import('./pages/Projects'));
const Contact = lazy(() => import('./pages/Contact'));
const MyAi = lazy(() => import('./pages/MyAi'));

function App() {
  return (
    <div className="min-h-screen flex flex-col relative">
      <ScrollToTop />
      <Navbar />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/ai" element={<MyAi />} />

              {/* Legacy /portfolio redirects for backwards compatibility */}
              <Route path="/portfolio" element={<Navigate to="/" replace />} />
              <Route path="/portfolio/about" element={<Navigate to="/about" replace />} />
              <Route path="/portfolio/projects" element={<Navigate to="/projects" replace />} />
              <Route path="/portfolio/contact" element={<Navigate to="/contact" replace />} />
              <Route path="/portfolio/ai" element={<Navigate to="/ai" replace />} />

              {/* Catch-all fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </AnimatePresence>
      </main>
      <Footer />
      <ShivamAssistant />
    </div>
  );
}

export default App;