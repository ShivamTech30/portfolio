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
      title: 'Greencell',
      description:
        'An electric bus booking application for NueGo. Developed and maintained frontend of tour and travel modules and multiple core customer-facing booking pages. Also delivered the full GreenCell Mobility corporate website, focusing on responsive layout and clean UI across devices.',
      image:
        'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1000',
      technologies: ['React.js', 'Tailwind CSS', 'Axios', 'Bootstrap'],
      category: 'nextjs',
      liveLink: 'https://greencellmobility.com/',
    },
    {
      id: 2,
      title: 'Nitroxpress',
      description:
        'Nitroxpress Logistic Services is a multipurpose solution for all shipment, transportation, and delivery requirements. A third-party logistics platform featuring role-based dashboards with secure access control for Admin, B2B, B2C, delivery staff, and internal employees with integrated payment gateway and wallet tracking.',
      image:
        'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1000',
      technologies: ['React', 'Redux Thunk', 'Bootstrap', 'Chart.js'],
      category: 'react',
    },
    {
      id: 3,
      title: 'Tipco',
      description:
        'A real-time IoT monitoring dashboard for embedded hardware. Built live, performant dashboards surfacing vibration, motor rotation, and pressure metrics from embedded devices with continuous WebSocket streaming.',
      image:
        'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1000',
      technologies: ['React.js', 'TanStack Query', 'WebSocket', 'Bootstrap'],
      category: 'react',
    },
    {
      id: 4,
      title: 'HarborBites',
      description:
        'A QR-based restaurant ordering and Kitchen Display System that replaced paper tickets. Built the QR-to-order customer flow with real-time order and table-status updates via WebSockets.',
      image:
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1000',
      technologies: ['React.js', 'Redux Toolkit', 'WebSocket', 'Tailwind CSS'],
      category: 'react',
    },
    {
      id: 5,
      title: 'Fintellir',
      description:
        'A stock analytics platform for ticker and portfolio data. Built data ingestion flows for client-specific Excel sheets and stock ticker feeds, ensuring accurate parsing and real-time display.',
      image:
        'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1000',
      technologies: ['Next.js', 'Context API', 'Axios', 'Tailwind CSS'],
      category: 'nextjs',
    },
    {
      id: 6,
      title: 'AirPMO',
      description:
        'A construction management platform for multi-site project oversight. Engineered zone-based access management and multi-role permission structures supporting varying levels of site responsibility and authority.',
      image:
        'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1000',
      technologies: ['Next.js', 'Axios', 'Tailwind CSS', 'REST APIs'],
      category: 'nextjs',
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

                <div className="flex justify-between items-center min-h-[24px]">
                  {project.liveLink ? (
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-blue-600 hover:text-blue-800 transition-colors font-medium text-sm"
                    >
                      <ExternalLink
                        size={16}
                        className="mr-1"
                      />
                      Live Demo
                    </a>
                  ) : (
                    <div></div>
                  )}

                  {project.githubLink && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-slate-700 hover:text-slate-900 transition-colors font-medium text-sm"
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