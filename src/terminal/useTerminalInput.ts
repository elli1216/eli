import { useCallback, useMemo, useRef, useState } from 'react';
import type { Registry, Command } from './commands/types';
import { tokenize } from './parser';

const isKnownCommand = (registry: Registry, token: string): boolean => registry.has(token.toLowerCase());

interface Options {
  registry: () => Registry;
  /** Lazily read the command list (populated once the registry is built). */
  commands: () => Command[];
  onSubmit(input: string): void;
  onHint?(text: string): void;
}

export interface TerminalInputApi {
  value: string;
  setValue(v: string): void;
  onKeyDown(e: React.KeyboardEvent<HTMLInputElement>): void;
  submit(): void;
  /** Add a command to the arrow-key history without executing it here. */
  addHistory(cmd: string): void;
  /** Live autocomplete candidates for the current draft input. */
  suggestions: string[];
}

/**
 * Manages the editable input line: history navigation (up/down arrows) and
 * Tab completion against the command registry.
 */
export function useTerminalInput({ registry, commands, onSubmit, onHint }: Options): TerminalInputApi {
  const [value, setValue] = useState('');
  const [cursor, setCursor] = useState(-1);
  const history = useRef<string[]>([]);
  const completionIndex = useRef(-1);

  const submit = useCallback(() => {
    const v = value.trim();
    if (!v) return;
    onSubmit(v);
    history.current = [...history.current, v];
    setValue('');
    setCursor(-1);
    completionIndex.current = -1;
  }, [value, onSubmit]);

  const addHistory = useCallback((cmd: string) => {
    const v = cmd.trim();
    if (!v) return;
    history.current = [...history.current, v];
  }, []);

  // Live autocomplete: match command names + aliases against the current
  // single-token draft. Hidden once it resolves to an exact known command.
  const suggestions = useMemo(() => {
    const trimmed = value.trim();
    if (!trimmed || /\s/.test(trimmed)) return [];
    const lower = trimmed.toLowerCase();
    const names = new Set<string>();
    for (const c of commands()) {
      if (c.name.toLowerCase().startsWith(lower)) names.add(c.name);
      for (const a of c.aliases ?? []) {
        if (a.toLowerCase().startsWith(lower)) names.add(a);
      }
    }
    if (names.size === 0 || registry().has(lower)) return [];
    return [...names].sort();
  }, [value, commands, registry]);

  const completeToken = useCallback(
    (token: string) => {
      const lower = token.toLowerCase();
      const matches = commands().filter(
        (c) => c.name.toLowerCase().startsWith(lower) || (c.aliases ?? []).some((a) => a.toLowerCase().startsWith(lower)),
      );
      const names = new Set<string>();
      for (const m of matches) {
        names.add(m.name);
        for (const a of m.aliases ?? []) names.add(a);
      }
      const candidates = [...names].filter((n) => n.toLowerCase().startsWith(lower)).sort();
      return candidates;
    },
    [commands],
  );

  const onTab = useCallback(() => {
    const tokens = tokenize(value);
    if (tokens.length === 0) return;

    // Only complete the command token (first) when there's no whitespace.
    const isSingle = !/\s/.test(value.trim());
    const token = tokens[0];

    if (isSingle && !isKnownCommand(registry(), token)) {
      const candidates = completeToken(token);
      if (candidates.length === 1) {
        setValue(candidates[0]);
        completionIndex.current = -1;
        return;
      }
      if (candidates.length > 1) {
        // Common prefix across candidates.
        let prefix = candidates[0];
        for (const c of candidates) {
          while (!c.startsWith(prefix)) prefix = prefix.slice(0, -1);
        }
        if (prefix.length > token.length) {
          setValue(prefix);
          return;
        }
        // Cycle through candidates on repeated Tab.
        const next = (completionIndex.current + 1) % candidates.length;
        completionIndex.current = next;
        setValue(candidates[next]);
        onHint?.(`${candidates.length} matches: ${candidates.join('  ')}`);
        return;
      }
    }
  }, [value, completeToken, registry, onHint]);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        submit();
        return;
      }
      if (e.key === 'Tab') {
        e.preventDefault();
        onTab();
        return;
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        const h = history.current;
        if (h.length === 0) return;
        const next = cursor === -1 ? h.length - 1 : Math.max(0, cursor - 1);
        setCursor(next);
        setValue(h[next]);
        return;
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const h = history.current;
        if (h.length === 0 || cursor === -1) return;
        const next = cursor + 1;
        if (next >= h.length) {
          setCursor(-1);
          setValue('');
        } else {
          setCursor(next);
          setValue(h[next]);
        }
        return;
      }
      // Any other keystroke resets tab-cycle.
      completionIndex.current = -1;
    },
    [cursor, submit, onTab],
  );

  return { value, setValue, onKeyDown, submit, addHistory, suggestions };
}
