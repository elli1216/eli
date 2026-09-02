import React from 'react';
import type { ProjectItem } from '@/types/types';
import { Block } from './Block';

interface Props {
  items: ProjectItem[];
}

/** Compact, scroll-safe list of projects (index, title, category, placement). */
export const ProjectList: React.FC<Props> = ({ items }) => (
  <Block title="projects.db — SELECT index,title,category,placement">
    <div className="space-y-2.5">
      {items.map((project, i) => (
        <div key={project.title} className="space-y-0.5">
          <div className="flex items-baseline gap-2">
            <span className="text-primary font-bold shrink-0">[{i + 1}]</span>
            <span className="text-foreground font-semibold">{project.title}</span>
          </div>
          <div className="text-muted-foreground pl-6 flex flex-wrap gap-x-3 gap-y-0.5 text-[11px] sm:text-xs">
            {project.category && (
              <>
                <span>--{project.category}</span>
                <span className="text-border">┆</span>
              </>
            )}
            {project.position && <span>{project.position}</span>}
            {project.placement && (
              <>
                <span className="text-border">┆</span>
                <span className="text-emerald-500">{project.placement}</span>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
    <p className="mt-3 pt-2 border-t border-border/40 text-[10px] text-muted-foreground">
      run <span className="text-primary">projects {'<n>'}</span> for full details ·{' '}
      <span className="text-primary">projects --category {'<cat>'}</span> to filter
    </p>
  </Block>
);

export default ProjectList;
