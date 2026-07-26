import React, { useState } from 'react';
import StackIcon from 'tech-stack-icons';
import { SKILL_DATA } from '@/constants/constants';
import { motion } from 'motion/react';
import { DecorativeFrame } from '@/components/shared/DecorativeFrame';
import { SectionTitle } from '@/components/layout/SectionTitle';
import { useAccent } from '@/contexts/AccentContext';
import { useTheme } from '@/contexts/ThemeContext';

const INITIAL_VISIBLE = 12;

export const Skills = () => {
  const [showAll, setShowAll] = useState(false);
  const visibleSkills = showAll ? SKILL_DATA : SKILL_DATA.slice(0, INITIAL_VISIBLE);
  const remainingCount = SKILL_DATA.length - INITIAL_VISIBLE;
  const { currentAccent } = useAccent();
  const { darkMode } = useTheme();

  return (
    <section id="skills" className="py-20">
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <SectionTitle className="mb-8">Tech Stack & Skills</SectionTitle>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-5">
            {visibleSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <DecorativeFrame accentColor={currentAccent}>
                  <div className="bg-card rounded-xl p-4 flex flex-col items-center gap-2 min-h-27.5 justify-center">
                    <div className="size-12 md:size-14">
                      <StackIcon name={skill.icon || ""} variant={darkMode ? "dark" : "light"} />
                    </div>
                    <span className="text-xs md:text-sm text-center text-muted-foreground">{skill.name}</span>
                  </div>
                </DecorativeFrame>
              </motion.div>
            ))}
          </div>

          {!showAll && remainingCount > 0 ? (
            <div className="mt-10 flex justify-center">
              <button
                onClick={() => setShowAll(true)}
                className="px-6 py-2 rounded-lg border border-primary text-primary hover:bg-primary/10 transition-colors font-medium"
              >
                See More ({remainingCount})
              </button>
            </div>
          ) :
            <div className="mt-10 flex justify-center">
              <button
                onClick={() => setShowAll(false)}
                className="px-6 py-2 rounded-lg border border-primary text-primary hover:bg-primary/10 transition-colors font-medium"
              >
                See Less
              </button>
            </div>}
        </motion.div>
      </div>
    </section>
  );
};
