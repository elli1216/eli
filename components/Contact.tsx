import React from 'react';
import { Section } from './Section';
import { Mail, Linkedin, Github } from 'lucide-react';

export const Contact: React.FC = () => {
  return (
    <Section id="contact">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">Get In Touch</h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-xl mx-auto">
          Whether you have a question, a job opportunity, or just want to say hi, my inbox is always open.
        </p>
        
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8 flex flex-col justify-center">
            <a href="mailto:eli@example.com" className="flex items-center gap-4 group p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full group-hover:scale-110 transition-transform">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Email Me</h3>
                <p className="text-gray-600 dark:text-gray-400">eli@example.com</p>
              </div>
            </a>
            
            <a href="#" className="flex items-center gap-4 group p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full group-hover:scale-110 transition-transform">
                <Linkedin size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">LinkedIn</h3>
                <p className="text-gray-600 dark:text-gray-400">Connect professionally</p>
              </div>
            </a>

            <a href="#" className="flex items-center gap-4 group p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full group-hover:scale-110 transition-transform">
                <Github size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">GitHub</h3>
                <p className="text-gray-600 dark:text-gray-400">Review my code</p>
              </div>
            </a>
          </div>

          {/* Simple Form */}
          <form className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-slate-800 space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label>
              <input 
                type="text" 
                id="name" 
                className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow text-gray-900 dark:text-white"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
              <input 
                type="email" 
                id="email" 
                className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow text-gray-900 dark:text-white"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message</label>
              <textarea 
                id="message" 
                rows={4}
                className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow text-gray-900 dark:text-white resize-none"
                placeholder="Hello Eli, I'd like to discuss..."
              ></textarea>
            </div>
            <button 
              type="submit" 
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-md"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </Section>
  );
};