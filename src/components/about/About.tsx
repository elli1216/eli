import React from 'react';
import { Section } from '@/components/layout/Section';
import ProfileCard from '@/components/about/ProfileCard';
import { motion } from 'framer-motion';
import { SectionTitle } from '@/components/layout/SectionTitle';

export const About: React.FC = () => {
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
            I am a BSIT graduate from Marilao, Bulacan and an aspiring Software Engineer and Mainframe Developer.
            I pride myself on being a <span className='text-primary font-semibold'>coachable developer</span> who thrives on feedback and industry-best practices to sharpen my skills.
            I leverage an AI-augmented stack, including <span className='text-primary font-semibold'>Cursor, Anti-Gravity, and MCP servers</span> to accelerate
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
            onContactClick={() => console.log('Contact clicked')}
            className='flex items-center justify-center'
          />
        </motion.div>
      </div>
    </Section>
  );
};