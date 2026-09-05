import React from 'react';
import type { Command } from './types';
import { hasFlag } from './args';
import { Block } from '../components/blocks';
import { BANNER_LINES } from '../data/banner';
import { rule, col, headerRow } from '../lib/format';

const about: Command = {
  name: 'about',
  aliases: ['me', 'info'],
  description: 'Show a compact personal profile.',
  usage: 'about [--verbose]',
  category: 'about',
  run(args, ctx) {
    const { PERSONAL_DATA: d, EDUCATION: e } = ctx.data;
    const verbose = hasFlag(args, 'verbose') || hasFlag(args, 'v');

    ctx.pushBlock(
      <Block title="about.json — compact profile" tone="accent">
        <div className="space-y-1.5">
          <KV k="name" v={d.names[0]} />
          <KV k="based_in" v={d.based_in} />
          <KV k="age" v={d.age} />
          {verbose && <KV k="birthdate" v={d.birthdate} />}
          <KV
            k="education"
            v={`${e.course} @ ${e.university_attended} (${e.date_started} - ${e.date_graduated}, GPA ${e.gpa})`}
          />
          <KV
            k="role"
            v={`${ctx.data.EXPERIENCE_DATA[0].role} @ ${ctx.data.EXPERIENCE_DATA[0].company}`}
          />
          {verbose && (
            <>
              <KV k="emails" v={d.emails.join(', ')} />
              <KV k="github" v={d.github.link} />
              <KV k="linkedin" v={d.linkedid.link} />
              <KV k="interests" v={d.interests.INTERESTS.join(', ')} />
              <KV k="exploring" v={d.interests.EXPLORING.join(', ')} />
            </>
          )}
        </div>
        <p className="mt-3 pt-2 border-t border-border/40 text-[10px] text-muted-foreground leading-relaxed">
          {d.short_introduction}
        </p>
      </Block>
    );
  },
};

const whoami: Command = {
  name: 'whoami',
  description: 'Identify who controls this terminal session.',
  category: 'about',
  run(_args, ctx) {
    const d = ctx.data.PERSONAL_DATA;
    return [
      { kind: 'text' as const, text: `${d.names[0]}`, tone: 'accent' as const },
      {
        kind: 'text' as const,
        text: `${ctx.data.EXPERIENCE_DATA[0].role} @ ${ctx.data.EXPERIENCE_DATA[0].company}`,
      },
      { kind: 'text' as const, text: `${d.based_in}` },
    ];
  },
};

const neofetch: Command = {
  name: 'neofetch',
  description: 'Fancy ASCII system info.',
  category: 'about',
  run(_args, ctx) {
    const d = ctx.data.PERSONAL_DATA;
    const firstRole = ctx.data.EXPERIENCE_DATA[0];
    const badge = (label: string, value: string) => (
      <div>
        <span className="text-primary">{col(label + ':', 16)}</span>
        <span className="text-foreground">{value}</span>
      </div>
    );
    ctx.pushBlock(
      <Block title="neofetch — eli@portfolio" tone="ok">
        <div className="flex flex-col sm:flex-row gap-4">
          <pre className="whitespace-pre text-primary text-xs leading-tight select-none shrink-0">
            {BANNER_LINES.join('\n')}
          </pre>
          <div className="space-y-0.5 text-[11px] sm:text-xs font-mono min-w-0">
            {badge('user', `${d.names[0]}`)}
            {badge('hostname', 'portfolio')}
            {badge('os', 'Human · 23 years')}
            {badge('shell', 'zsh 5.9')}
            {badge('wm', 'React 19 + Tailwind v4')}
            {badge('role', `${firstRole.role}`)}
            {badge('company', firstRole.company)}
            {badge('location', d.based_in)}
            {badge('education', 'BSIT · BulSU')}
            {badge('gpa', '1.71')}
            {badge('projects', `${ctx.data.PROJECT_DATA.length}`)}
            {badge('uptime', 'always learning')}
          </div>
        </div>
      </Block>
    );
  },
};

const KV: React.FC<{ k: string; v: string }> = ({ k, v }) => (
  <div className="flex gap-2">
    <span className="text-muted-foreground shrink-0">{col(k + ':', 14)}</span>
    <span className="text-foreground min-w-0 break-words">{v}</span>
  </div>
);

const help2: Command = {
  name: 'help',
  aliases: ['?', 'man', '--help'],
  description: 'List all available commands.',
  usage: 'help [category | command]',
  category: 'general',
  run(args, ctx) {
    const commands = ctx.commands ?? [];
    const all = [...commands].sort((a, b) => a.name.localeCompare(b.name));
    const target = args[0]?.value?.toLowerCase();

    let rows = all;
    if (target) {
      const filtered = all.filter(
        (c) =>
          c.category === target ||
          c.name.includes(target) ||
          (c.aliases ?? []).some((a) => a.includes(target))
      );
      if (filtered.length) rows = filtered;
      else {
        ctx.push(`No matching command or category for "${target}". Try "help".`, 'err');
        return;
      }
    }

    const widths = [16, 12, 56];
    const out: string[] = [
      headerRow(['COMMAND', 'CATEGORY', 'DESCRIPTION'], widths),
      rule('─', 74),
    ];
    for (const c of rows) {
      const aliases = c.aliases && c.aliases.length ? ` (${c.aliases.join(', ')})` : '';
      out.push(`${col(c.name, 16)}${col(c.category, 12)}${c.description}${aliases}`);
    }
    ctx.pushBlock(
      <pre className="whitespace-pre-wrap text-[11px] sm:text-xs leading-relaxed overflow-x-hidden">
        {out.join('\n')}
      </pre>
    );
    ctx.spacer();
    ctx.push('Use up/down arrows for history and Tab for completion.', 'muted');
  },
};

export const aboutCommands: Command[] = [whoami, about, neofetch];
export const generalCommands: Command[] = [help2];
