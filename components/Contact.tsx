import React from 'react';
import { Section } from './Section';
import { Mail, Linkedin, Github, Facebook } from 'lucide-react';
import { motion } from 'framer-motion';
import { ACCENT_COLORS } from '../constants';
import { DecorativeFrame } from './DecorativeFrame';

interface ContactProps {
  accentColor: string;
}

const contactItems = [
  {
    icon: Mail,
    label: 'Email',
    value: 'floresca.darlellisong@gmail.com',
    href: 'mailto:floresca.darlellisong@gmail.com',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'Darl Ellison Floresca',
    href: 'https://www.linkedin.com/in/darlfloresca/',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: '@elli1216',
    href: 'https://github.com/elli1216',
  },
  {
    icon: Facebook,
    label: 'Facebook',
    value: 'Darl Ellison Floresca',
    href: 'https://www.facebook.com/darlellison/',
  },
];

export const Contact: React.FC<ContactProps> = ({ accentColor }) => {
  const currentAccent = ACCENT_COLORS.find(c => c.name === accentColor)?.value || '#71717a';

  return (
    <Section id="contact">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-foreground mb-4">Get In Touch</h2>
        <p className="text-muted-foreground mb-12 max-w-xl mx-auto">
          Whether you have a question, a job opportunity, or just want to say hi — my inbox is always open.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
          {contactItems.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <DecorativeFrame accentColor={currentAccent}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-5 bg-card rounded-xl"
                  >
                    <div className="p-3 rounded-full border border-primary/20 text-primary">
                      <Icon size={22} />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-foreground">{item.label}</h3>
                      <p className="text-sm text-muted-foreground truncate max-w-[200px]">{item.value}</p>
                    </div>
                  </a>
                </DecorativeFrame>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
};