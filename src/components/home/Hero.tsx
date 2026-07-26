import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, FileText, Facebook, Github, Linkedin } from 'lucide-react'
import TextType from '@/components/shared/TextType'
import Particles from '@/components/home/Particles'
import { DecorativeFrame } from '@/components/shared/DecorativeFrame'
import { useAccent } from '@/contexts/AccentContext'
//trigger deploy
const heroOuterVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
} as const

const heroImageVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
} as const

const textColumnVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
} as const

const textItemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' as const },
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
    <section className="flex items-center justify-center mt-35 md:mt-45 md:mb-20 px-6 relative overflow-visible">
      <div className="fixed inset-0 -z-10 w-full h-full pointer-events-none" aria-hidden="true">
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
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          <motion.div
            variants={heroOuterVariants}
            className='flex flex-col md:flex-row gap-0 md:gap-16 items-center justify-center'
          >
            <motion.div variants={heroImageVariants}>
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
                  className="relative size-60 md:size-80"
                >
                  <DecorativeFrame accentColor={currentAccent} className="absolute inset-0">
                    <div className="size-full p-2">
                      <div className="size-full rounded-lg overflow-hidden relative">
                        <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black/10 pointer-events-none z-10" />
                        <img
                          src="/other/mypic.JPG"
                          alt="Eli"
                          draggable="false"
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                    </div>
                  </DecorativeFrame>
                </motion.div>


              </motion.div>
            </motion.div>

            <motion.div
              variants={textColumnVariants}
              className='flex-1/2 items-center justify-center relative z-20 text-left'
            >
              <motion.div variants={textItemVariants}>
                <h1 className="flex flex-col items-center justify-center gap-2 font-bold mb-6">
                  <span className='text-xl md:text-3xl'>Hi, I'm{" "}</span>
                  <span className='text-4xl md:text-6xl text-transparent w-full text-nowrap bg-clip-text bg-linear-to-r from-primary to-primary/50 text-center'>Eli Floresca</span>
                  <TextType
                    text={["Software Engineer", "BSIT Graduate", "COBOL Developer", "IBM Z Advocate"]}
                    typingSpeed={90}
                    pauseDuration={1500}
                    showCursor={true}
                    className="w-full text-nowrap text-center text-2xl sm:text-4xl text-primary italic"
                    cursorCharacter="_"
                    deletingSpeed={50}
                    cursorBlinkDuration={0.8}
                  />
                </h1>
              </motion.div>
              <motion.div variants={textItemVariants}>
                <p className="text-sm md:text-lg text-center text-muted-foreground text-wrap mb-4 max-w-2xl mx-auto leading-relaxed">
                  23-year-old software engineer from <span className='italic text-primary/90'>Bulacan, Philippines</span>.
                  I build web applications with <span className='text-primary font-bold'>React</span>, <span className='text-primary font-bold'>NextJS</span>, <span className='text-primary font-bold'>Tanstack Start</span> and also interested in <span className='text-primary font-bold'>COBOL Mainframe</span> development.
                </p>
              </motion.div>
              <motion.div variants={textItemVariants}>
                <div className='flex items-center justify-center'>
                  <span className="text-xs md:text-sm inline-block px-3 py-1 mb-6 font-semibold tracking-wider text-primary bg-accent rounded-full">
                    <span className='italic uppercase'>Current Role:</span> Associate Software Engineer
                  </span>
                </div>
              </motion.div>

              <motion.div variants={textItemVariants}>
                <div className="flex text-xs md:text-sm flex-row items-center justify-center gap-3">
                  <motion.button
                    onClick={handleViewResume}
                    className="p-3 size-fit bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-all flex items-center gap-2 shadow-lg cursor-pointer"
                    style={{ boxShadow: `0 10px 15px -3px ${currentAccent}33` }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View Resume <FileText size={18} />
                  </motion.button>
                  <motion.a
                    href="#projects"
                    className="p-3 bg-transparent text-foreground rounded-md font-medium hover:bg-primary/5 transition-all flex items-center gap-2 border border-border"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View My Work <ArrowRight size={18} />
                  </motion.a>
                </div>
              </motion.div>
              <motion.div variants={textItemVariants}>
                <div className='flex flex-row items-center justify-center gap-4 pt-4'>
                  <motion.a
                    href="https://www.facebook.com/profile.php?id=61582634784747"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook Profile"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Facebook size={20} />
                  </motion.a>
                  <motion.a
                    href="https://www.linkedin.com/in/darlfloresca/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn Profile"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Linkedin size={20} />
                  </motion.a>
                  <motion.a
                    href="https://github.com/elli1216"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub Profile"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Github size={20} />
                  </motion.a>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  )
}