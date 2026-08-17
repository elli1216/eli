import React from 'react';
import { motion } from 'framer-motion';
import { Home, Compass } from 'lucide-react';
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
      {/* Background Decorative Blobs */}
      <div className="absolute top-1/4 -left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-color-dodge animate-blob pointer-events-none" />
      <div className="absolute top-1/3 -right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-color-dodge animate-blob animation-delay-2000 pointer-events-none" />
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-color-dodge animate-blob animation-delay-4000 pointer-events-none" />

      <div className="max-w-2xl mx-auto w-full text-center relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center justify-center"
        >
          <motion.div variants={itemVariants} className="mb-6">
            <Compass size={64} className="text-primary animate-pulse mx-auto" />
          </motion.div>

          <motion.div variants={itemVariants}>
            <FuzzyText
              baseIntensity={0.2}
              hoverIntensity={0.5}
              enableHover
            >
              404
            </FuzzyText>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h2 className="text-2xl md:text-4xl font-semibold mb-4 text-foreground">
              Looks like you're lost in space
            </h2>
          </motion.div>

          <motion.div variants={itemVariants}>
            <motion.a
              href="/"
              className="px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-lg mx-auto w-fit cursor-pointer"
              style={{ boxShadow: `0 10px 15px -3px ${currentAccent}33` }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Home size={18} />
              Back to Home
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};