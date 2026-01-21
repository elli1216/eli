import React from 'react';
import { Section } from './Section';
import { SKILL_DATA } from '../constants';

export const Skills: React.FC = () => {
  return (
    <Section id="skills">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Tech Stack & Skills</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl">
        I utilize a modern toolbelt to build fast, responsive, and robust applications.
      </p>
      
      <div className="flex flex-wrap gap-4">
        {SKILL_DATA.map((skill) => (
          <div
            key={skill.name}
            className="px-6 py-3 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-200 font-medium hover:border-blue-500 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-default"
          >
            {skill.name}
          </div>
        ))}
      </div>
    </Section>
  );
};