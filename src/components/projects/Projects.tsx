import React, { useState } from 'react';
import { Section } from '@/components/layout/Section';
import { SectionTitle } from '@/components/layout/SectionTitle';
import { PROJECT_DATA } from '@/constants/constants';
import { ProjectItem } from '@/types/types';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { category } from '@/constants/constants';
import { DecorativeFrame } from '@/components/shared/DecorativeFrame';
import { getBadgeStyles } from '@/lib/utils';
import { TechStack } from '@/components/shared/TechStack';
import { ProjectModal } from './ProjectModal';
import { useAccent } from '@/contexts/AccentContext';

const CATEGORY_COUNTS = Object.values(category)
  .map((cat) => ({
    name: cat as typeof category[keyof typeof category],
    count: PROJECT_DATA.filter((p) => p.category === cat).length,
  }))
  .filter((cat) => cat.count > 0);

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
            <TechStack
              technologies={project.techStack}
              limit={4}
              className="mt-4 mb-5"
              itemClassName="sm:text-xs"
              moreClassName="sm:text-xs"
            />

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

  const INITIAL_VISIBLE = 4;
  const filteredProjects = activeFilter
    ? PROJECT_DATA.filter((p) => p.category === activeFilter)
    : PROJECT_DATA;
  const visibleProjects = showAll ? filteredProjects : filteredProjects.slice(0, INITIAL_VISIBLE);
  const remainingCount = filteredProjects.length - INITIAL_VISIBLE;

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

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </Section>
  );
};
