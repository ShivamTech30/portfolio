import React, { useState } from 'react';
import { motion } from 'framer-motion';
import HeroSection from '../components/HeroSection';
import SkillsSection from '../components/SkillsSection';
import ProjectsSection from '../components/ProjectsSection';
import ExperienceSection from '../components/ExperienceSection';
import TestimonialsSection from '../components/TestimonialsSection';
import { useNavigate } from 'react-router-dom';

const Home = () => {

  const [isOpen, setIsOpen] = useState(false);

  const navigation =useNavigate()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
         
       
      <HeroSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <TestimonialsSection />

      <div className="chat-icon">
      <button className="chat-toggle-icon" onClick={() => navigation("/portfolio/ai")}>
        💬 Open Ai
      </button>
      
      
    </div>
    </motion.div>
  );
};

export default Home;