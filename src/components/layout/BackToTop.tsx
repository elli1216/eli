import { useEffect, useState } from 'react';
import { ChevronUp, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAccent } from '@/contexts/AccentContext';

export const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { currentAccent } = useAccent();

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 font-mono">
      <AnimatePresence>
        {isVisible && (
          <motion.button
            onClick={scrollToTop}
            className="cursor-target group flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg bg-card/90 hover:bg-muted text-foreground border border-border/80 shadow-xl backdrop-blur-md transition-all hover:border-primary/50 "
            whileHover={{ y: -3, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            aria-label="Scroll back to top"
          >
            {/* Terminal prompt symbol */}
            <span className="text-primary font-bold text-xs">▲</span>
            <span className="text-xs font-semibold text-muted-foreground group-hover:text-foreground transition-colors">
              cd ~
            </span>
            <span
              className="size-1.5 rounded-full ml-1"
              style={{ backgroundColor: currentAccent }}
            />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BackToTop;
