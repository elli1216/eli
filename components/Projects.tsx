import React, { useRef, forwardRef } from 'react';
import { Section } from './Section';
import { PROJECT_DATA } from '../constants';
import { ProjectItem } from '../types';
import { Github, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ProjectCard = forwardRef<HTMLDivElement, { project: ProjectItem; index: number }>(
  ({ project, index }, ref) => {
    return (
      <div
        ref={ref}
        className="absolute inset-0 pt-20 md:pt-0 flex items-center justify-center w-full md:w-screen h-150 md:h-full"
        style={{ zIndex: index + 10 }}
      >
        <div className="relative w-full h-125 md:h-150 overflow-hidden rounded-xl shadow-2xl mx-auto">
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
          className="absolute bg-primary p-2 rounded-2xl z-10 text-2xl md:text-4xl font-bold italic text-foreground/80 md:text-foreground/80 pointer-events-none whitespace-normal md:whitespace-nowrap md:left-[-5%] lg:left-[-10%] w-auto top-[15%] md:top-[10%] px-4"
        >
          {project.title}
        </motion.h2>
      </div>
    );
  }
);

ProjectCard.displayName = "ProjectCard";

export const Projects: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    // Set initial state for cards
    cardsRef.current.forEach((card, i) => {
      if (card) {
        gsap.set(card, {
          y: "140%",
          rotate: i % 2 === 0 ? -10 : 10,
          opacity: 0,
        });
      }
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=1000%",
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    });

    tl.to(cardsRef.current.filter(Boolean), {
      y: 0,
      rotate: 0.8,
      opacity: 1,
      duration: 1.5,
      stagger: 1,
      ease: "power2.out",
    });
  }, { scope: sectionRef });

  return (
    <Section id="projects" className="bg-accent relative overflow-hidden">
      <div ref={sectionRef} className="relative min-h-screen flex flex-col">
        <div className="text-center md:text-left shrink-0">
          <h2 className="text-3xl font-bold text-foreground">Recent Work</h2>
          <p className="text-muted-foreground mt-2">Scroll to explore my projects</p>
        </div>

        {/* Cards Container */}
        <div className="relative grow min-h-150">
          {PROJECT_DATA.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              ref={(el) => { cardsRef.current[index] = el; }}
            />
          ))}
        </div>
      </div>
    </Section>
  );
};


