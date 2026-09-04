import React from 'react';
import { motion } from 'framer-motion';
import { Code, Layout, Database, Server, Layers, Cpu, Zap } from 'lucide-react';

const SkillsSection = () => {
  const skillCategories = [
    {
      title: 'Core Technologies',
      icon: <Layout className="w-6 h-6 text-blue-600" />,
      skills: ['React.js', 'Next.js', 'TypeScript', 'JavaScript (ES6+)', 'Redux / Redux Toolkit (RTK)', 'TanStack Query', 'Context API', 'HTML5 / CSS3']
    },
    {
      title: 'Styling & UI',
      icon: <Layers className="w-6 h-6 text-blue-600" />,
      skills: ['Tailwind CSS', 'Bootstrap', 'Material UI (MUI)', 'Responsive Design', 'CSS Modules / SASS']
    },
    {
      title: 'Data & APIs',
      icon: <Database className="w-6 h-6 text-blue-600" />,
      skills: ['REST API', 'GraphQL', 'Axios & Fetch', 'WebSocket (Real-time)', 'Swagger API Docs']
    },
    {
      title: 'Performance & Architecture',
      icon: <Zap className="w-6 h-6 text-blue-600" />,
      skills: ['Code Splitting', 'Memoization & Optimization', 'Monorepo Architecture', 'Scalable Frontend Infra', 'Reduced Re-renders']
    },
    {
      title: 'Tooling & Workflow',
      icon: <Cpu className="w-6 h-6 text-blue-600" />,
      skills: ['Git & GitHub', 'Webpack / Vite', 'Jira & Trello', 'Postman', 'AWS S3', 'VS Code']
    },
    {
      title: 'Backend (Working Knowledge)',
      icon: <Server className="w-6 h-6 text-blue-600" />,
      skills: ['Node.js', 'MongoDB', 'REST API Development', 'Fullstack Coordination']
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
          <h2 className="section-title">Technical Skills</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            With 5+ years of production frontend experience, here are the technologies, tools, and practices I use to build fast, scalable web applications.
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
                <h3 className="text-xl font-semibold ml-2 text-slate-900">{category.title}</h3>
              </div>
              <ul className="space-y-2">
                {category.skills.map((skill, skillIndex) => (
                  <li key={skillIndex} className="flex items-center text-sm text-slate-700">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-2 flex-shrink-0"></div>
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