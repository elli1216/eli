import { useState } from 'react';
import { motion } from 'motion/react';
import { useMobile } from '@/lib/utils';
import { Section } from './Section';

const certificates = [
  { src: "/mainframedeveloper.jpg", alt: "IBM Mainframe Developer", href: "https://www.coursera.org/account/accomplishments/specialization/certificate/GTA3SGF8S3NV" },
  { src: "/learnintermediatejava.jpg", alt: "Java", href: "https://www.codecademy.com/profiles/degf/certificates/2624ed9b49bb4d5c994983877e5263f0" },
  { src: "/IBMZALLSTAR.jpg", alt: "All Star Badge - IBM Z Xplore", href: "https://www.credly.com/badges/9c95a33b-7c50-434b-b7eb-eba86e1c1c0e/linked_in_profile" },
  { src: "/sfvip2025floresca.jpg", alt: "SFVIP", href: "https://www.salesforce.com/ap/" },
  { src: "/nextjsproj_page.jpg", alt: "NextJS Project BootCamp", href: "https://www.udemy.com/certificate/UC-e4312cb7-9b70-4822-ae7a-5270b6759622/" },
  { src: "/foundations.jpg", alt: "Foundations", href: "https://www.udemy.com/certificate/UC-47707ddb-68d9-4661-80e1-c54313587553/" },
  { src: "/htmlcssjsreact.jpg", alt: "React", href: "https://www.udemy.com/certificate/UC-9e5b5a02-e296-462b-9da7-09af19fb1706/" },
  { src: "/CyberThreatManagement.jpg", alt: "Cisco", href: "https://www.credly.com/badges/fedbe3b2-8519-4e22-976e-153dd577c5c7/public_url" },
  { src: "/SecurityandConnectivitySupport.jpg", alt: "Cisco", href: "https://www.credly.com/badges/fb5d7810-4e12-4d93-ab39-0b54c34bc1a5/public_url" },
];

export const Certificates = () => {
  const [showAll, setShowAll] = useState(false);

  const INITIAL_VISIBLE = useMobile() ? 4 : 3;
  const visibleCerts = showAll ? certificates : certificates.slice(0, INITIAL_VISIBLE);
  const remainingCount = certificates.length - INITIAL_VISIBLE;

  return (
    <Section id='certificates'>
      <div className="mb-12 mx-auto max-w-5xl w-full px-6">
        <h2 className="text-3xl font-bold text-foreground">Certificates</h2>
        <p className="text-muted-foreground mt-3 max-w-2xl">
          Online certificates I have earned through the years.
        </p>
      </div>
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {visibleCerts.map((cert, index) => (
            <motion.a
              key={cert.alt}
              href={cert.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="block rounded-lg overflow-hidden border border-border hover:border-primary transition-colors"
            >
              <img
                src={cert.src}
                alt={cert.alt}
                className="w-full h-auto object-cover"
              />
            </motion.a>
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