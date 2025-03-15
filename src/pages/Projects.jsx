import React from 'react';
import { motion } from 'framer-motion';
import ProjectsSection from '../components/ProjectsSection';

const Projects = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-24 pb-16"
    >
      <div className="container mx-auto px-4 md:px-6 mb-12">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">My Projects</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Explore my portfolio of web applications built with React, Next.js, and other modern technologies.
          </p>
        </div>
      </div>
      
      <ProjectsSection />
    </motion.div>
  );
};

export default Projects;