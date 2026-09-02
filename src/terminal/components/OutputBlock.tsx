import React, { memo } from 'react';
import { motion } from 'motion/react';

/** Wraps a rich output block with a subtle entrance animation. Memoized by id. */
export const OutputBlockInner: React.FC<{ id: number; children: React.ReactNode }> = ({
  children,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 6 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.25, ease: 'easeOut' }}
  >
    {children}
  </motion.div>
);

/**
 * Memoized block container. The `id` is the only prop that changes across
 * blocks, so React skips re-rendering untouched blocks on every keystroke.
 */
export const OutputBlock = memo(OutputBlockInner);

export default OutputBlock;
