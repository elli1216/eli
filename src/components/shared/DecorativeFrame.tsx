import React from 'react';

interface DecorativeFrameProps {
  children: React.ReactNode;
  accentColor: string;
  className?: string;
}

export const DecorativeFrame: React.FC<DecorativeFrameProps> = ({
  children,
  accentColor,
  className = '',
}) => {
  return (
    <div className={`relative cursor-target w-full max-w-full min-w-0 ${className}`}>
      <div
        className="absolute inset-0 rounded-xl border border-primary/20 pointer-events-none"
        style={{
          boxShadow: `0px 0px 40px 0px ${accentColor}15, inset 0px 0px 20px 0px ${accentColor}08`,
        }}
      />
      <div className="absolute inset-1 rounded-xl border border-primary/10 pointer-events-none" />
      <div
        className="absolute inset-1 rounded-xl border border-primary/15 pointer-events-none"
        style={{ boxShadow: `0px 0px 15px 0px ${accentColor}30` }}
      />
      <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-primary/60 rounded-tl pointer-events-none" />
      <div className="absolute top-0 right-0 w-3 h-3 border-r-2 border-t-2 border-primary/60 rounded-tr pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-l-2 border-b-2 border-primary/60 rounded-bl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-primary/60 rounded-br pointer-events-none" />
      <div className="relative z-10 w-full min-w-0 max-w-full">{children}</div>
    </div>
  );
};
