import React from 'react';
import { Section } from './Section';
import { PROJECT_DATA } from '../constants';
import { Github, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

export const Projects: React.FC = () => {
  return (
    <Section id="projects" className="bg-accent">
      <h2 className="text-3xl font-bold text-foreground mb-12">Featured Projects</h2>
      <div className="grid md:grid-cols-2 gap-8">
        {PROJECT_DATA.map((project) => (
          <motion.div
            key={project.id}
            whileHover={{ y: -5 }}
            className="bg-card rounded-xl overflow-hidden shadow-sm border hover:shadow-xl transition-shadow duration-300 flex flex-col"
          >
            <div className="h-48 sm:h-64 overflow-hidden relative group">
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                <a href={project.repoLink} className="p-3 bg-card text-card-foreground rounded-full hover:scale-110 transition-transform" title="View Code">
                  <Github size={20} />
                </a>
                <a href={project.demoLink} className="p-3 bg-card text-card-foreground rounded-full hover:scale-110 transition-transform" title="Live Demo">
                  <ExternalLink size={20} />
                </a>
              </div>
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="p-6 sm:p-8 grow flex flex-col">
              <h3 className="text-2xl font-bold text-foreground mb-3">
                {project.title}
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed grow">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mt-auto">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs font-semibold text-primary bg-accent rounded-md"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};