import React, { useState } from 'react';
import { Section } from './Section';
import { EXPERIENCE_DATA } from '../constants';
import { motion } from 'framer-motion';
import { ChevronDown, MapPin } from 'lucide-react';
import { ACCENT_COLORS } from '../constants';
import { DecorativeFrame } from './DecorativeFrame';

interface ExperienceProps {
  accentColor: string;
}

const CompanyLogo: React.FC<{ domain: string; className?: string }> = ({ domain, className = '' }) => (
  <img
    src={`https://img.logo.dev/${domain}?token=${import.meta.env.VITE_LOGO_DEV_PUBLIC_KEY}&retina=true`}
    alt="Company logo"
    className={`rounded-full object-contain ${className}`}
  />
);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  } as const,
};

export const Experience: React.FC<ExperienceProps> = ({ accentColor }) => {
  const [expandedId, setExpandedId] = useState<string | number | null>(null);
  const currentAccent = ACCENT_COLORS.find(c => c.name === accentColor)?.value || '#71717a';

  return (
    <Section id="experience" className='mt-10'>
      <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12">Experience</h2>

      <div className="relative">
        {/* Timeline line */}
        <div className="hidden md:block absolute md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px bg-border" />

        <motion.div
          className="space-y-8 md:space-y-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {EXPERIENCE_DATA.map((item, index) => {
            const isEven = index % 2 === 0;
            const isFirst = index === 0;
            const isExpanded = expandedId === item.id;

            return (
              <motion.div
                key={item.id}
                className="relative flex flex-col md:flex-row"
                variants={itemVariants}
              >
                {/* Content - alternates sides on desktop */}
                <div className={`w-full md:w-1/2 ${isEven ? 'md:ml-auto md:pr-10' : 'md:pl-10'}`}>
                  <DecorativeFrame accentColor={currentAccent}>
                    <div className="bg-card rounded-xl p-5">
                      {/* badge */}
                      {isFirst && (
                        <span className="inline-block text-[10px] font-semibold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded-full mb-3">
                          Present
                        </span>
                      )}

                      {/* Header with company logo */}
                      <div className="flex items-start gap-3 mb-3">
                        {item.companyUrl && (
                          <div className="size-10 rounded-lg overflow-hidden bg-background border border-primary/20 flex items-center justify-center shrink-0">
                            <CompanyLogo domain={item.companyUrl} className="size-6" />
                          </div>
                        )}
                        <div className="min-w-0">
                          <h3 className="text-lg font-bold text-foreground">{item.company}</h3>
                          <p className="text-sm text-muted-foreground">{item.role}</p>
                        </div>
                      </div>

                      {/* Period and location */}
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className="text-xs text-muted-foreground bg-accent px-2.5 py-1 rounded-full">
                          {item.period}
                        </span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <MapPin size={12} /> {item.location}
                        </span>
                      </div>

                      {/* Description with clamp */}
                      <div>
                        <p className={`text-sm text-muted-foreground leading-relaxed ${isExpanded ? '' : 'line-clamp-2'}`}>
                          {item.description}
                        </p>
                        {item.description.length > 120 && (
                          <button
                            onClick={() => setExpandedId(isExpanded ? null : item.id)}
                            className="text-xs text-primary hover:underline mt-1 flex items-center gap-1"
                          >
                            {isExpanded ? 'Show less' : 'Read more'}
                            <ChevronDown size={12} className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                          </button>
                        )}
                      </div>
                    </div>
                  </DecorativeFrame>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </Section>
  );
};
