import React from 'react';
import { cn } from '@/lib/utils';

interface TechStackProps {
  technologies: string[];
  limit?: number;
  className?: string;
  itemClassName?: string;
  moreClassName?: string;
}

export const TechStack: React.FC<TechStackProps> = ({
  technologies,
  limit,
  className,
  itemClassName,
  moreClassName
}) => {
  if (!technologies || technologies.length === 0) return null;

  const visibleTech = limit ? technologies.slice(0, limit) : technologies;
  const remainingCount = limit ? technologies.length - limit : 0;

  return (
    <div className={cn("flex flex-wrap gap-1.5", className)}>
      {visibleTech.map((tech) => (
        <span
          key={tech}
          className={cn(
            "px-2 py-1 text-[10px] font-medium rounded-md border",
            "bg-secondary text-secondary-foreground border-border/50",
            itemClassName
          )}
        >
          {tech}
        </span>
      ))}
      {remainingCount > 0 && (
        <span className={cn(
          "px-2 py-1 text-[10px] font-medium rounded-md border",
          "bg-transparent text-muted-foreground border-transparent",
          moreClassName
        )}>
          +{remainingCount} more
        </span>
      )}
    </div>
  );
};
