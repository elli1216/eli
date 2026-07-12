import React from 'react';

interface SectionTitleProps {
  children: string;
  className?: string;
  textSize?: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ children, className = '', textSize }) => {
  return (
    <h2 className={`text-3xl md:text-4xl font-bold text-foreground text-center ${className}`}>
      <span className="inline-block text-sm font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full align-middle mr-2">
        {"<"}
      </span>
      <span className={`align-middle text-${textSize}`}>{children}</span>
      <span className="inline-block text-sm font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full align-middle mx-2">
        {"/>"}
      </span>
    </h2>
  );
};
