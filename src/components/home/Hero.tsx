import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, FileText, Facebook, Github, Linkedin } from 'lucide-react'
import TextType from '@/components/shared/TextType'
import Particles from '@/components/home/Particles'
import { useAccent } from '@/contexts/AccentContext'
import { EXPERIENCE_DATA } from '../../constants/constants';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
} as const

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
} as const

export const Hero: React.FC = () => {
  const { currentAccent, accentColor } = useAccent();

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
    <section className="flex items-center justify-center min-h-dvh md:mt-4 relative">
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
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-color-dodge animate-blob pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-color-dodge animate-blob animation-delay-2000 pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-color-dodge animate-blob animation-delay-4000 pointer-events-none" />

      {/* Main Content */}
      <div className="max-w-4xl mx-auto w-full text-center relative z-10 flex flex-col items-center justify-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="flex flex-col items-center justify-center w-full"
        >
          {/* Greeting & Name */}
          <motion.div variants={itemVariants} className="flex flex-col items-center justify-center w-full">
            <span className='text-xl md:text-2xl uppercase tracking-widest font-bold text-muted-foreground mb-3'>Hi, I'm</span>
            <h1 className='text-6xl md:text-7xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-linear-to-b from-primary via-primary to-primary/40 pb-2 mb-2'>
              Eli Floresca
            </h1>
          </motion.div>

          {/* Typewriter Subtitle */}
          <motion.div variants={itemVariants} className="w-full mb-8">
            <TextType
              text={["Software Engineer", "BSIT Graduate", "COBOL Developer", "Full Stack Developer"]}
              typingSpeed={90}
              pauseDuration={1500}
              showCursor={true}
              className="text-2xl md:text-3xl font-medium text-primary italic"
              cursorCharacter="_"
              deletingSpeed={50}
              cursorBlinkDuration={0.8}
            />
          </motion.div>

          {/* Intro Paragraph */}
          <motion.div variants={itemVariants}>
            <p className="text-base md:text-lg text-muted-foreground max-w-lg px-4 mx-auto leading-relaxed mb-8">
              23-year-old software engineer from <span className='italic text-primary/90'>Bulacan, Philippines</span>.
              I build web applications with <span className='text-primary font-bold'>React</span>, <span className='text-primary font-bold'>NextJS</span>, <span className='text-primary font-bold'>Tanstack Start</span>, <span className='text-primary font-bold'>Java</span> and also interested in <span className='text-primary font-bold'>COBOL Mainframe</span> development.
            </p>
          </motion.div>

          {/* Role Badge */}
          <motion.div variants={itemVariants}>
            <span className="inline-block px-4 py-1.5 mb-4 text-xs md:text-sm font-semibold tracking-wider text-primary bg-accent/20 border border-accent/30 rounded-full backdrop-blur-sm">
              <span className='italic uppercase mr-1'>Current Role:</span> {EXPERIENCE_DATA[0].role}
            </span>
          </motion.div>

          {/* CTAs and Social Links */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 mt-2">
            <motion.button
              onClick={handleViewResume}
              className="px-6 py-3 text-sm w-full sm:w-auto bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer border border-primary/20"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              View Resume <FileText size={16} />
            </motion.button>
            
            <div className="flex flex-row items-center gap-2 w-full sm:w-auto">
              <motion.a
                href="#projects"
                className="flex-1 sm:flex-none px-6 py-3 text-sm bg-transparent text-foreground rounded-lg font-medium hover:bg-muted/50 transition-all flex items-center justify-center gap-2 cursor-pointer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                View My Work <ArrowRight size={16} />
              </motion.a>
              
              <div className="flex items-center gap-1 border-l border-border/60 pl-2 ml-1">
                <motion.a
                  href="https://www.facebook.com/profile.php?id=61582634784747"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook Profile"
                  className="p-2.5 text-muted-foreground hover:text-primary hover:bg-accent/10 rounded-lg transition-all"
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
                  className="p-2.5 text-muted-foreground hover:text-primary hover:bg-accent/10 rounded-lg transition-all"
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
                  className="p-2.5 text-muted-foreground hover:text-primary hover:bg-accent/10 rounded-lg transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Github size={18} />
                </motion.a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}