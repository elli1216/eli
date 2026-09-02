import React from 'react';
import { Block } from './Block';

interface Props {
  items: { src: string; issuer: string; alt: string; href: string }[];
}

/** Certificate table with clickable verification links. */
export const CertificateList: React.FC<Props> = ({ items }) => (
  <Block title="credentials.db — SELECT alt,issuer,href">
    <ol className="space-y-1.5">
      {items.map((cert, i) => (
        <li key={cert.alt} className="flex items-start gap-2 text-[11px] sm:text-xs">
          <span className="text-emerald-500 shrink-0">{String(i + 1).padStart(2, '0')}</span>
          <a
            href={cert.href}
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-target group flex-1 min-w-0"
          >
            <span className="text-foreground group-hover:text-primary transition-colors">
              {cert.alt}
            </span>
            <span className="text-muted-foreground"> — {cert.issuer}</span>
          </a>
        </li>
      ))}
    </ol>
    <p className="mt-3 pt-2 border-t border-border/40 text-[10px] text-muted-foreground">
      click any entry to verify · <span className="text-primary">cat certificates</span> for raw
    </p>
  </Block>
);

export default CertificateList;
