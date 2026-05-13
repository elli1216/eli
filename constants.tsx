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
  { label: 'Certificates', href: '#certificates' },
  { label: 'Contact', href: '#contact' },
];

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: 1,
    role: "Full Stack Development Trainee",
    company: "Accenture Academy",
    companyUrl: "accenture.com",
    period: "April 2026 - Present",
    location: "Mandaluyong City, Philippines | Hybrid",
    description: "Took a 343-hour training program to sharpen my skills on Full Stack Development covering Core Java, Spring Boot, JPA, Hibernate for backend. MySQL for database. ReactJS and TypeScript for Frontend."
  },
  {
    id: 2,
    role: "COBOL Programmer Intern",
    company: "Land Bank of the Philippines (HO)",
    companyUrl: "landbank.com",
    period: "February 2026 - April 2026",
    location: "Malate, Manila, Philippines",
    description: "Successfully developed 13 COBOL programs for z/OS mainframe computing environment. Focused on writing clean, efficient code for financial data processing. Ensured system reliability through comprehensive testing and debugging. Performed unit testing and ensured the programs complied with IBM z/OS coding standards to ensure seamless enterprise integration."
  },
  {
    id: 3,
    role: "Salesforce Developer Trainee",
    company: "SmartBridge",
    companyUrl: "thesmartbridge.com",
    period: "March 2025 – May 2025",
    location: "Philippines | Remote",
    description: "Completed 22 superbadges on Salesforce Trailhead, reflecting hands-on experience in CRM concepts, security models, workflow automation, and scalable system design, simulating real-world scenarios on utilizing Salesforce technologies."
  },
  {
    id: 4,
    role: "Student Assistant",
    company: "Bulacan State University - CSER",
    companyUrl: "bulsu.edu.ph",
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
    image: "/projects/stc.png",
    repoLink: "",
    demoLink: "https://stcpacv3.vercel.app/"
  },
  {
    id: 2,
    title: "BulSU OSAS Complaint and Grievance Portal",
    description: "Enabled administrators to monitor, categorize, and resolve student concerns in real time. Improved operational efficiency by digitizing submissions and centralizing records using ReactJS. Leveraged GitHub for version control.",
    techStack: ["React.js", "TypeScript", "Tailwind CSS", "DaisyUI", "Express.js", "Supabase"],
    image: "/projects/osas.png",
    repoLink: "",
    demoLink: "https://www.osascomplaints.dev/"
  },
  {
    id: 3,
    title: "Tic-a-Pic Photobooth",
    description: "Developed an interactive web-based photobooth using NextJS to provide users with a fun, seamless, and engaging digital photography experience.",
    techStack: ["Next.js", "DaisyUI"],
    image: "/projects/ticapic.png",
    repoLink: "https://github.com/elli1216/Tic-a-Pic",
    demoLink: "https://tic-a-pic.vercel.app/"
  },
  {
    id: 4,
    title: "Jobinator",
    description: "A simple CRUD job application tracker that streamlines the job search process by organizing applications, statuses, and notes in a centralized dashboard.",
    techStack: ["Tanstack Start", "Prisma", "Neon", "Netlify", "Clerk", "Shadcn UI"],
    image: "/projects/jobinator.png",
    repoLink: "https://github.com/elli1216/Jobinator",
  },
  {
    id: 4,
    title: "My Own Portfolio",
    description: "A portfolio website built with Motion and ReactBits components that you are viewing right now. Showcases my skills and projects as well as my social media accounts.",
    techStack: ["React", "TypeScript", "Motion React", "ReactBits"],
    image: "/projects/portfolio.png",
    repoLink: "https://github.com/elli1216/eli",
  },
];

export const SKILL_DATA: SkillItem[] = [
  { name: "Java", category: "backend", icon: "java" },
  { name: "Spring Boot", category: "backend", icon: "spring" },
  { name: "COBOL", category: "backend", icon: "" },
  { name: "ReactJS", category: "frontend", icon: "react" },
  { name: "Tailwind CSS", category: "frontend", icon: "tailwindcss" },
  { name: "NextJS", category: "frontend", icon: "nextjs2" },
  { name: "JavaScript", category: "frontend", icon: "js" },
  { name: "Tanstack", category: "frontend", icon: "tanstack2" },
  { name: "TypeScript", category: "frontend", icon: "typescript" },
  { name: "HTML5", category: "frontend", icon: "html5" },
  { name: "CSS3", category: "frontend", icon: "css3" },
  { name: "SQL", category: "backend", icon: "mysql" },
  { name: "JCL", category: "backend", icon: "" },
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

export const certificates = [
  { src: "/certificates/mainframedeveloper.jpg", alt: "IBM Mainframe Developer", href: "https://www.coursera.org/account/accomplishments/specialization/certificate/GTA3SGF8S3NV" },
  { src: "/certificates/learnintermediatejava.jpg", alt: "Java", href: "https://www.codecademy.com/profiles/degf/certificates/2624ed9b49bb4d5c994983877e5263f0" },
  { src: "/certificates/IBMZALLSTAR.jpg", alt: "All Star Badge - IBM Z Xplore", href: "https://www.credly.com/badges/9c95a33b-7c50-434b-b7eb-eba86e1c1c0e/linked_in_profile" },
  { src: "/certificates/sfvip2025floresca.jpg", alt: "SFVIP", href: "https://www.salesforce.com/ap/" },
  { src: "/certificates/nextjsproj_page.jpg", alt: "NextJS Project BootCamp", href: "https://www.udemy.com/certificate/UC-e4312cb7-9b70-4822-ae7a-5270b6759622/" },
  { src: "/certificates/foundations.jpg", alt: "Foundations", href: "https://www.udemy.com/certificate/UC-47707ddb-68d9-4661-80e1-c54313587553/" },
  { src: "/certificates/htmlcssjsreact.jpg", alt: "React", href: "https://www.udemy.com/certificate/UC-9e5b5a02-e296-462b-9da7-09af19fb1706/" },
  { src: "/certificates/CyberThreatManagement.jpg", alt: "Cisco", href: "https://www.credly.com/badges/fedbe3b2-8519-4e22-976e-153dd577c5c7/public_url" },
  { src: "/certificates/SecurityandConnectivitySupport.jpg", alt: "Cisco", href: "https://www.credly.com/badges/fb5d7810-4e12-4d93-ab39-0b54c34bc1a5/public_url" },
];