export interface NavItem {
  label: string;
  href: string;
}

export interface ExperienceItem {
  id: number;
  role: string;
  company: string;
  period: string;
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
}

export interface SkillItem {
  name: string;
  icon?: React.ReactNode; 
  category: 'frontend' | 'backend' | 'tools';
}