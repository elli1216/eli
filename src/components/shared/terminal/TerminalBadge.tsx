import React from 'react';
import { LucideIcon } from 'lucide-react';

export interface TerminalBadgeProps {
  label: React.ReactNode;
  variant?: 'success' | 'warning' | 'error' | 'info' | 'accent' | 'neutral';
  icon?: LucideIcon;
  pulse?: boolean;
  className?: string;
}

export const TerminalBadge: React.FC<TerminalBadgeProps> = ({
  label,
  variant = 'neutral',
  icon: Icon,
  pulse = false,
  className = '',
}) => {
  const variantStyles = {
    success: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
    warning: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
    error: 'bg-rose-500/10 text-rose-500 border-rose-500/20',
    info: 'bg-sky-500/10 text-sky-500 border-sky-500/20',
    accent: 'bg-primary/10 text-primary border-primary/25',
    neutral: 'bg-muted/60 text-muted-foreground border-border/60',
  };

  const dotColors = {
    success: 'bg-emerald-500',
    warning: 'bg-amber-500',
    error: 'bg-rose-500',
    info: 'bg-sky-500',
    accent: 'bg-primary',
    neutral: 'bg-muted-foreground',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md font-mono text-[11px] font-semibold border ${variantStyles[variant]} ${className}`}
    >
      {pulse && (
        <span className={`size-1.5 rounded-full ${dotColors[variant]} animate-pulse`} />
      )}
      {Icon && <Icon size={12} className="shrink-0" />}
      <span>{label}</span>
    </span>
  );
};

export default TerminalBadge;
