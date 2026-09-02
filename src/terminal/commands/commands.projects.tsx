import React from 'react';
import type { Command } from './types';
import { getFlag, getPositional } from './args';
import { ProjectList, ProjectDetail } from '../components/blocks';

const projects: Command = {
  name: 'projects',
  aliases: ['proj', 'portfolio'],
  description: 'List projects, view one in detail, or filter.',
  usage: 'projects [n] [--category cat] [--search q]',
  category: 'data',
  run(args, ctx) {
    const items = ctx.data.PROJECT_DATA;
    const categoryFilter = getFlag(args, 'category') || getFlag(args, 'c');
    const search = getFlag(args, 'search') || getFlag(args, 's');
    const nRaw = getPositional(args, 0);

    if (nRaw !== undefined) {
      const n = Number(nRaw);
      if (!Number.isInteger(n) || n < 1 || n > items.length) {
        ctx.push(`error: index out of range (1-${items.length}).`, 'err');
        return;
      }
      ctx.pushBlock(<ProjectDetail project={items[n - 1]} index={n - 1} />);
      return;
    }

    let filtered = items;
    if (categoryFilter) {
      const needle = categoryFilter.toLowerCase();
      filtered = filtered.filter((p) => (p.category ?? '').toLowerCase().includes(needle));
      if (filtered.length === 0) {
        ctx.push(`No projects match category "${categoryFilter}".`, 'err');
        return;
      }
    }
    if (search) {
      const needle = search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(needle) ||
          p.techStack.some((t) => t.toLowerCase().includes(needle)) ||
          (p.category ?? '').toLowerCase().includes(needle),
      );
      if (filtered.length === 0) {
        ctx.push(`No projects match "${search}".`, 'err');
        return;
      }
    }

    if (categoryFilter || search) {
      ctx.push(
        `Found ${filtered.length} match${filtered.length === 1 ? '' : 'es'}${categoryFilter ? ` (category: ${categoryFilter})` : ''}${search ? ` (search: "${search}")` : ''}.`,
        'ok',
      );
      ctx.spacer();
    }

    ctx.pushBlock(<ProjectList items={filtered} />);
  },
};

export const projectCommands: Command[] = [projects];
