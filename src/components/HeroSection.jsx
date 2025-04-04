import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import HeroCanvas from './3D/HeroCanvas';
import pfd from "../assets/shivam.pdf"

// let newData ="./"

const HeroSection = () => {
  const scrollRef = useRef(null);

  const scrollToNextSection = () => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <HeroCanvas />
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Hi, I'm <span className="gradient-text">Shivam Sharma</span>
            </h1>
            <h2 className="text-xl md:text-2xl text-slate-700 mb-6">
              React Developer with 3.5 years of experience
            </h2>
            <p className="text-slate-600 mb-8 max-w-lg mx-auto lg:mx-0">
              I build modern, responsive web applications using React, Next.js, and other cutting-edge technologies.
              Let's create something amazing together!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/portfolio/contact" className="btn-primary flex items-center justify-center gap-2">
                Get in Touch <ArrowRight size={18} />
              </Link>
              <a href={pfd}  download="shivam.pdf" className="btn-secondary flex items-center justify-center gap-2">
                Download CV <Download size={18} />
              </a>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="hidden lg:block"
          >
            {/* This space is intentionally left empty as the 3D animation will be rendered in the background */}
          </motion.div>
        </div>
        
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          onClick={scrollToNextSection}
        >
          <div className="flex flex-col items-center">
            <span className="text-sm text-slate-600 mb-2">Scroll Down</span>
            <div className="w-6 h-10 border-2 border-slate-600 rounded-full flex justify-center">
              <motion.div 
                className="w-1.5 h-1.5 bg-slate-600 rounded-full mt-2"
                animate={{ y: [0, 12, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              />
            </div>
          </div>
        </motion.div>
      </div>
      
      <div ref={scrollRef} />
    </section>
  );
};

export default HeroSection;