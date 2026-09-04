import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import images1 from "../assets/image.png";

const ProjectsSection = ({ showHeader = true, className = '' }) => {
  const [activeFilter] = useState('all');
  const [expanded, setExpanded] = useState({});

  const projects = [
    {
      id: 0,
      title: 'AxisMf',
      description:
        'Axis Mutual Fund is a digital investment platform designed to provide seamless and scalable financial services for users across investment journeys. I contributed to the development of a modern web ecosystem built on a modular architecture using Next.js and reusable feature modules. The platform delivers secure authentication, portfolio management, transaction workflows, and personalized user experiences through a high-performance, scalable, and maintainable system architecture, ensuring smooth interaction and reliable digital services for millions of users.',
      image: images1,
      technologies: ['NextJs', 'React.js', 'Monolith', 'Chart.js'],
      category: 'react',
      liveLink: 'https://www.axismf.com/',
    },

    {
      id: 1,
      title: 'Nitroxpress',
      description:
        'Nitroxpress Logistic Services is a multipurpose solution for all shipment, transportation, and delivery requirements. It is a third-party logistics service provider offering custom solutions for unique shipping requirements.',
      image:
        'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1000',
      technologies: ['React', 'Redux Thunk', 'Bootstrap', 'Chart.js'],
      category: 'react',
      liveLink: 'https://nitroxpress.in/',
    },

    {
      id: 2,
      title: 'Greencell',
      description:
        'It is an electric bus booking application. Developed and maintained frontend of tour and travel modules and multiple pages. Also worked on GreenCell Mobility, which is part of NueGo.',
      image:
        'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1000',
      technologies: ['React.js', 'Tailwind CSS'],
      category: 'nextjs',
      liveLink: 'https://greencellmobility.com/',
    },

    {
      id: 3,
      title: 'Tipco',
      description:
        'It is a monitoring and handling platform for embedded devices. Developed and maintained frontend website using React JS.',
      image:
        'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1000',
      technologies: ['React', 'Redux Toolkit', 'Bootstrap', 'WebSocket'],
      category: 'react',
      liveLink: 'https://externlabs.shop/tipco/',
    },
  ];

  const filteredProjects =
    activeFilter === 'all'
      ? projects
      : projects.filter(
          (project) => project.category === activeFilter
        );

  const descriptionFun = (text, id) => {
    if (expanded[id]) return text;

    return text.length > 120
      ? text.substring(0, 120) + '...'
      : text;
  };

  const lessMoreFun = (id) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className={`${showHeader ? 'py-20' : 'pb-16 pt-2'} ${className}`}>
      <div className="container mx-auto px-4 md:px-6">
        {showHeader && (
          <div className="text-center mb-12">
            <h2 className="section-title">My Projects</h2>

            <p className="text-slate-600 max-w-2xl mx-auto">
              Here are some of my recent projects. Each one was built
              to solve a specific problem and demonstrates different
              aspects of my skills.
            </p>
          </div>
        )}

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all"
              variants={itemVariants}
            >
              {/* image */}
              <div className="h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">
                  {project.title}
                </h3>

                <p className="text-slate-600 mb-4">
                  {descriptionFun(
                    project.description,
                    project.id
                  )}

                  {project.description.length > 120 && (
                    <span
                      onClick={() =>
                        lessMoreFun(project.id)
                      }
                      className="cursor-pointer text-blue-600 font-bold ml-1"
                    >
                      {expanded[project.id]
                        ? ' less'
                        : ' more'}
                    </span>
                  )}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map(
                    (tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-50 text-blue-600 text-sm rounded-full"
                      >
                        {tech}
                      </span>
                    )
                  )}
                </div>

                <div className="flex justify-between">

                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <ExternalLink
                      size={16}
                      className="mr-1"
                    />
                    Live Demo
                  </a>

                  {project.githubLink && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-slate-700 hover:text-slate-900 transition-colors"
                    >
                      <Github
                        size={16}
                        className="mr-1"
                      />
                      Code
                    </a>
                  )}
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