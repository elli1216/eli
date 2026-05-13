import { category } from "./constants";

export interface AccentColor {
  name: string;
  value: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface ExperienceItem {
  id: number;
  role: string;
  company: string;
  companyUrl?: string;
  period: string;
  location: string;
  description: string;
}

export interface ProjectItem {
  id: number;
  title: string;
  description: string;
  techStack: string[];
  image: string;
  repoLink?: string;
  demoLink?: string;
  category?: typeof category[keyof typeof category];
}

export interface SkillItem {
  name: string;
  icon?: string; 
  category: 'frontend' | 'backend' | 'tools';
}