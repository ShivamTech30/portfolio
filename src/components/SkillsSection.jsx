import React from 'react';
import { motion } from 'framer-motion';
import { Code, Layout, Database, Server, Layers, Cpu } from 'lucide-react';

const SkillsSection = () => {
  const skillCategories = [
    {
      title: 'Frontend',
      icon: <Layout className="w-6 h-6 text-blue-600" />,
      skills: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'React.js', 'Next.js']
    },
    {
      title: 'Styling',
      icon: <Layers className="w-6 h-6 text-blue-600" />,
      skills: ['CSS3', 'Tailwind CSS', 'Bootstrap', 'SASS/SCSS', 'Styled Components']
    },
    {
      title: 'JavaScript',
      icon: <Code className="w-6 h-6 text-blue-600" />,
      skills: ['ES6+', 'TypeScript', 'jQuery', 'React Hooks', 'Context API']
    },
    {
      title: 'State Management',
      icon: <Database className="w-6 h-6 text-blue-600" />,
      skills: ['Redux', 'Redux Toolkit', 'Zustand', 'React Query', 'Context API']
    },
    {
      title: 'Tools',
      icon: <Cpu className="w-6 h-6 text-blue-600" />,
      skills: ['Git', 'Webpack', 'Vite', 'npm/yarn', 'Jest/Testing Library']
    },
    {
      title: 'Backend Knowledge',
      icon: <Server className="w-6 h-6 text-blue-600" />,
      skills: ['RESTful APIs', 'Node.js basics', 'Express.js', 'Firebase', 'MongoDB']
    }
  ];

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
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="section-title">My Skills</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            With 3.5 years of experience, I've developed expertise in various technologies and tools
            to build modern web applications.
          </p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {skillCategories.map((category, index) => (
            <motion.div 
              key={index}
              className="card hover:border-blue-500 hover:border transition-all"
              variants={itemVariants}
            >
              <div className="flex items-center mb-4">
                {category.icon}
                <h3 className="text-xl font-semibold ml-2">{category.title}</h3>
              </div>
              <ul className="space-y-2">
                {category.skills.map((skill, skillIndex) => (
                  <li key={skillIndex} className="flex items-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;