import type { ComponentType } from "react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Smartphone,
  Boxes,
  Cpu,
  CreditCard,
  GraduationCap,
  Building2,
  ShoppingBag,
  Briefcase,
  Rocket,
  Layers,
  ShieldCheck,
  Bell,
  Map as MapIcon,
  GitBranch,
  Gauge,
  Palette,
  Database,
  Server,
  Workflow,
  Cloud,
  Brain,
  Locate,
} from "lucide-react";

/** Any icon component used across the site (lucide or custom brand SVG). */
export type IconType = ComponentType<{
  size?: number | string;
  className?: string;
}>;

/* -------------------------------------------------------------------------- */
/*                                   PROFILE                                   */
/* -------------------------------------------------------------------------- */

export const profile = {
  name: "Sifat Hasan",
  fullName: "Tawhid Hassan Sifat",
  initials: "SH",
  roles: [
    "Senior Flutter Developer",
    "Software Engineer",
    "Cross-Platform App Architect",
    "AI Integration Specialist",
  ],
  tagline: "Senior Flutter Developer & Software Engineer",
  location: "Dhaka, Bangladesh",
  email: "sifat27.sh22@gmail.com",
  phone: "+8801781788268",
  availability: "Available for select projects",
  experienceYears: "5+",
  shortBio:
    "Senior Flutter Developer with 5+ years crafting high-performance, beautifully designed mobile apps — blending innovation, scalability, and precision in every line of code.",
} as const;

/* -------------------------------------------------------------------------- */
/*                                    LINKS                                    */
/* -------------------------------------------------------------------------- */

export type SocialLink = {
  label: string;
  href: string;
  handle: string;
  icon: IconType;
};

export const socials: SocialLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/TawhidHassan",
    handle: "@TawhidHassan",
    icon: GithubIcon,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/tawhid-hasna-sifat-40093320a/",
    handle: "Tawhid Hassan Sifat",
    icon: LinkedinIcon,
  },
  {
    label: "Email",
    href: `mailto:${profile.email}`,
    handle: profile.email,
    icon: Mail,
  },
  {
    label: "Phone",
    href: `tel:${profile.phone.replace(/\s/g, "")}`,
    handle: profile.phone,
    icon: Phone,
  },
];

export const contactDetails = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}`, icon: Mail },
  {
    label: "Phone",
    value: profile.phone,
    href: `tel:${profile.phone.replace(/\s/g, "")}`,
    icon: Phone,
  },
  { label: "Location", value: profile.location, href: undefined, icon: MapPin },
];

/* -------------------------------------------------------------------------- */
/*                                 NAVIGATION                                  */
/* -------------------------------------------------------------------------- */

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Work", href: "#projects" },
  { label: "Contact", href: "#contact" },
] as const;

/* -------------------------------------------------------------------------- */
/*                                   ABOUT                                     */
/* -------------------------------------------------------------------------- */

export const about = {
  heading: "Engineering mobile products that scale.",
  paragraphs: [
    "I'm a Senior Flutter Developer with 5+ years of experience building production-grade mobile applications for enterprises, fintechs, and high-growth startups across Bangladesh and beyond.",
    "My focus is on shipping cross-platform apps for Android and iOS that feel native, perform flawlessly, and scale gracefully — backed by clean architecture, robust state management, and thoughtful API design.",
    "From HR platforms and sales-force automation for Samsung and Unilever, to fintech and edtech products serving thousands of users, I bring a product-building mindset: I care about the business outcome, not just the code.",
  ],
  highlights: [
    {
      title: "Cross-Platform Mastery",
      description:
        "Flutter & Dart specialist delivering pixel-perfect, native-feeling apps on Android and iOS from a single codebase.",
      icon: Smartphone,
    },
    {
      title: "Scalable Architecture",
      description:
        "Clean Architecture, GetX, and modular state management that keep large codebases maintainable as teams grow.",
      icon: Boxes,
    },
    {
      title: "AI & Backend Integration",
      description:
        "Wiring intelligent features and resilient REST/Node.js & Laravel backends into seamless product experiences.",
      icon: Cpu,
    },
    {
      title: "Fintech-Grade Quality",
      description:
        "Payment integrations, secure flows, and enterprise reliability honed across financial and HR platforms.",
      icon: CreditCard,
    },
  ],
};

/* -------------------------------------------------------------------------- */
/*                                 EXPERIENCE                                  */
/* -------------------------------------------------------------------------- */

export type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  type: string;
  icon: IconType;
  summary: string;
  projects: string[];
};

export const experiences: ExperienceItem[] = [
  {
    company: "Upscale BD",
    role: "Senior Software Engineer",
    period: "2024 — Present",
    type: "Full-time",
    icon: Rocket,
    summary:
      "Leading development of enterprise HR and attendance solutions, owning architecture and delivery end-to-end.",
    projects: [
      "Digigo — complete HR solution",
      "Attendx — attendance management for ActionAid",
    ],
  },
  {
    company: "Market Access Analytics & Consulting (MAAC)",
    role: "Software Engineer",
    period: "2021 — 2024",
    type: "Full-time",
    icon: Building2,
    summary:
      "Built sales-force automation, activation, and edtech platforms for some of the largest enterprises in the region.",
    projects: [
      "Salesx — sales automation for Samsung Bangladesh",
      "Fieldx — sales & field management for Abul Khair Group",
      "Pmx — activation management for Unilever",
      "Shomriddhi — edtech platform",
      "Hrx — HR solution",
    ],
  },
  {
    company: "Invariant Telecom Bangladesh Ltd.",
    role: "Software Engineer",
    period: "2021",
    type: "Full-time",
    icon: Briefcase,
    summary:
      "Developed sub-wing management software supporting telecom operations and internal workflows.",
    projects: ["Dhamaka sub-wings software"],
  },
  {
    company: "Biddabari",
    role: "Lead App Engineer · Senior Software Engineer",
    period: "Part-time",
    type: "Part-time",
    icon: GraduationCap,
    summary:
      "Led the app team for a popular edtech product, mentoring engineers and owning the mobile roadmap.",
    projects: ["Biddabari App — edtech platform"],
  },
  {
    company: "Twentyfive Pvt. Ltd.",
    role: "Team Lead · Senior Software Engineer",
    period: "Part-time",
    type: "Part-time",
    icon: Layers,
    summary:
      "Led delivery of on-demand hiring products connecting employers and job seekers instantly.",
    projects: [
      "InstaHire — instantly find an employee",
      "InstaJob — find an instant job",
    ],
  },
  {
    company: "Freelance — Fiverr & Local Clients",
    role: "Software Engineer",
    period: "2019 — 2020",
    type: "Freelance",
    icon: ShoppingBag,
    summary:
      "Delivered ecommerce and custom mobile solutions for international and local clients.",
    projects: ["Regal Furniture", "Multiple ecommerce projects"],
  },
];

/* -------------------------------------------------------------------------- */
/*                                   SKILLS                                    */
/* -------------------------------------------------------------------------- */

export type Skill = { name: string; level: number; icon: IconType };
export type SkillGroup = { category: string; skills: Skill[] };

export const skillGroups: SkillGroup[] = [
  {
    category: "Core Mobile",
    skills: [
      { name: "Flutter", level: 96, icon: Smartphone },
      { name: "Dart", level: 95, icon: Cpu },
      { name: "State Management", level: 92, icon: Workflow },
      { name: "GetX", level: 93, icon: Boxes },
      { name: "Clean Architecture", level: 90, icon: Layers },
      { name: "Performance Optimization", level: 88, icon: Gauge },
    ],
  },
  {
    category: "Backend & Data",
    skills: [
      { name: "Node.js", level: 85, icon: Server },
      { name: "Laravel", level: 80, icon: Server },
      { name: "Firebase", level: 90, icon: Cloud },
      { name: "MongoDB", level: 82, icon: Database },
      { name: "REST APIs", level: 92, icon: Globe },
      { name: "Background Services", level: 86, icon: Workflow },
    ],
  },
  {
    category: "Product & Platform",
    skills: [
      { name: "AI Integration", level: 84, icon: Brain },
      { name: "Payment Integration", level: 88, icon: CreditCard },
      { name: "Push Notifications", level: 90, icon: Bell },
      { name: "Maps & Geofencing", level: 87, icon: MapIcon },
      { name: "Location Tracking", level: 88, icon: Locate },
      { name: "CI/CD", level: 80, icon: GitBranch },
    ],
  },
  {
    category: "Craft & Delivery",
    skills: [
      { name: "UI / UX", level: 88, icon: Palette },
      { name: "Git", level: 92, icon: GitBranch },
      { name: "Android & iOS", level: 93, icon: Smartphone },
      { name: "Security", level: 84, icon: ShieldCheck },
    ],
  },
];

/** Flattened marquee list for the skills ticker. */
export const skillMarquee = [
  "Flutter",
  "Dart",
  "Firebase",
  "Node.js",
  "REST APIs",
  "GetX",
  "Clean Architecture",
  "State Management",
  "AI Integration",
  "Payment Integration",
  "Background Services",
  "Push Notifications",
  "Maps",
  "Location Tracking",
  "CI/CD",
  "Git",
  "UI/UX",
  "Performance",
];

/* -------------------------------------------------------------------------- */
/*                                  PROJECTS                                   */
/* -------------------------------------------------------------------------- */

export type Project = {
  id: string;
  name: string;
  category: string;
  description: string;
  longDescription: string;
  playStore: string;
  tech: string[];
  metrics: { label: string; value: string }[];
  accent: string; // tailwind gradient stops
};

export const projects: Project[] = [
  {
    id: "hr-management",
    name: "HR Management App",
    category: "Enterprise · HR",
    description:
      "Enterprise HR platform with attendance, employee management, workflows, and automation.",
    longDescription:
      "A complete HR management suite handling attendance tracking, employee lifecycle, approval workflows, and process automation for large organizations.",
    playStore:
      "https://play.google.com/store/apps/details?id=xyz.sheba.emanager",
    tech: ["Flutter", "GetX", "REST APIs", "Firebase", "Clean Architecture"],
    metrics: [
      { label: "Modules", value: "12+" },
      { label: "Platform", value: "Android · iOS" },
      { label: "Scale", value: "Enterprise" },
    ],
    accent: "from-blue-500 via-indigo-500 to-purple-500",
  },
  {
    id: "ecommerce",
    name: "Regal Ecommerce",
    category: "Ecommerce · Retail",
    description:
      "Large-scale ecommerce application delivering a modern, fluid shopping experience.",
    longDescription:
      "A full-featured ecommerce platform with rich product browsing, cart and checkout flows, payment integration, and order tracking built for scale.",
    playStore: "https://play.google.com/store/apps/details?id=com.rfl.regal",
    tech: ["Flutter", "Payment Integration", "REST APIs", "State Management"],
    metrics: [
      { label: "Checkout", value: "Optimized" },
      { label: "Payments", value: "Integrated" },
      { label: "Platform", value: "Android · iOS" },
    ],
    accent: "from-cyan-500 via-sky-500 to-blue-500",
  },
  {
    id: "lms",
    name: "Biddabari LMS",
    category: "EdTech · Learning",
    description:
      "Learning management platform with video lessons, course management, and education tools.",
    longDescription:
      "An end-to-end learning management system featuring streaming video lessons, structured courses, live classes, and progress tracking for thousands of students.",
    playStore:
      "https://play.google.com/store/apps/details?id=com.nextive.biddabari2021",
    tech: ["Flutter", "Video Streaming", "Firebase", "Push Notifications"],
    metrics: [
      { label: "Content", value: "Video + Live" },
      { label: "Users", value: "Thousands" },
      { label: "Platform", value: "Android · iOS" },
    ],
    accent: "from-violet-500 via-purple-500 to-fuchsia-500",
  },
  {
    id: "fintech",
    name: "Tahweel Fintech",
    category: "Fintech · Payments",
    description:
      "Financial technology platform with multiple services and scalable architecture.",
    longDescription:
      "A fintech super-app bundling multiple financial services with secure transaction flows, payment gateways, and a resilient, scalable architecture.",
    playStore: "https://play.google.com/store/apps/details?id=tahweel.io",
    tech: ["Flutter", "Payment Integration", "Security", "Clean Architecture"],
    metrics: [
      { label: "Services", value: "Multi" },
      { label: "Security", value: "Grade A" },
      { label: "Platform", value: "Android · iOS" },
    ],
    accent: "from-emerald-500 via-teal-500 to-cyan-500",
  },
  {
    id: "sales-automation",
    name: "FieldX Sales Automation",
    category: "Enterprise · SFA",
    description:
      "Sales-force automation system with enterprise features for field teams.",
    longDescription:
      "A sales-force automation platform for enterprise field teams — order capture, route planning, location tracking, and real-time reporting for brands like Samsung & Abul Khair.",
    playStore:
      "https://play.google.com/store/apps/details?id=com.fieldx.fieldx",
    tech: ["Flutter", "Maps", "Location Tracking", "Background Services"],
    metrics: [
      { label: "Clients", value: "Samsung+" },
      { label: "Tracking", value: "Real-time" },
      { label: "Platform", value: "Android · iOS" },
    ],
    accent: "from-orange-500 via-amber-500 to-yellow-500",
  },
  {
    id: "activation-automation",
    name: "Activation Automation",
    category: "Enterprise · Automation",
    description:
      "Enterprise activation and campaign automation solution for large brands.",
    longDescription:
      "An enterprise automation solution streamlining brand activation campaigns, field execution, and reporting — built for high-volume operational use.",
    playStore:
      "https://play.google.com/store/apps/details?id=com.activation.activation",
    tech: ["Flutter", "REST APIs", "Workflows", "Real-time Sync"],
    metrics: [
      { label: "Workflows", value: "Automated" },
      { label: "Ops", value: "High-volume" },
      { label: "Platform", value: "Android · iOS" },
    ],
    accent: "from-pink-500 via-rose-500 to-red-500",
  },
  {
    id: "instajob",
    name: "InstaJob",
    category: "On-Demand · Jobs",
    description:
      "Instant job-finding app connecting job seekers with nearby work in real time.",
    longDescription:
      "A real-time job marketplace that matches job seekers with instant work opportunities nearby — live listings, in-app applications, notifications, and location-aware matching.",
    playStore:
      "https://play.google.com/store/apps/details?id=com.app.insta_employee&hl=en",
    tech: ["Flutter", "Firebase", "Push Notifications", "Maps", "Location Tracking"],
    metrics: [
      { label: "Matching", value: "Real-time" },
      { label: "Listings", value: "Live" },
      { label: "Platform", value: "Android · iOS" },
    ],
    accent: "from-sky-500 via-blue-500 to-indigo-500",
  },
  {
    id: "instajob-client",
    name: "InstaJob Client",
    category: "On-Demand · Hiring",
    description:
      "Instant employee-finding app letting employers hire nearby workers on demand.",
    longDescription:
      "The employer side of the InstaJob platform — post jobs, discover available workers nearby, and hire instantly with real-time matching, in-app chat, and notifications.",
    playStore:
      "https://play.google.com/store/apps/details?id=com.aamarpa.user&hl=en",
    tech: ["Flutter", "Firebase", "Push Notifications", "Maps", "REST APIs"],
    metrics: [
      { label: "Hiring", value: "On-demand" },
      { label: "Matching", value: "Real-time" },
      { label: "Platform", value: "Android · iOS" },
    ],
    accent: "from-teal-500 via-emerald-500 to-green-500",
  },
  {
    id: "zahraan",
    name: "Zahraan",
    category: "Islamic · AI",
    description:
      "AI-powered Islamic app offering guidance, knowledge, and daily spiritual tools.",
    longDescription:
      "An AI-driven Islamic companion app delivering authentic guidance, Q&A, and daily spiritual tools — Quran, prayer reminders, and intelligent answers powered by AI integration.",
    playStore:
      "https://play.google.com/store/apps/details?id=com.zahraan.zahraanAi&hl=en",
    tech: ["Flutter", "AI Integration", "Firebase", "Push Notifications", "REST APIs"],
    metrics: [
      { label: "Engine", value: "AI-powered" },
      { label: "Focus", value: "Islamic" },
      { label: "Platform", value: "Android · iOS" },
    ],
    accent: "from-amber-500 via-yellow-500 to-lime-500",
  },
  {
    id: "attendx",
    name: "AttendX",
    category: "Enterprise · Attendance",
    description:
      "Smart attendance app with face recognition for fast, contactless check-ins.",
    longDescription:
      "A smart attendance system using face recognition for accurate, contactless check-in and check-out — real-time tracking, location verification, and automated reporting for teams.",
    playStore:
      "https://play.google.com/store/apps/details?id=com.actionad.actionad&hl=en",
    tech: ["Flutter", "Face Recognition", "AI Integration", "Maps", "REST APIs"],
    metrics: [
      { label: "Auth", value: "Face ID" },
      { label: "Check-in", value: "Contactless" },
      { label: "Platform", value: "Android · iOS" },
    ],
    accent: "from-fuchsia-500 via-purple-500 to-violet-500",
  },
];

/* -------------------------------------------------------------------------- */
/*                                ACHIEVEMENTS                                 */
/* -------------------------------------------------------------------------- */

export type Stat = { value: string; label: string; suffix?: string };

export const stats: Stat[] = [
  { value: "5", suffix: "+", label: "Years of Experience" },
  { value: "20", suffix: "+", label: "Production Apps Shipped" },
  { value: "6", suffix: "+", label: "Enterprise Platforms" },
  { value: "100", suffix: "K+", label: "Users Served" },
];

export type Achievement = { title: string; description: string; icon: IconType };

export const achievements: Achievement[] = [
  {
    title: "Multiple Production Apps",
    description:
      "20+ apps shipped to Google Play & the App Store across fintech, HR, ecommerce, and edtech.",
    icon: Rocket,
  },
  {
    title: "Large-Scale Deployments",
    description:
      "Architected apps serving thousands of daily users with reliable, performant experiences.",
    icon: Gauge,
  },
  {
    title: "Enterprise Systems",
    description:
      "Delivered automation for Samsung, Unilever, Abul Khair, and ActionAid field operations.",
    icon: Building2,
  },
  {
    title: "Fintech Experience",
    description:
      "Built secure payment flows and multi-service financial platforms to fintech-grade standards.",
    icon: CreditCard,
  },
  {
    title: "Cross-Platform Expertise",
    description:
      "Single Flutter codebases delivering native-quality apps simultaneously on Android & iOS.",
    icon: Smartphone,
  },
  {
    title: "Team Leadership",
    description:
      "Led app teams as Senior Engineer & Team Lead, mentoring developers and owning roadmaps.",
    icon: Layers,
  },
];

/* -------------------------------------------------------------------------- */
/*                                 EDUCATION                                   */
/* -------------------------------------------------------------------------- */

export const education = [
  {
    degree: "BSc in Computer Science & Engineering",
    institution: "European University of Bangladesh",
    period: "2017 — 2021",
    result: "CGPA 3.85",
  },
  {
    degree: "Higher Secondary Certificate (HSC)",
    institution: "Shaikh Burhanuddin Post Graduate College",
    period: "2015 — 2017",
    result: "GPA 4.22",
  },
];

/* -------------------------------------------------------------------------- */
/*                                 SEO META                                    */
/* -------------------------------------------------------------------------- */

export const siteMeta = {
  title: "Sifat Hasan — Senior Flutter Developer & Software Engineer",
  description:
    "Senior Flutter Developer with 5+ years building high-performance, cross-platform mobile apps for fintech, HR, ecommerce, and enterprise clients including Samsung, Unilever & Abul Khair.",
  url: "https://tawhidhassan.github.io",
  keywords: [
    "Sifat Hasan",
    "Tawhid Hassan Sifat",
    "Flutter Developer",
    "Senior Flutter Developer",
    "Software Engineer",
    "Mobile App Developer",
    "Dart Developer",
    "Cross-Platform Developer",
    "Bangladesh Flutter Developer",
  ],
};
