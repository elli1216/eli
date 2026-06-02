import { useState } from 'react';
import { motion } from 'motion/react';
import { useMobile } from '@/lib/utils';
import { Section } from './Section';
import { certificates, ACCENT_COLORS } from '@/constants';
import { DecorativeFrame } from './DecorativeFrame';

interface CertificatesProps {
  accentColor: string;
}

export const Certificates: React.FC<CertificatesProps> = ({ accentColor }) => {
  const [showAll, setShowAll] = useState(false);
  const currentAccent = ACCENT_COLORS.find(c => c.name === accentColor)?.value || '#71717a';

  const INITIAL_VISIBLE = useMobile() ? 4 : 3;
  const visibleCerts = showAll ? certificates : certificates.slice(0, INITIAL_VISIBLE);
  const remainingCount = certificates.length - INITIAL_VISIBLE;

  return (
    <Section id='certificates'>
      <div className="mb-12 mx-auto max-w-5xl w-full px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">Certificates</h2>
        <p className="text-muted-foreground mt-3 max-w-2xl">
          Online certificates I have earned through the years.
        </p>
      </div>
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {visibleCerts.map((cert, index) => (
            <motion.div
              key={cert.alt}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <DecorativeFrame accentColor={currentAccent}>
                <a
                  href={cert.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-xl overflow-hidden"
                >
                  <img
                    src={cert.src}
                    alt={cert.alt}
                    className="w-full h-auto object-cover"
                  />
                </a>
              </DecorativeFrame>
            </motion.div>
          ))}
        </div>

        {!showAll && remainingCount > 0 && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setShowAll(true)}
              className="px-6 py-2 rounded-lg border border-primary text-primary hover:bg-primary/10 transition-colors font-medium"
            >
              See More ({remainingCount})
            </button>
          </div>
        )}
      </div>
    </Section>
  );
}