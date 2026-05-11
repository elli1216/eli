import React, { useState } from 'react';
import StackIcon from 'tech-stack-icons';
import { SKILL_DATA } from '../constants';
import { motion } from 'motion/react';
import { SkillItem } from '../types';

interface SkillsProps {
  darkMode: boolean;
}

const INITIAL_VISIBLE = 12;

export const Skills: React.FC<SkillsProps> = ({ darkMode }) => {
  const [showAll, setShowAll] = useState(false);
  const visibleSkills = showAll ? SKILL_DATA : SKILL_DATA.slice(0, INITIAL_VISIBLE);
  const remainingCount = SKILL_DATA.length - INITIAL_VISIBLE;

  return (
    <section id="skills" className="py-20">
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="mb-8 text-3xl font-bold text-foreground">Tech Stack & Skills</h2>
          <p className="max-w-2xl text-muted-foreground mb-8">
            I utilize a modern toolbelt to build fast, responsive, and robust applications.
          </p>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {visibleSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <SkillCard skill={skill} darkMode={darkMode} />
              </motion.div>
            ))}
          </div>

          {!showAll && remainingCount > 0 && (
            <div className="mt-8 flex justify-center">
              <button
                onClick={() => setShowAll(true)}
                className="px-6 py-2 rounded-lg border border-primary text-primary hover:bg-primary/10 transition-colors font-medium"
              >
                See More ({remainingCount})
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

interface SkillCardProps {
  skill: SkillItem;
  darkMode: boolean;
}

const SkillCard: React.FC<SkillCardProps> = ({ skill, darkMode }) => {
  return (
    <div className="flex flex-col gap-2 items-center justify-center rounded-lg border bg-card px-4 py-3 font-medium text-muted-foreground shadow-sm transition-colors hover:border-primary hover:text-primary cursor-default">
      <div className="size-12 md:size-14">
        <StackIcon name={skill.icon} variant={darkMode ? "dark" : "light"} />
      </div>
      <span className="text-xs md:text-sm text-center">{skill.name}</span>
    </div>
  );
};
