import React, { useState } from 'react';
import { Section } from './Section';
import { PROJECT_DATA } from '../constants';
import { Github, ExternalLink, ChevronLeft, ChevronRight, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0
  })
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export const Projects: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [showDescription, setShowDescription] = useState(false);

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setShowDescription(false);
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) nextIndex = PROJECT_DATA.length - 1;
      if (nextIndex >= PROJECT_DATA.length) nextIndex = 0;
      return nextIndex;
    });
  };

  const project = PROJECT_DATA[currentIndex];

  return (
    <Section id="projects" className="bg-accent overflow-hidden">
      <h2 className="text-3xl font-bold text-foreground mb-12">Recent Work</h2>

      <div className="relative flex items-center justify-center max-w-5xl mx-auto min-h-135">
        {/* Left Arrow */}
        <motion.button
          className="absolute left-0 sm:-left-4 z-10 p-3 bg-card/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-card text-foreground hidden md:flex items-center justify-center border border-border cursor-pointer"
          onClick={() => paginate(-1)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Previous Project"
        >
          <ChevronLeft size={24} />
        </motion.button>

        {/* Right Arrow */}
        <motion.button
          className="absolute right-0 sm:-right-4 z-10 p-3 bg-card/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-card text-foreground hidden md:flex items-center justify-center border border-border cursor-pointer"
          onClick={() => paginate(1)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Next Project"
        >
          <ChevronRight size={24} />
        </motion.button>

        <div className="w-full px-0 md:px-12 h-full flex flex-col">
          <div className="relative w-full aspect-4/5 sm:aspect-video md:h-137">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);
                  if (swipe < -swipeConfidenceThreshold) {
                    paginate(1);
                  } else if (swipe > swipeConfidenceThreshold) {
                    paginate(-1);
                  }
                }}
                className="absolute w-full h-full bg-card rounded-xl overflow-hidden shadow-xl border flex flex-col"
              >
                <div className="h-2/5 md:h-3/4 overflow-hidden relative group shrink-0">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover pointer-events-none"
                  />

                  {/* Top Right Links */}
                  <div className="absolute top-4 right-4 flex gap-2 z-30">
                    {project.repoLink && (
                      <motion.a
                        href={project.repoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 bg-card/90 backdrop-blur-sm border rounded-full text-foreground hover:bg-primary hover:text-primary-foreground transition-colors shadow-lg"
                        title="View Code"
                        whileHover={{ scale: 1.1, rotate: 10 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Github size={20} />
                      </motion.a>
                    )}
                    {project.demoLink && (
                      <motion.a
                        href={project.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 bg-card/90 backdrop-blur-sm border rounded-full text-foreground hover:bg-primary hover:text-primary-foreground transition-colors shadow-lg"
                        title="Live Demo"
                        whileHover={{ scale: 1.1, rotate: -10 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <ExternalLink size={20} />
                      </motion.a>
                    )}
                  </div>

                  {/* Description Overlay */}
                  <AnimatePresence>
                    {showDescription && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="absolute inset-0 bg-card/95 p-8 flex items-center justify-center text-center backdrop-blur-sm z-20"
                      >
                        <p className="text-foreground leading-relaxed text-sm md:text-lg">
                          {project.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="p-6 md:p-8 grow flex flex-col h-1/1 md:h-1/3 overflow-hidden relative">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-2xl font-bold text-foreground md:line-clamp-1">
                      {project.title}
                    </h3>

                    <motion.button
                      className={`p-2 rounded-full transition-colors ${showDescription ? 'bg-primary text-primary-foreground' : 'bg-accent text-muted-foreground hover:text-foreground'}`}
                      onMouseEnter={() => setShowDescription(true)}
                      onMouseLeave={() => setShowDescription(false)}
                      onClick={() => setShowDescription(!showDescription)} // For mobile tap
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      aria-label="Show description"
                    >
                      <Info size={20} />
                    </motion.button>
                  </div>

                  <div className="mt-auto">
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-xs font-semibold text-primary bg-accent rounded-md"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Pagination Indicators & Mobile Controls */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <button
              className="p-2 md:hidden bg-card border rounded-full shadow-sm text-foreground cursor-pointer"
              onClick={() => paginate(-1)}
            >
              <ChevronLeft size={20} />
            </button>

            <div className="flex gap-2">
              {PROJECT_DATA.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                  className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${index === currentIndex ? 'bg-primary w-6' : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'}`}
                  aria-label={`Go to project ${index + 1}`}
                />
              ))}
            </div>

            <button
              className="p-2 md:hidden bg-card border rounded-full shadow-sm text-foreground cursor-pointer"
              onClick={() => paginate(1)}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </Section>
  );
};
