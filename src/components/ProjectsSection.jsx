import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Code } from 'lucide-react';

const ProjectsSection = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const projects = [
    {
      id: 1,
      title: 'Nitroxpress',
      description: '  Nitroxpress Logistic Services is a multipurpose solution for all shipment, transportation, and delivery- requirements.It is a third-party logistic service providers and offer custom solutions for all unique shipping requirements.',
      image: 'https://nitroxpress.in/',

      technologies: ['React', 'Redux Thunk', 'Bootstrap', 'Chart.js'],
      category: 'react',
      liveLink: 'https://nitroxpress.in/',
      // githubLink: 'https://github.com/shivamsharma/ecommerce-dashboard',
    },
    {
      id: 2,
      title: 'Greencell',
      description: 'It is an electric bus booking application Developed and maintained frontend of tour and travel part and many more pages. Also work on Greencell mobility which is part of NueGo',
      image: 'https://greencellmobility.com/',
      technologies: ['React js', 'Tailwind CSS', ],
      category: 'nextjs',
      liveLink: 'https://greencellmobility.com/',
      // githubLink: 'https://github.com/shivamsharma/real-estate-app',
    },
    {
      id: 3,
      title: 'Tipco',
      description: ' It is a monitoring and handling of embedded devices. Developed and maintained frontend website using React JS',
      image: 'https://externlabs.shop/tipco/',
      technologies: ['React', 'Redux toolkit', 'Bootstrap', 'web Socket'],
      category: 'react',
      liveLink: 'https://externlabs.shop/tipco/',
      // githubLink: 'https://github.com/shivamsharma/task-management',
    },
    // {
    //   id: 4,
    //   title: 'Fitness Tracking App',
    //   description: 'A comprehensive fitness application for tracking workouts, nutrition, and progress with personalized recommendations.',
    //   image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    //   technologies: ['React Native', 'Redux', 'Firebase', 'Chart.js'],
    //   category: 'react',
    //   liveLink: 'https://example.com/fitness-app',
    //   // githubLink: 'https://github.com/shivamsharma/fitness-app',
    // },
    // {
    //   id: 5,
    //   title: 'Blog Platform',
    //   description: 'A feature-rich blogging platform with markdown support, categories, and a responsive design for all devices.',
    //   image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    //   technologies: ['Next.js', 'Tailwind CSS', 'Sanity.io', 'Vercel'],
    //   category: 'nextjs',
    //   liveLink: 'https://example.com/blog-platform',
    //   // githubLink: 'https://github.com/shivamsharma/blog-platform',
    // },
    // {
    //   id: 6,
    //   title: 'Weather Dashboard',
    //   description: 'An interactive weather application providing real-time forecasts, historical data, and location-based weather information.',
    //   image: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    //   technologies: ['React', 'jQuery', 'Bootstrap', 'Weather API'],
    //   category: 'jquery',
    //   liveLink: 'https://example.com/weather-dashboard',
    //   // githubLink: 'https://github.com/shivamsharma/weather-dashboard',
    // },
  ];

  // const filters = [
  //   { name: 'All', value: 'all' },
  //   { name: 'React', value: 'react' },
  //   { name: 'Next.js', value: 'nextjs' },
  //   { name: 'jQuery', value: 'jquery' },
  // ];

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(project => project.category === activeFilter);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="section-title">My Projects</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Here are some of my recent projects. Each one was built to solve a specific problem
            and demonstrates different aspects of my skills.
          </p>
        </div>

        {/* <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map((filter) => (
            <button
              key={filter.value}
              className={`px-4 py-2 rounded-full transition-all ${
                activeFilter === filter.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
              onClick={() => setActiveFilter(filter.value)}
            >
              {filter.name}
            </button>
          ))}
        </div> */}

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all"
              variants={itemVariants}
            >
              <div className="h-48 overflow-hidden">
                {/* <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                /> */}

                <iframe
                  src={project.image}
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                ></iframe>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-slate-600 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-50 text-blue-600 text-sm rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between">
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <ExternalLink size={16} className="mr-1" /> Live Demo
                  </a>
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-slate-700 hover:text-slate-900 transition-colors"
                  >
                    <Github size={16} className="mr-1" /> Code
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;