import React from 'react';
import { Section } from './Section';

export const About: React.FC = () => {
  return (
    <Section id="about">
      <h2 className="text-3xl font-bold text-foreground mb-8">About Me</h2>
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
          <p>
            I am a graduating 4th-year BSIT student with a strong drive for software excellence.
            Currently, I am honing my skills as a <span className="text-primary font-semibold">Programmer Intern at Landbank of the Philippines</span>,
            where I am gaining firsthand exposure to enterprise-level software development and corporate IT workflows.
          </p>
          <p>
            My journey is defined by a passion for modern web technologies. I love transforming complex
            requirements into clean, user-friendly digital experiences. I am eager to bring my academic foundation
            and internship discipline to a full-time role.
          </p>
        </div>
        <div className="relative group">
            <div className="absolute inset-0 bg-blue-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
            <img 
                src="https://picsum.photos/seed/eli/600/600" 
                alt="Eli working" 
                className="relative rounded-2xl shadow-2xl border"
            />
        </div>
      </div>
    </Section>
  );
};