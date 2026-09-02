import { data } from '../commands/data';

/** Stacked-column ASCII "ELI" banner (accent colored when rendered). */
export const BANNER_LINES: string[] = [
  '  ███████╗██╗     ██╗',
  '  ██╔════╝██║     ██║',
  '  █████╗  ██║     ██║',
  '  ██╔══╝  ██║     ██║',
  '  ███████╗███████╗██║',
  '  ╚══════╝╚══════╝╚═╝',
];

/** Intro lines printed beneath the banner on startup (and after clear). */
export function buildWelcomeIntro(): string[] {
  const d = data.PERSONAL_DATA;
  const firstRole = data.EXPERIENCE_DATA[0];
  return [
    `Welcome to ${data.NAMES[0]}'s interactive portfolio.`,
    `${firstRole.role} @ ${firstRole.company} — ${d.based_in}`,
    '',
    'This is a live terminal — explore by typing commands.',
    'Type "ls" to browse my files, "help" to list commands, or "whoami" to begin.',
  ];
}
