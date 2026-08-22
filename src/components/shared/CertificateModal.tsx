import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Terminal, ShieldCheck } from 'lucide-react';
import { useAccent } from '@/contexts/AccentContext';
import { TerminalBadge, TerminalButton } from '@/components/shared/terminal';

export interface CertificateModalData {
  src: string;
  alt: string;
  issuer?: string;
  href?: string;
}

interface CertificateModalProps {
  cert?: CertificateModalData | null;
  certificate?: CertificateModalData | null;
  isOpen?: boolean;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  cert,
  certificate,
  onClose,
}) => {
  const activeCert = cert || certificate;
  const { currentAccent } = useAccent();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (activeCert) {
      closeButtonRef.current?.focus();
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [activeCert, onClose]);

  const certSlug = activeCert?.alt
    ? activeCert.alt.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    : 'cert';

  return (
    <AnimatePresence>
      {activeCert && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-background/85 backdrop-blur-md font-mono"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          data-lenis-prevent="true"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full max-h-[90vh] flex flex-col bg-card rounded-2xl overflow-hidden shadow-2xl border border-border/80"
          >
            {/* Terminal Window Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-muted/40 border-b border-border/70 select-none">
              {/* Traffic light dots */}
              <div className="flex items-center gap-2">
                <span className="size-3 rounded-full bg-rose-500/80 inline-block" />
                <span className="size-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="size-3 rounded-full bg-emerald-500/80 inline-block" />
              </div>

              {/* Title */}
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground truncate max-w-xs sm:max-w-md">
                <Terminal size={12} className="text-primary shrink-0" />
                <span className="truncate">x509://certs/{certSlug}.pem</span>
              </div>

              {/* Close button */}
              <button
                ref={closeButtonRef}
                onClick={onClose}
                className="cursor-target p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
                aria-label="Close modal"
              >
                <X size={16} />
              </button>
            </div>

            {/* Simulated Command Prompt */}
            <div className="px-4 py-2 bg-muted/20 border-b border-border/40 text-xs text-foreground flex items-center justify-between gap-2 flex-wrap select-text">
              <div className="flex items-center gap-1.5 font-medium">
                <span className="text-primary font-bold">eli@portfolio</span>
                <span className="text-muted-foreground">:</span>
                <span className="text-primary/70">~</span>
                <span className="text-muted-foreground">$</span>
                <span>openssl x509 -in {certSlug}.pem -text</span>
              </div>
              <TerminalBadge variant="success" icon={ShieldCheck} label="SIGNATURE_VALID" pulse />
            </div>

            {/* Certificate Preview Image */}
            <div className="w-full flex-1 overflow-auto p-4 sm:p-6 bg-muted/10 flex items-center justify-center">
              <img
                src={activeCert.src}
                alt={activeCert.alt}
                className="w-full h-auto max-h-[60vh] object-contain rounded-lg border border-border/60 shadow-lg"
                id="modal-title"
              />
            </div>

            {/* Terminal Action Bar */}
            <div className="w-full p-4 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-3 bg-card/90">
              <div className="truncate text-left w-full sm:w-auto">
                <p className="font-bold text-foreground text-xs sm:text-sm truncate">
                  {activeCert.alt}
                </p>
                {activeCert.issuer && (
                  <p className="text-[11px] text-primary font-semibold">
                    ISSUER: {activeCert.issuer}
                  </p>
                )}
              </div>

              {activeCert.href && (
                <TerminalButton
                  command="./verify-credential.sh"
                  href={activeCert.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="primary"
                  size="sm"
                  icon={ExternalLink}
                  className="w-full sm:w-auto shrink-0"
                />
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CertificateModal;
