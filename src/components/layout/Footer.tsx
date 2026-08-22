import React from 'react';
import { WeatherTimeWidget } from '@/components/shared/WeatherTimeWidget';
import { TerminalBadge } from '@/components/shared/terminal';
import { Terminal, Cpu } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative py-10 px-6 bg-card border-t border-border/80 font-mono">
      {/* Terminal corner brackets */}
      <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-primary/30 rounded-bl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-primary/30 rounded-br pointer-events-none" />

      {/* Top accent border line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent pointer-events-none" />

      <div className="max-w-5xl mx-auto flex flex-col items-center gap-6">
        {/* Weather & Time Telemetry */}
        <WeatherTimeWidget />

        {/* System Status TUI Row */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs text-muted-foreground">
          <TerminalBadge variant="success" label="STATUS: 200 OK" pulse />
          <TerminalBadge variant="neutral" label="UPTIME: 99.99%" />
          <TerminalBadge variant="accent" label="PORT: 3000" />
          <TerminalBadge variant="neutral" label="EXIT CODE: 0" />
        </div>

        {/* Footer info */}
        <div className="flex flex-col md:flex-row items-center justify-between w-full gap-3 border-t border-border/40 pt-6 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Terminal size={13} className="text-primary" />
            <span>&copy; {new Date().getFullYear()} Eli Floresca. All systems operational.</span>
          </div>

          <p>
            Engineered with React, TypeScript & Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;