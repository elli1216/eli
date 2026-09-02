import React from 'react';
import { motion } from 'framer-motion';
import TextType from '@/components/shared/TextType';
import { TerminalButton } from '@/components/shared/terminal';
import { FileText, ArrowRight } from 'lucide-react';
import { NAMES, EXPERIENCE_DATA, PERSONAL_DATA } from '@/constants/constants';

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
} as const;

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
} as const;

export const Hero: React.FC = () => {
  const handleViewResume = async () => {
    try {
      const response = await fetch('/Floresca-Darl-Resume-2026.pdf');
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
    } catch (error) {
      console.error('Error opening resume:', error);
    }
  };

  return (
    <section className="flex items-center justify-center min-h-dvh relative">
      {/* Subtle scanline overlay — optional, remove if too much */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.015]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 1px, currentColor 1px, currentColor 2px)',
          backgroundSize: '100% 3px',
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-6 py-16 md:py-20 w-full">
        <motion.div
          className="flex flex-col items-center text-center"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          {/* Terminal prompt line */}
          <motion.div variants={fadeUp} className="mb-8">
            <div className="inline-flex items-center gap-2 font-mono text-sm text-muted-foreground">
              <span className="text-primary font-bold">eli@portfolio</span>
              <span className="text-muted-foreground/50">:</span>
              <span className="text-muted-foreground/70">~</span>
              <span className="text-muted-foreground/50">$</span>
              <span className="text-foreground/80">whoami</span>
            </div>
          </motion.div>

          {/* Name — the one big thing */}
          <motion.h1
            variants={fadeUp}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-[1.08] mb-3 font-mono"
          >
            {NAMES[0]}
          </motion.h1>

          {/* Role line */}
          <motion.p
            variants={fadeUp}
            className="text-sm sm:text-base font-mono text-muted-foreground mb-8"
          >
            {EXPERIENCE_DATA[0].role} @ {EXPERIENCE_DATA[0].company} — {PERSONAL_DATA.based_in}
          </motion.p>

          {/* Typewriter cycling through stacks — framed as terminal output */}
          <motion.div variants={fadeUp} className="mb-10 h-8 flex items-center justify-center">
            <span className="font-mono text-sm sm:text-base text-primary/80 mr-1 select-none">
              &gt;
            </span>
            <TextType
              text={[
                'building full-stack apps',
                'writing COBOL on z/OS',
                'shipping with React & TypeScript',
                'orchestrating Spring Boot services',
                'shipping to production',
              ]}
              typingSpeed={55}
              pauseDuration={2000}
              deletingSpeed={30}
              showCursor
              cursorCharacter="▌"
              cursorBlinkDuration={0.8}
              className="text-sm sm:text-base"
            />
          </motion.div>

          {/* CTAs — shell commands */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-center gap-3 mb-8"
          >
            <TerminalButton
              command="./view-resume.sh"
              variant="primary"
              icon={FileText}
              iconPosition="right"
              onClick={handleViewResume}
              size="md"
            />
            <TerminalButton
              command="./explore-work.sh"
              variant="secondary"
              icon={ArrowRight}
              iconPosition="right"
              href="#projects"
              size="md"
            />
          </motion.div>

          {/* Social links — plain, not icon buttons */}
          <motion.div
            variants={fadeUp}
            className="flex items-center gap-4 font-mono text-xs text-muted-foreground"
          >
            <a
              href={PERSONAL_DATA.github.link}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              github
            </a>
            <span className="text-border">|</span>
            <a
              href={PERSONAL_DATA.linkedid.link}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              linkedin
            </a>
            <span className="text-border">|</span>
            <a
              href="https://www.facebook.com/profile.php?id=61582634784747"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              facebook
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
