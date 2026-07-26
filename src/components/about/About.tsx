import React from 'react';
import { Section } from '@/components/layout/Section';
import { useAccent } from '@/contexts/AccentContext';
import { motion } from 'framer-motion';
import { SectionTitle } from '@/components/layout/SectionTitle';

export const About: React.FC = () => {
  const { currentAccent } = useAccent();
  return (
    <Section id="about">
      <SectionTitle className="mb-8">About Me</SectionTitle>
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          className="space-y-6 text-lg text-muted-foreground leading-relaxed"
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className='text-sm md:text-lg w-fit max-w-md'>
            I am a BSIT graduate of <span className='text-primary font-semibold'>Bulacan State University</span> from Marilao, Bulacan, currently working as an <span className='text-primary font-semibold'>Associate Software Engineer</span> at Accenture.
            As a highly coachable developer, I thrive on <span className='text-primary font-semibold'>constructive feedback</span> and
            <span className='text-primary font-semibold'> industry-best practices</span> to continuously sharpen my skills.
            I bring rigorous, hands-on project experience and a strict commitment to maintaining high standards for code scalability and performance.
            I am eager to leverage my adaptable mindset and strong technical foundation within a dynamic development team.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex items-center justify-center relative w-full h-87.5 md:h-112.5"
        >
          {/* Subtle Glow Behind the Blob */}
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            className="absolute w-64 h-64 md:w-80 md:h-80 rounded-full blur-3xl pointer-events-none"
            style={{ backgroundColor: currentAccent }}
          />

          {/* Animating Organic Blob Image Container */}
          <motion.div
            animate={{
              borderRadius: [
                "60% 40% 30% 70% / 60% 30% 70% 40%",
                "30% 70% 70% 30% / 30% 30% 70% 70%",
                "50% 50% 20% 80% / 25% 80% 20% 75%",
                "60% 40% 30% 70% / 60% 30% 70% 40%"
              ]
            }}
            transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
            className="relative z-10 w-64 h-64 md:w-[320px] md:h-80 overflow-hidden shadow-2xl border-4 border-card bg-muted/20"
            style={{
              boxShadow: `0 0 40px ${currentAccent}40`
            }}
          >
            <img
              src="/other/me_no_bg.png"
              alt="Eli Floresca"
              className="w-full h-full object-cover bg-linear-to-br from-primary/10 to-transparent"
            />
          </motion.div>
        </motion.div>
      </div>
    </Section>
  );
};