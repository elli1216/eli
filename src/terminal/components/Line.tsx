import React, { memo } from 'react';
import type { OutputLine, Tone } from '../types';
import { OutputBlock } from './OutputBlock';
import { BANNER_LINES } from '../data/banner';

const TONE_CLASSES: Record<Tone, string> = {
  default: 'text-foreground',
  muted: 'text-muted-foreground',
  accent: 'text-primary',
  err: 'text-rose-500',
  ok: 'text-emerald-500',
};

const LineInner: React.FC<{ line: OutputLine }> = ({ line }) => {
  switch (line.kind) {
    case 'ascii':
      return (
        <pre className="whitespace-pre text-primary text-[10px] sm:text-xs leading-tight select-none">
          {BANNER_LINES.join('\n')}
        </pre>
      );
    case 'spacer':
      return <div className="h-2" />;
    case 'cmd':
      return (
        <div className="flex items-baseline gap-1.5 font-mono">
          <span className="text-primary font-bold shrink-0">eli@portfolio:~$</span>
          <span className="text-foreground break-words">{line.command}</span>
        </div>
      );
    case 'block':
      return <OutputBlock id={line.id}>{line.node}</OutputBlock>;
    case 'text':
    default:
      return (
        <div
          className={`whitespace-pre-wrap break-words font-mono leading-relaxed ${TONE_CLASSES[line.tone ?? 'default']}`}
        >
          {line.text}
        </div>
      );
  }
};

/** Render a single scrollback line. Memoized so keystrokes don't re-render history. */
export const Line = memo(LineInner);

export default Line;
