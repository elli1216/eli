import React, { useState } from 'react';
import { Section } from '@/components/layout/Section';
import { PROJECT_DATA } from '@/constants/constants';
import { ProjectItem } from '@/types/types';
import { ChevronRight, ArrowDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { category } from '@/constants/constants';
import { TechStack } from '@/components/shared/TechStack';
import { ProjectModal } from './ProjectModal';
import {
  TerminalSectionHeader,
  TerminalWindow,
  TerminalBadge,
  TerminalButton,
} from '@/components/shared/terminal';

const CATEGORY_COUNTS = Object.values(category)
  .map((cat) => ({
    name: cat as (typeof category)[keyof typeof category],
    count: PROJECT_DATA.filter((p) => p.category === cat).length,
  }))
  .filter((cat) => cat.count > 0);

interface ProjectCardProps {
  project: ProjectItem;
  index: number;
  onClick: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, onClick }) => {
  const slug = project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="h-full flex flex-col"
    >
      <TerminalWindow
        title={`./bin/${slug}`}
        command={`run --target=${slug}`}
        className="h-fit flex flex-col"
        bodyClassName="flex flex-col flex-1"
      >
        <button
          onClick={onClick}
          className="cursor-target text-left w-full h-full flex flex-col group justify-between"
        >
          <div>
            {/* Top Meta */}
            <div className="flex items-center justify-between gap-2 mb-3">
              {project.category && (
                <TerminalBadge
                  variant={
                    project.category === category.HACKATHON
                      ? 'warning'
                      : project.category === category.PERSONAL
                        ? 'accent'
                        : 'info'
                  }
                  label={`--${project.category}`}
                />
              )}

              {project.placement && <TerminalBadge variant="success" label={project.placement} />}
            </div>

            {/* Title */}
            <h3 className="text-base sm:text-lg font-bold font-mono text-foreground group-hover:text-primary transition-colors leading-snug mb-1">
              {project.title}
            </h3>

            {project.position && (
              <p className="text-xs font-mono text-muted-foreground mb-3">
                Role: <span className="text-primary/90">{project.position}</span>
              </p>
            )}

            {/* Description Snippet */}
            <p className="text-xs font-mono text-muted-foreground/90 line-clamp-3 leading-relaxed mb-4">
              {project.description}
            </p>

            {/* Tech Stack */}
            <TechStack
              technologies={project.techStack}
              limit={4}
              className="mb-4"
              itemClassName="text-[11px] font-mono"
              moreClassName="text-[11px] font-mono"
            />
          </div>

          {/* Footer Call to Action */}
          <div className="pt-3 border-t border-border/40 flex items-center justify-between font-mono text-xs text-primary font-semibold mt-auto">
            <span>./inspect-module.sh</span>
            <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </button>
      </TerminalWindow>
    </motion.div>
  );
};

export const Projects: React.FC = () => {
  const [showAll, setShowAll] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const INITIAL_VISIBLE = 6;
  const filteredProjects = activeFilter
    ? PROJECT_DATA.filter((p) => p.category === activeFilter)
    : PROJECT_DATA;

  const displayedProjects = showAll ? filteredProjects : filteredProjects.slice(0, INITIAL_VISIBLE);

  return (
    <Section id="projects">
      {/* Terminal Section Header */}
      <TerminalSectionHeader
        command="ls -la ./projects/ --sort=impact"
        title="Featured Projects"
        description="Production systems, scalable architectures, and developer tooling."
        executionTime="12ms"
      />

      {/* CLI Filter Arguments Bar */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10 font-mono">
        <TerminalButton
          command="--filter=all"
          size="sm"
          active={activeFilter === null}
          onClick={() => setActiveFilter(null)}
        />
        {CATEGORY_COUNTS.map((cat) => (
          <TerminalButton
            key={cat.name}
            command={`--filter=${cat.name} (${cat.count})`}
            size="sm"
            active={activeFilter === cat.name}
            onClick={() => setActiveFilter(cat.name)}
          />
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
        {displayedProjects.map((project, index) => (
          <ProjectCard
            key={project.title}
            project={project}
            index={index}
            onClick={() => setSelectedProject(project)}
          />
        ))}
      </div>

      {/* Show More / Show Less Toggle Button */}
      {filteredProjects.length > INITIAL_VISIBLE && (
        <div className="flex justify-center mt-12">
          <TerminalButton
            command={
              showAll
                ? './paginate.sh --limit=collapse'
                : `./paginate.sh --fetch-all (+${filteredProjects.length - INITIAL_VISIBLE})`
            }
            variant="secondary"
            size="md"
            icon={ArrowDown}
            onClick={() => setShowAll(!showAll)}
          />
        </div>
      )}

      {/* Project Details Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </Section>
  );
};

export default Projects;
