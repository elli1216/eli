import React from 'react';
import { ProjectItem } from '@/types/types';
import { cn } from '@/lib/utils';

interface ProjectMetricsProps {
  project: ProjectItem;
  className?: string;
  gridClassName?: string;
  itemClassName?: string;
  showTitle?: boolean;
}

export const ProjectMetrics: React.FC<ProjectMetricsProps> = ({ 
  project, 
  className,
  gridClassName,
  itemClassName,
  showTitle = false 
}) => {
  const hasMetrics = project.metrics && project.metrics.length > 0;
  
  if (!project.placement && !hasMetrics) return null;

  return (
    <div className={className}>
      {showTitle && (
        <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">
          Key Results & Achievements
        </h4>
      )}
      <div className={cn(
        "grid gap-2.5 sm:gap-3", 
        hasMetrics ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-1 sm:grid-cols-2",
        gridClassName
      )}>
        {project.placement && (
          <div className={cn("rounded-lg border border-border/50 bg-background/50 px-2 py-3 text-center flex flex-col justify-center", itemClassName)}>
            <p className="text-lg sm:text-xl font-extrabold text-primary leading-tight">
              {project.placement}
            </p>
            <p className="text-[9px] sm:text-[10px] uppercase tracking-wider text-muted-foreground mt-1 leading-snug">
              {project.placementOutOf ? `Out of ${project.placementOutOf}` : 'Placement'}
            </p>
          </div>
        )}
        {project.metrics?.map((metric) => (
          <div
            key={metric.label}
            className={cn("rounded-lg border border-border/50 bg-background/50 px-2 py-3 text-center flex flex-col justify-center", itemClassName)}
          >
            <p className="text-lg sm:text-xl font-extrabold text-primary leading-tight">
              {metric.value}
            </p>
            <p className="text-[9px] sm:text-[10px] uppercase tracking-wider text-muted-foreground mt-1 leading-snug">
              {metric.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
