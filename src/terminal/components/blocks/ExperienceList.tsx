import React from 'react';
import type { ExperienceItem } from '@/types/types';
import { Block } from './Block';

interface Props {
  items: ExperienceItem[];
}

/** Compact list of all experience entries (index, company, role, period). */
export const ExperienceList: React.FC<Props> = ({ items }) => (
  <Block title="experience.db — SELECT * ORDER BY period DESC">
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={item.company + item.period} className="space-y-0.5">
          <div className="flex items-baseline gap-2">
            <span className="text-primary font-bold shrink-0">[{i + 1}]</span>
            <span className="text-foreground font-semibold">{item.role}</span>
          </div>
          <div className="text-muted-foreground pl-6 flex flex-wrap gap-x-3 gap-y-0.5 text-[11px] sm:text-xs">
            <span>
              at <span className="text-primary">{item.company}</span>
            </span>
            <span className="text-border">┆</span>
            <span>{item.period}</span>
            <span className="text-border">┆</span>
            <span>{item.location}</span>
          </div>
        </div>
      ))}
    </div>
    <p className="mt-3 pt-2 border-t border-border/40 text-[10px] text-muted-foreground">
      run <span className="text-primary">experience {"<n>"}</span> for full details
    </p>
  </Block>
);

export default ExperienceList;
