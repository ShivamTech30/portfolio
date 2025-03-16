import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Twitter, Mail, Phone } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-slate-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Shivam Sharma</h3>
            <p className="text-slate-300 mb-4">
              React Developer with 3.5 years of experience creating modern, responsive web applications.
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com/shivamsharma" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-slate-300 hover:text-white transition-colors">
                <Github size={20} />
              </a>
              <a href="https://linkedin.com/in/shivamsharma" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-slate-300 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="https://twitter.com/shivamsharma" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-slate-300 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/portfolio" className="text-slate-300 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-slate-300 hover:text-white transition-colors">About</Link></li>
              <li><Link to="/projects" className="text-slate-300 hover:text-white transition-colors">Projects</Link></li>
              <li><Link to="/contact" className="text-slate-300 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <Mail size={16} />
                <a href="mailto:shivamtech30@gmail.com" className="text-slate-300 hover:text-white transition-colors">shivamtech30@gmail.com</a>
              </li>
              <li className="flex items-center space-x-2">
                <Phone size={16} />
                <a href="tel:+1234567890" className="text-slate-300 hover:text-white transition-colors">+91 8949157092</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-800 pt-6 text-center text-slate-400">
          <p>&copy; {currentYear} Shivam Sharma. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;