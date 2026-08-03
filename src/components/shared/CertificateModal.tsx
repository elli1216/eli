import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';

export interface CertificateModalData {
  src: string;
  alt: string;
  href?: string;
}

interface CertificateModalProps {
  cert: CertificateModalData | null;
  onClose: () => void;
}

/**
 * Reusable modal component for displaying certificate images in a lightbox.
 * Includes accessibility features (keyboard ESC handling, focus management, data-lenis-prevent).
 */
export const CertificateModal: React.FC<CertificateModalProps> = ({ cert, onClose }) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (cert) {
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
  }, [cert, onClose]);

  return (
    <AnimatePresence>
      {cert && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-background/80 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          data-lenis-prevent="true"
        >
          {/* Close button - Top Right */}
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full bg-card/80 hover:bg-card text-foreground transition-all backdrop-blur-md border border-border/50 shadow-lg z-50 cursor-pointer hover:rotate-90 hover:scale-110"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>

          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl w-full max-h-[85vh] flex flex-col items-center bg-card rounded-2xl overflow-hidden shadow-2xl border border-border"
          >
            {/* Image Container */}
            <div className="w-full h-full overflow-auto p-2 sm:p-4 bg-muted/30">
              <img
                src={cert.src}
                alt={cert.alt}
                className="w-full h-auto max-h-[70vh] object-contain rounded-xl shadow-inner"
                id="modal-title"
              />
            </div>

            {/* Action Bar */}
            <div className="w-full p-4 border-t border-border flex items-center justify-between bg-card/80 backdrop-blur-md">
              <p className="font-medium text-foreground truncate mr-4">
                {cert.alt}
              </p>
              {cert.href && (
                <a
                  href={cert.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-sm shrink-0"
                >
                  <ExternalLink size={16} />
                  <span className="hidden sm:inline">Verify Credential</span>
                  <span className="sm:hidden">Verify</span>
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
