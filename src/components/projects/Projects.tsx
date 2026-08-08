import React, { useState, useEffect, useRef } from 'react';
import { Section } from '@/components/layout/Section';
import { PROJECT_DATA } from '@/constants/constants';
import { ProjectItem } from '@/types/types';
import { Github, ExternalLink, X, ArrowRight, ChevronRight, Trophy } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { category } from '@/constants/constants';
import { DecorativeFrame } from '@/components/shared/DecorativeFrame';
import { SectionTitle } from '@/components/layout/SectionTitle';
import { useAccent } from '@/contexts/AccentContext';

const CATEGORY_COUNTS = Object.values(category)
  .map((cat) => ({
    name: cat as typeof category[keyof typeof category],
    count: PROJECT_DATA.filter((p) => p.category === cat).length,
  }))
  .filter((cat) => cat.count > 0);

const getBadgeStyles = (Category: typeof category[keyof typeof category]) => {
  switch (Category) {
    case category.ACADEMIC:
      return 'bg-purple-500/20 text-purple-500 border-purple-500/30';
    case category.FREELANCE:
      return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
    case category.CAPSTONE:
      return 'bg-orange-500/20 text-orange-300 border-orange-500/30';
    case category.HACKATHON:
      return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
    default:
      return 'bg-primary/20 text-primary border-primary/30';
  }
};

interface ProjectCardProps {
  project: ProjectItem;
  index: number;
  onClick: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, onClick }) => {
  const { currentAccent } = useAccent();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="h-fit"
    >
      <DecorativeFrame accentColor={currentAccent} className="h-full">
        <button
          onClick={onClick}
          className="group relative w-full h-full text-left rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 bg-card border border-primary/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background flex flex-col cursor-pointer"
        >
          {/* Accent top bar */}
          <div
            className="h-1 w-full shrink-0"
            style={{ background: `linear-gradient(90deg, ${currentAccent}, transparent)` }}
          />

          <div className="relative flex-1 flex flex-col p-6">
            {/* Category badge */}
            {project.category && (
              <span className={`inline-flex w-fit items-center px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full border ${getBadgeStyles(project.category)} mb-3`}>
                {project.category}
              </span>
            )}

            {/* Title */}
            <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors leading-tight mb-1">
              {project.title}
            </h3>
            {project.position && (
              <p className="text-sm font-normal text-muted-foreground italic group-hover:text-primary/70 transition-colors">
                {project.position} {project.category === category.HACKATHON ? "(Hackathon)" : ""}
              </p>
            )}

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-1.5 mt-4 mb-5">
              {project.techStack.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 text-[10px] sm:text-xs font-medium bg-secondary text-secondary-foreground rounded-md border border-border/50"
                >
                  {tech}
                </span>
              ))}
              {project.techStack.length > 5 && (
                <span className="px-2 py-1 text-[10px] sm:text-xs font-medium bg-transparent text-muted-foreground rounded-md border border-transparent">
                  +{project.techStack.length - 4} more
                </span>
              )}
            </div>

            {/* Footer CTA */}
            <div className="flex items-center justify-end mt-auto pt-4 border-t border-border/50">
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary">
                View Details
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </div>
        </button>
      </DecorativeFrame>
    </motion.div>
  );
};

export const Projects: React.FC = () => {
  const [showAll, setShowAll] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const INITIAL_VISIBLE = 4;
  const filteredProjects = activeFilter
    ? PROJECT_DATA.filter((p) => p.category === activeFilter)
    : PROJECT_DATA;
  const visibleProjects = showAll ? filteredProjects : filteredProjects.slice(0, INITIAL_VISIBLE);
  const remainingCount = filteredProjects.length - INITIAL_VISIBLE;

  // Handle ESC key to close modal + focus close button on open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedProject(null);
    };
    if (selectedProject) {
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
  }, [selectedProject]);

  return (
    <Section id="projects">
      <div className="mb-12">
        <SectionTitle>Works so far</SectionTitle>
        <div className="mt-6 flex flex-wrap justify-center gap-2.5">
          {CATEGORY_COUNTS.map((cat) => {
            const isActive = activeFilter === cat.name;
            return (
              <button
                key={cat.name}
                onClick={() => {
                  setActiveFilter(isActive ? null : cat.name);
                  setShowAll(false);
                }}
                className={`inline-flex items-center gap-2 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider rounded-full border transition-all cursor-pointer hover:scale-105 active:scale-95 ${isActive || activeFilter === null
                  ? getBadgeStyles(cat.name)
                  : 'bg-transparent text-muted-foreground border-border/50 hover:border-border hover:text-foreground'
                  }`}
              >
                {cat.name}
                <span className={`px-1.5 py-0.5 rounded-md text-[10px] shadow-sm ${isActive || activeFilter === null ? 'bg-background/40 backdrop-blur-sm' : 'bg-secondary/50 text-muted-foreground'
                  }`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {visibleProjects.map((project, index) => (
          <ProjectCard
            key={project.title}
            project={project}
            index={index}
            onClick={() => setSelectedProject(project)}
          />
        ))}
      </div>

      {!showAll && remainingCount > 0 ? (
        <div className="mt-12 flex flex-col items-center gap-3">
          <p className="text-xs text-muted-foreground tabular-nums">
            Showing {visibleProjects.length} of {filteredProjects.length} projects
          </p>
          <button
            onClick={() => setShowAll(true)}
            className="group flex items-center gap-2 px-6 py-2.5 rounded-lg border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 font-medium cursor-pointer"
          >
            See More ({remainingCount})
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      ) : visibleProjects.length > 4 ?
        <div className="mt-12 flex justify-center">
          <button
            onClick={() => setShowAll(false)}
            className="group flex items-center gap-2 px-6 py-2.5 rounded-lg border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 font-medium cursor-pointer"
          >
            See Less
          </button>
        </div> : null}

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12 bg-background/80 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            data-lenis-prevent="true"
          >
            {/* Close button */}
            <button
              ref={closeButtonRef}
              onClick={() => setSelectedProject(null)}
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
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-card via-card/20 to-transparent" />

                {selectedProject.category && (
                  <span className={`absolute top-4 left-4 px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full border shadow-sm backdrop-blur-md ${getBadgeStyles(selectedProject.category)}`}>
                    {selectedProject.category}
                  </span>
                )}
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 flex-1 overflow-y-auto">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-6">
                  <div>
                    <h2 id="modal-title" className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight mb-2">
                      {selectedProject.title}
                    </h2>
                    {selectedProject.position && (
                      <p className="text-lg text-primary font-medium">
                        {selectedProject.position}
                      </p>
                    )}
                    {selectedProject.hackathonTitle && (
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-2">
                        <p className="text-sm text-muted-foreground font-medium flex items-center gap-1.5">
                          <Trophy size={14} className="text-primary" /> {selectedProject.hackathonTitle}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Action Links */}
                  <div className="flex flex-wrap gap-3 shrink-0">
                    {selectedProject.demoLink && (
                      <a
                        href={selectedProject.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-md shadow-primary/20"
                      >
                        <ExternalLink size={16} /> Live Site
                      </a>
                    )}
                    {selectedProject.repoLink && (
                      <a
                        href={selectedProject.repoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-all border border-border"
                      >
                        <Github size={16} /> Repository
                      </a>
                    )}
                    {!selectedProject.demoLink && !selectedProject.repoLink && (
                      <span className="text-sm font-medium text-muted-foreground bg-secondary/50 px-4 py-2 rounded-lg border border-border/50">
                        In Progress
                      </span>
                    )}
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="mb-8">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-secondary-foreground mb-3">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 text-xs sm:text-sm font-medium bg-primary/10 text-primary rounded-md border border-primary/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Metrics & Placement */}
                {(selectedProject.placement || (selectedProject.metrics && selectedProject.metrics.length > 0)) && (
                  <div className="mb-8">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-secondary-foreground mb-3">Key Results & Achievements</h4>
                    <div className={`grid gap-3 max-w-fit ${selectedProject.metrics && selectedProject.metrics.length > 0 ? 'grid-cols-2 sm:grid-cols-4' : 'grid-cols-1 sm:grid-cols-2'}`}>
                      {selectedProject.placement && (
                        <div className="rounded-lg border border-border/50 bg-background/50 px-3 py-3 text-center flex flex-col justify-center">
                          <p className="text-xl sm:text-2xl font-extrabold text-primary leading-tight">
                            {selectedProject.placement}
                          </p>
                          <p className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1 leading-snug">
                            {selectedProject.placementOutOf ? `Out of ${selectedProject.placementOutOf}` : 'Placement'}
                          </p>
                        </div>
                      )}
                      {selectedProject.metrics?.map((metric) => (
                        <div
                          key={metric.label}
                          className="rounded-lg border border-border/50 bg-background/50 px-3 py-3 text-center flex flex-col justify-center"
                        >
                          <p className="text-xl sm:text-2xl font-extrabold text-primary leading-tight">
                            {metric.value}
                          </p>
                          <p className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1 leading-snug">
                            {metric.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Collaborators */}
                {selectedProject.collaborators && selectedProject.collaborators.length > 0 && (
                  <div className="mb-8">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-secondary-foreground mb-3">Collaborators</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.collaborators.map(({ name, link }) => (
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

                {/* Problem */}
                {selectedProject.theme && (
                  <div className="mb-8">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-secondary-foreground mb-3">Hackathon Theme</h4>
                    <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
                      {selectedProject.theme}
                    </p>
                  </div>
                )}

                {/* Problem */}
                {selectedProject.problem && (
                  <div className="mb-8">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-secondary-foreground mb-3">About the Problem</h4>
                    <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
                      {selectedProject.problem}
                    </p>
                  </div>
                )}

                {/* Description */}
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-secondary-foreground mb-3">About the Project</h4>
                  <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
                    {selectedProject.description}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
};
