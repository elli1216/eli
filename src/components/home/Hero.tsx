import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, FileText, Facebook, Github, Linkedin } from 'lucide-react';
import TextType from '@/components/shared/TextType';
import Particles from '@/components/home/Particles';
import { useAccent } from '@/contexts/AccentContext';
import { TerminalCard } from './TerminalCard';
import { TerminalButton } from '@/components/shared/terminal';
import { EXPERIENCE_DATA, NAMES, PERSONAL_DATA } from '@/constants/constants';
import { DecorativeFrame } from '../shared/DecorativeFrame';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
} as const;

export const Hero: React.FC = () => {
  const { currentAccent, accentColor } = useAccent();

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
    <section className="flex items-center justify-center min-h-dvh relative mt-10 sm:mt-0">
      {/* Background Particles */}
      <div className="fixed inset-0 z-0 w-full h-full pointer-events-none">
        <Particles
          key={`particles-${accentColor}`}
          particleColors={[currentAccent]}
          particleCount={500}
          particleSpread={9}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={false}
          alphaParticles={false}
          disableRotation
          pixelRatio={1}
        />
      </div>

      {/* Animated Blobs centered behind the text */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 md:w-96 md:h-96 rounded-full blur-3xl opacity-30 animate-blob pointer-events-none transition-colors duration-500"
        style={{ backgroundColor: currentAccent }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 md:w-80 md:h-80 rounded-full blur-3xl opacity-20 animate-blob animation-delay-2000 pointer-events-none transition-colors duration-500"
        style={{ backgroundColor: currentAccent }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 md:py-20 w-full">
        <motion.div
          className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left Column: Context, Headline, and Typewriter */}
          <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* Impactful Human Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.1] mb-4 font-mono"
            >
              Hi there
              <motion.span
                className="inline-block cursor-pointer"
                whileHover={{ rotate: [0, 20, -20, 20, -20, 0], transition: { duration: 0.8 } }}
                whileTap={{ rotate: [0, 20, -20, 20, 0], transition: { duration: 0.5 } }}
                aria-label="waving hand"
              >
                👋
              </motion.span>
            </motion.h1>

            {/* Profile Info JSON Block */}
            <motion.div
              variants={itemVariants}
              className="mb-5 rounded-xl bg-muted/30 backdrop-blur-xs border border-border/60 font-mono text-xs sm:text-sm max-w-full sm:max-w-md w-full shadow-xs text-left whitespace-pre overflow-x-auto"
            >
              <DecorativeFrame accentColor={currentAccent} className="w-full h-full p-3 sm:p-3.5">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="text-primary font-bold shrink-0">$</span>
                  <span className="text-foreground shrink-0">cat info.json</span>
                </div>
                <pre className="mt-1 font-mono text-xs sm:text-sm leading-relaxed">
                  {'{\n'}
                  {`  "name": `}
                  <span className="text-primary">"{NAMES[0]}"</span>,{'\n'}
                  {`  "role": `}
                  <span className="text-primary">"{EXPERIENCE_DATA[0].role}"</span>,{'\n'}
                  {`  "company": `}
                  <span className="text-primary">"{EXPERIENCE_DATA[0].company}"</span>,{'\n'}
                  {`  "based": `}
                  <span className="text-primary">"{PERSONAL_DATA.based_in}"</span>,{'\n'}
                  {`  "status": `}
                  <span className="text-primary">"building solutions that scale"</span>
                  {'\n'}
                  {'}'}
                </pre>
              </DecorativeFrame>
            </motion.div>

            {/* Subtitle / Typewriter Specialization */}
            <motion.div variants={itemVariants} className="min-h-14 mb-6 flex items-center">
              <TextType
                text={[
                  'React & Next.js',
                  'TanStack Ecosystem',
                  'Java & Spring Boot',
                  'COBOL Mainframe',
                  'Full Stack Development',
                ]}
                typingSpeed={90}
                pauseDuration={1500}
                showCursor={true}
                className="text-base md:text-xl font-medium text-primary font-mono"
                cursorCharacter="_"
                deletingSpeed={50}
                cursorBlinkDuration={0.8}
              />
            </motion.div>

            {/* CTAs and Social Links */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col w-fit sm:flex-row items-center justify-center lg:justify-start gap-3 md:gap-4"
            >
              <TerminalButton
                command="./view-resume.sh"
                variant="primary"
                icon={FileText}
                onClick={handleViewResume}
                size="md"
              />

              <div className="flex flex-col md:flex-row items-center gap-2 w-full sm:w-auto justify-center">
                <TerminalButton
                  command="./explore-work.sh"
                  variant="secondary"
                  icon={ArrowRight}
                  href="#projects"
                  size="md"
                />

                <div className="flex items-center gap-1 md:border-l md:border-border/60 pl-2 ml-1">
                  <motion.a
                    href="https://www.facebook.com/profile.php?id=61582634784747"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook Profile"
                    className="cursor-target p-2.5 text-muted-foreground hover:text-primary hover:bg-accent/10 rounded-lg transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Facebook size={18} />
                  </motion.a>
                  <motion.a
                    href="https://www.linkedin.com/in/darlfloresca/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn Profile"
                    className="cursor-target p-2.5 text-muted-foreground hover:text-primary hover:bg-accent/10 rounded-lg transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Linkedin size={18} />
                  </motion.a>
                  <motion.a
                    href="https://github.com/elli1216"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub Profile"
                    className="cursor-target p-2.5 text-muted-foreground hover:text-primary hover:bg-accent/10 rounded-lg transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Github size={18} />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Interactive System Diagnostic Terminal */}
          <motion.div
            variants={itemVariants}
            className="flex-1 flex items-center justify-center relative w-full max-w-lg lg:max-w-xl py-4"
          >
            <TerminalCard />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
