import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Facebook, Github, Instagram, Mail } from 'lucide-react';
import TextType from './TextType';

export const Hero: React.FC = () => {
  return (
    <section className="min-h-screen flex items-center justify-center pt-16 px-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-color-dodge animate-blob" />
      <div className="absolute top-0 -right-4 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-color-dodge animate-blob animation-delay-2000" />
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-color-dodge animate-blob animation-delay-4000" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
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
            <div className="size-80 floating glow rounded-full border-4 border-primary dark:border-primary shadow-2xl overflow-hidden mb-8 relative group">
              <div className="absolute inset-0 bg-accent animate-pulse" />
              <img
                src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExeG1nazZzd2Q2ZHk5dTNiN2xzOWE3MjhreGRsZnNsNmxsdHppNnFqdyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/7NoNw4pMNTvgc/giphy.gif"
                alt="Eli"
                className="w-full h-full object-cover relative z-10 transform group-hover:scale-110 transition-transform duration-500"
              />
            </div>

            <div className='flex-1/2'>
              <TextType
                text={["Hi, I'm Eli.", "Vibe Coder.", "BSIT Senior."]}
                typingSpeed={80}
                pauseDuration={1500}
                showCursor
                className='text-4xl md:text-6xl font-bold text-nowrap mb-6 tracking-tight leading-tight text-transparent bg-clip-text bg-linear-to-r from-primary to-cyan-500'
                cursorCharacter="_"
                deletingSpeed={50}
                cursorBlinkDuration={0.5}
              />
              <p className="text-md md:text-lg text-muted-foreground text-wrap mb-4 max-w-2xl mx-auto leading-relaxed">
                Aspiring software developer focused on building efficient, user-centric web applications.
              </p>
              <span className="text-sm inline-block px-3 py-1 mb-6 font-semibold tracking-wider text-primary bg-accent rounded-full">
                In Development
              </span>

              <div className="flex flex-col text-sm sm:flex-row items-center justify-center gap-3">
                <motion.a
                  href="/Floresca-Darl-Resume.pdf"
                  download="Floresca-Darl-Resume.pdf"
                  className="p-3 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-all flex items-center gap-2 shadow-lg shadow-blue-500/20"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Download Resume <Download size={18} />
                </motion.a>
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