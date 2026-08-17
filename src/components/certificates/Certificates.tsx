import { useState } from 'react';
import { motion } from 'framer-motion';
import { useMobile } from '@/lib/utils';
import { Section } from '@/components/layout/Section';
import { certificates } from '@/constants/constants';
import { DecorativeFrame } from '@/components/shared/DecorativeFrame';
import { SectionTitle } from '@/components/layout/SectionTitle';
import { useAccent } from '@/contexts/AccentContext';
import { Eye, Award, ArrowRight } from 'lucide-react';
import { CertificateModal, CertificateModalData } from '@/components/shared/CertificateModal';

import { SectionDescription } from '@/components/layout/SectionDescription';

export const Certificates = () => {
  const [showAll, setShowAll] = useState(false);
  const [selectedCert, setSelectedCert] = useState<CertificateModalData | null>(null);
  const { currentAccent } = useAccent();

  const INITIAL_VISIBLE = useMobile() ? 4 : 3;
  const visibleCerts = showAll ? certificates : certificates.slice(0, INITIAL_VISIBLE);
  const remainingCount = certificates.length - INITIAL_VISIBLE;

  return (
    <Section id="certificates">
      <div className="mb-12">
        <SectionTitle>Certificates</SectionTitle>
        <SectionDescription>
          Proof that I occasionally finish what I start. (And {certificates.length} credentials from courses and programs).
        </SectionDescription>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {visibleCerts.map((cert, index) => (
          <motion.div
            key={cert.alt}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="w-full h-full"
          >
            <DecorativeFrame accentColor={currentAccent} className="w-full h-full">
              <button
                onClick={() => setSelectedCert(cert)}
                className="group w-full h-full min-h-40 relative cursor-pointer focus:outline-none bg-card hover:bg-muted/10 transition-colors flex flex-col items-center justify-center rounded-xl overflow-hidden focus-visible:ring-2 focus-visible:ring-primary border border-primary/5 shadow-md"
                aria-label={`View ${cert.alt} certificate`}
              >
                {/* Premium gradient glow on hover */}
                <div className="absolute inset-0 bg-linear-to-b from-primary/5 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Icon */}
                <div className="text-primary/60 group-hover:text-primary transition-all duration-300 mb-2 group-hover:-translate-y-2 transform">
                  <Award size={32} strokeWidth={1.5} />
                </div>

                {/* Title */}
                <div className="flex flex-col items-center justify-center z-10 transition-transform duration-300 group-hover:-translate-y-2 w-full px-4">
                  <h3 className="font-semibold text-foreground text-sm md:text-base text-center line-clamp-2">
                    {cert.alt}
                  </h3>
                </div>

                {/* Hover State: View Certificate */}
                <div className="absolute bottom-3 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0 z-20">
                  <span className="text-primary font-bold text-[10px] md:text-xs tracking-widest uppercase flex items-center gap-1.5 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm border border-primary/20">
                    <Eye size={12} /> View Certificate
                  </span>
                </div>
              </button>
            </DecorativeFrame>
          </motion.div>
        ))}
      </div>

      {!showAll && remainingCount > 0 ? (
        <div className="mt-12 flex justify-center">
          <button
            onClick={() => setShowAll(true)}
            className="group flex items-center gap-2 px-6 py-2.5 rounded-lg border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 font-medium cursor-pointer"
          >
            See More ({remainingCount})
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      ) : (
        <div className="mt-12 flex justify-center">
          <button
            onClick={() => setShowAll(false)}
            className="group flex items-center gap-2 px-6 py-2.5 rounded-lg border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 font-medium cursor-pointer"
          >
            See Less
          </button>
        </div>
      )}

      {/* Lightbox Modal */}
      <CertificateModal cert={selectedCert} onClose={() => setSelectedCert(null)} />
    </Section>
  );
};
