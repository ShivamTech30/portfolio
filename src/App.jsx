import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Loader from './components/Loader';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Projects = lazy(() => import('./pages/Projects'));
const Contact = lazy(() => import('./pages/Contact'));
const MyAi = lazy(() => import('./pages/MyAi'));

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/portfolio" element={<Home />} />
              <Route path="/portfolio/about" element={<About />} />
              <Route path="/portfolio/projects" element={<Projects />} />
              <Route path="/portfolio/contact" element={<Contact />} />
              <Route path="/portfolio/ai" element={<MyAi />} />
            </Routes>
          </Suspense>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

export default App;