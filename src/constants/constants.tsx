import { AccentColor, ExperienceItem, ProjectItem, SkillItem } from '@/types/types';

export const category = {
  FREELANCE: "Freelance",
  ACADEMIC: "Academic Project",
  PERSONAL: "Personal Project",
  CAPSTONE: "Capstone Project",
}

export const ACCENT_COLORS: AccentColor[] = [
  { name: 'green', value: '#2da44e' },
  { name: 'white', value: '#ffffff' },
  { name: 'blue', value: '#2563eb' },
  { name: 'red', value: '#e63946' },
  { name: 'orange', value: '#ea580c' },
  { name: 'purple', value: '#9333ea' },
  { name: 'gray', value: '#71717a' },
];

export const NAV_ITEMS = [
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Certificates', href: '#certificates' },
  { label: 'About Me', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    role: "Full Stack Development Trainee",
    company: "Accenture Academy",
    companyUrl: "accenture.com",
    period: "April 2026 - Present",
    location: "Mandaluyong City, Philippines | Hybrid",
    description: "Got selected to take an exclusive 343-hour training program to sharpen my skills on Full Stack Development covering Core Java, Spring Boot, JPA, Hibernate for backend. MySQL for database. ReactJS and TypeScript for Frontend."
  },
  {
    role: "COBOL Developer Intern",
    company: "Land Bank of the Philippines (HO)",
    companyUrl: "landbank.com",
    period: "February 2026 - April 2026",
    location: "Malate, Manila, Philippines",
    description: "Contributed to the development of COBOL programs in z/OS mainframe for financial data processing. Performed unit testing and ensured the programs complied with IBM z/OS coding standards to ensure seamless enterprise integration."
  },
  {
    role: "Salesforce Intern",
    company: "The SmartBridge",
    companyUrl: "thesmartbridge.com",
    period: "March 2025 – May 2025",
    location: "Philippines | Remote",
    description: "Completed 22 superbadges on Salesforce Trailhead, reflecting hands-on experience in CRM concepts, security models, workflow automation, and scalable system design, simulating real-world scenarios on utilizing Salesforce technologies."
  },
  {
    role: "Institutional Student Assistant",
    company: "Bulacan State University",
    companyUrl: "bulsu.edu.ph",
    period: "January 2025 – May 2025",
    location: "Malolos City, Bulacan, Philippines",
    description: "Managed front desk operations and document handling, ensuring efficient communication between university offices while maintaining high service standards for student inquiries."
  }
];

export const PROJECT_DATA: ProjectItem[] = [
  {
    title: "EntityForge",
    description: "A browser-based visual database designer that lets spring boot developers model JPA entities and relationships through an intuitive drag-and-drop canvas. It provides a split-screen workspace where visual design and generated JPA/SQL code stay in sync. The tool solves the common friction of translating entity relationship diagrams into correct, compilable Java persistence code.",
    techStack: ["React", "React Flow", "Tanstack Router", "Tanstack Query", "Shadcn UI"],
    image: "/projects/entityforge.png",
    demoLink: "https://entityforge.degf.workers.dev/",
    category: category.PERSONAL
  },
  {
    title: "QuickRoute",
    description: "A Spring Boot mock server that instantly generates live REST endpoints from uploaded JSON definitions. Supports dynamic route registration without restart, configurable HTTP status codes, response delays, and path variable substitution. Includes automatic mock expiry and a built-in management UI for browsing and deleting mocks.",
    techStack: ["Spring Boot", "PostgreSQL", "Docker", "Java", "Maven", "React", "Tanstack Router", "Tanstack Query", "Shadcn UI"],
    image: "/projects/quickroute.png",
    demoLink: "https://quick-route.app/",
    category: category.PERSONAL
  },
  {
    title: "BulSU OSAS Complaint and Grievance Portal",
    description: "Enabled administrators to monitor, categorize, and resolve student concerns in real time. Improved operational efficiency by digitizing submissions and centralizing records using ReactJS. Leveraged GitHub for version control.",
    techStack: ["React.js", "TypeScript", "Tailwind CSS", "DaisyUI", "Express.js", "Supabase", "Agile Development"],
    image: "/projects/osas.png",
    repoLink: "",
    demoLink: "https://www.osascomplaints.dev/",
    category: category.CAPSTONE
  },
  {
    title: "STC Performing Arts Center Website",
    description: "Built a centralized management platform using Tanstack Start, replacing manual scheduling with a digital system for classes, coaches, and studio rentals. Enabled secure, automated transactions by integrating PayMongo, and designed an administrative dashboard.",
    techStack: ["Tanstack Start", "React", "PayMongo", "TypeScript", "Tailwind CSS", "Shadcn UI", "Supabase", "Agile Development"],
    image: "/projects/stc.png",
    repoLink: "",
    demoLink: "https://stcpacv3.vercel.app/",
    category: category.FREELANCE
  },
  {
    title: "QuickRoute - Local",
    description: "Developed a plug‑and‑play mock server that enables frontend developers and QA testers to simulate REST APIs instantly. Users upload a JSON configuration defining HTTP methods, path patterns (including path variables), response bodies, custom status codes, and artificial network delays.",
    techStack: ["Spring Boot", "Java", "Maven", "MVC", "Rest API", "JSON"],
    image: "https://placehold.co/800/black/white?text=QuickRoute+-+Local&font=playfair-display",
    repoLink: "https://github.com/elli1216/InstantMock-Local",
    category: category.PERSONAL
  },
  {
    title: "COBOL Files",
    description: "My files from Z/OS Mainframe Developer Course and IBM Z Xplore hands-on labs.",
    techStack: ["COBOL", "JCL", "IBM Z Xplore", "z/OS", "Mainframe", "ISPF", "RACF", "Zowe CLI", "VSAM", "TSO"],
    image: "/projects/zos.png",
    repoLink: "https://github.com/elli1216/ds-jcl-cbl-files",
    category: category.PERSONAL
  },
  {
    title: "Tic-a-Pic Photobooth",
    description: "Developed an interactive web-based photobooth using NextJS to provide users with a fun, seamless, and engaging digital photography experience.",
    techStack: ["Next.js", "DaisyUI"],
    image: "/projects/ticapic.png",
    repoLink: "https://github.com/elli1216/Tic-a-Pic",
    // demoLink: "https://tic-a-pic.vercel.app/",
    category: category.PERSONAL
  },
  {
    title: "Jobinator",
    description: "A simple CRUD job application tracker that streamlines the job search process by organizing applications, statuses, and notes in a centralized dashboard.",
    techStack: ["Tanstack Start", "Prisma", "Neon", "Netlify", "Clerk", "Shadcn UI"],
    image: "/projects/jobinator.png",
    repoLink: "https://github.com/elli1216/Jobinator",
    category: category.PERSONAL
  },
  {
    title: "My Own Portfolio",
    description: "A portfolio website built with Motion and ReactBits components that you are viewing right now. Showcases my skills and projects as well as my social media accounts.",
    techStack: ["React", "TypeScript", "Motion React", "ReactBits"],
    image: "/projects/portfolio.png",
    repoLink: "https://github.com/elli1216/eli",
    category: category.PERSONAL
  },
  {
    title: "Scroll Report",
    description: "A project I practiced with Next.js using the News API for the data just for practicing NextJS.",
    techStack: ["Next.js", "News API", "Tanstack React Query", "TypeScript"],
    image: "https://placehold.co/800/black/white?text=Scroll+Report&font=playfair-display",
    repoLink: "https://github.com/elli1216/Scroll-Report",
    category: category.PERSONAL
  },
  {
    title: "ByteBazaar",
    description: "A final project presented during my 3rd year, 1st Semester in Web Systems and Technologies (1). A full-stack e-commerce application built with React (TypeScript) frontend and Express.js backend, featuring Firebase authentication and XML-based data storage.",
    techStack: ["React", "Node.js", "Express.js", "XML", "Firebase", "TypeScript"],
    image: "https://placehold.co/800/purple/white?text=ByteBazaar&font=playfair-display",
    repoLink: "https://github.com/elli1216/Bytebazaar",
    category: category.ACADEMIC
  },
  {
    title: "Student Management System",
    description: "A final project presented during my 2nd year, 2nd Semester in Advanced Programming. A school management system designed in Java with MVC Framework. Features included Student, Faculty, and Admin Dashboards. Check the repository for more details.",
    techStack: ["Java", "Java Swing", "JDBC", "MVC Framework", "SQL Server", "Agile Development"],
    image: "https://placehold.co/800/darkblue/white?text=School+Management+System&font=playfair-display",
    repoLink: "https://github.com/elli1216/School-Enrollment-System",
    category: category.ACADEMIC
  },
];

export const SKILL_DATA: SkillItem[] = [
  { name: "Java", category: "backend", icon: "java" },
  { name: "COBOL", category: "backend", icon: "" },
  { name: "ReactJS", category: "frontend", icon: "react" },
  { name: "Spring Boot", category: "backend", icon: "spring" },
  { name: "Tailwind CSS", category: "frontend", icon: "tailwindcss" },
  { name: "NextJS", category: "frontend", icon: "nextjs2" },
  { name: "Tanstack", category: "frontend", icon: "tanstack2" },
  { name: "JavaScript", category: "frontend", icon: "js" },
  { name: "TypeScript", category: "frontend", icon: "typescript" },
  { name: "HTML5", category: "frontend", icon: "html5" },
  { name: "CSS3", category: "frontend", icon: "css3" },
  { name: "SQL", category: "backend", icon: "mysql" },
  { name: "PostgreSQL", category: "backend", icon: "postgresql" },
  { name: "JCL", category: "backend", icon: "" },
  { name: "ExpressJS", category: "backend", icon: "expressjs" },
  { name: "Docker", category: "tools", icon: "docker" },
  { name: "Git", category: "tools", icon: "git" },
  { name: "GitHub", category: "tools", icon: "github" },
  { name: "Bash", category: "tools", icon: "bash" },
  { name: "Prisma", category: "backend", icon: "prisma" },
  { name: "Vite", category: "frontend", icon: "vitejs" },
];

export const certificates = [
  { src: "/certificates/javadev-1.png", alt: "Java Developer", href: "https://www.datacamp.com/completed/statement-of-accomplishment/track/d24f11d25eef873a334251eaac3d132d5e082d51" },
  { src: "/certificates/mainframedeveloper.jpg", alt: "IBM Mainframe Developer", href: "https://www.coursera.org/account/accomplishments/specialization/certificate/GTA3SGF8S3NV" },
  { src: "/certificates/advocate.jpg", alt: "IBM Z Advocate", href: "https://www.credly.com/badges/d122ced4-831f-4d44-944e-77c0663ff88b/public_url" },
  { src: "/certificates/learnintermediatejava.jpg", alt: "Java", href: "https://www.codecademy.com/profiles/degf/certificates/2624ed9b49bb4d5c994983877e5263f0" },
  { src: "/certificates/IBMZALLSTAR.jpg", alt: "All Star Badge - IBM Z Xplore", href: "https://www.credly.com/badges/9c95a33b-7c50-434b-b7eb-eba86e1c1c0e/linked_in_profile" },
  { src: "/certificates/rest_api-1.png", alt: "Rest API", href: "https://www.hackerrank.com/certificates/1135784070d0" },
  { src: "/certificates/EnterpriseCOBOLProgrammingwithVSCode.png", alt: "COBOL with VSCode", href: "https://www.credly.com/badges/9f1d7099-11ed-4ddd-af8f-c296f22c7d4a/linked_in?t=tf4cc7" },
  { src: "/certificates/springbootfundamentals.png", alt: "Spring Boot Fundamentals", href: "https://app.pluralsight.com/achievements/share/1c045e31-29f3-4a9d-a0f7-6f0db161da6b" },
  { src: "/certificates/java8.png", alt: "Java 8", href: "https://app.pluralsight.com/achievements/share/ece26aa5-2f58-4dc6-91aa-6bbad8e143b8" },
  { src: "/certificates/sfvip2025floresca.jpg", alt: "SFVIP", href: "https://www.salesforce.com/ap/" },
  { src: "/certificates/nextjsproj_page.jpg", alt: "NextJS Project BootCamp", href: "https://www.udemy.com/certificate/UC-e4312cb7-9b70-4822-ae7a-5270b6759622/" },
  { src: "/certificates/foundations.jpg", alt: "Foundations", href: "https://www.udemy.com/certificate/UC-47707ddb-68d9-4661-80e1-c54313587553/" },
  { src: "/certificates/htmlcssjsreact.jpg", alt: "React", href: "https://www.udemy.com/certificate/UC-9e5b5a02-e296-462b-9da7-09af19fb1706/" },
  { src: "/certificates/CyberThreatManagement.jpg", alt: "Cisco", href: "https://www.credly.com/badges/fedbe3b2-8519-4e22-976e-153dd577c5c7/public_url" },
  { src: "/certificates/SecurityandConnectivitySupport.jpg", alt: "Cisco", href: "https://www.credly.com/badges/fb5d7810-4e12-4d93-ab39-0b54c34bc1a5/public_url" },
];