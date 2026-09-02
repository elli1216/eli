import React from 'react';
import type { Command } from './types';
import { getPositional } from './args';
import { Block, ExperienceList } from '../components/blocks';

const experience: Command = {
  name: 'experience',
  aliases: ['exp', 'career'],
  description: 'List work experience, or view one entry in detail.',
  usage: 'experience [n]',
  category: 'data',
  run(args, ctx) {
    const items = ctx.data.EXPERIENCE_DATA;
    const nRaw = getPositional(args, 0);

    if (nRaw !== undefined) {
      const n = Number(nRaw);
      if (!Number.isInteger(n) || n < 1 || n > items.length) {
        ctx.push(`error: index out of range (1-${items.length}).`, 'err');
        return;
      }
      const entry = items[n - 1];
      ctx.pushBlock(
        <Block title={`experience.db — record ${n}`} tone="accent">
          <div className="space-y-2">
            <div className="text-sm sm:text-base font-bold text-foreground">
              {entry.role}
            </div>
            <div className="text-xs text-muted-foreground flex flex-wrap gap-x-3 gap-y-0.5">
              <span>
                at <span className="text-primary">{entry.company}</span>
              </span>
              <span className="text-border">┆</span>
              <span>{entry.period}</span>
              <span className="text-border">┆</span>
              <span>{entry.location}</span>
            </div>
            <ul className="space-y-1.5 pt-1">
              {entry.description.map((d, i) => (
                <li key={i} className="flex items-start gap-1.5 text-[11px] sm:text-xs text-foreground/90">
                  <span className="text-primary shrink-0">❯</span>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
            {entry.certificate && (
              <a
                href={entry.certificate}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-1 text-[11px] text-primary underline underline-offset-2 hover:text-primary/80"
              >
                📄 view certificate
              </a>
            )}
          </div>
        </Block>,
      );
      return;
    }

    ctx.pushBlock(<ExperienceList items={items} />);
  },
};

export const experienceCommands: Command[] = [experience];
