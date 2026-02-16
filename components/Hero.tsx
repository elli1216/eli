import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, FileText, Facebook, Github, Instagram, Move } from 'lucide-react';
import TextType from './TextType';
import LightRays from './LightRays';

export const Hero: React.FC = () => {
  const handleViewResume = async () => {
    try {
      const response = await fetch('/Floresca-Darl-Resume.pdf');
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
    } catch (error) {
      console.error('Error opening resume:', error);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center pt-16 px-6 relative overflow-hidden">
      <LightRays
        raysColor="#ffffff"
        raysSpeed={1}
        lightSpread={1}
        rayLength={2}
        pulsating={false}
        mouseInfluence={0.05}
        noiseAmount={0.1}
        className="absolute inset-0 w-full h-full z-0 pointer-events-none opacity-50"
      />
      {/* Background decoration */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-color-dodge animate-blob pointer-events-none" />
      <div className="absolute top-0 -right-4 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-color-dodge animate-blob animation-delay-2000 pointer-events-none" />
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-color-dodge animate-blob animation-delay-4000 pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ y: -500 }}
          animate={{ y: 0 }}
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 8,
            delay: 0.2
          }}
          className="flex flex-col items-center"
        >
          {/* Profile Image Placeholder */}
          <div className='flex flex-col md:flex-row gap-0 md:gap-16 items-center justify-center'>
            <motion.div
              drag
              dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }}
              whileHover={{ cursor: 'grab' }}
              whileTap={{ cursor: 'grabbing', scale: 0.95 }}
              className="mb-8 relative z-10 touch-none"
              data-lenis-prevent
            >
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="size-80 glow rounded-full border-4 border-primary dark:border-primary shadow-2xl overflow-hidden relative group pointer-events-none select-none">
                <div className="absolute inset-0 bg-accent animate-pulse" />
                <img
                  src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExeG1nazZzd2Q2ZHk5dTNiN2xzOWE3MjhreGRsZnNsNmxsdHppNnFqdyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/7NoNw4pMNTvgc/giphy.gif"
                  alt="Eli"
                  draggable="false"
                  className="w-full h-full object-cover relative z-10 transform group-hover:scale-110 transition-transform duration-500"
                />
              </motion.div>

              {/* Drag Me Badge */}
              <motion.div
                className="absolute bottom-6 right-6 bg-primary text-primary-foreground px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-lg z-20 pointer-events-none"
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              >
                <Move size={12} />
                <span>Drag me</span>
              </motion.div>
            </motion.div>

            <div className='flex-1/2 items-center justify-center relative z-20 text-left'>
              <h1 className="flex flex-col items-center justify-center gap-2 font-bold mb-6">
                <span className='text-3xl md:text-5xl'>Hi, I'm{" "}</span>
                <TextType
                  text={["Eli Floresca", "a Vibe Coder", "a BSIT Senior"]}
                  typingSpeed={80}
                  pauseDuration={1500}
                  showCursor
                  className="text-transparent text-4xl md:text-6xl bg-clip-text bg-linear-to-r from-primary to-cyan-500"
                  cursorCharacter="_"
                  deletingSpeed={50}
                  cursorBlinkDuration={1}
                />
              </h1>
              <p className="text-md md:text-lg text-center text-muted-foreground text-wrap mb-4 max-w-2xl mx-auto leading-relaxed">
                23-year-old developer from Marilao, Bulacan. I build web applications with Next.js, React, and Python, focusing on clean, maintainable code.
              </p>
              <div className='flex items-center justify-center'>
                <span className="text-sm inline-block px-3 py-1 mb-6 font-semibold tracking-wider text-primary bg-accent rounded-full">
                  In Development
                </span>
              </div>

              <div className="flex flex-col text-sm sm:flex-row items-center justify-center gap-3">
                <motion.button
                  onClick={handleViewResume}
                  className="p-3 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-all flex items-center gap-2 shadow-lg shadow-blue-500/20 cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Resume <FileText size={18} />
                </motion.button>
                <motion.a
                  href="#projects"
                  className="p-3 bg-accent text-foreground rounded-lg font-medium hover:bg-accent/80 transition-all flex items-center gap-2 border border-transparent hover:border-border"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View My Work <ArrowRight size={18} />
                </motion.a>
              </div>
              <div className='flex flex-row items-center justify-center gap-2 pt-4'>
                <motion.a
                  href="https://www.facebook.com/profile.php?id=61582634784747"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-fit items-center gap-4 p-0 rounded-lg"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <div className="p-3 bg-accent text-primary rounded-full">
                    <Facebook size={24} />
                  </div>
                </motion.a>
                <motion.a
                  href="https://www.instagram.com/darling_moo/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-fit items-center gap-4 p-0 rounded-lg"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <div className="p-3 bg-accent text-primary rounded-full">
                    <Instagram size={24} />
                  </div>
                </motion.a>
                <motion.a
                  href="https://github.com/elli1216"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-fit items-center gap-4 p-0 rounded-lg"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <div className="p-3 bg-accent text-primary rounded-full">
                    <Github size={24} />
                  </div>
                </motion.a>
              </div>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
};