import React from 'react';
import { Section } from './Section';
import ProfileCard from './ProfileCard';
import { motion } from 'framer-motion';

export const About: React.FC = () => {
  return (
    <Section id="about">
      <h2 className="text-3xl font-bold text-foreground mb-8">About Me</h2>
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          className="space-y-6 text-lg text-muted-foreground leading-relaxed"
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className='text-wrap'>
            I am a BSIT graduate from Marilao, Bulacan and an aspiring Software Engineer and Mainframe Developer.
            I pride myself on being a <span className='text-primary font-semibold'>coachable developer</span> who thrives on feedback and industry-best practices to sharpen my skills.
            I leverage an AI-augmented stack, including <span className='text-primary font-semibold'>Cursor, Open Code, and MCP servers</span> to accelerate
            development cycles while maintaining high standards for code scalability and performance. I am excited to bring my adaptable mindset and AI-driven
            workflow to a dynamic development environment.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <ProfileCard
            name='Eli Floresca'
            title='BSIT Graduate'
            handle="elifloresca"
            status="Online"
            contactText="Contact Me"
            avatarUrl="/other/me_no_bg.png"
            showUserInfo={false}
            enableTilt={true}
            enableMobileTilt={true}
            onContactClick={() => console.log('Contact clicked')}
            className='flex items-center justify-center'
          />
        </motion.div>
      </div>
    </Section>
  );
};