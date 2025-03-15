import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar } from 'lucide-react';

const ExperienceSection = () => {
  const experiences = [
    {
      id: 1,
      role: 'Senior React Developer',
      company: 'TechSolutions Inc.',
      duration: 'Jan 2023 - Present',
      description: 'Leading the frontend development team in building scalable React applications. Implementing best practices, code reviews, and mentoring junior developers.',
      responsibilities: [
        'Architected and developed complex React applications using Redux Toolkit and React Query',
        'Implemented CI/CD pipelines and improved build performance by 40%',
        'Mentored junior developers and conducted code reviews',
        'Collaborated with UX/UI designers to implement responsive designs'
      ]
    },
    {
      id: 2,
      role: 'React Developer',
      company: 'WebCraft Solutions',
      duration: 'Mar 2021 - Dec 2022',
      description: 'Developed and maintained multiple React applications for clients across various industries. Focused on performance optimization and responsive design.',
      responsibilities: [
        'Built responsive web applications using React, Redux, and Tailwind CSS',
        'Integrated RESTful APIs and implemented state management solutions',
        'Optimized application performance and reduced load times by 30%',
        'Collaborated with backend developers to design and implement APIs'
      ]
    },
    {
      id: 3,
      role: 'Frontend Developer',
      company: 'Digital Innovators',
      duration: 'Aug 2020 - Feb 2021',
      description: 'Started as a frontend developer working with HTML, CSS, JavaScript, and jQuery. Gradually transitioned to React development.',
      responsibilities: [
        'Developed responsive websites using HTML5, CSS3, and JavaScript',
        'Created interactive UI components with jQuery and Bootstrap',
        'Learned and implemented React.js for new projects',
        'Participated in daily stand-ups and sprint planning meetings'
      ]
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
            Over the past 3.5 years, I've worked with various companies to deliver high-quality web applications.
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
                  <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white"></div>
                  
                  {/* Content */}
                  <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pl-12' : 'md:pr-12'}`}>
                    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all border-l-4 border-blue-600">
                      <div className="flex items-center mb-2">
                        <Briefcase className="w-5 h-5 text-blue-600 mr-2" />
                        <h3 className="text-xl font-bold">{exp.role}</h3>
                      </div>
                      <div className="flex items-center mb-4 text-slate-700">
                        <span className="font-medium">{exp.company}</span>
                        <span className="mx-2">•</span>
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {exp.duration}
                        </span>
                      </div>
                      <p className="text-slate-600 mb-4">{exp.description}</p>
                      <div>
                        <h4 className="font-semibold mb-2">Key Responsibilities:</h4>
                        <ul className="space-y-1 text-slate-600">
                          {exp.responsibilities.map((resp, i) => (
                            <li key={i} className="flex items-start">
                              <span className="inline-block w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5 mr-2"></span>
                              <span>{resp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
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