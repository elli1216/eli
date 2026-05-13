import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, FileText, Facebook, Github, Instagram, Move, Linkedin } from 'lucide-react'
import TextType from './TextType'
import Particles from './Particles'
import { ACCENT_COLORS } from '../constants'

interface HeroProps {
  accentColor: string;
}

export const Hero: React.FC<HeroProps> = ({ accentColor }) => {
  const currentAccent = ACCENT_COLORS.find(c => c.name === accentColor)?.value || '#2da44e'

  const handleViewResume = async () => {
    try {
      const response = await fetch('/Floresca-Darl-Resume-2026.pdf')
      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      window.open(url, '_blank')
    } catch (error) {
      console.error('Error opening resume:', error)
    }
  }

  return (
    <section className="flex items-center justify-center mt-20 md:mt-45 md:mb-20 px-6 relative overflow-visible">
      <div className="fixed inset-0 -z-10 w-full h-full pointer-events-none">
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

      <div className="absolute top-0 -left-4 w-72 h-72 bg-primary/10 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-color-dodge animate-blob pointer-events-none" />
      <div className="absolute top-0 -right-4 w-72 h-72 bg-primary/10 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-color-dodge animate-blob animation-delay-2000 pointer-events-none" />
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-color-dodge animate-blob animation-delay-4000 pointer-events-none" />

      <div className="max-w-4xl mx-auto w-full text-center relative z-10">
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
                className="relative w-80 h-80"
              >
                {/* Corner brackets frame */}
                <div className="absolute inset-0 border-2 border-primary/60 rounded-lg" style={{ boxShadow: `0px 0px 30px 0px ${currentAccent}40, inset 0px 0px 20px 0px ${currentAccent}20` }}>
                  {/* Top-left bracket */}
                  <div className="absolute -top-1 -left-1 w-8 h-8 border-l-2 border-t-2 border-primary" />
                  <div className="absolute -top-1 -left-1 w-3 h-3 bg-primary/60" />
                  {/* Top-right bracket */}
                  <div className="absolute -top-1 -right-1 w-8 h-8 border-r-2 border-t-2 border-primary" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary/60" />
                  {/* Bottom-left bracket */}
                  <div className="absolute -bottom-1 -left-1 w-8 h-8 border-l-2 border-b-2 border-primary" />
                  <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-primary/60" />
                  {/* Bottom-right bracket */}
                  <div className="absolute -bottom-1 -right-1 w-8 h-8 border-r-2 border-b-2 border-primary" />
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-primary/60" />
                </div>

                {/* Inner glow ring */}
                <div className="absolute inset-1 rounded-lg border border-primary/30 animate-pulse" style={{ boxShadow: `0px 0px 15px 0px ${currentAccent}60` }} />

                {/* Scanlines overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,255,0,0.03)_50%)] bg-size-[100%_4px] pointer-events-none z-20" />
                <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black/30 pointer-events-none z-20" />

                {/* Image container with chromatic aberration */}
                <div className="absolute inset-2 rounded overflow-hidden">
                  {/* RGB split layers */}
                  <div className="absolute inset-0 bg-primary/20 mix-blend-screen opacity-0 group-hover:opacity-100 transition-opacity">
                    <img
                      src="/other/mypic.JPG"
                      alt="Eli"
                      draggable="false"
                      className="w-full h-full object-cover blur-[2px] translate-x-0.5"
                    />
                  </div>
                  <img
                    src="/other/mypic.JPG"
                    alt="Eli"
                    draggable="false"
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Glitch effect lines */}
                <div className="absolute inset-0 pointer-events-none z-30 opacity-0 group-hover:opacity-100">
                  <div className="absolute top-1/4 left-0 w-full h-0.5 bg-primary/50 animate-pulse" style={{ animationDuration: '0.5s' }} />
                  <div className="absolute top-1/2 left-0 w-full h-px bg-primary/30 animate-pulse" style={{ animationDuration: '0.7s' }} />
                  <div className="absolute top-3/4 left-0 w-full h-0.5 bg-primary/50 animate-pulse" style={{ animationDuration: '0.6s' }} />
                </div>
              </motion.div>

              {/* Drag indicator */}
              <motion.div
                className="absolute -bottom-2 right-0 bg-primary/80 text-primary-foreground px-2 py-1 rounded text-xs font-bold flex items-center gap-1 z-30"
                animate={{ y: [0, -3, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              >
                <Move size={10} />
                <span>DRAG ME</span>
              </motion.div>

              {/* Corner tech accents */}
              <div className="absolute -top-3 -left-3 text-primary/60">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M0 10h10M10 0v10" stroke="currentColor" strokeWidth="2" />
                  <circle cx="10" cy="10" r="2" fill="currentColor" />
                </svg>
              </div>
              <div className="absolute -top-3 -right-3 text-primary/60">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M20 10h-10M10 0v10" stroke="currentColor" strokeWidth="2" />
                  <circle cx="10" cy="10" r="2" fill="currentColor" />
                </svg>
              </div>
              <div className="absolute -bottom-3 -left-3 text-primary/60">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M0 10h10M10 10v10" stroke="currentColor" strokeWidth="2" />
                  <circle cx="10" cy="10" r="2" fill="currentColor" />
                </svg>
              </div>
              <div className="absolute -bottom-3 -right-3 text-primary/60">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M20 10h-10M10 10v10" stroke="currentColor" strokeWidth="2" />
                  <circle cx="10" cy="10" r="2" fill="currentColor" />
                </svg>
              </div>
            </motion.div>

            <div className='flex-1/2 items-center justify-center relative z-20 text-left'>
              <h1 className="flex flex-col items-center justify-center gap-2 font-bold mb-6">
                <span className='text-2xl md:text-3xl'>Hi, I'm{" "}</span>
                <span className='text-3xl md:text-6xl text-transparent w-full text-nowrap bg-clip-text bg-primary from-primary to-primary/10 text-center'>Eli Floresca</span>
                <TextType
                  text={["Web Developer", "BSIT Graduate", "COBOL Programmer"]}
                  typingSpeed={90}
                  pauseDuration={1500}
                  showCursor={true}
                  className="text-transparent w-full text-nowrap text-center text-4xl bg-clip-text bg-linear-to-r from-primary to-cyan-900"
                  cursorCharacter="_"
                  deletingSpeed={50}
                  cursorBlinkDuration={0.8}
                />
              </h1>
              <p className="text-md md:text-lg text-center text-muted-foreground text-wrap mb-4 max-w-2xl mx-auto leading-relaxed">
                23-year-old aspiring software engineer from Marilao, Bulacan. I build web applications with Next.js, React, and Spring Boot, focusing on clean, maintainable code.
              </p>
              <div className='flex items-center justify-center'>
                <span className="text-sm inline-block px-3 py-1 mb-6 font-semibold tracking-wider text-primary bg-accent rounded-full">
                  In Development
                </span>
              </div>

              <div className="flex flex-col text-sm sm:flex-row items-center justify-center gap-3">
                <motion.button
                  onClick={handleViewResume}
                  className="p-3 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-all flex items-center gap-2 shadow-lg cursor-pointer"
                  style={{ boxShadow: `0 10px 15px -3px ${currentAccent}33` }}
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
                  href="https://www.linkedin.com/in/darlfloresca/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-fit items-center gap-4 p-0 rounded-lg"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <div className="p-3 bg-accent text-primary rounded-full">
                    <Linkedin size={24} />
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
  )
}