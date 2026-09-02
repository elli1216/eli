import type { Command, CommandContext, CommandResult, Registry } from './types';
import type { OutputLine } from '../types';
import { parseCommand } from '../parser';

/** Build the lowercase-keyed lookup map (name + aliases). */
export function asMap(commands: Command[]): Registry {
  const map: Registry = new Map();
  for (const cmd of commands) {
    map.set(cmd.name.toLowerCase(), cmd);
    for (const alias of cmd.aliases ?? []) {
      map.set(alias.toLowerCase(), cmd);
    }
  }
  return map;
}

/* Module-level cache so the command list/registry are built once. */

let _cache: Command[] | null = null;
let _map: Registry | null = null;

/** Cache the unique command list (set by buildRegistry). */
export function cacheCommands(commands: Command[]): void {
  _cache = commands;
  _map = asMap(commands);
}

/** Unique command objects (for `help`). */
export function getCommandList(): Command[] {
  return _cache ?? [];
}

/** The built registry map. */
export function getRegistry(): Registry {
  return _map ?? new Map();
}

function isOutputLine(value: unknown): value is OutputLine {
  return (
    typeof value === 'object' &&
    value !== null &&
    'kind' in value &&
    typeof (value as OutputLine).kind === 'string'
  );
}

function applyResult(result: CommandResult, ctx: CommandContext): void {
  if (result == null) return;
  if (Array.isArray(result)) {
    ctx.pushMany(result);
  } else if (isOutputLine(result)) {
    ctx.pushLine(result);
  } else {
    ctx.pushBlock(result as React.ReactNode);
  }
}

/**
 * Execute a raw command line against a registry, echoing it and pushing
 * whatever output the command produces.
 */
export async function runCommand(
  input: string,
  ctx: CommandContext,
  registry: Registry,
): Promise<void> {
  const trimmed = input.trim();
  if (!trimmed) return;

  const { command, args } = parseCommand(trimmed);
  const cmd = registry.get(command);

  if (!cmd) {
    ctx.echo(trimmed);
    ctx.push(
      `command not found: ${command}. Type "help" to see the available commands.`,
      'err',
    );
    return;
  }

  ctx.echo(trimmed);

  try {
    const result = await cmd.run(args, ctx);
    applyResult(result, ctx);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    ctx.push(`error: ${message}`, 'err');
  }
}

/* ── Re-export commonly used helpers ────────────────────────── */

export { getFlag, getPositional, getPositionals, hasFlag } from './args';
export type {
  ArgToken,
  Command,
  CommandContext,
  CommandResult,
  CommandCategory,
  Registry,
} from './types';
export type { OutputLine, Tone, LineSource } from '../types';
