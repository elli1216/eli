import React from 'react';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';
import { useAccent } from '@/contexts/AccentContext';
import FuzzyText from './FuzzyText';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
} as const;

export const NotFound: React.FC = () => {
  const { currentAccent } = useAccent();

  return (
    <section className="flex flex-col items-center justify-center min-h-dvh px-6 relative overflow-hidden bg-background text-foreground">
      {/* Scanline overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.015]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 1px, currentColor 1px, currentColor 2px)',
          backgroundSize: '100% 3px',
        }}
      />

      <div className="max-w-2xl mx-auto w-full text-center relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center justify-center gap-3"
        >
          <motion.div variants={itemVariants}>
            <FuzzyText baseIntensity={0.2} hoverIntensity={0.5} enableHover>
              404
            </FuzzyText>
          </motion.div>
          <motion.div variants={itemVariants}>
            <FuzzyText baseIntensity={0.2} hoverIntensity={0.5} enableHover>
              Not Found
            </FuzzyText>
          </motion.div>
          <motion.div variants={itemVariants}>
            <motion.a
              href="/"
              className="px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-lg mx-auto w-fit "
              style={{ boxShadow: `0 10px 15px -3px ${currentAccent}33` }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Back to Home
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
