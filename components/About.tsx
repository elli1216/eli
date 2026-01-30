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
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className='text-wrap'>
            I am a graduating 4th-year BSIT student with a relentless drive for software excellence. Currently, I am an <span className="text-primary font-semibold">Intern at Landbank of the Philippines</span>, where I am developing a custom file conversion utility to modernize legacy data processing. My role involves reverse-engineering complex data logic to build automated solutions that ensure 100% data integrity between legacy and modern systems.
          </p>
          <p className='text-wrap'>
            My journey is defined by a passion for building clean, user-friendly software—whether that’s a complex backend data tool or a polished web interface. I am excited to bring my technical adaptability and internship experience to a dynamic development team.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <ProfileCard
            name='Darl Floresca'
            title='Senior Student'
            handle="javicodes"
            status="Online"
            contactText="Contact Me"
            avatarUrl="/me_no_bg.png"
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