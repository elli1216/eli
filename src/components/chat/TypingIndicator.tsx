import { motion } from 'framer-motion';

const TypingIndicator = () => (
  <div className="flex gap-1 items-center justify-center h-5 px-1">
    <motion.div className="w-1.5 h-1.5 bg-current rounded-full" animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0 }} />
    <motion.div className="w-1.5 h-1.5 bg-current rounded-full" animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }} />
    <motion.div className="w-1.5 h-1.5 bg-current rounded-full" animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }} />
  </div>
);

export default TypingIndicator