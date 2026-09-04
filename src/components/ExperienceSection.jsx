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
      description: 'Leading the frontend engineering team for Axis Mutual Fund across critical financial modules and digital investment journeys.',
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
      role: 'Senior React Developer',
      company: 'TechSolutions Inc.',
      location: 'New Delhi, India',
      duration: 'Jan 2023 – May 2025',
      description: 'Built scalable React applications, designed modular reusable frontend architectures, and guided junior developers.',
      responsibilities: [
        'Architected and developed complex React applications using Redux Toolkit and React Query',
        'Implemented CI/CD pipelines and improved build performance by 40%',
        'Mentored junior developers and conducted rigorous code reviews',
        'Collaborated with UX/UI designers to implement highly responsive, accessible designs'
      ],
      technologies: ['React.js', 'Redux Toolkit', 'Tailwind CSS', 'REST APIs']
    },
    {
      id: 3,
      role: 'React Developer',
      company: 'WebCraft Solutions',
      location: 'Jaipur, India',
      duration: 'Mar 2021 – Dec 2022',
      description: 'Developed and maintained high-traffic web applications with an emphasis on performance optimization and responsive user experiences.',
      responsibilities: [
        'Built responsive web applications using React, Redux, and Tailwind CSS',
        'Integrated RESTful APIs and implemented reliable state management solutions',
        'Optimized application performance and reduced load times by 30%',
        'Collaborated with backend developers to design and implement APIs'
      ],
      technologies: ['React', 'Redux', 'JavaScript (ES6+)', 'Bootstrap']
    },
    {
      id: 4,
      role: 'Frontend Developer',
      company: 'Digital Innovators',
      location: 'Jaipur, India',
      duration: 'Aug 2020 – Feb 2021',
      description: 'Created responsive websites and interactive UI components with modern JavaScript and React.',
      responsibilities: [
        'Developed responsive websites using HTML5, CSS3, and JavaScript',
        'Created interactive UI components with modern component patterns',
        'Learned and implemented React.js for new client projects',
        'Participated in daily stand-ups and agile sprint planning'
      ],
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'React']
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
            Over the past 5 years, I've worked with various companies and high-scale clients to deliver robust, high-quality web applications.
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
                        <h4 className="font-semibold text-sm text-slate-800 mb-2">Key Contributions & Responsibilities:</h4>
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