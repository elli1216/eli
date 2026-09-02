import React from 'react';
import { WeatherTimeWidget } from '@/components/shared/WeatherTimeWidget';
import { Terminal } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative py-10 px-6 bg-card border-t border-border/80 font-mono">
      {/* Terminal corner brackets */}
      <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-primary/30 rounded-bl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-primary/30 rounded-br pointer-events-none" />

      {/* Top accent border line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent pointer-events-none" />

      <div className="max-w-5xl mx-auto flex flex-col items-center gap-6">
        {/* Weather & Time */}
        <WeatherTimeWidget />

        {/* Footer info */}
        <div className="flex flex-col md:flex-row items-center justify-between w-full gap-3 border-t border-border/40 pt-6 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Terminal size={13} className="text-primary" />
            <span>&copy; {new Date().getFullYear()} Eli Floresca.</span>
          </div>

          <p>
            Built with React, TypeScript & Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;