import React, { useRef } from 'react';
import { Section } from './Section';
import { PROJECT_DATA } from '../constants';
import { ProjectItem } from '../types';
import { Github, ExternalLink } from 'lucide-react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from 'motion/react';

const ProjectCard = ({ project }: { project: ProjectItem; index: number }) => {
  const ref = useRef(null);

  return (
    <section className="h-[60vh] md:h-screen md:w-screen flex items-center justify-center relative perspective-500">
      <div ref={ref} className="relative w-full h-125 md:h-175 overflow-hidden rounded-xl shadow-2xl">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
        />

        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/25" />

        {/* Project Details Overlay */}
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 bg-linear-to-t from-black/80 via-black/40 to-transparent text-white">
          <div className="flex flex-wrap gap-2 mb-3">
            {project.techStack.map((tech) => (
              <span key={tech} className="px-2 py-1 text-xs font-semibold bg-primary/80 rounded text-primary-foreground backdrop-blur-sm">
                {tech}
              </span>
            ))}
          </div>
          <p className="text-sm md:text-base text-gray-200 mb-4 max-w-xl">
            {project.description}
          </p>
          <div className="flex gap-4">
            {project.repoLink && (
              <a
                href={project.repoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
              >
                <Github size={18} /> Code
              </a>
            )}
            {project.demoLink && (
              <a
                href={project.demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
              >
                <ExternalLink size={18} /> Live
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Parallax Title */}
      <motion.h2
        className="absolute bg-primary p-2 rounded-2xl z-10 text-2xl md:text-4xl font-bold italic text-foreground/80 md:text-foreground/80 pointer-events-none whitespace-normal md:whitespace-nowrap md:left-[-10%] w-auto top-[4%] md:top-[10%] px-4"
      >
        {project.title}
      </motion.h2>
    </section>
  );
};

export const Projects: React.FC = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const { scrollYProgress: sectionProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(sectionProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0]);

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <Section id="projects" className="bg-accent relative">
      <div ref={containerRef} className="relative">
        <div className="mb-12 text-center md:text-left">
          <h2 className="text-3xl font-bold text-foreground">Recent Work</h2>
          <p className="text-muted-foreground mt-2">Scroll to explore my projects</p>
        </div>

        {PROJECT_DATA.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}

        {/* Progress Bar for Projects Section */}
        <motion.div
          style={{ opacity }}
          className="fixed left-0 right-0 bottom-10 z-50 px-6 hidden md:block"
        >
          <div className="h-1.5 w-[92vw] bg-border/30 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary origin-left"
              style={{ scaleX }}
            />
          </div>
        </motion.div>
      </div>
    </Section>
  );
};

