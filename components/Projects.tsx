import React from 'react';
import { Section } from './Section';
import { PROJECT_DATA } from '../constants';
import { Github, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.8
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

export const Projects: React.FC = () => {
  return (
    <Section id="projects" className="bg-accent">
      <h2 className="text-3xl font-bold text-foreground mb-12">Recent Work</h2>
      <motion.div
        className="grid md:grid-cols-2 gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {PROJECT_DATA.map((project) => (
          <motion.div
            key={project.id}
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="bg-card rounded-xl overflow-hidden shadow-sm border hover:shadow-xl transition-shadow duration-300 flex flex-col"
          >
            <div className="h-48 sm:h-64 overflow-hidden relative group">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="p-6 sm:p-8 grow flex flex-col">
              <h3 className="text-2xl font-bold text-foreground mb-3">
                {project.title}
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed grow">
                {project.description}
              </p>

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

              <div className="flex items-center justify-end gap-4 mt-6">
                {project.repoLink ? <motion.a
                  href={project.repoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 border rounded-full hover:bg-accent transition-colors"
                  title="View Code"
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Github size={20} />
                </motion.a> : null}
                {project.demoLink ? <motion.a
                  href={project.demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 border rounded-full hover:bg-accent transition-colors"
                  title="Live Demo"
                  whileHover={{ scale: 1.1, rotate: -10 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ExternalLink size={20} />
                </motion.a> : null}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
};