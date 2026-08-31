import { useState } from 'react';
import { motion } from 'framer-motion';
import { useMobile } from '@/lib/utils';
import { Section } from '@/components/layout/Section';
import { certificates } from '@/constants/constants';
import { DecorativeFrame } from '@/components/shared/DecorativeFrame';
import { useAccent } from '@/contexts/AccentContext';
import { Award, ArrowDown, EyeIcon } from 'lucide-react';
import { CertificateModal, CertificateModalData } from '@/components/shared/CertificateModal';
import { TerminalSectionHeader, TerminalBadge, TerminalButton } from '@/components/shared/terminal';

export const Certificates = () => {
  const [showAll, setShowAll] = useState(false);
  const [selectedCert, setSelectedCert] = useState<CertificateModalData | null>(null);
  const { currentAccent } = useAccent();

  const INITIAL_VISIBLE = useMobile() ? 4 : 6;
  const visibleCerts = showAll ? certificates : certificates.slice(0, INITIAL_VISIBLE);
  const remainingCount = certificates.length - INITIAL_VISIBLE;

  return (
    <Section id="certificates">
      {/* Terminal Section Header */}
      <TerminalSectionHeader
        command="security verify-cert -d /etc/ssl/certs/"
        title="Verified Credentials"
        description={`Cryptographically verified online certificates, tracks, and diplomas (${certificates.length} credentials).`}
        executionTime="5ms"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 font-mono">
        {visibleCerts.map((cert, index) => (
          <motion.div
            key={cert.alt}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="w-full h-fit"
          >
            <DecorativeFrame accentColor={currentAccent} className="w-full h-full">
              <button
                onClick={() => setSelectedCert(cert)}
                className="group w-full h-full min-h-42.5 relative  focus:outline-none bg-card/95 hover:bg-muted/20 transition-all flex flex-col justify-between p-5 rounded-xl overflow-hidden focus-visible:ring-2 focus-visible:ring-primary border border-border/70 shadow-sm"
                aria-label={`View ${cert.alt} certificate`}
              >
                {/* Header status */}
                <div className="flex items-center justify-between w-full mb-3">
                  <div
                    className="size-8 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${currentAccent}1a`, color: currentAccent }}
                  >
                    <Award size={18} />
                  </div>
                  <TerminalBadge variant="success" label="VERIFIED" pulse />
                </div>

                {/* Title */}
                <div className="flex flex-col text-left w-full my-auto">
                  <h3 className="font-bold text-foreground text-xs sm:text-sm line-clamp-2 mb-1">
                    {cert.alt}
                  </h3>
                  <p className="text-[11px] text-primary font-semibold">{cert.issuer}</p>
                </div>

                {/* Footer Command */}
                <div className="pt-3 border-t border-border/40 w-full flex items-center justify-between text-xs text-muted-foreground group-hover:text-primary transition-colors">
                  <span className="text-[11px]">cat x509.pem</span>
                  <EyeIcon size={12} className="group-hover:translate-x-0.5 transition-transform" />
                </div>
              </button>
            </DecorativeFrame>
          </motion.div>
        ))}
      </div>

      {/* Show More / Show Less */}
      {certificates.length > INITIAL_VISIBLE && (
        <div className="mt-12 flex justify-center">
          <TerminalButton
            command={
              showAll
                ? './verify-cert.sh --collapse'
                : `./verify-cert.sh --all (+${remainingCount})`
            }
            variant="secondary"
            size="md"
            icon={ArrowDown}
            onClick={() => setShowAll(!showAll)}
          />
        </div>
      )}

      {/* Lightbox Modal */}
      <CertificateModal cert={selectedCert} onClose={() => setSelectedCert(null)} />
    </Section>
  );
};

export default Certificates;
