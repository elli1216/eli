import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, Trophy } from 'lucide-react';
import { ProjectItem } from '@/types/types';
import { getBadgeStyles } from '@/lib/utils';
import { ProjectMetrics } from '@/components/shared/ProjectMetrics';
import { TechStack } from '@/components/shared/TechStack';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Handle ESC key to close modal + focus close button on open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      closeButtonRef.current?.focus();
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12 bg-background/80 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          data-lenis-prevent="true"
        >
          {/* Close button */}
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full bg-card/80 hover:bg-card text-foreground transition-all backdrop-blur-md border border-border/50 shadow-lg z-50 cursor-pointer hover:rotate-90 hover:scale-110"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>

          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 30 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full max-h-[90vh] flex flex-col bg-card rounded-2xl overflow-hidden shadow-2xl border border-border/50"
          >
            {/* Modal Header: Image */}
            <div className="relative w-full h-48 sm:h-64 md:h-80 shrink-0 bg-muted overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-card via-card/20 to-transparent" />

              {project.category && (
                <span className={`absolute top-4 left-4 px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full border shadow-sm backdrop-blur-md ${getBadgeStyles(project.category)}`}>
                  {project.category}
                </span>
              )}
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 flex-1 overflow-y-auto">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-6">
                <div>
                  <h2 id="modal-title" className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight mb-2">
                    {project.title}
                  </h2>
                  {project.position && (
                    <p className="text-lg text-primary font-medium">
                      {project.position}
                    </p>
                  )}
                  {project.hackathonTitle && (
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-2">
                      <p className="text-sm text-muted-foreground font-medium flex items-center gap-1.5">
                        <Trophy size={14} className="text-primary" /> {project.hackathonTitle}
                      </p>
                    </div>
                  )}
                </div>

                {/* Action Links */}
                <div className="flex flex-wrap gap-3 shrink-0">
                  {project.demoLink && (
                    <a
                      href={project.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-md shadow-primary/20"
                    >
                      <ExternalLink size={16} /> Live Site
                    </a>
                  )}
                  {project.repoLink && (
                    <a
                      href={project.repoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-all border border-border"
                    >
                      <Github size={16} /> Repository
                    </a>
                  )}
                  {!project.demoLink && !project.repoLink && (
                    <span className="text-sm font-medium text-muted-foreground bg-secondary/50 px-4 py-2 rounded-lg border border-border/50">
                      In Progress
                    </span>
                  )}
                </div>
              </div>

              {/* Tech Stack */}
              <div className="mb-8">
                <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">Technologies Used</h4>
                <TechStack 
                  technologies={project.techStack} 
                  className="gap-2"
                  itemClassName="px-3 py-1.5 sm:text-sm bg-primary/10 text-primary border-primary/20"
                />
              </div>

              {/* Metrics & Placement */}
              <ProjectMetrics 
                project={project} 
                className="mb-8" 
                gridClassName="max-w-fit"
                itemClassName="px-3"
                showTitle 
              />

              {/* Collaborators */}
              {project.collaborators && project.collaborators.length > 0 && (
                <div className="mb-8">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">Collaborators</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.collaborators.map(({ name, link }) => (
                      <a
                        key={name}
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 text-xs sm:text-sm font-medium bg-secondary text-secondary-foreground hover:text-primary hover:border-primary/40 rounded-md border border-border/50 transition-all"
                      >
                        {name}
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Theme */}
              {project.theme && (
                <div className="mb-8">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-secondary-foreground mb-3">Hackathon Theme</h4>
                  <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
                    {project.theme}
                  </p>
                </div>
              )}

              {/* Problem */}
              {project.problem && (
                <div className="mb-8">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-secondary-foreground mb-3">About the Problem</h4>
                  <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
                    {project.problem}
                  </p>
                </div>
              )}

              {/* Description */}
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-secondary-foreground mb-3">About the Project</h4>
                <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
                  {project.description}
                </p>
              </div>

              {/* Certificate */}
              {project.certificate && (
                <div className="mt-8">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-secondary-foreground mb-3">Certificate</h4>
                  <img 
                    src={project.certificate} 
                    alt={`${project.title} Certificate`} 
                    className="w-full rounded-lg border border-border/50 shadow-sm"
                    loading="lazy"
                  />
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
