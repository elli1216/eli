import React from 'react';
import { Section } from './Section';
import StackIcon from 'tech-stack-icons';
import { SKILL_DATA } from '../constants';

interface props {
  darkMode: boolean
}

export const Skills: React.FC<props> = ({ darkMode }) => {
  return (
    <Section id="skills">
      <h2 className="text-3xl font-bold text-foreground mb-8">Tech Stack & Skills</h2>
      <p className="text-muted-foreground mb-8 max-w-2xl">
        I utilize a modern toolbelt to build fast, responsive, and robust applications.
      </p>

      <div className="flex flex-wrap gap-4">
        {SKILL_DATA.map((skill) => (
          <div
            key={skill.name}
            className="flex flex-col items-center justify-center px-6 py-3 bg-card rounded-lg shadow-sm border text-muted-foreground font-medium hover:border-primary hover:text-primary transition-colors cursor-default"
          >
            <div className='size-10'>
              <StackIcon name={skill.icon} variant={ darkMode ? "dark" : "light"} />
            </div>
            {skill.name}
          </div>
        ))}
      </div>
    </Section>
  );
};