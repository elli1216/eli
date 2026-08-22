import React from 'react';
import { Terminal } from 'lucide-react';
import { useAccent } from '@/contexts/AccentContext';
import { DecorativeFrame } from '@/components/shared/DecorativeFrame';

export interface TerminalWindowProps {
  title?: string;
  command?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  headerClassName?: string;
  bodyClassName?: string;
  showControls?: boolean;
}

export const TerminalWindow: React.FC<TerminalWindowProps> = ({
  title = 'terminal',
  command,
  actions,
  children,
  className = '',
  headerClassName = '',
  bodyClassName = '',
  showControls = true,
}) => {
  const { currentAccent } = useAccent();

  return (
    <DecorativeFrame accentColor={currentAccent} className={`w-full ${className}`}>
      <div className="bg-card/95 backdrop-blur-xl rounded-xl overflow-hidden border border-border/80 flex flex-col h-full shadow-lg">
        {/* Terminal Window Header */}
        <div
          className={`flex items-center justify-between px-4 py-2.5 bg-muted/40 border-b border-border/60 select-none ${headerClassName}`}
        >
          {/* Window Traffic Lights */}
          <div className="flex items-center gap-2">
            {showControls ? (
              <>
                <span className="size-2.5 sm:size-3 rounded-full bg-rose-500/80 inline-block" />
                <span className="size-2.5 sm:size-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="size-2.5 sm:size-3 rounded-full bg-emerald-500/80 inline-block" />
              </>
            ) : (
              <Terminal size={14} className="text-primary" />
            )}
          </div>

          {/* Window Title Tab */}
          <div className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground truncate max-w-[200px] sm:max-w-xs">
            <Terminal size={12} className="text-primary shrink-0" />
            <span className="truncate">{title}</span>
          </div>

          {/* Action Slot */}
          <div className="flex items-center gap-1 min-w-8 justify-end">
            {actions}
          </div>
        </div>

        {/* Optional Embedded Command Prompt */}
        {command && (
          <div className="px-4 py-2 bg-muted/20 border-b border-border/40 font-mono text-xs text-foreground flex items-center gap-1.5 select-text">
            <span className="text-primary font-bold">eli@portfolio</span>
            <span className="text-muted-foreground">:</span>
            <span className="text-primary/70">~</span>
            <span className="text-muted-foreground">$</span>
            <span className="font-semibold">{command}</span>
          </div>
        )}

        {/* Terminal Window Body */}
        <div className={`p-4 sm:p-6 flex-1 ${bodyClassName}`}>
          {children}
        </div>
      </div>
    </DecorativeFrame>
  );
};

export default TerminalWindow;
