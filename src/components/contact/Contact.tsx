import { Section } from '@/components/layout/Section';
import { motion } from 'framer-motion';
import { DecorativeFrame } from '@/components/shared/DecorativeFrame';
import { SectionTitle } from '@/components/layout/SectionTitle';
import { useAccent } from '@/contexts/AccentContext';
import { contactItems } from '@/constants/constants';

export const Contact = () => {
  const { currentAccent } = useAccent();
  return (
    <Section id="contact">
      <div className="max-w-4xl mx-auto text-center">
        <SectionTitle className="mb-4">Get In Touch</SectionTitle>
        <p className="text-muted-foreground mb-3 max-w-xl mx-auto text-sm md:text-lg">
          Every project starts with a question. If you have a problem worth solving — a noisy system to calm, a product to ship, or a team to join — let's write the next chapter together.
        </p>
        <p className="text-muted-foreground mb-12 max-w-xl mx-auto text-sm md:text-base italic text-primary/80">
          "My inbox is always open."
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-5xl mx-auto">
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
                      <p className="text-sm text-muted-foreground truncate max-w-50 sm:max-w-70">{item.value}</p>
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