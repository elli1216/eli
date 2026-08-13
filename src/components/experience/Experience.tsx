import { useState } from 'react';
import { Section } from '@/components/layout/Section';
import { EXPERIENCE_DATA } from '@/constants/constants';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, MapPin, Award } from 'lucide-react';
import { DecorativeFrame } from '@/components/shared/DecorativeFrame';
import { SectionTitle } from '@/components/layout/SectionTitle';
import { useAccent } from '@/contexts/AccentContext';
import { CertificateModal, CertificateModalData } from '@/components/shared/CertificateModal';
import CompanyLogo from './CompanyLogo';
import { getDurationLabel } from '../../lib/utils';

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

export const Experience = () => {
  const [expandedId, setExpandedId] = useState<string | number | null>(null);
  const [selectedCert, setSelectedCert] = useState<CertificateModalData | null>(null);
  const { currentAccent } = useAccent();

  return (
    <Section id="experience" className="mt-10">
      <SectionTitle className="mb-12">Experience</SectionTitle>

      <div className="relative">
        {/* Desktop center line */}
        <div className="hidden md:block absolute md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px bg-border" />
        {/* Mobile left line */}
        <div className="md:hidden absolute left-[7px] top-0 bottom-0 w-px bg-border" />

        <motion.div
          className="space-y-8 md:space-y-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {EXPERIENCE_DATA.map((item, index) => {
            const isEven = index % 2 === 0;
            const isFirst = index === 0;
            const isExpanded = expandedId === index;
            const duration = getDurationLabel(item.period);

            return (
              <motion.div
                key={index}
                className="relative flex flex-col md:flex-row md:items-center"
                variants={itemVariants}
              >
                {/* Center node dot (desktop) */}
                <span
                  className="hidden md:block absolute left-1/2 -translate-x-1/2 size-3 rounded-full border-2 border-card"
                  style={{ backgroundColor: currentAccent, boxShadow: `0 0 0 4px ${currentAccent}22` }}
                />
                {/* Mobile node dot */}
                <span
                  className="md:hidden absolute left-2 top-[50%] -translate-x-1/2 size-3 rounded-full border-2 border-card"
                  style={{ backgroundColor: currentAccent, boxShadow: `0 0 0 4px ${currentAccent}22` }}
                />

                {/* Period marker on the opposite side (desktop) */}
                <div
                  className={`hidden md:flex w-1/2 ${isEven ? 'justify-end pr-12 text-right' : 'order-2 justify-start pl-12'
                    }`}
                >
                  <div>
                    <p className="text-2xl font-extrabold leading-none text-foreground">
                      {duration}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">{item.period}</p>
                  </div>
                </div>

                {/* Content */}
                <div className={`w-full pl-8 md:w-1/2 md:pl-0 ${isEven ? 'md:order-2 md:pr-12' : 'md:order-1 md:pl-12'}`}>
                  <DecorativeFrame accentColor={currentAccent}>
                    <div className="bg-card rounded-xl p-5">
                      {/* badge */}
                      {isFirst && (
                        <span className="inline-block text-[10px] font-semibold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded-full mb-3">
                          Present
                        </span>
                      )}

                      {/* Header: role-first with company logo */}
                      <div className="flex items-start gap-3 mb-3">
                        {item.companyUrl && (
                          <div className="size-10 rounded-lg overflow-hidden bg-background border border-primary/20 flex items-center justify-center shrink-0">
                            <CompanyLogo domain={item.companyUrl} company={item.company} className="size-6" />
                          </div>
                        )}
                        <div className="min-w-0">
                          <h3 className="text-base font-bold text-foreground leading-snug">{item.role}</h3>
                          <p className="text-sm text-muted-foreground">{item.company}</p>
                        </div>
                      </div>

                      {/* Period and location */}
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className="md:hidden text-xs text-muted-foreground bg-accent px-2.5 py-1 rounded-full">
                          {item.period}
                        </span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <MapPin size={12} /> {item.location}
                        </span>
                      </div>

                      {/* Description with expand */}
                      {item.description && (
                        <div>
                          <p className={`text-sm text-muted-foreground leading-relaxed ${isExpanded ? 'hidden' : 'line-clamp-2'}`}>
                            {item.description}
                          </p>
                          <AnimatePresence initial={false}>
                            {isExpanded && (
                              <motion.p
                                key="full-description"
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: 'easeOut' }}
                                className="text-sm text-muted-foreground leading-relaxed overflow-hidden"
                              >
                                {item.description}
                              </motion.p>
                            )}
                          </AnimatePresence>
                          {item.description.length > 120 && (
                            <button
                              onClick={() => setExpandedId(isExpanded ? null : index)}
                              className="text-xs text-primary hover:underline mt-1.5 flex items-center gap-1 cursor-pointer"
                            >
                              {isExpanded ? 'Show less' : 'Read more'}
                              <ChevronDown size={12} className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                            </button>
                          )}
                        </div>
                      )}

                      {/* Certificate trigger */}
                      {item.certificate && (
                        <div className="mt-4 pt-3 border-t border-border/50 flex items-center">
                          <button
                            onClick={() =>
                              setSelectedCert({
                                src: item.certificate!,
                                alt: `${item.role}`,
                              })
                            }
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-all cursor-pointer border border-primary/20 shadow-xs"
                          >
                            <Award size={14} /> View Certificate
                          </button>
                        </div>
                      )}
                    </div>
                  </DecorativeFrame>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <CertificateModal cert={selectedCert} onClose={() => setSelectedCert(null)} />
    </Section>
  );
};
