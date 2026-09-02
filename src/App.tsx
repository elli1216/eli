import React, { useRef } from 'react';
import { useScroll, useTransform, motion, MotionConfig } from 'motion/react';
import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/home/Hero';
import { TerminalEmulator } from '@/terminal/TerminalEmulator';
import SmoothScroll from '@/components/layout/SmoothScroll';
import { AccentProvider } from '@/contexts/AccentContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { NotFound } from '@/components/home/NotFound';
import { ThemedCursor } from './components/home/cursor/ThemedCursor';
import { useMobile } from './lib/utils';

const App: React.FC = () => {
  const isNotFound = window.location.pathname !== '/';
  const isMobile = useMobile();

  // Parallax: the hero (first 100dvh) fades/rises away as the terminal
  // (the next 100dvh section) fades up into view. The terminal only becomes
  // visible once the hero has mostly left the screen.
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.7], [0, -80]);
  const termOpacity = useTransform(scrollYProgress, [0.6, 0.95], [0, 1]);
  const termY = useTransform(scrollYProgress, [0.6, 0.95], [60, 0]);

  return (
    <ThemeProvider>
      <AccentProvider>
        <MotionConfig reducedMotion="user">
          <SmoothScroll>
            {isNotFound ? (
              <NotFound />
            ) : (
              <div className="w-full overflow-x-hidden">
                {isMobile ? null : <ThemedCursor />}
                <Navbar />

                {/* Hero = first viewport, scrolls away via parallax. */}
                <div
                  ref={heroRef}
                  className="relative overflow-hidden"
                  style={{ height: '100dvh' }}
                >
                  <motion.div
                    style={{ opacity: heroOpacity, y: heroY, willChange: 'transform' }}
                    className="h-full"
                  >
                    <Hero />
                  </motion.div>
                </div>

                {/* Terminal = pins to the viewport once the hero scrolls away.
                  Its scrollback (<data-lenis-prevent> + term-scrollbar) is then
                  the only inner scroll. */}
                <div className="sticky top-0 z-10 h-dvh overflow-hidden">
                  <motion.div
                    style={{ opacity: termOpacity, y: termY, willChange: 'transform' }}
                    className="h-full"
                  >
                    <TerminalEmulator />
                  </motion.div>
                </div>
              </div>
            )}
          </SmoothScroll>
        </MotionConfig>
      </AccentProvider>
    </ThemeProvider>
  );
};

export default App;
