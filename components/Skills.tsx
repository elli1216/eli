import React, { useRef } from 'react';
import StackIcon from 'tech-stack-icons';
import { SKILL_DATA } from '../constants';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { useMobile } from '../lib/utils';

interface props {
  darkMode: boolean
}

interface SkillCardProps {
  skill: typeof SKILL_DATA[0];
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
  darkMode: boolean;
}

const SkillCard: React.FC<SkillCardProps> = ({ skill, index, total, scrollYProgress, darkMode }) => {
  const step = 1 / total;
  const target = index * step;
  // Adjust the window factor (1.5 or 2) to control how "wide" the zoom effect is
  const scale = useTransform(
    scrollYProgress,
    [target - step * 2, target, target + step * 2],
    [1, 1.35, 1]
  );
  
  const margin = useTransform(
    scrollYProgress,
    [target - step * 2, target, target + step * 2],
    ["0px", "25px", "0px"]
  );

  return (
    <motion.div
      style={{ scale, marginInline: margin }}
      className="flex flex-col shrink-0 items-center justify-center rounded-lg border bg-card px-6 py-3 font-medium text-muted-foreground shadow-sm transition-colors hover:border-primary hover:text-primary cursor-default"
    >
      <div className='size-30'>
        <StackIcon name={skill.icon} variant={darkMode ? "dark" : "light"} />
      </div>
      {skill.name}
    </motion.div>
  );
};

export const Skills: React.FC<props> = ({ darkMode }) => {
  const isMobile = useMobile();
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? ["0%", "-1000%"] : ["0%", "-420%"]
  );

  return (
    <section id="skills" ref={targetRef} className="relative h-[300vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="mx-auto max-w-5xl px-6 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="mb-8 text-3xl font-bold text-foreground">Tech Stack & Skills</h2>
            <p className="mb-8 max-w-2xl text-muted-foreground">
              I utilize a modern toolbelt to build fast, responsive, and robust applications.
            </p>

            <motion.div style={{ x }} className="flex gap-4">
              {SKILL_DATA.map((skill, index) => (
                <SkillCard
                  key={skill.name}
                  skill={skill}
                  index={index}
                  total={SKILL_DATA.length}
                  scrollYProgress={scrollYProgress}
                  darkMode={darkMode}
                />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
