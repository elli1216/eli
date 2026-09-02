import type { ArgToken } from './commands/types';

/**
 * Tokenize an input string respecting single/double quotes.
 * Returns the raw tokens (quotes stripped).
 */
export function tokenize(input: string): string[] {
  const tokens: string[] = [];
  const re = /"([^"]*)"|'([^']*)'|(\S+)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(input))) {
    tokens.push(m[1] ?? m[2] ?? m[3]);
  }
  return tokens;
}

export interface ParsedInput {
  command: string;
  args: ArgToken[];
}

/**
 * Split a command-line input into a command name and its arguments.
 * `--flag`, `--flag=value` and `--flag value` are flags; the rest are
 * positional values (indexed in order of appearance).
 */
export function parseCommand(input: string): ParsedInput {
  const tokens = tokenize(input);
  if (tokens.length === 0) return { command: '', args: [] };

  const command = tokens[0].toLowerCase();
  const rest = tokens.slice(1);
  const args: ArgToken[] = [];
  let positionalIndex = 0;

  for (let i = 0; i < rest.length; i++) {
    const token = rest[i];

    if (token.startsWith('-') && token !== '-') {
      const isLong = token.startsWith('--');
      const stripped = token.replace(/^-+/, '');

      // --flag=value
      if (isLong && stripped.includes('=')) {
        const eq = stripped.indexOf('=');
        args.push({ type: 'flag', name: stripped.slice(0, eq), value: stripped.slice(eq + 1) });
        continue;
      }

      // --flag value  (consume the next non-flag token as its value)
      let value: string | undefined;
      const next = rest[i + 1];
      if (next !== undefined && !next.startsWith('-')) {
        value = next;
        i++;
      }
      args.push({ type: 'flag', name: stripped, value });
    } else {
      args.push({ type: 'value', index: positionalIndex++, value: token });
    }
  }

  return { command, args };
}
