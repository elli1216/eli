import React from 'react';
import {
  NAMES,
  PERSONAL_DATA,
  EDUCATION,
  EXPERIENCE_DATA,
  PROJECT_DATA,
  SKILL_DATA,
  certificates,
  contactItems,
  INTERESTS,
  EXPLORING,
  category,
} from '@/constants/constants';

/* ── Output data model ──────────────────────────────────────── */

export type Tone = 'default' | 'muted' | 'accent' | 'err' | 'ok';
export type LineSource = 'system' | 'user' | 'assistant';

export interface TextLine {
  kind: 'text';
  text: string;
  tone?: Tone;
  source?: LineSource;
}
export interface CmdLine {
  kind: 'cmd';
  command: string;
}
export interface SpacerLine {
  kind: 'spacer';
}
export interface AsciiLine {
  kind: 'ascii';
}
export interface BlockLine {
  kind: 'block';
  id: number;
  node: React.ReactNode;
  source?: LineSource;
}

export type OutputLine = TextLine | CmdLine | SpacerLine | AsciiLine | BlockLine;

/* ── Data bundle passed into every command ──────────────────── */

export interface PortfolioData {
  NAMES: string[];
  PERSONAL_DATA: typeof PERSONAL_DATA;
  EDUCATION: typeof EDUCATION;
  EXPERIENCE_DATA: typeof EXPERIENCE_DATA;
  PROJECT_DATA: typeof PROJECT_DATA;
  SKILL_DATA: typeof SKILL_DATA;
  certificates: typeof certificates;
  contactItems: typeof contactItems;
  INTERESTS: readonly string[];
  EXPLORING: readonly string[];
  category: typeof category;
}
