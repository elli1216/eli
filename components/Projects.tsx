import React, { useState, useEffect } from 'react';
import { Section } from './Section';
import { PROJECT_DATA } from '../constants';
import { ProjectItem } from '../types';
import { Github, ExternalLink, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ProjectCard: React.FC<{ project: ProjectItem; index: number; onClick: () => void }> = ({ project, index, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onClick={onClick}
      className="group relative aspect-video bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-border cursor-pointer"
    >
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />

      {/* Overlay Title */}
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
        <h3 className="text-xl font-bold text-white">
          {project.title}
        </h3>
      </div>

      {/* Permanent Title for Mobile/Touch */}
      <div className="absolute bottom-0 left-0 w-full p-4 bg-black/40 backdrop-blur-xs md:hidden">
        <h3 className="text-sm font-bold text-white truncate">
          {project.title}
        </h3>
      </div>
    </motion.div>
  );
};

const ProjectModal: React.FC<{ project: ProjectItem; onClose: () => void }> = ({ project, onClose }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);

    // --- Robust Scroll Lock ---
    // Store original styles
    const originalHtmlOverflow = document.documentElement.style.overflow;
    const originalBodyOverflow = document.body.style.overflow;

    // Prevent background scrolling
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.style.overflow = 'hidden'; // For html
    document.body.style.overflow = 'hidden'; // For body
    document.body.style.paddingRight = `${scrollBarWidth}px`;

    // Cleanup function to restore original styles
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.documentElement.style.overflow = originalHtmlOverflow;
      document.body.style.overflow = originalBodyOverflow;
      document.body.style.paddingRight = '0px';
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden outline-none" data-lenis-prevent>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-background/90 backdrop-blur-md"
      />

      {/* Scrollable Container Wrapper */}
      <div className="flex min-h-full items-center justify-center p-4 md:p-6 lg:p-12 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-5xl bg-card rounded-2xl shadow-2xl border border-border overflow-hidden pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-background/50 backdrop-blur-md hover:bg-background transition-colors z-20 text-foreground"
          >
            <X size={20} />
          </button>

          <div className="flex flex-col">
            {/* Hero Image - Fitted to width */}
            <div className="w-full bg-muted/30 flex items-center justify-center p-2 md:p-4 border-b border-border">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-auto max-h-[70vh] object-contain rounded-lg"
              />
            </div>

            <div className="p-6 md:p-10">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
                <div className="flex-1">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs font-semibold bg-primary/10 text-primary rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                    {project.title}
                  </h2>

                  <div className="max-w-3xl text-muted-foreground">
                    <p className="text-base md:text-lg leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-3 min-w-45 shrink-0">
                  {project.demoLink && (
                    <a
                      href={project.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all font-bold text-sm shadow-lg shadow-primary/20"
                    >
                      <ExternalLink size={18} /> Live Demo
                    </a>
                  )}
                  {project.repoLink && (
                    <a
                      href={project.repoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-accent hover:bg-accent/80 text-foreground transition-all font-bold text-sm border border-border"
                    >
                      <Github size={18} /> Source Code
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  return (
    <Section id="projects" className="bg-accent">
      <div className="mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">Recent Projects</h2>
        <p className="text-muted-foreground mt-3 max-w-2xl">
          A collection of projects where I've applied my skills in full-stack development.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {PROJECT_DATA.map((project, index) => (
          <ProjectCard
            key={project.id || index}
            project={project}
            index={index}
            onClick={() => setSelectedProject(project)}
          />
        ))}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </Section>
  );
};




