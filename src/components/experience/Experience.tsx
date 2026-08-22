import { useState } from 'react';
import { Section } from '@/components/layout/Section';
import { EXPERIENCE_DATA } from '@/constants/constants';
import { AnimatePresence, motion } from 'framer-motion';
import { MapPin, Award } from 'lucide-react';
import { useAccent } from '@/contexts/AccentContext';
import { CertificateModal, CertificateModalData } from '@/components/shared/CertificateModal';
import CompanyLogo from './CompanyLogo';
import { getDurationLabel } from '../../lib/utils';
import { TerminalSectionHeader, TerminalWindow, TerminalBadge } from '@/components/shared/terminal';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  } as const,
};

const ExpandableExperienceLogs: React.FC<{ descriptions: string[]; initialCount?: number }> = ({
  descriptions,
  initialCount = 1,
}) => {
  const [expanded, setExpanded] = useState(false);
  const hasMore = descriptions.length > initialCount;
  const visibleLogs = expanded ? descriptions : descriptions.slice(0, initialCount);

  return (
    <div className="space-y-2">
      <ul className="space-y-2 text-xs text-muted-foreground leading-relaxed">
        <AnimatePresence initial={false}>
          {visibleLogs.map((point, pIndex) => (
            <motion.li
              key={pIndex}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              className="flex items-start gap-2"
            >
              <span className="text-primary font-bold mt-0.5">›</span>
              <span>{point}</span>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      {hasMore && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="cursor-target inline-flex items-center gap-1 text-[11px] font-bold text-primary hover:underline mt-1.5 font-mono  transition-colors"
        >
          {expanded
            ? '[-- collapse log entries --]'
            : `[++ read more (+${descriptions.length - initialCount} log entries) ++]`}
        </button>
      )}
    </div>
  );
};

export const Experience = () => {
  const [selectedCert, setSelectedCert] = useState<CertificateModalData | null>(null);
  const { currentAccent } = useAccent();

  return (
    <Section id="experience" className="mt-10">
      {/* Terminal Section Header */}
      <TerminalSectionHeader
        command="journalctl -u career.service --reverse"
        title="Experience"
        description="System daemon logs and engineering milestones across industry roles."
        executionTime="9ms"
      />

      <div className="relative font-mono">
        {/* Desktop center line */}
        <div className="hidden md:block absolute md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px bg-border/80 border-l border-dashed border-border" />
        {/* Mobile left line */}
        <div className="md:hidden absolute left-2 top-0 bottom-0 w-px bg-border/80 border-l border-dashed border-border" />

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
            const duration = getDurationLabel(item.period);

            return (
              <motion.div
                key={index}
                className="relative flex flex-col md:flex-row md:items-center"
                variants={itemVariants}
              >
                {/* Center node dot (desktop) */}
                <span
                  className="hidden md:block absolute left-1/2 -translate-x-1/2 size-3.5 rounded-full border-2 border-card z-10"
                  style={{
                    backgroundColor: currentAccent,
                    boxShadow: `0 0 0 4px ${currentAccent}25`,
                  }}
                />
                {/* Mobile node dot */}
                <span
                  className="md:hidden absolute left-2 top-6 -translate-x-1/2 size-3.5 rounded-full border-2 border-card z-10"
                  style={{
                    backgroundColor: currentAccent,
                    boxShadow: `0 0 0 4px ${currentAccent}25`,
                  }}
                />

                {/* Period marker on opposite side (desktop) */}
                <div
                  className={`hidden md:flex w-1/2 ${
                    isEven ? 'justify-end pr-12 text-right' : 'order-2 justify-start pl-12'
                  }`}
                >
                  <div className="space-y-1">
                    <p className="text-xl font-bold leading-none text-foreground font-mono">
                      {duration}
                    </p>
                    <p className="text-xs text-muted-foreground font-mono">{item.period}</p>
                    <TerminalBadge
                      variant={isFirst ? 'success' : 'neutral'}
                      label={isFirst ? 'STATUS: ACTIVE' : 'STATUS: COMPLETED'}
                      pulse={isFirst}
                    />
                  </div>
                </div>

                {/* Content Card */}
                <div
                  className={`w-full pl-8 md:w-1/2 md:pl-0 ${isEven ? 'md:order-2 md:pl-12' : 'md:order-1 md:pr-12'}`}
                >
                  <TerminalWindow
                    title={`daemon: ${item.company.toLowerCase().replace(/\s+/g, '-')}.service`}
                    command={`cat /var/log/career/${index + 1}.log`}
                  >
                    <div>
                      {/* Header Info */}
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div>
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <h3 className="font-bold text-foreground text-sm sm:text-base">
                              {item.role}
                            </h3>
                            {isFirst && <TerminalBadge variant="accent" label="CURRENT" pulse />}
                          </div>
                          <p className="text-xs text-primary font-semibold">{item.company}</p>
                        </div>
                        <CompanyLogo
                          domain={item.companyUrl || ''}
                          company={item.company}
                          className="size-10 shrink-0"
                        />
                      </div>

                      {/* Location & Period (Mobile) */}
                      <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mb-4">
                        <span className="flex items-center gap-1">
                          <MapPin size={12} className="text-primary" />
                          <span>{item.location}</span>
                        </span>
                        <span className="md:hidden font-mono text-[11px] text-foreground">
                          · {item.period} ({duration})
                        </span>
                      </div>

                      {/* Responsibilities Log with Expand/Collapse */}
                      <ExpandableExperienceLogs descriptions={item.description} initialCount={1} />

                      {/* Certificate Attachment */}
                      {item.certificate && (
                        <div className="mt-4 pt-3 border-t border-border/40 flex items-center justify-between">
                          <button
                            onClick={() =>
                              setSelectedCert({
                                src: item.certificate!,
                                issuer: item.company,
                                alt: `${item.role} Certificate`,
                              })
                            }
                            className="cursor-target inline-flex items-center gap-1.5 text-xs text-primary hover:underline font-mono"
                          >
                            <Award size={13} />
                            <span>cat credentials.pem</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </TerminalWindow>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {selectedCert && (
        <CertificateModal
          certificate={selectedCert}
          isOpen={!!selectedCert}
          onClose={() => setSelectedCert(null)}
        />
      )}
    </Section>
  );
};

export default Experience;
