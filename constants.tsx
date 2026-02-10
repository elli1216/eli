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
    role: "Cobol Developer",
    company: "Land Bank of the Philippines",
    period: "February 2026 - Present",
    description: "Develop COBOL programs for mainframe computing environments. Focus on writing clean, efficient code for financial data processing. Ensure system reliability through comprehensive testing and debugging."
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
    techStack: ["Next.js", "PayMongo", "TypeScript", "Tailwind CSS", "Shadcn UI", "Supabase"],
    image: "/stc.png",
    repoLink: "",
    demoLink: "https://stcpac.vercel.app/"
  },
  {
    id: 2,
    title: "BulSU OSAS Complaint and Grievance Portal",
    description: "Enabled administrators to monitor, categorize, and resolve student concerns in real time. Improved operational efficiency by digitizing submissions and centralizing records using ReactJS. Leveraged GitHub for version control.",
    techStack: ["React.js", "TypeScript", "Tailwind CSS", "DaisyUI", "Express.js", "Supabase"],
    image: "/osas.png",
    repoLink: "",
    demoLink: "https://www.osascomplaints.dev/"
  },
  {
    id: 3,
    title: "Tic-a-Pic Photobooth",
    description: "Developed an interactive web-based photobooth using NextJS to provide users with a fun, seamless, and engaging digital photography experience.",
    techStack: ["Next.js", "DaisyUI"],
    image: "/ticapic.png",
    repoLink: "https://github.com/elli1216/Tic-a-Pic",
    demoLink: "https://tic-a-pic.vercel.app/"
  },
  {
    id: 4,
    title: "Jobinator",
    description: "A job application tracker that streamlines the job search process by organizing applications, statuses, and notes in a centralized dashboard.",
    techStack: ["Tanstack Start", "Prisma", "Neon", "Netlify", "Clerk", "Shadcn UI"],
    image: "/jobinator.png",
    repoLink: "https://github.com/elli1216/Jobinator",
  },
  {
    id: 4,
    title: "My Own Portfolio",
    description: "A portfolio website built with Motion and ReactBits components that you are viewing right now. Showcases my skills and projects as well as my social media accounts.",
    techStack: ["React", "TypeScript", "Motion React", "ReactBits"],
    image: "/portfolio.png",
    repoLink: "https://github.com/elli1216/eli",
  },
];

export const SKILL_DATA: SkillItem[] = [
  { name: "JavaScript", category: "frontend", icon: "js" },
  { name: "TypeScript", category: "frontend", icon: "typescript" },
  { name: "Java", category: "backend", icon: "java" },
  { name: "Python", category: "backend", icon: "python" },
  { name: "HTML5", category: "frontend", icon: "html5" },
  { name: "CSS3", category: "frontend", icon: "css3" },
  { name: "SQL", category: "backend", icon: "mysql" },
  { name: "Tailwind CSS", category: "frontend", icon: "tailwindcss" },
  { name: "ReactJS", category: "frontend", icon: "react" },
  { name: "NextJS", category: "frontend", icon: "nextjs2" },
  { name: "PostgreSQL", category: "backend", icon: "postgresql" },
  { name: "ExpressJS", category: "backend", icon: "expressjs" },
  { name: "Shadcn", category: "frontend", icon: "shadcnui" },
  { name: "MaterialUI", category: "frontend", icon: "materialui" },
  { name: "Zod", category: "frontend", icon: "zod" },
  { name: "Tanstack", category: "frontend", icon: "tanstack2" },
  { name: "Docker", category: "tools", icon: "docker" },
  { name: "Git/GitHub", category: "tools", icon: "github" },
  { name: "Neon", category: "backend", icon: "neon" },
  { name: "Supabase", category: "tools", icon: "supabase" },
  { name: "VS Code", category: "tools", icon: "vscode" },
  { name: "Vercel", category: "tools", icon: "vercel" },
  { name: "Render", category: "tools", icon: "render" },
  { name: "Bash", category: "tools", icon: "bash" },
  { name: "Prisma", category: "backend", icon: "prisma" },
  { name: "Vite", category: "frontend", icon: "vitejs" },
];