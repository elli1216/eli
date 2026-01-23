import React from 'react';
import { Section } from './Section';
import ProfileCard from './ProfileCard';

export const About: React.FC = () => {
  return (
    <Section id="about">
      <h2 className="text-3xl font-bold text-foreground mb-8">About Me</h2>
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
          <p>
            I am a graduating 4th-year BSIT student with a strong drive for software excellence.
            Currently, I am honing my skills as a <span className="text-primary font-semibold">Programmer Intern at Landbank of the Philippines</span>,
            where I am gaining firsthand exposure to enterprise-level software development and corporate IT workflows.
          </p>
          <p>
            My journey is defined by a passion for modern web technologies. I love transforming complex
            requirements into clean, user-friendly digital experiences. I am eager to bring my academic foundation
            and internship discipline to a full-time role.
          </p>
        </div>
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
        />
      </div>
    </Section>
  );
};