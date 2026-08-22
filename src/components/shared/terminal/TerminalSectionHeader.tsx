import React from 'react';
import { motion } from 'framer-motion';
import { TerminalPrompt } from './TerminalPrompt';

export interface TerminalSectionHeaderProps {
  command: string;
  title: string;
  description?: string;
  path?: string;
  executionTime?: string;
  statusCode?: string;
  align?: 'left' | 'center';
  className?: string;
}

export const TerminalSectionHeader: React.FC<TerminalSectionHeaderProps> = ({
  command,
  title,
  description,
  path = '~',
  executionTime = '8ms',
  statusCode = '200 OK',
  align = 'center',
  className = '',
}) => {
  const isCenter = align === 'center';

  return (
    <div
      className={`mb-8 sm:mb-12 md:mb-14 flex flex-col w-full ${
        isCenter ? 'items-center text-center' : 'items-start text-left'
      } ${className}`}
    >
      {/* Simulated Bash Query Command */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="mb-3 sm:mb-4 max-w-full"
      >
        <TerminalPrompt
          command={command}
          path={path}
          executionTime={executionTime}
          statusCode={statusCode}
        />
      </motion.div>

      {/* Human-Readable Section Title */}
      <motion.h2
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.08 }}
        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground font-mono"
      >
        {title}
      </motion.h2>

      {/* Subtitle Description */}
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="mt-2 sm:mt-3 text-xs sm:text-sm md:text-base text-muted-foreground max-w-2xl font-mono leading-relaxed px-2 sm:px-0"
        >
          <span className="text-primary/70 mr-1">#</span>
          {description}
        </motion.p>
      )}
    </div>
  );
};

export default TerminalSectionHeader;
