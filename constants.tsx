import { ExperienceItem, ProjectItem, SkillItem } from './types';

export const NAV_ITEMS = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: 1,
    role: "Programmer Intern",
    company: "Landbank of the Philippines",
    period: "2024 - Present",
    description: "Immersed in a professional corporate banking environment, focusing on software development workflows, secure coding practices, and maintaining disciplined agile methodologies. Collaborated with senior developers to optimize internal tools."
  },
  {
    id: 2,
    role: "BSIT Senior Student",
    company: "Bulacan State University",
    period: "2020 - 2024",
    description: "Specializing in Web Development. Dean's Lister. Led multiple academic capstone projects focusing on full-stack web applications."
  }
];

export const PROJECT_DATA: ProjectItem[] = [
  {
    id: 1,
    title: "STC Performing Arts Center",
    description: "A comprehensive web platform designed to manage events, ticket reservations, and artist portfolios for the Arts Center. Features real-time scheduling and a content management system.",
    techStack: ["Next.js", "Supabase", "TypeScript", "Tailwind"],
    image: "https://picsum.photos/seed/stc/800/600",
    repoLink: "#",
    demoLink: "#"
  },
  {
    id: 2,
    title: "Tic-a-Pic",
    description: "An interactive personal photo booth software allowing users to capture, edit, and print photos instantly. Optimized for touch-screen interfaces.",
    techStack: ["React", "CSS3", "Firebase"],
    image: "https://picsum.photos/seed/ticapic/800/600",
    repoLink: "#",
    demoLink: "#"
  }
];

export const SKILL_DATA: SkillItem[] = [
  { name: "React", category: "frontend" },
  { name: "TypeScript", category: "frontend" },
  { name: "Next.js", category: "frontend" },
  { name: "Tailwind CSS", category: "frontend" },
  { name: "HTML5 & CSS3", category: "frontend" },
  { name: "JavaScript (ES6+)", category: "frontend" },
  { name: "Supabase", category: "backend" },
  { name: "Git & GitHub", category: "tools" },
];