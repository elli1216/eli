import React, { useState } from 'react';
import { Section } from './Section';
import { PROJECT_DATA, ACCENT_COLORS } from '../constants';
import { ProjectItem } from '../types';
import { Github, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { category } from '../constants';
import { DecorativeFrame } from './DecorativeFrame';

interface ProjectsProps {
  accentColor: string;
}

const ProjectCard: React.FC<{ project: ProjectItem; index: number; accentColor: string }> = ({ project, index, accentColor }) => {
  const [showFullDesc, setShowFullDesc] = useState(false);
  const currentAccent = ACCENT_COLORS.find(c => c.name === accentColor)?.value || '#71717a';

  const getBadgeStyles = (Category: typeof category[keyof typeof category]) => {
    switch (Category) {
      case category.ACADEMIC:
        return 'bg-purple-500/20 text-purple-500 border-purple-500/30';
      case category.FREELANCE:
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case category.CAPSTONE:
        return 'bg-orange-500/20 text-orange-300 border-orange-500/30';
      default:
        return 'bg-primary/20 text-primary border-primary/30';
    }
  };

  return (
    <DecorativeFrame accentColor={currentAccent}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="group relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-card"
      >
        {/* Image */}
        <div className="aspect-video overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>

        {/* Badge */}
        {project.category && (
          <span className={`absolute top-3 left-3 px-2 py-1 text-xs font-medium rounded-full border ${getBadgeStyles(project.category)} z-10`}>
            {project.category}
          </span>
        )}

        {/* Content */}
        <div className="p-5">
          <h3 className="text-xl font-bold text-foreground mb-3">
            {project.title}
          </h3>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary rounded"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Description */}
          <div>
            <p className={`text-muted-foreground text-sm leading-relaxed ${showFullDesc ? '' : 'line-clamp-1'}`}>
              {project.description}
            </p>
            {project.description.length > 100 && (
              <button
                onClick={() => setShowFullDesc(!showFullDesc)}
                className="text-xs text-primary hover:underline mt-1"
              >
                {showFullDesc ? 'Show less' : 'See full description'}
              </button>
            )}
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border">
            {project.demoLink && (
              <a
                href={project.demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-sm shadow-primary/20"
              >
                <ExternalLink size={14} /> Live Site
              </a>
            )}
            {project.repoLink && (
              <a
                href={project.repoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-accent hover:bg-accent/80 text-foreground transition-all border border-border"
              >
                <Github size={14} /> Repository
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </DecorativeFrame>
  );
};


export const Projects: React.FC<ProjectsProps> = ({ accentColor }) => {
  const [showAll, setShowAll] = useState(false);

  const INITIAL_VISIBLE = 2;
  const visibleProjects = showAll ? PROJECT_DATA : PROJECT_DATA.slice(0, INITIAL_VISIBLE);
  const remainingCount = PROJECT_DATA.length - INITIAL_VISIBLE;

  return (
    <Section id="projects">
      <div className="mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">Works so far</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {visibleProjects.map((project, index) => (
          <ProjectCard
            key={project.id || index}
            project={project}
            index={index}
            accentColor={accentColor}
          />
        ))}
      </div>

      {!showAll && remainingCount > 0 && (
        <div className="mt-12 flex justify-center">
          <button
            onClick={() => setShowAll(true)}
            className="px-6 py-2 rounded-lg border border-primary text-primary hover:bg-primary/10 transition-colors font-medium"
          >
            See More ({remainingCount})
          </button>
        </div>
      )}


    </Section>
  );
};




