import React from 'react';
import { Section } from './Section';
import { EXPERIENCE_DATA } from '../constants';

export const Experience: React.FC = () => {
  return (
    <Section id="experience" className="bg-white dark:bg-slate-900/50">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12">Experience</h2>
      <div className="relative border-l-2 border-gray-200 dark:border-slate-700 ml-3 space-y-12">
        {EXPERIENCE_DATA.map((item) => (
          <div key={item.id} className="relative pl-8 sm:pl-12 group">
            {/* Timeline Dot */}
            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-600 border-4 border-white dark:border-slate-950 group-hover:scale-125 transition-transform" />
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {item.role}
              </h3>
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-slate-800 px-3 py-1 rounded-full w-fit mt-2 sm:mt-0">
                {item.period}
              </span>
            </div>
            
            <h4 className="text-lg font-medium text-blue-600 dark:text-blue-400 mb-4">
              {item.company}
            </h4>
            
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
};