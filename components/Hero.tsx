import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Mail } from 'lucide-react';
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
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          {/* Profile Image Placeholder */}
          <div className='flex flex-col md:flex-row gap-1 md:gap-16 items-center justify-center'>
            <div className="size-80 floating rounded-full border-4 border-card dark:border-border shadow-2xl overflow-hidden mb-8 relative group">
              <div className="absolute inset-0 bg-accent animate-pulse" />
              <img
                src="/me.JPG"
                alt="Eli"
                className="w-full h-full object-cover relative z-10 transform group-hover:scale-110 transition-transform duration-500"
              />
            </div>

            <div>
              <TextType
                text={["Hi, I'm Eli.", "Vibe Coder."]}
                typingSpeed={80}
                pauseDuration={1500}
                showCursor
                className='text-4xl md:text-6xl font-bold mb-6 tracking-tight leading-tight text-transparent bg-clip-text bg-linear-to-r from-primary to-cyan-500'
                cursorCharacter="_"
                deletingSpeed={50}
                cursorBlinkDuration={0.5}
              />
              <p className="text-md md:text-xl text-muted-foreground mb-4 max-w-2xl mx-auto leading-relaxed">
                BSIT Senior at Bulacan State University <br />
                Crafting modern, scalable web solutions.
              </p>
              <span className="text-md inline-block px-3 py-1 mb-6 text-sm font-semibold tracking-wider text-primary bg-accent rounded-full">
                Available for Hire
              </span>
              <div className="flex flex-col text-sm sm:flex-row items-center justify-center gap-4">
                <a
                  href="#projects"
                  className="px-8 py-4 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-all flex items-center gap-2 shadow-lg shadow-blue-500/20"
                >
                  View My Work <ArrowRight size={18} />
                </a>
                <a
                  href="#contact"
                  className="px-8 py-4 bg-accent text-foreground rounded-lg font-medium hover:bg-accent/80 transition-all flex items-center gap-2 border border-transparent hover:border-border"
                >
                  Contact Me <Mail size={18} />
                </a>
              </div>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
};