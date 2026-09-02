import React from 'react';
import { motion } from 'motion/react';
import { ChevronsDown } from 'lucide-react';

/**
 * "Scroll down to interact with the terminal" affordance pinned to the bottom
 * of the Hero. Pulls users into the terminal below.
 */
export const ScrollDown: React.FC = () => (
  <motion.div
    className="relative z-10 flex flex-col items-center gap-2 pb-8 text-muted-foreground font-mono"
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 1.1, duration: 0.6 }}
  >
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border/60 bg-card/40 backdrop-blur-sm text-[11px] sm:text-xs">
      <span className="text-primary font-bold">$</span>
      <span>scroll down to interact with the terminal</span>
    </div>
    <motion.div
      animate={{ y: [0, 6, 0] }}
      transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
    >
      <ChevronsDown size={18} className="text-primary" />
    </motion.div>
  </motion.div>
);

export default ScrollDown;
