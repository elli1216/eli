import React, { forwardRef } from 'react';
import { useAccent } from '@/contexts/AccentContext';
import type { TerminalInputApi } from './useTerminalInput';

interface Props {
  api: TerminalInputApi;
}

/**
 * The input row: terminal prompt, editable command, and a blinking caret.
 * Uses a native input so the mobile soft keyboard opens on tap.
 */
export const TerminalInput = forwardRef<HTMLInputElement, Props>(({ api }, ref) => {
  const { currentAccent } = useAccent();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        api.submit();
      }}
      className="px-3 sm:px-4 py-3 border-t border-border/70 bg-muted/20 flex items-center gap-2 shrink-0"
    >
      <span className="text-primary font-bold text-xs sm:text-sm shrink-0 font-mono select-none">
        eli@portfolio:~$
      </span>
      <input
        ref={ref}
        type="text"
        value={api.value}
        onChange={(e) => api.setValue(e.target.value)}
        onKeyDown={api.onKeyDown}
        aria-label="Type a command"
        aria-autocomplete="list"
        autoComplete="off"
        autoCapitalize="off"
        autoCorrect="off"
        spellCheck={false}
        placeholder="type a command — try 'help'"
        className="flex-1 min-w-0 bg-transparent text-foreground text-xs sm:text-sm font-mono placeholder:text-muted-foreground/50 focus:outline-none caret-transparent"
        style={{ caretColor: currentAccent }}
      />
      <button
        type="submit"
        tabIndex={-1}
        aria-hidden
        className="hidden"
      />
    </form>
  );
});

TerminalInput.displayName = 'TerminalInput';
export default TerminalInput;
