import React, { useRef } from 'react';
import StackIcon from 'tech-stack-icons';
import { SKILL_DATA } from '../constants';
import {
  motion,
  useScroll,
  useTransform,
  MotionValue,
  useMotionValue,
  useMotionValueEvent,
  animate
} from 'motion/react';
import { useMobile } from '../lib/utils';
import { SkillItem } from '../types';
import { ScrollTracker } from './ScrollTracker';

interface SkillsProps {
  darkMode: boolean;
}

export const Skills: React.FC<SkillsProps> = ({ darkMode }) => {
  const isMobile = useMobile();
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? ["0%", "-65%"] : ["0%", "-56%"]
  );

  const maskImage = useScrollOverflowMask(scrollYProgress);

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
            <div className="flex flex-col justify-between gap-6 mb-8">
              <p className="max-w-2xl text-muted-foreground">
                I utilize a modern toolbelt to build fast, responsive, and robust applications.
              </p>
              {/* Scroll Tracker */}
              <ScrollTracker progress={scrollYProgress} />
            </div>

            <div className="relative mt-12">
              <motion.div
                style={{ x, maskImage }}
                className="flex flex-wrap w-[260vw] md:w-[170vw] gap-4 py-4"
              >
                {SKILL_DATA.map((skill) => (
                  <SkillCard key={skill.name} skill={skill} darkMode={darkMode} />
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const opaque = `#000`;
const transparent = `#0000`;
const leftInset = `10%`;
const rightInset = `90%`;

function useScrollOverflowMask(progress: MotionValue<number>) {
  const maskImage = useMotionValue(
    `linear-gradient(90deg, ${opaque}, ${opaque} 0%, ${opaque} ${rightInset}, ${transparent})`
  )

  useMotionValueEvent(progress, "change", (value) => {
    if (value <= 0.01) {
      animate(
        maskImage,
        `linear-gradient(90deg, ${opaque}, ${opaque} 0%, ${opaque} ${rightInset}, ${transparent})`
      )
    } else if (value >= 0.99) {
      animate(
        maskImage,
        `linear-gradient(90deg, ${transparent}, ${opaque} ${leftInset}, ${opaque} 100%, ${opaque})`
      )
    } else if (
      progress.getPrevious() <= 0.01 ||
      progress.getPrevious() >= 0.99
    ) {
      animate(
        maskImage,
        `linear-gradient(90deg, ${transparent}, ${opaque} ${leftInset}, ${opaque} ${rightInset}, ${transparent})`
      )
    }
  })

  return maskImage
}

interface SkillCardProps {
  skill: SkillItem;
  darkMode: boolean;
}

const SkillCard: React.FC<SkillCardProps> = ({ skill, darkMode }) => {
  return (
    <div
      className="flex flex-col gap-2 shrink-0 items-center justify-center rounded-lg border bg-card px-6 py-3 font-medium text-muted-foreground shadow-sm transition-colors hover:border-primary hover:text-primary cursor-default"
    >
      <div className="size-15 md:size-30">
        <StackIcon name={skill.icon} variant={darkMode ? "dark" : "light"} />
      </div>
      {skill.name}
    </div>
  );
};
