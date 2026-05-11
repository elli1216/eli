import { AccentColor, ExperienceItem, ProjectItem, SkillItem } from './types';

export const ACCENT_COLORS: AccentColor[] = [
  { name: 'green', value: '#2da44e' },
  { name: 'blue', value: '#2563eb' },
  { name: 'red', value: '#e63946' },
  { name: 'orange', value: '#ea580c' },
  { name: 'purple', value: '#9333ea' },
  { name: 'gray', value: '#71717a' },
];

export const NAV_ITEMS = [
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'About Me', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: 1,
    role: "Full Stack Development Trainee",
    company: "Accenture Academy",
    period: "April 2026 - Present",
    location: "Mandaluyong City, Philippines | Hybrid",
    description: "Took a 343-hour training program to sharpen my skills on Full Stack Development covering Core Java, Spring Boot, JPA, Hibernate for backend. MySQL for database. ReactJS and TypeScript for Frontend."
  },
  {
    id: 2,
    role: "COBOL Programmer Intern",
    company: "Land Bank of the Philippines (HO)",
    period: "February 2026 - April 2026",
    location: "Malate, Manila, Philippines",
    description: "Successfully developed 13 COBOL programs for z/OS mainframe computing environment. Focused on writing clean, efficient code for financial data processing. Ensured system reliability through comprehensive testing and debugging."
  },
  {
    id: 3,
    role: "Salesforce Developer Intern",
    company: "Salesforce Virtual Internship Program",
    period: "March 2025 – May 2025",
    location: "Philippines | Remote",
    description: "Built automation solutions on Salesforce including order confirmations, loyalty tiers, stock alerts, and bulk updates. Used Apex, Flow, and LWC to develop apps, integrate APIs, and query data with SOQL. Designed dashboards for insights and documented workflows for scalability."
  },
  {
    id: 4,
    role: "Student Assistant",
    company: "Bulacan State University - CSER",
    period: "January 2025 – May 2025",
    location: "Malolos City, Bulacan, Philippines",
    description: "Managed front desk operations and document handling, ensuring efficient communication between university offices while maintaining high service standards for student inquiries."
  }
];

export const PROJECT_DATA: ProjectItem[] = [
  {
    id: 1,
    title: "STC Performing Arts Center Website",
    description: "Built a centralized management platform using Tanstack Start, replacing manual scheduling with a digital system for classes, coaches, and studio rentals. Enabled secure, automated transactions by integrating PayMongo, and designed an administrative dashboard.",
    techStack: ["Tanstack Start", "React", "PayMongo", "TypeScript", "Tailwind CSS", "Shadcn UI", "Supabase"],
    image: "/stc.png",
    repoLink: "",
    demoLink: "https://stcpacv3.vercel.app/"
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
    description: "A simple CRUD job application tracker that streamlines the job search process by organizing applications, statuses, and notes in a centralized dashboard.",
    techStack: ["Tanstack Start", "Prisma", "Neon", "Netlify", "Clerk", "Shadcn UI"],
    image: "/jobinator.png",
    demoLink: "https://jobinator.netlify.app/landing",
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
  { name: "Java", category: "backend", icon: "java" },
  { name: "Spring Boot", category: "backend", icon: "spring" },
  { name: "COBOL", category: "backend", icon: "cobol" },
  { name: "ReactJS", category: "frontend", icon: "react" },
  { name: "Tailwind CSS", category: "frontend", icon: "tailwindcss" },
  { name: "NextJS", category: "frontend", icon: "nextjs2" },
  { name: "JavaScript", category: "frontend", icon: "js" },
  { name: "Tanstack", category: "frontend", icon: "tanstack2" },
  { name: "TypeScript", category: "frontend", icon: "typescript" },
  { name: "HTML5", category: "frontend", icon: "html5" },
  { name: "CSS3", category: "frontend", icon: "css3" },
  { name: "SQL", category: "backend", icon: "mysql" },
  { name: "JCL", category: "backend", icon: "jobcontrollanguage" },
  { name: "PostgreSQL", category: "backend", icon: "postgresql" },
  { name: "ExpressJS", category: "backend", icon: "expressjs" },
  { name: "Shadcn", category: "frontend", icon: "shadcnui" },
  { name: "MaterialUI", category: "frontend", icon: "materialui" },
  { name: "Zod", category: "frontend", icon: "zod" },
  { name: "Docker", category: "tools", icon: "docker" },
  { name: "Git/GitHub", category: "tools", icon: "github" },
  { name: "Supabase", category: "tools", icon: "supabase" },
  { name: "Bash", category: "tools", icon: "bash" },
  { name: "Prisma", category: "backend", icon: "prisma" },
  { name: "Vite", category: "frontend", icon: "vitejs" },
];