import React from 'react';
import StackIcon from 'tech-stack-icons';
import { SKILL_DATA } from '@/constants/constants';
import { motion } from 'motion/react';
import { Section } from '@/components/layout/Section';
import { DecorativeFrame } from '@/components/shared/DecorativeFrame';
import { SectionTitle } from '@/components/layout/SectionTitle';
import { useAccent } from '@/contexts/AccentContext';
import { useTheme } from '@/contexts/ThemeContext';

const SKILL_GROUPS = [
  { label: 'Frontend', key: 'frontend' as const },
  { label: 'Backend', key: 'backend' as const },
  { label: 'Tools', key: 'tools' as const },
];

export const Skills = () => {
  const { currentAccent } = useAccent();
  const { darkMode } = useTheme();

  return (
    <Section id="skills">
      <div className="mb-12">
        <SectionTitle>Tech Stack & Skills</SectionTitle>
        <p className="text-center text-muted-foreground mt-4 max-w-xl mx-auto text-sm md:text-base italic">
          The tools I reach for daily, grouped by what they do.
        </p>
      </div>

      <div className="space-y-10">
        {SKILL_GROUPS.map((group) => {
          const skills = SKILL_DATA.filter((s) => s.category === group.key);
          if (skills.length === 0) return null;

          return (
            <div key={group.key}>
              {/* Group header */}
              <div className="flex items-center gap-3 mb-5">
                <span className="size-2 rounded-full shrink-0" style={{ backgroundColor: currentAccent }} />
                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                  {group.label}
                </h3>
                <div className="flex-1 h-px bg-border" />
                <span className="text-xs text-muted-foreground tabular-nums">{skills.length}</span>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 md:gap-5">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="h-full"
                  >
                    <DecorativeFrame accentColor={currentAccent} className="h-full">
                      <div className="group bg-card rounded-xl p-4 flex flex-col items-center gap-2 justify-center min-h-27.5 h-full transition-colors hover:bg-muted/10">
                        {skill.icon ? (
                          <div className="size-10 md:size-12 transition-transform duration-300 group-hover:scale-110">
                            <StackIcon name={skill.icon} variant={darkMode ? "dark" : "light"} />
                          </div>
                        ) : (
                          <span
                            className="size-10 md:size-12 rounded-lg flex items-center justify-center text-sm font-bold transition-transform duration-300 group-hover:scale-110"
                            style={{ backgroundColor: `${currentAccent}1a`, color: currentAccent }}
                          >
                            {skill.name.slice(0, 3).toUpperCase()}
                          </span>
                        )}
                        <span className="text-xs md:text-sm text-center text-muted-foreground group-hover:text-foreground transition-colors leading-tight">
                          {skill.name}
                        </span>
                      </div>
                    </DecorativeFrame>
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
};
