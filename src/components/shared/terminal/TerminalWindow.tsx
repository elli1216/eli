import React from 'react';
import { Terminal } from 'lucide-react';
import { useAccent } from '@/contexts/AccentContext';
import { DecorativeFrame } from '@/components/shared/DecorativeFrame';
import { useDraggableScroll } from './useDraggableScroll';

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
  const commandScrollRef = useDraggableScroll<HTMLDivElement>();

  return (
    <DecorativeFrame accentColor={currentAccent} className={`w-full max-w-full min-w-0 ${className}`}>
      <div className="bg-card/95 backdrop-blur-xl rounded-xl overflow-hidden border border-border/80 flex flex-col h-full shadow-lg w-full max-w-full min-w-0">
        {/* Terminal Window Header */}
        <div
          className={`flex items-center justify-between px-3 sm:px-4 py-2.5 bg-muted/40 border-b border-border/60 select-none min-w-0 max-w-full overflow-hidden ${headerClassName}`}
        >
          {/* Window Traffic Lights */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {showControls ? (
              <>
                <span className="size-2.5 sm:size-3 rounded-full bg-rose-500/80 inline-block shrink-0" />
                <span className="size-2.5 sm:size-3 rounded-full bg-amber-500/80 inline-block shrink-0" />
                <span className="size-2.5 sm:size-3 rounded-full bg-emerald-500/80 inline-block shrink-0" />
              </>
            ) : (
              <Terminal size={14} className="text-primary shrink-0" />
            )}
          </div>

          {/* Window Title Tab */}
          <div className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground min-w-0 flex-1 truncate px-2 justify-center sm:justify-start">
            <Terminal size={12} className="text-primary shrink-0" />
            <span className="truncate">{title}</span>
          </div>

          {/* Action Slot */}
          <div className="flex items-center gap-1 shrink-0 justify-end min-w-4">{actions}</div>
        </div>

        {/* Optional Embedded Command Prompt: Draggable */}
        {command && (
          <div
            ref={commandScrollRef}
            className="px-3 sm:px-4 py-2 bg-muted/20 border-b border-border/40 font-mono text-xs text-foreground flex items-center gap-1.5 overflow-x-auto whitespace-nowrap no-scrollbar select-none w-full max-w-full min-w-0"
          >
            <span className="text-primary font-bold shrink-0 pointer-events-none">
              eli@portfolio
            </span>
            <span className="text-muted-foreground shrink-0 pointer-events-none">:</span>
            <span className="text-primary/70 shrink-0 pointer-events-none">~</span>
            <span className="text-muted-foreground shrink-0 pointer-events-none">$</span>
            <span className="font-semibold whitespace-nowrap shrink-0 pointer-events-none">
              {command}
            </span>
          </div>
        )}

        {/* Terminal Window Body */}
        <div className={`p-3.5 sm:p-6 flex-1 min-w-0 max-w-full overflow-hidden ${bodyClassName}`}>{children}</div>
      </div>
    </DecorativeFrame>
  );
};

export default TerminalWindow;
