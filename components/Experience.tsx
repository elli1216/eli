import React from 'react';
import { Section } from './Section';
import { EXPERIENCE_DATA } from '../constants';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.8
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5
    }
  }
};

export const Experience: React.FC = () => {
  return (
    <Section id="experience">
      <h2 className="text-3xl font-bold text-foreground mb-12">Experience</h2>
      <motion.div
        className="relative border-l ml-3 space-y-12"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {EXPERIENCE_DATA.map((item) => (
          <motion.div
            key={item.id}
            className="relative pl-8 sm:pl-12 group"
            variants={itemVariants}
          >
            {/* Timeline Dot */}
            <div className="absolute -left-2.25 top-0 w-4 h-4 rounded-full bg-primary border-4 border-background group-hover:scale-125 transition-transform" />

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
              <h3 className="text-xl font-bold text-foreground">
                {item.role}
              </h3>
              <span className="text-sm font-medium text-muted-foreground bg-accent px-3 py-1 rounded-full w-fit mt-2 sm:mt-0">
                {item.period}
              </span>
            </div>

            <h4 className="text-lg font-medium text-primary mb-4">
              {item.company}
            </h4>

            <p className="text-muted-foreground leading-relaxed max-w-3xl">
              {item.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
};