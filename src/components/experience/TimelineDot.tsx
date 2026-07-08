import React from 'react';

interface TimelineDotProps {
  className?: string;
}

export const TimelineDot: React.FC<TimelineDotProps> = ({ className = '' }) => (
  <div className={`absolute size-5 rounded-full bg-background border-2 border-primary flex items-center justify-center ${className}`}>
    <div className="size-2.5 rounded-full bg-primary" />
  </div>
);
