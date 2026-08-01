import React, { useState, useEffect } from 'react';
import { Section } from '@/components/layout/Section';
import { PROJECT_DATA } from '@/constants/constants';
import { ProjectItem } from '@/types/types';
import { Github, ExternalLink, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { category } from '@/constants/constants';
import { DecorativeFrame } from '@/components/shared/DecorativeFrame';
import { SectionTitle } from '@/components/layout/SectionTitle';
import { useAccent } from '@/contexts/AccentContext';

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
      className="h-full"
    >
      <DecorativeFrame accentColor={currentAccent} className="h-full">
        <button
          onClick={onClick}
          className="group relative w-full h-full text-left rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 bg-card border border-primary/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background p-6 flex flex-col justify-between min-h-40 cursor-pointer"
        >
          {/* Subtle background gradient on hover */}
          <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          <div className="relative z-10 flex-1 flex flex-col justify-between">
            {/* Header */}
            <div className="flex justify-between items-start mb-4 gap-4">
              <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
                {project.title}
                {project.position && (
                  <span className="block mt-1 text-sm font-normal text-muted-foreground italic group-hover:text-primary/70 transition-colors">
                    {project.position} {project.category === category.HACKATHON ? "(Hackathon)" : ""}
                  </span>
                )}
              </h3>

              <div className="text-primary/40 group-hover:text-primary transition-all duration-300 transform group-hover:translate-x-1 group-hover:-translate-y-1">
                <ExternalLink size={20} />
              </div>
            </div>

            {/* Tech Stack */}
            <div className="flex flex-nowrap gap-1.5 mt-auto">
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
          </div>
        </button>
      </DecorativeFrame>
    </motion.div>
  );
};

export const Projects: React.FC = () => {
  const [showAll, setShowAll] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const INITIAL_VISIBLE = 4;
  const visibleProjects = showAll ? PROJECT_DATA : PROJECT_DATA.slice(0, INITIAL_VISIBLE);
  const remainingCount = PROJECT_DATA.length - INITIAL_VISIBLE;

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedProject(null);
    };
    if (selectedProject) {
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
        <div className="mt-12 flex justify-center">
          <button
            onClick={() => setShowAll(true)}
            className="group flex items-center gap-2 px-6 py-2.5 rounded-lg border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 font-medium cursor-pointer"
          >
            See More ({remainingCount})
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      ) :
        <div className="mt-12 flex justify-center">
          <button
            onClick={() => setShowAll(false)}
            className="group flex items-center gap-2 px-6 py-2.5 rounded-lg border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 font-medium cursor-pointer"
          >
            See Less
          </button>
        </div>}

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
                  <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">Technologies Used</h4>
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

                {/* Description */}
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">About the Project</h4>
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
