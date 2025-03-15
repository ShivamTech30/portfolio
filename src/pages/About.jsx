import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Award, BookOpen, Code, Coffee } from 'lucide-react';

const About = () => {
  const stats = [
    { icon: <Calendar className="w-6 h-6 text-blue-600" />, value: '3.5+', label: 'Years Experience' },
    { icon: <Code className="w-6 h-6 text-blue-600" />, value: '7+', label: 'Projects Completed' },
    { icon: <Coffee className="w-6 h-6 text-blue-600" />, value: '1000+', label: 'Cups of Coffee' },
    // { icon: <Award className="w-6 h-6 text-blue-600" />, value: '15+', label: 'Certifications' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-24 pb-16"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">About Me</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Get to know more about me, my background, and what drives me as a developer.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-r from-black-600 to-black-600 rounded-lg"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <img 
                  src="https://avatars.githubusercontent.com/u/121786648?s=400&u=897de0037cf19c8f330e25d541ffae0ef224fcd3&v=4" 
                  alt="Shivam Sharma" 
                  className="  h-full object-cover rounded-lg"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg">
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 text-blue-600 mr-2" />
                  <span className="font-medium">New Delhi, India</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-3xl font-bold mb-6">
              I'm <span className="gradient-text">Shivam Sharma</span>, a passionate React Developer
            </h2>
            <p className="text-slate-700 mb-6">
              With 3.5 years of experience in frontend development, I specialize in building modern, 
              responsive, and user-friendly web applications. My journey in web development started 
              with HTML, CSS, and JavaScript, and I've since evolved to master React.js and Next.js.
            </p>
            <p className="text-slate-700 mb-6">
              I'm passionate about creating clean, efficient code and delivering exceptional user 
              experiences. I stay updated with the latest technologies and best practices to ensure 
              that the applications I build are not only visually appealing but also performant and 
              accessible.
            </p>
            <p className="text-slate-700 mb-8">
              When I'm not coding, you can find me exploring new technologies, contributing to open-source 
              projects, or sharing my knowledge through blog posts and community forums.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">Education</h3>
                <div className="flex items-start mb-2">
                  <BookOpen className="w-5 h-5 text-blue-600 mr-2 mt-1" />
                  <div>
                    <p className="font-medium">B.Tech</p>
                    <p className="text-slate-600 text-sm">RTU, 2020</p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Languages</h3>
                <ul className="space-y-1">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                    <span>English (Professional)</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                    <span>Hindi (Native)</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-all">
              <div className="flex justify-center mb-4">
                {stat.icon}
              </div>
              <h3 className="text-3xl font-bold text-blue-600 mb-1">{stat.value}</h3>
              <p className="text-slate-600">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 md:p-12 text-white">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">My Development Philosophy</h2>
              <p className="max-w-3xl mx-auto opacity-90">
                I believe in creating web applications that are not just visually appealing but also 
                functional, accessible, and performant. Here are some principles that guide my work:
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-sm">
                <h3 className="text-xl font-semibold mb-3">User-Centered Design</h3>
                <p className="opacity-90">
                  I prioritize the end-user experience in every project, ensuring that interfaces are 
                  intuitive, accessible, and delightful to use.
                </p>
              </div>
              
              <div className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-sm">
                <h3 className="text-xl font-semibold mb-3">Clean, Maintainable Code</h3>
                <p className="opacity-90">
                  I write code that is not only functional but also readable, well-documented, and 
                  easy to maintain for future developers.
                </p>
              </div>
              
              <div className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-sm">
                <h3 className="text-xl font-semibold mb-3">Continuous Learning</h3>
                <p className="opacity-90">
                  The tech landscape evolves rapidly, and I'm committed to staying updated with the 
                  latest tools, frameworks, and best practices.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default About;