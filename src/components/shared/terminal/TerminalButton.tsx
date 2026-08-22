import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

export interface TerminalButtonProps {
  command: React.ReactNode;
  onClick?: () => void;
  href?: string;
  target?: string;
  rel?: string;
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  active?: boolean;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const TerminalButton: React.FC<TerminalButtonProps> = ({
  command,
  onClick,
  href,
  target,
  rel,
  icon: Icon,
  iconPosition = 'right',
  active = false,
  variant = 'secondary',
  size = 'md',
  className = '',
}) => {
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2 text-xs sm:text-sm gap-2',
    lg: 'px-6 py-2.5 text-sm sm:text-base gap-2.5',
  };

  const variantStyles = {
    primary: 'bg-primary text-primary-foreground font-semibold hover:bg-primary/90 border border-primary/20 shadow-xs',
    secondary: 'bg-card/80 text-foreground font-medium hover:bg-muted border border-border/70 hover:border-primary/40 shadow-xs',
    outline: 'bg-transparent text-foreground font-medium hover:bg-primary/10 border border-border/60 hover:border-primary/50',
    ghost: 'bg-transparent text-muted-foreground hover:text-primary hover:bg-accent/10 border-transparent',
  };

  const activeStyles = active
    ? 'border-primary bg-primary/15 text-primary font-semibold shadow-xs ring-1 ring-primary/40'
    : '';

  const content = (
    <>
      {Icon && iconPosition === 'left' && <Icon size={size === 'sm' ? 13 : 16} className="shrink-0" />}
      <span className="font-mono tracking-tight">{command}</span>
      {Icon && iconPosition === 'right' && <Icon size={size === 'sm' ? 13 : 16} className="shrink-0 transition-transform group-hover:translate-x-0.5" />}
    </>
  );

  const baseClasses = `cursor-target group inline-flex items-center justify-center rounded-lg transition-all select-none cursor-pointer ${sizeStyles[size]} ${variantStyles[variant]} ${activeStyles} ${className}`;

  if (href) {
    return (
      <motion.a
        href={href}
        target={target}
        rel={rel}
        className={baseClasses}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      type="button"
      onClick={onClick}
      className={baseClasses}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {content}
    </motion.button>
  );
};

export default TerminalButton;
