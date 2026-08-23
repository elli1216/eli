import React from 'react';
import { useDraggableScroll } from './useDraggableScroll';

export interface TerminalPromptProps {
  command: string;
  path?: string;
  user?: string;
  host?: string;
  executionTime?: string;
  statusCode?: string;
  showCopy?: boolean;
  className?: string;
}

export const TerminalPrompt: React.FC<TerminalPromptProps> = ({
  command,
  path = '~',
  user = 'eli',
  host = 'portfolio',
  executionTime = '8ms',
  statusCode = '200 OK',
  className = '',
}) => {
  const scrollRef = useDraggableScroll<HTMLDivElement>();

  return (
    <div
      className={`group/prompt inline-flex items-center justify-between gap-2 px-2.5 py-1.5 sm:px-3.5 sm:py-2 bg-muted/40 backdrop-blur-sm rounded-lg border border-border/60 font-mono text-[11px] sm:text-xs select-none transition-colors hover:border-primary/40 max-w-full overflow-hidden ${className}`}
    >
      {/* Command Prompt String: Draggable on desktop & touch-scrollable on mobile */}
      <div
        ref={scrollRef}
        className="flex items-center gap-1 sm:gap-1.5 font-medium whitespace-nowrap overflow-x-auto no-scrollbar flex-1 min-w-0 py-0.5 select-none"
      >
        <span className="text-primary font-bold shrink-0 pointer-events-none">
          {user}@{host}
        </span>
        <span className="text-muted-foreground shrink-0 pointer-events-none">:</span>
        <span className="text-foreground/80 shrink-0 pointer-events-none">{path}</span>
        <span className="text-muted-foreground shrink-0 pointer-events-none">$</span>
        <span className="text-foreground font-semibold tracking-tight whitespace-nowrap shrink-0 pointer-events-none">
          {command}
        </span>
      </div>

      {/* Telemetry Badge */}
      {statusCode && (
        <div className="flex items-center gap-1.5 ml-1.5 shrink-0 pointer-events-none">
          <span className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] px-1.5 py-0.5 sm:px-2 rounded-full bg-emerald-500/10 text-emerald-500 font-semibold border border-emerald-500/20 whitespace-nowrap shrink-0">
            <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>{statusCode}</span>
            {executionTime && (
              <span className="opacity-70 hidden xs:inline">({executionTime})</span>
            )}
          </span>
        </div>
      )}
    </div>
  );
};

export default TerminalPrompt;
