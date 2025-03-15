import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import ContactForm from '../components/ContactForm';

const Contact = () => {
  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6 text-blue-600" />,
      title: 'Email',
      details: 'shivamtech30@gmail.com',
      link: 'mailto:shivamtech30@gmail.com'
    },
    {
      icon: <Phone className="w-6 h-6 text-blue-600" />,
      title: 'Phone',
      details: '+91 8949157092',
      link: 'tel:+1234567890'
    },
    {
      icon: <MapPin className="w-6 h-6 text-blue-600" />,
      title: 'Location',
      details: 'Jaipur, India',
      link: 'https://maps.google.com/?q=New+Delhi,India'
    },
    {
      icon: <Clock className="w-6 h-6 text-blue-600" />,
      title: 'Working Hours',
      details: 'Mon - Fri: 9AM - 6PM',
      link: null
    }
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Get In Touch</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Have a project in mind or want to discuss potential opportunities? I'd love to hear from you!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <ContactForm />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex">
                    <div className="mr-4 mt-1">
                      <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                        {info.icon}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{info.title}</h3>
                      {info.link ? (
                        <a 
                          href={info.link} 
                          className="text-slate-600 hover:text-blue-600 transition-colors"
                          target={info.title === 'Location' ? '_blank' : undefined}
                          rel={info.title === 'Location' ? 'noopener noreferrer' : undefined}
                        >
                          {info.details}
                        </a>
                      ) : (
                        <p className="text-slate-600">{info.details}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 pt-6 border-t border-slate-200">
                <h3 className="font-semibold text-lg mb-4">Connect With Me</h3>
                <div className="flex space-x-4">
                  <a 
                    href="https://github.com/ShivamTech30" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-slate-800 hover:bg-slate-900 text-white rounded-full flex items-center justify-center transition-colors"
                    aria-label="GitHub"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/shivam-sharma-a43326188/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center transition-colors"
                    aria-label="LinkedIn"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                  <a 
                    href="#" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-blue-400 hover:bg-blue-500 text-white rounded-full flex items-center justify-center transition-colors"
                    aria-label="Twitter"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 md:p-12 text-white text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Let's Work Together</h2>
          <p className="max-w-3xl mx-auto mb-8 opacity-90">
            I'm currently available for freelance work and full-time opportunities. 
            If you have a project that needs a skilled React developer, I'd love to help bring your ideas to life.
          </p>
          <a 
            href="mailto:shivamtech30@gmail.com" 
            className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-lg font-medium transition-all hover:bg-blue-50"
          >
            <Send size={18} className="mr-2" />
            Send me an email
          </a>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Contact;