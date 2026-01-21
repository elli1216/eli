import React from 'react';
import { Section } from './Section';
import { EXPERIENCE_DATA } from '../constants';

export const Experience: React.FC = () => {
  return (
    <Section id="experience" className="bg-card">
      <h2 className="text-3xl font-bold text-foreground mb-12">Experience</h2>
      <div className="relative border-l-2 border ml-3 space-y-12">
        {EXPERIENCE_DATA.map((item) => (
          <div key={item.id} className="relative pl-8 sm:pl-12 group">
            {/* Timeline Dot */}
            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary border-4 border-background group-hover:scale-125 transition-transform" />
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
              <h3 className="text-xl font-bold text-foreground">
                {item.role}
              </h3>
              <span className="text-sm font-medium text-muted-foreground bg-accent px-3 py-1 rounded-full w-fit mt-2 sm:mt-0">
                {item.period}
              </span>
            </div>
            
            <h4 className="text-lg font-medium text-primary mb-4">
              {item.company}
            </h4>
            
            <p className="text-muted-foreground leading-relaxed max-w-3xl">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
};