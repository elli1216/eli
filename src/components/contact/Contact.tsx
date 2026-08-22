import { Section } from '@/components/layout/Section';
import { motion } from 'framer-motion';
import { useAccent } from '@/contexts/AccentContext';
import { contactItems } from '@/constants/constants';
import { ExternalLink, Terminal } from 'lucide-react';
import {
  TerminalSectionHeader,
  TerminalWindow,
  TerminalBadge,
} from '@/components/shared/terminal';

export const Contact = () => {
  const { currentAccent } = useAccent();

  return (
    <Section id="contact" className="mt-10">
      <div className="max-w-4xl mx-auto">
        {/* Terminal Section Header */}
        <TerminalSectionHeader
          command="ssh connect@elifloresca.dev --port=22"
          title="Direct Transmission"
          description="Every scalable system starts with a conversation. Connect directly via open sockets or dispatch an email."
          executionTime="18ms"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto font-mono">
          {contactItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.08 }}
                className="h-full"
              >
                <TerminalWindow
                  title={`socket:${item.label.toLowerCase()}`}
                  className="h-full"
                  bodyClassName="p-4"
                >
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-target flex items-center justify-between gap-3 group"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="size-10 rounded-lg flex items-center justify-center shrink-0 border border-primary/20"
                        style={{ backgroundColor: `${currentAccent}1a`, color: currentAccent }}
                      >
                        <Icon size={18} />
                      </div>
                      <div className="text-left min-w-0">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <h3 className="font-bold text-foreground text-xs sm:text-sm group-hover:text-primary transition-colors">
                            {item.label}
                          </h3>
                        </div>
                        <p className="text-xs text-muted-foreground truncate max-w-[180px] sm:max-w-[220px]">
                          {item.value}
                        </p>
                      </div>
                    </div>

                    <ExternalLink size={14} className="text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0" />
                  </a>
                </TerminalWindow>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
};

export default Contact;