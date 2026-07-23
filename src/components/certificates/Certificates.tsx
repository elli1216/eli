import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useMobile } from '@/lib/utils';
import { Section } from '@/components/layout/Section';
import { certificates } from '@/constants/constants';
import { DecorativeFrame } from '@/components/shared/DecorativeFrame';
import { SectionTitle } from '@/components/layout/SectionTitle';
import { useAccent } from '@/contexts/AccentContext';
import { X, ExternalLink, Eye, Award } from 'lucide-react';

export const Certificates = () => {
  const [showAll, setShowAll] = useState(false);
  const [selectedCert, setSelectedCert] = useState<typeof certificates[0] | null>(null);
  const { currentAccent } = useAccent();

  const INITIAL_VISIBLE = useMobile() ? 4 : 3;
  const visibleCerts = showAll ? certificates : certificates.slice(0, INITIAL_VISIBLE);
  const remainingCount = certificates.length - INITIAL_VISIBLE;

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedCert(null);
    };
    if (selectedCert) {
      window.addEventListener('keydown', handleKeyDown);
      // Prevent scrolling when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [selectedCert]);

  return (
    <Section id='certificates'>
      <div className="mb-12 mx-auto max-w-5xl w-full px-6">
        <SectionTitle>Certificates</SectionTitle>
      </div>

      <div className="mx-auto max-w-5xl px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {visibleCerts.map((cert, index) => (
            <motion.div
              key={cert.alt}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className='w-full'
            >
              <DecorativeFrame accentColor={currentAccent} className="w-full h-full">
                <button
                  onClick={() => setSelectedCert(cert)}
                  className="w-full h-32 md:h-40 relative group cursor-pointer focus:outline-none bg-card hover:bg-muted/10 transition-colors flex flex-col items-center justify-center rounded-xl overflow-hidden focus-visible:ring-2 focus-visible:ring-primary border border-primary/5 shadow-md"
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

        {!showAll && remainingCount > 0 && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setShowAll(true)}
              className="px-6 py-2 rounded-lg border border-primary text-primary hover:bg-primary/10 transition-colors font-medium cursor-pointer"
            >
              See More ({remainingCount})
            </button>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCert(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-background/80 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            {/* Close button - Top Right */}
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full bg-card/50 hover:bg-card text-foreground transition-colors backdrop-blur-md border border-border/50 z-50 cursor-pointer"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full max-h-[85vh] flex flex-col items-center bg-card rounded-2xl overflow-hidden shadow-2xl border border-border"
            >
              {/* Image Container */}
              <div className="w-full h-full overflow-auto p-2 sm:p-4 bg-muted/30">
                <img
                  src={selectedCert.src}
                  alt={selectedCert.alt}
                  className="w-full h-auto max-h-[70vh] object-contain rounded-xl shadow-inner"
                  id="modal-title"
                />
              </div>

              {/* Action Bar */}
              <div className="w-full p-4 border-t border-border flex items-center justify-between bg-card/80 backdrop-blur-md">
                <p className="font-medium text-foreground truncate mr-4">
                  {selectedCert.alt}
                </p>
                <a
                  href={selectedCert.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-sm shrink-0"
                >
                  <ExternalLink size={16} />
                  <span className="hidden sm:inline">Verify Credential</span>
                  <span className="sm:hidden">Verify</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}