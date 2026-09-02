import React from 'react';
import type { Tone, OutputLine, PortfolioData } from '../types';

/* ── Parsed argument tokens ─────────────────────────────────── */

export type ArgToken =
  | { type: 'value'; index: number; value: string }
  | { type: 'flag'; name: string; value?: string };

/* ── Command context (imperative hooks available to a command) ── */

export interface CommandContext {
  push(text: string, tone?: Tone): void;
  pushBlock(node: React.ReactNode): void;
  /** The unique registered commands (for `help`). */
  commands: Command[];
  /** Build/return a fresh registry map (also used internally). */
  registry: () => Registry;
  pushLine(line: OutputLine): void;
  pushMany(lines: OutputLine[]): void;
  spacer(): void;
  clear(): void;
  /** Reset scrollback to the welcome banner. */
  resetWelcome(): void;
  /** Echo the typed command with its prompt. */
  echo(command: string): void;
  scrollToBottom(): void;
  openLink(url: string): void;
  openResume(): void;
  /** The session command history (oldest first). */
  history: string[];
  data: PortfolioData;
}

/* ── Command result ─────────────────────────────────────────── */

export type CommandResult = void | OutputLine | OutputLine[] | React.ReactNode;

export type CommandCategory = 'general' | 'about' | 'data' | 'web' | 'assistant';

/** Case-insensitive lookup map keyed by command name and aliases. */
export type Registry = Map<string, Command>;

export interface Command {
  name: string;
  aliases?: string[];
  description: string;
  usage?: string;
  category: CommandCategory;
  run(args: ArgToken[], ctx: CommandContext): CommandResult | Promise<CommandResult>;
}
