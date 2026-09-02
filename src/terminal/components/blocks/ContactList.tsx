import React from 'react';
import { Block } from './Block';

interface Props {
  items: { label: string; value: string; href: string }[];
}

/** Contact channels as a clickable table. */
export const ContactList: React.FC<Props> = ({ items }) => (
  <Block title="contact.db — channels" tone="accent">
    <div className="grid gap-2">
      {items.map((item) => (
        <a
          key={item.label}
          href={item.href}
          target={item.href.startsWith('mailto:') ? undefined : '_blank'}
          rel="noopener noreferrer"
          className="cursor-target group flex items-center gap-3 px-3 py-2 rounded-lg bg-muted/30 border border-border/40 hover:border-primary/50 hover:bg-primary/5 transition-all"
        >
          <span className="text-[10px] uppercase font-bold text-primary w-20 shrink-0">
            {item.label}
          </span>
          <span className="text-foreground group-hover:text-primary transition-colors truncate">
            {item.value}
          </span>
          <span className="text-muted-foreground ml-auto text-[10px] shrink-0 group-hover:text-primary">
            open →
          </span>
        </a>
      ))}
    </div>
  </Block>
);

export default ContactList;
