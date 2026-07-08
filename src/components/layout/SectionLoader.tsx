import React from 'react';
import { motion } from 'framer-motion';

export const SectionLoader: React.FC = () => {
  return (
    <div className="w-full min-h-75 flex flex-col items-center justify-center gap-4">
      <div className="relative flex items-center justify-center size-20">
        {/* Outer spinning ring with glow */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
          className="absolute inset-0 size-20 rounded-full border-2 border-primary/20 border-t-primary glow"
        />
        {/* Inner pulsing core */}
        <motion.div
          animate={{ scale: [0.8, 1.1, 0.8], opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="size-8 rounded-full bg-primary/80 glow blur-[2px]"
        />
        <motion.div
          animate={{ scale: [0.9, 1.2, 0.9], opacity: [0.8, 1, 0.8] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut', delay: 0.2 }}
          className="absolute size-4 rounded-full bg-primary"
        />
      </div>
      <motion.span
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        className="text-xs tracking-[0.3em] uppercase text-primary font-semibold mt-6"
      >
        Loading
      </motion.span>
    </div>
  );
};
