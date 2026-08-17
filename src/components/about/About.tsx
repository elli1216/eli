import React from 'react';
import { Section } from '@/components/layout/Section';
import { useAccent } from '@/contexts/AccentContext';
import { motion } from 'framer-motion';
import { SectionTitle } from '@/components/layout/SectionTitle';
import { SectionDescription } from '@/components/layout/SectionDescription';
import { Target, TrendingUp, Layers, GraduationCap, MapPin, Briefcase, Sparkles, ChessPawnIcon } from 'lucide-react';
import { DecorativeFrame } from '@/components/shared/DecorativeFrame';
import { EDUCATION, EXPERIENCE_DATA, EXPLORING, INTERESTS, PERSONAL_DATA } from '@/constants/constants';

const VALUES = [
  {
    icon: Target,
    title: "Challenge → Calm",
    description: "I take noisy, tangled problems and ship systems that feel effortless — turning chaos into something calm and dependable.",
  },
  {
    icon: TrendingUp,
    title: "Feedback → Growth",
    description: "I'm highly coachable. Every review and every industry best practice is a chance to level up, not a critique to defend.",
  },
  {
    icon: Layers,
    title: "Complexity → Scalability",
    description: "I care about code that stays clean, fast, and maintainable long after launch — standards over shortcuts.",
  },
];

export const About: React.FC = () => {
  const { currentAccent } = useAccent();
  return (
    <Section id="about">
      <div className="mb-12">
        <SectionTitle>About Me</SectionTitle>
        <SectionDescription>
          A little bit about the person behind the keyboard.
        </SectionDescription>
      </div>
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          className="space-y-6 text-lg text-muted-foreground leading-relaxed"
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className='flex flex-col gap-4 text-sm md:text-lg w-full max-w-md mx-auto md:mx-0 text-center md:text-start'>
            <p>
              I am a <span className='text-primary font-semibold'>BSIT graduate</span> of <span className='text-primary font-semibold'>Bulacan State University</span> from <span className='italic'>Marilao, Bulacan</span>, currently working as a <span className='text-primary font-semibold'>{EXPERIENCE_DATA[0].role}</span> at <span className='underline decoration-primary/50 underline-offset-4 font-medium'>{EXPERIENCE_DATA[0].company}</span>.
            </p>
            <p>
              As a <span className='text-primary font-semibold'>highly coachable developer</span>, I thrive on <span className='text-primary font-semibold'>constructive feedback</span> and <span className='text-primary font-semibold'>industry-best practices</span> to <span className='italic'>continuously sharpen my skills</span>.
            </p>
            <p>
              I bring rigorous, <span className='text-primary font-semibold'>hands-on project experience</span> and a <span className='underline decoration-primary/50 underline-offset-4'>strict commitment to maintaining high standards</span> for <span className='text-primary font-semibold'>code scalability and performance</span>. I am eager to leverage my <span className='text-primary font-semibold'>adaptable mindset</span> and <span className='text-primary font-semibold'>strong technical foundation</span> within a <span className='italic'>dynamic development team</span>.
            </p>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="w-full max-w-md mx-auto"
        >
          <DecorativeFrame accentColor={currentAccent}>
            <div className="bg-card rounded-xl p-6 sm:p-8 space-y-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="size-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${currentAccent}1a`, color: currentAccent }}>
                    <Briefcase size={18} />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">Currently</p>
                    <p className="text-sm font-medium text-foreground">{EXPERIENCE_DATA[0].role} @ {EXPERIENCE_DATA[0].company}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="size-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${currentAccent}1a`, color: currentAccent }}>
                    <GraduationCap size={18} />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">Education</p>
                    <p className="text-sm font-medium text-foreground">BSIT @ {EDUCATION.uninversity_attended}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="size-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${currentAccent}1a`, color: currentAccent }}>
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">Based in</p>
                    <p className="text-sm font-medium text-foreground">{PERSONAL_DATA.based_in}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="size-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${currentAccent}1a`, color: currentAccent }}>
                    <Sparkles size={18} />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">Currently exploring</p>
                    <p className="text-sm font-medium text-foreground">
                    {EXPLORING.join(' | ')}
                    </p>

                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="size-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${currentAccent}1a`, color: currentAccent }}>
                    <ChessPawnIcon size={18} />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">Interests</p>
                    <p className="text-sm font-medium text-foreground">
                    {INTERESTS.join(' | ')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </DecorativeFrame>
        </motion.div>
      </div>

      {/* What drives me */}
      <motion.div
        className="mt-20"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="mb-12">
          <SectionTitle>What drives me</SectionTitle>
          <SectionDescription>
            The principles that keep me coding late into the night.
          </SectionDescription>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {VALUES.map((value, index) => {
            const Icon = value.icon;
            return (
              <DecorativeFrame accentColor={currentAccent} className='h-fit w-full'>
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-card flex flex-col items-center border border-border/50 rounded-xl p-6"
                >
                  <div
                    className="size-14 rounded-xl flex items-center justify-center mb-5"
                    style={{ backgroundColor: `${currentAccent}1a`, color: currentAccent }}
                  >
                    <Icon size={26} strokeWidth={1.5} />
                  </div>
                  <h4 className="font-bold text-foreground mb-2">{value.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed text-center">{value.description}</p>
                </motion.div>
              </DecorativeFrame>
            );
          })}
        </div>
      </motion.div >
    </Section >
  );
};