import React from 'react';

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
  // showCopy = true,
  className = '',
}) => {
  return (
    <div
      className={`group/prompt inline-flex flex-wrap items-center justify-between gap-1.5 sm:gap-2 px-2.5 py-1.5 sm:px-3.5 sm:py-2 bg-muted/40 backdrop-blur-sm rounded-lg border border-border/60 font-mono text-[11px] sm:text-xs select-none transition-colors hover:border-primary/40 max-w-full overflow-hidden ${className}`}
    >
      {/* Command Prompt String */}
      <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap font-medium min-w-0">
        <span className="text-primary font-bold">
          {user}@{host}
        </span>
        <span className="text-muted-foreground">:</span>
        <span className="text-foreground/80">{path}</span>
        <span className="text-muted-foreground">$</span>
        <span className="text-foreground font-semibold tracking-tight break-all">{command}</span>
      </div>

      {/* Telemetry & Copy Action */}
      <div className="flex items-center gap-1.5 sm:gap-2 ml-auto shrink-0">
        {statusCode && (
          <span className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] px-1.5 py-0.5 sm:px-2 rounded-full bg-emerald-500/10 text-emerald-500 font-semibold border border-emerald-500/20">
            <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>{statusCode}</span>
            {executionTime && (
              <span className="opacity-70 hidden xs:inline">({executionTime})</span>
            )}
          </span>
        )}
      </div>
    </div>
  );
};

export default TerminalPrompt;
