import React from 'react';
import { WeatherTimeWidget } from '@/components/shared/WeatherTimeWidget';

export const Footer: React.FC = () => {
  return (
    <footer className="relative py-10 px-6 bg-card border-t border-primary/10">
      {/* Corner marks */}
      <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-primary/30 rounded-bl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-primary/30 rounded-br pointer-events-none" />
      {/* Glow accent line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-px bg-linear-to-r from-transparent via-primary/40 to-transparent pointer-events-none" />

      <div className="max-w-5xl mx-auto flex flex-col items-center gap-6">
        <WeatherTimeWidget />
        
        <div className="flex flex-col md:flex-row items-center justify-between w-full gap-3 border-t border-border/30 pt-6">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Eli. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Built with React, TypeScript,{" "}
            <a
              href="https://www.reactbits.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              ReactBits
            </a>
            , and{" "}
            <a
              href="https://motion.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Motion
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
};