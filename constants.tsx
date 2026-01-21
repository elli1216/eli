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
    role: "Intern",
    company: "Landbank of the Philippines",
    period: "January 2026 - Present",
    description: "Immersed in a professional corporate banking environment, focusing on software development workflows, secure coding practices, and maintaining disciplined agile methodologies. Collaborated with senior developers to optimize internal tools."
  },
  {
    id: 2,
    role: "Remote Intern",
    company: "Salesforce Virtual Internship Program",
    period: "March 2025 – May 2025",
    description: "Built automation solutions on Salesforce including order confirmations, loyalty tiers, stock alerts, and bulk updates. Used Apex, Flow, and LWC to develop apps, integrate APIs, and query data with SOQL. Designed dashboards for insights and documented workflows for scalability."
  },
  {
    id: 3,
    role: "Student Assistant",
    company: "Bulacan State University - CSER",
    period: "January 2025 – May 2025",
    description: "Managed front desk operations and document handling, ensuring efficient communication between university offices while maintaining high service standards for student inquiries."
  }
];

export const PROJECT_DATA: ProjectItem[] = [
  {
    id: 1,
    title: "STC Performing Arts Center Website",
    description: "Built a centralized management platform using NextJS, replacing manual scheduling with a digital system for classes, coaches, and studio rentals. Enabled secure, automated transactions by integrating PayMongo, and designed an administrative dashboard.",
    techStack: ["Next.js", "PayMongo", "TypeScript", "Tailwind CSS"],
    image: "/stc.png",
    repoLink: "",
    demoLink: "https://stcpac.vercel.app/"
  },
  {
    id: 2,
    title: "BuISU OSAS Complaint and Grievance Portal",
    description: "Enabled administrators to monitor, categorize, and resolve student concerns in real time. Improved operational efficiency by digitizing submissions and centralizing records using ReactJS. Leveraged GitHub for version control.",
    techStack: ["React.js", "GitHub"],
    image: "/osas.png",
    repoLink: "",
    demoLink: "https://www.osascomplaints.dev/"
  },
  {
    id: 3,
    title: "Tic-a-Pic Photobooth",
    description: "Developed an interactive web-based photobooth using NextJS to provide users with a fun, seamless, and engaging digital photography experience.",
    techStack: ["Next.js"],
    image: "/ticapic.png",
    repoLink: "https://github.com/elli1216/Tic-a-Pic",
    demoLink: "https://tic-a-pic.vercel.app/"
  }
];

export const SKILL_DATA: SkillItem[] = [
  { name: "JavaScript (ES6+)", category: "frontend", icon: "react" },
  { name: "TypeScript", category: "frontend", icon: "typescript" },
  { name: "Java", category: "backend", icon: "java" },
  { name: "HTML5", category: "frontend", icon: "html5" },
  { name: "CSS3", category: "frontend", icon: "css3" },
  { name: "SQL", category: "backend", icon: "mysql" },
  { name: "PostgreSQL", category: "backend", icon: "postgresql" },
  { name: "ReactJS", category: "frontend", icon: "react" },
  { name: "NextJS", category: "frontend", icon: "nextjs2" },
  { name: "ExpressJS", category: "backend", icon: "expressjs" },
  { name: "Tailwind CSS", category: "frontend", icon: "tailwindcss" },
  { name: "Zustand", category: "frontend", icon: "" },
  { name: "Tanstack", category: "frontend", icon: "tanstack" },
  { name: "Git/GitHub", category: "tools", icon: "github" },
  { name: "Supabase", category: "tools", icon: "supabase" },
  { name: "VS Code", category: "tools", icon: "vscode" },
  { name: "Vercel", category: "tools", icon: "vercel" },
  { name: "Render", category: "tools", icon: "render" },
  { name: "Gemini CLI", category: "tools", icon: "gemini" },
  { name: "Prisma", category: "backend", icon: "prisma" },
];