import React from 'react';
import { HeroBackground } from '@/components/home/HeroBackground';
import { HeroContent } from '@/components/home/HeroContent';
import { ScrollDown } from '@/terminal/ScrollDown';

export const Hero: React.FC = () => (
  <section className="relative flex items-center justify-center h-full overflow-hidden">
    <HeroBackground />

    <div className="relative z-10 w-full max-w-5xl mx-auto px-6 py-16 md:py-20 flex items-center justify-center">
      <HeroContent />
    </div>

    {/* Scroll affordance pinned to the bottom of the hero */}
    <div className="absolute inset-x-0 bottom-0 z-10 flex justify-center">
      <ScrollDown />
    </div>
  </section>
);
