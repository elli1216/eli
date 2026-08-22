import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, Trophy, Terminal, Users } from 'lucide-react';
import { ProjectItem } from '@/types/types';
import { ProjectMetrics } from '@/components/shared/ProjectMetrics';
import { TechStack } from '@/components/shared/TechStack';
import { TerminalBadge, TerminalButton } from '@/components/shared/terminal';

interface ProjectModalProps {
  project: ProjectItem | null;
  isOpen?: boolean;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

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

  const slug = project?.title ? project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') : 'project';

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10 bg-background/85 backdrop-blur-md font-mono"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          data-lenis-prevent="true"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 25 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 25 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full max-h-[92vh] flex flex-col bg-card rounded-2xl overflow-hidden shadow-2xl border border-border/80"
          >
            {/* Terminal Window Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-muted/40 border-b border-border/70 select-none">
              {/* Traffic light dots */}
              <div className="flex items-center gap-2">
                <span className="size-3 rounded-full bg-rose-500/80 inline-block" />
                <span className="size-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="size-3 rounded-full bg-emerald-500/80 inline-block" />
              </div>

              {/* Title tab */}
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground truncate max-w-xs sm:max-w-md">
                <Terminal size={12} className="text-primary shrink-0" />
                <span className="truncate">manifest://projects/{slug}.json</span>
              </div>

              {/* Close button */}
              <button
                ref={closeButtonRef}
                onClick={onClose}
                className="cursor-target p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
                aria-label="Close modal"
              >
                <X size={16} />
              </button>
            </div>

            {/* Simulated Prompt Header */}
            <div className="px-4 py-2 bg-muted/20 border-b border-border/40 text-xs text-foreground flex items-center justify-between gap-2 flex-wrap select-text">
              <div className="flex items-center gap-1.5 font-medium">
                <span className="text-primary font-bold">eli@portfolio</span>
                <span className="text-muted-foreground">:</span>
                <span className="text-primary/70">~</span>
                <span className="text-muted-foreground">$</span>
                <span>cat ./projects/{slug}/README.md</span>
              </div>

              <div className="flex items-center gap-2">
                {project.category && (
                  <TerminalBadge variant="accent" label={`--${project.category}`} />
                )}
                {project.placement && (
                  <TerminalBadge variant="success" label={project.placement} pulse />
                )}
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-8 flex-1 overflow-y-auto space-y-6">
              {/* Top Banner / Project Preview */}
              <div className="relative w-full h-44 sm:h-64 md:h-72 shrink-0 bg-muted rounded-xl overflow-hidden border border-border/60 shadow-md">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-card via-card/30 to-transparent" />
              </div>

              {/* Title & Execution Actions */}
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 border-b border-border/40 pb-6">
                <div>
                  <h2
                    id="modal-title"
                    className="text-xl sm:text-3xl font-extrabold text-foreground tracking-tight mb-1"
                  >
                    {project.title}
                  </h2>
                  {project.position && (
                    <p className="text-sm text-primary font-semibold">ROLE: {project.position}</p>
                  )}
                  {project.hackathonTitle && (
                    <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-1">
                      <Trophy size={13} className="text-primary" /> {project.hackathonTitle}
                    </p>
                  )}
                </div>

                {/* Executable CLI Buttons */}
                <div className="flex flex-wrap gap-2.5 shrink-0">
                  {project.demoLink && (
                    <TerminalButton
                      command="./launch-live.sh"
                      href={project.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="primary"
                      size="sm"
                      icon={ExternalLink}
                    />
                  )}
                  {project.repoLink && (
                    <TerminalButton
                      command="./git-clone.sh"
                      href={project.repoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="secondary"
                      size="sm"
                      icon={Github}
                    />
                  )}
                </div>
              </div>

              {/* Tech Stack */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  # DEPENDENCIES & TECH STACK
                </h4>
                <TechStack
                  technologies={project.techStack}
                  className="gap-2"
                  itemClassName="px-2.5 py-1 text-xs bg-muted/40 text-foreground border-border/60"
                />
              </div>

              {/* Metrics */}
              <ProjectMetrics
                project={project}
                className="space-y-2"
                gridClassName="max-w-fit font-mono"
                itemClassName="px-3"
                showTitle
              />

              {/* Problem Statement */}
              {project.problem && (
                <div className="space-y-2 p-4 rounded-xl bg-muted/20 border border-border/40">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-primary">
                    # PROBLEM STATEMENT
                  </h4>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {project.problem}
                  </p>
                </div>
              )}

              {/* Architecture & Solution Description */}
              <div className="space-y-2 p-4 rounded-xl bg-muted/20 border border-border/40">
                <h4 className="text-xs font-bold uppercase tracking-wider text-primary">
                  # SYSTEM IMPLEMENTATION & DESCRIPTION
                </h4>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Collaborators */}
              {project.collaborators && project.collaborators.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    # CONTRIBUTORS
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.collaborators.map(({ name, link }) => (
                      <a
                        key={name}
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cursor-target inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium bg-muted/40 hover:bg-primary/10 hover:text-primary rounded-md border border-border/60 transition-all"
                      >
                        <Users size={12} className="text-primary" />
                        <span>{name}</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Attached Certificate */}
              {project.certificate && (
                <div className="space-y-2 pt-2 border-t border-border/40">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    # AWARD CREDENTIAL
                  </h4>
                  <img
                    src={project.certificate}
                    alt={`${project.title} Certificate`}
                    className="w-full rounded-lg border border-border/60 shadow-sm"
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

export default ProjectModal;
