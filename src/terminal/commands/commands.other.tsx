import type { Command } from './types';
import { getPositionals } from './args';
import { CertificateList, ContactList, Block } from '../components/blocks';

const certificates: Command = {
  name: 'certificates',
  aliases: ['certs', 'badges'],
  description: 'List certifications and credentials.',
  usage: 'certificates',
  category: 'data',
  run(_args, ctx) {
    ctx.pushBlock(<CertificateList items={ctx.data.certificates} />);
  },
};

const contact: Command = {
  name: 'contact',
  aliases: ['reach', 'connect', 'socials'],
  description: 'Show ways to get in touch.',
  category: 'web',
  run(_args, ctx) {
    ctx.pushBlock(<ContactList items={ctx.data.contactItems} />);
  },
};

const resume: Command = {
  name: 'resume',
  aliases: ['cv', 'view-cv'],
  description: 'Download / open the resume (PDF).',
  category: 'web',
  run(_args, ctx) {
    ctx.openResume();
    ctx.push('Opening resume (Floresca-Darl-Resume-2026.pdf)…', 'ok');
  },
};

const echo: Command = {
  name: 'echo',
  description: 'Print the given text back.',
  usage: 'echo <text>',
  category: 'general',
  run(args, ctx) {
    const parts = getPositionals(args);
    const raw = parts.join(' ');
    ctx.push(raw || '(nothing to echo)', 'default');
  },
};

const history: Command = {
  name: 'history',
  aliases: ['hist'],
  description: 'Show the command history of this session.',
  category: 'general',
  run(_args, ctx) {
    const h = ctx.history;
    if (h.length === 0) {
      ctx.push('no commands executed yet.', 'muted');
      return;
    }
    ctx.pushBlock(
      <Block title={`session history — ${h.length} command(s)`}>
        <ol className="space-y-0.5 text-[11px] sm:text-xs">
          {h.map((cmd, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-muted-foreground shrink-0">{String(i + 1).padStart(2, '0')}</span>
              <span className="text-foreground">{cmd}</span>
            </li>
          ))}
        </ol>
      </Block>,
    );
  },
};

const clear: Command = {
  name: 'clear',
  aliases: ['cls', 'clean'],
  description: 'Clear the terminal and show the welcome banner.',
  category: 'general',
  run(_args, ctx) {
    ctx.resetWelcome();
  },
};

const github: Command = {
  name: 'github',
  description: 'Open the GitHub profile.',
  category: 'web',
  run(_args, ctx) {
    ctx.openLink(ctx.data.PERSONAL_DATA.github.link);
    return { kind: 'text' as const, text: 'Opening github →', tone: 'ok' as const };
  },
};

const linkedin: Command = {
  name: 'linkedin',
  aliases: ['in'],
  description: 'Open the LinkedIn profile.',
  category: 'web',
  run(_args, ctx) {
    ctx.openLink(ctx.data.PERSONAL_DATA.linkedid.link);
    return { kind: 'text' as const, text: 'Opening linkedin →', tone: 'ok' as const };
  },
};

const email: Command = {
  name: 'email',
  aliases: ['mail'],
  description: 'Open an email composer to the main address.',
  category: 'web',
  run(_args, ctx) {
    ctx.openLink(`mailto:${ctx.data.PERSONAL_DATA.emails[0]}`);
    return { kind: 'text' as const, text: 'Opening mail composer →', tone: 'ok' as const };
  },
};

export const otherCommands: Command[] = [
  certificates,
  contact,
  resume,
  echo,
  history,
  clear,
  github,
  linkedin,
  email,
];
