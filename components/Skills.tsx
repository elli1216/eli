import React, { useRef } from 'react';
import StackIcon from 'tech-stack-icons';
import { SKILL_DATA } from '../constants';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useMobile } from '../lib/utils';

interface props {
  darkMode: boolean
}

export const Skills: React.FC<props> = ({ darkMode }) => {
  const isMobile = useMobile();
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? ["0%", "-65%"] : ["0%", "-53%"]
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

            <motion.div style={{ x }} className="flex flex-wrap w-[260vw] md:w-[170vw] gap-4">
              {SKILL_DATA.map((skill) => (
                <div
                  key={skill.name}
                  className="flex flex-col gap-2 shrink-0 items-center justify-center rounded-lg border bg-card px-6 py-3 font-medium text-muted-foreground shadow-sm transition-colors hover:border-primary hover:text-primary cursor-default"
                >
                  <div className='size-15 md:size-30'>
                    <StackIcon name={skill.icon} variant={darkMode ? "dark" : "light"} />
                  </div>
                  {skill.name}
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};