import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Copy, Check, RefreshCw } from 'lucide-react';
import { useAccent } from '@/contexts/AccentContext';
import { DecorativeFrame } from '@/components/shared/DecorativeFrame';

interface LogLine {
  status: string;
  prefix?: string;
  text: React.ReactNode;
  delay: number;
}

const TERMINAL_LOGS: LogLine[] = [
  {
    status: '[OK]',
    text: 'Initializing runtime environment...',
    delay: 0.2,
  },
  {
    status: '[OK]',
    text: (
      <>
        Core stack loaded:{' '}
        <span className="text-primary font-semibold">
          [React, Next.js, TypeScript, Java, Spring]
        </span>
      </>
    ),
    delay: 0.5,
  },
  {
    status: '[OK]',
    text: (
      <>
        Database cluster: PostgreSQL connected{' '}
        <span className="text-emerald-500 font-mono text-[11px]">(latency: 8ms)</span>
      </>
    ),
    delay: 0.8,
  },
  {
    status: '[OK]',
    text: (
      <>
        Mainframe subsystem:{' '}
        <span className="text-primary/90 font-medium">z/OS & COBOL modules online</span>
      </>
    ),
    delay: 1.1,
  },
  {
    status: '[OK]',
    text: (
      <>
        Type checking & linting:{' '}
        <span className="text-emerald-500 font-semibold">0 errors, 0 warnings</span>
      </>
    ),
    delay: 1.4,
  },
  {
    status: '[OK]',
    text: (
      <>
        Architecture health:{' '}
        <span className="text-primary font-bold tracking-wider">100% OPTIMIZED</span>
      </>
    ),
    delay: 1.7,
  },
];

export const TerminalCard: React.FC = () => {
  const { currentAccent } = useAccent();
  const [copied, setCopied] = useState(false);
  const [key, setKey] = useState(0);

  const rawLogsText = `eli@portfolio:~$ ./init-system.sh --verbose
[OK] Initializing runtime environment...
[OK] Core stack loaded: [React, Next.js, TypeScript, Java, Spring]
[OK] Database cluster: PostgreSQL connected (latency: 8ms)
[OK] Mainframe subsystem: z/OS & COBOL modules online
[OK] Type checking & linting: 0 errors, 0 warnings
[OK] Architecture health: 100% OPTIMIZED
Status: Ready for deployment.`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(rawLogsText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy terminal text:', err);
    }
  };

  const handleReplay = () => {
    setKey((prev) => prev + 1);
  };

  return (
    <div className="w-full max-w-lg">
      <DecorativeFrame accentColor={currentAccent} className="w-full shadow-2xl">
        <div className="bg-card/95 backdrop-blur-xl rounded-xl overflow-hidden border border-border/80 flex flex-col">
          {/* Terminal Window Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-muted/40 border-b border-border/60 select-none">
            {/* Window Controls */}
            <div className="flex items-center gap-2">
              <span className="size-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="size-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="size-3 rounded-full bg-emerald-500/80 inline-block" />
            </div>

            {/* Terminal Title */}
            <div className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground">
              <Terminal size={13} className="text-primary" />
              <span>bash — eli@portfolio:~</span>
            </div>

            {/* Header Actions */}
            <div className="flex items-center gap-1">
              <button
                onClick={handleReplay}
                aria-label="Replay Terminal"
                title="Rerun script"
                className="cursor-target p-1 text-muted-foreground hover:text-primary transition-colors rounded-md hover:bg-muted"
              >
                <RefreshCw size={13} />
              </button>
              <button
                onClick={handleCopy}
                aria-label="Copy Terminal Output"
                title={copied ? 'Copied!' : 'Copy to clipboard'}
                className="cursor-target p-1 text-muted-foreground hover:text-primary transition-colors rounded-md hover:bg-muted"
              >
                {copied ? <Check size={13} className="text-emerald-500" /> : <Copy size={13} />}
              </button>
            </div>
          </div>

          {/* Terminal Body */}
          <div key={key} className="p-4 sm:p-5 font-mono text-xs sm:text-[13px] leading-relaxed space-y-2 select-text">
            {/* Command Prompt */}
            <div className="flex items-center gap-1.5 sm:gap-2 text-foreground font-semibold whitespace-nowrap overflow-x-auto no-scrollbar py-0.5">
              <span className="text-primary font-bold shrink-0">eli@portfolio</span>
              <span className="text-muted-foreground shrink-0">:</span>
              <span className="text-primary/70 shrink-0">~</span>
              <span className="text-muted-foreground shrink-0">$</span>
              <span className="text-foreground shrink-0 font-medium whitespace-nowrap">./init-system.sh --verbose</span>
            </div>

            {/* Staggered Log Output Lines */}
            <div className="space-y-1.5 pt-1">
              {TERMINAL_LOGS.map((log, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: log.delay, ease: 'easeOut' }}
                  className="flex items-start gap-2.5 text-muted-foreground"
                >
                  <span className="text-emerald-500 font-bold shrink-0">{log.status}</span>
                  <div className="leading-snug">{log.text}</div>
                </motion.div>
              ))}
            </div>

            {/* Bottom Status Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 2.0 }}
              className="mt-4 pt-3 border-t border-border/40 flex items-center justify-between text-xs text-muted-foreground"
            >
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-foreground font-medium">Status: Ready for deployment.</span>
              </div>
              <span className="inline-block w-2 h-3.5 bg-primary animate-pulse" />
            </motion.div>
          </div>
        </div>
      </DecorativeFrame>
    </div>
  );
};

export default TerminalCard;
