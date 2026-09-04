import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin } from 'lucide-react';

const ExperienceSection = () => {
  const experiences = [
    {
      id: 1,
      role: 'Lead Frontend Developer',
      company: 'NeoSOFT — Axis Mutual Fund (Client Engagement)',
      location: 'Mumbai, India',
      duration: 'Jun 2025 – Present',
      description: 'Leading frontend delivery for Payment, Onboarding, STP, and Switch flows at a top-5 Indian asset manager.',
      responsibilities: [
        'Lead frontend development for Payment, Onboarding, STP, and Switch flows, mentoring and directing a team of 4–5 frontend developers, while owning architecture, technical documentation, and code review across the module.',
        'Take ambiguous, cross-functional requirements from product and backend teams and turn them into actionable technical plans, executing independently and making implementation recommendations.',
        'Support a payment page handling ~10 lakh weekly user interactions, ensuring stability and consistent performance at scale.',
        'Work within a monorepo architecture spanning multiple product flows, structuring shared components, utilities, and configs for consistency and reuse across teams.',
        'Drive adoption of clean-code and review standards across the team, raising code consistency and cutting down defects reaching QA.',
        'Optimized page load and rendering performance, improving key metrics by ~40% through code splitting, memoization, and reduced re-renders.'
      ],
      technologies: ['React', 'TypeScript', 'Next.js', 'Monorepo Architecture']
    },
    {
      id: 2,
      role: 'Frontend Developer',
      company: 'Extern Labs',
      location: 'Jaipur, India',
      duration: 'Jul 2022 – May 2025',
      description: 'Delivered multiple production-grade client projects across logistics, IoT, travel, hospitality, and fintech.',
      responsibilities: [
        'NitroXpress: Built role-specific, highly usable dashboards with secure role-based access control for 5 distinct user types, plus in-app payment gateway and wallet system.',
        'Tipco: Built live, performant IoT dashboards surfacing vibration, motor rotation, and pressure metrics with real-time WebSocket streaming.',
        'NueGo (GreenCell Mobility): Built and maintained booking pages and delivered the complete GreenCell Mobility corporate website with responsive UI.',
        'HarborBites: Built QR-to-order flow integrated with live Kitchen Display System and real-time WebSocket order/table-status updates.',
        'Fintellir: Built data ingestion flows for client-specific Excel sheets and live stock ticker feeds.'
      ],
      technologies: ['React.js', 'Redux Toolkit (RTK)', 'TanStack Query', 'WebSocket', 'Tailwind CSS', 'Bootstrap']
    },
    {
      id: 3,
      role: 'Frontend Developer',
      company: 'Maitretech Solutions',
      location: 'Bhopal, India',
      duration: 'Jun 2021 – Jun 2022',
      description: 'Engineered AirPMO — a comprehensive construction management platform for multi-site project oversight.',
      responsibilities: [
        'Built zone-based access management, restricting permissions by project area and role.',
        'Implemented multi-role permission structures supporting varying levels of site responsibility and authority.',
        'Collaborated with backend developers to integrate complex REST APIs and state synchronization.'
      ],
      technologies: ['Next.js', 'React.js', 'Axios', 'Tailwind CSS', 'CSS']
    },
    {
      id: 4,
      role: 'Intern',
      company: 'Reliance Jio — RF Macro Planning and Optimization',
      location: 'India',
      duration: 'Jun 2018 – Jul 2018',
      description: 'Hands-on telecom architecture and network coverage analysis.',
      responsibilities: [
        'Contributed to a network coverage and quality improvement project, gaining hands-on exposure to telecom architecture, frequency reuse, and signal optimization.'
      ],
      technologies: ['Telecom Architecture', 'RF Optimization', 'Data Analysis']
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="section-title">Work Experience</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Over the past 5+ years, I've engineered production-grade React & Next.js web applications across high-scale fintech, IoT, logistics, and enterprise domains.
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-blue-200 hidden md:block"></div>

          <motion.div 
            className="space-y-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {experiences.map((exp, index) => (
              <motion.div 
                key={exp.id}
                className="relative"
                variants={itemVariants}
              >
                <div className={`md:flex items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                  {/* Timeline dot */}
                  <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow"></div>
                  
                  {/* Content */}
                  <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pl-12' : 'md:pr-12'}`}>
                    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all border-l-4 border-blue-600">
                      <div className="flex items-center mb-2">
                        <Briefcase className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0" />
                        <h3 className="text-xl font-bold text-slate-900">{exp.role}</h3>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-y-1 text-sm text-slate-700 mb-3">
                        <span className="font-semibold text-blue-700">{exp.company}</span>
                        {exp.location && (
                          <>
                            <span className="mx-2 text-slate-400">•</span>
                            <span className="flex items-center text-slate-600">
                              <MapPin className="w-3.5 h-3.5 mr-1 text-slate-500" />
                              {exp.location}
                            </span>
                          </>
                        )}
                        <span className="mx-2 text-slate-400">•</span>
                        <span className="flex items-center text-slate-600">
                          <Calendar className="w-3.5 h-3.5 mr-1 text-slate-500" />
                          {exp.duration}
                        </span>
                      </div>

                      <p className="text-slate-600 mb-4 text-sm leading-relaxed">{exp.description}</p>
                      
                      <div className="mb-4">
                        <h4 className="font-semibold text-sm text-slate-800 mb-2">Key Contributions &amp; Responsibilities:</h4>
                        <ul className="space-y-1.5 text-sm text-slate-600">
                          {exp.responsibilities.map((resp, i) => (
                            <li key={i} className="flex items-start">
                              <span className="inline-block w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                              <span className="leading-snug">{resp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {exp.technologies && (
                        <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-100">
                          {exp.technologies.map((tech, i) => (
                            <span
                              key={i}
                              className="px-2.5 py-0.5 bg-slate-100 text-slate-700 rounded-full text-xs font-medium"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;