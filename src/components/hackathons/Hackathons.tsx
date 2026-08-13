import React, { useState } from 'react';
import { Section } from '@/components/layout/Section';
import { SectionTitle } from '@/components/layout/SectionTitle';
import { DecorativeFrame } from '@/components/shared/DecorativeFrame';
import { useAccent } from '@/contexts/AccentContext';
import { AnimatePresence, motion } from 'framer-motion';
import { Github, Trophy, Users, Target, Lightbulb, ArrowUpRight, ChevronLeft, ChevronRight, Palette } from 'lucide-react';
import { PROJECT_DATA, category } from '@/constants/constants';
import { getInitials } from '@/lib/utils';
import { ProjectMetrics } from '@/components/shared/ProjectMetrics';
import { TechStack } from '@/components/shared/TechStack';

const HACKATHON_PROJECTS = PROJECT_DATA.filter((p) => p.category === category.HACKATHON);

interface HackathonCardProps {
  project: (typeof HACKATHON_PROJECTS)[number];
  accentColor: string;
}

const HackathonCard: React.FC<HackathonCardProps> = ({ project, accentColor }) => (
  <DecorativeFrame accentColor={accentColor}>
    <div className="bg-card rounded-xl flex flex-col overflow-hidden">
      {/* Accent hero bar */}
      <div
        className="h-1 w-full shrink-0"
        style={{ background: `linear-gradient(90deg, ${accentColor}, transparent)` }}
      />

      <div className="p-6 sm:p-8 flex flex-col flex-1">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              {project.hackathonTitle && (
                <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                  <Trophy size={11} /> {project.hackathonTitle}
                </span>
              )}
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-foreground leading-tight">
              {project.title}
            </h3>
            {project.position && (
              <p className="text-sm text-muted-foreground italic mt-1.5">{project.position}</p>
            )}
          </div>
          <span
            aria-hidden
            className="text-5xl sm:text-6xl font-extrabold text-foreground/5 leading-none select-none shrink-0"
          >
            {String(HACKATHON_PROJECTS.indexOf(project) + 1).padStart(2, '0')}
          </span>
        </div>

        {/* Metrics & Placement */}
        <ProjectMetrics project={project} className="mb-6" />

        {/* Theme */}
        {project.theme && (
          <div className="flex-1 mb-6">
            <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary mb-2.5">
              <Palette size={13} /> Hackathon Theme
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">{project.theme}</p>
          </div>
        )}

        {/* Problem - quote treatment */}
        {project.problem && (
          <div className="mb-6">
            <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-secondary-foreground mb-2.5">
              <Target size={13} /> The Problem
            </p>
            <p
              className="text-sm text-muted-foreground leading-relaxed border-l-2 pl-4 italic"
              style={{ borderColor: `${accentColor}66` }}
            >
              {project.problem}
            </p>
          </div>
        )}

        {/* Solution */}
        <div className="flex-1 mb-6">
          <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary mb-2.5">
            <Lightbulb size={13} /> What I Built
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>
        </div>

        {/* Footer */}
        <div className="mt-auto pt-5 border-t border-border/50">
          {project.collaborators && project.collaborators.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <Users size={13} className="text-muted-foreground shrink-0" />
              {project.collaborators.map(({ name, link }) => (
                <a
                  key={name}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium bg-secondary text-secondary-foreground hover:text-primary hover:border-primary/40 rounded-full border border-border/50 transition-all"
                >
                  <span className="size-4.5 rounded-full bg-primary/15 text-primary text-[9px] font-bold flex items-center justify-center">
                    {getInitials(name)}
                  </span>
                  {name}
                </a>
              ))}
            </div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-3">
            <TechStack technologies={project.techStack} />
            {project.repoLink && (
              <a
                href={project.repoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline shrink-0"
              >
                <Github size={14} /> View Code <ArrowUpRight size={12} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  </DecorativeFrame>
);

const slideVariants = {
  enter: (direction: number) => ({ x: direction > 0 ? 80 : -80, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({ x: direction > 0 ? -80 : 80, opacity: 0 }),
};

export const Hackathons: React.FC = () => {
  const { currentAccent } = useAccent();
  const [[current, direction], setPage] = useState<[number, number]>([0, 0]);

  if (HACKATHON_PROJECTS.length === 0) return null;

  const paginate = (dir: number) => {
    setPage(([prev]) => [
      (prev + dir + HACKATHON_PROJECTS.length) % HACKATHON_PROJECTS.length,
      dir,
    ]);
  };

  const goTo = (index: number) => {
    setPage(([prev]) => [index, index > prev ? 1 : -1]);
  };

  return (
    <Section id="hackathons">
      <SectionTitle className="mb-4">Hackathons</SectionTitle>
      <p className="text-center text-muted-foreground mb-12 max-w-xl mx-auto text-sm md:text-base italic">
        Where I go to stretch — tight deadlines, messy real-world problems, and something shippable at the end.
      </p>

      <div
        className="relative max-w-3xl mx-auto"
        role="region"
        aria-roledescription="carousel"
        aria-label="Hackathon projects gallery"
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') paginate(1);
          if (e.key === 'ArrowLeft') paginate(-1);
        }}
      >
        <div className="overflow-hidden">
          <AnimatePresence mode="wait" custom={direction} initial={false}>
            <motion.div
              key={current}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: 'easeOut' }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.15}
              onDragEnd={(_, info) => {
                if (info.offset.x < -80 || info.velocity.x < -400) paginate(1);
                else if (info.offset.x > 80 || info.velocity.x > 400) paginate(-1);
              }}
              className="cursor-grab active:cursor-grabbing"
            >
              <HackathonCard
                project={HACKATHON_PROJECTS[current]}
                accentColor={currentAccent}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            onClick={() => paginate(-1)}
            aria-label="Previous hackathon"
            className="p-2.5 rounded-full border border-border/60 text-muted-foreground hover:text-primary hover:border-primary/40 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="flex items-center gap-2">
            {HACKATHON_PROJECTS.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === current}
                className={`h-2 rounded-full transition-all cursor-pointer ${i === current ? 'w-6' : 'w-2 hover:scale-125'
                  }`}
                style={{
                  backgroundColor: i === current ? currentAccent : undefined,
                }}
              />
            ))}
          </div>

          <button
            onClick={() => paginate(1)}
            aria-label="Next hackathon"
            className="p-2.5 rounded-full border border-border/60 text-muted-foreground hover:text-primary hover:border-primary/40 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Counter */}
        <p className="text-center text-xs text-muted-foreground mt-3 tabular-nums">
          {String(current + 1).padStart(2, '0')} / {String(HACKATHON_PROJECTS.length).padStart(2, '0')}
        </p>
      </div>
    </Section>
  );
};
