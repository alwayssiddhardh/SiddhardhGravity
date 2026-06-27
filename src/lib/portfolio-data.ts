/* eslint-disable prettier/prettier */
import resumeAsset from "@/assets/resume.pdf.asset.json";

export const RESUME_URL = resumeAsset.url;

export const profile = {
  name: "Siddhardha Ungarala",
  fullName: "Ungarala Siddhardha Lakshmi Balaji Naidu",
  title: "AI & ML Engineer · Full-Stack Builder",
  tagline:
    "I architect intelligent systems and ship production-grade interfaces — turning research into experiences people actually feel.",
  location: "Surampalem, Andhra Pradesh · India",
  email: "siddhardhaungarala@gmail.com",
  phone: "+91 9121999499",
  socials: {
    github: "https://github.com/siddhardhaungarala",
    linkedin: "https://www.linkedin.com/in/siddhardha-ungarala/",
    portfolio: "https://siddhardhungarala.web.app",
    instagram: "https://instagram.com/siddhardha_ungarala",
    twitter: "https://x.com/siddhardha_u",
  },
};

export const skills = [
  {
    group: "Languages",
    items: ["Python", "TypeScript", "JavaScript", "C++", "Java", "PHP", "SQL", "Shell"],
  },
  {
    group: "AI / ML",
    items: ["TensorFlow", "Keras", "PyTorch-ish", "OpenCV", "YOLO", "R-CNN", "CLIP", "DINO", "SAM", "COCO", "CVAT", "NLP"],
  },
  {
    group: "Frameworks",
    items: ["React", "Vite", "Next-style routing", "Framer Motion", "Flutter", "Node.js", "Tailwind CSS", "Bootstrap"],
  },
  {
    group: "Backend & Cloud",
    items: ["REST APIs", "Node.js", "Express", "AWS", "Firebase", "Firestore", "MongoDB", "MySQL"],
  },
  {
    group: "Tools",
    items: ["Git", "Roboflow", "Figma", "Jupyter", "n8n", "Kali Linux", "TinkerCad", "VSCode", "PhpStorm"],
  },
];

export const experiences = [
  {
    role: "Web Developer (Full-time Intern)",
    company: "Plantasy (E-Commerce Startup)",
    location: "On-site",
    period: "May 14, 2026 — Present",
    type: "60-Day Summer Internship",
    bullets: [
      "Designed and built a full-stack commerce platform with Razorpay payments.",
      "Developed a complete website from scratch using Next.js and Tailwind CSS.",
      "Optimized checkout flow, improving transaction speed and user satisfaction by ~25%.",
      "Generated mockups and images using AI tools to enhance product presentation and user engagement.",
    ],
    tags: ["UI/UX", "Razorpay", "Delhivery", "E-commerce"],
  },
  {
    role: "Designer Head (Full-time Intern)",
    company: "Akuro Technologies",
    location: "On-site",
    period: "May 26, 2025 — Aug 23, 2025",
    type: "90-Day Summer Internship",
    bullets: [
      "Restructured an e-commerce discussion forum UI, lifting UX scores by ~70%.",
      "Designed and printed 3D components in TinkerCad; managed printers and hardware soldering.",
      "Integrated Google Assistant & Alexa into smart-home IoT devices via custom APIs.",
    ],
    tags: ["UI/UX", "3D Printing", "IoT", "APIs"],
  },
  {
    role: "Blog Writer · Core Team",
    company: "Ghostcoder (College Community)",
    location: "Remote",
    period: "Oct 2024 — Present",
    type: "Part-time ",
    bullets: [
      "Authored 50+ blogs on backend development with AI tooling.",
      "Mentored peers on AI, web, and systems concepts to grow community exposure.",
    ],
    tags: ["Mentoring", "Technical Writing", "AI"],
  },
  {
    role: "Zen AI Generative AI Workshop",
    company: "Ignite Embedded Systems",
    location: "College Campus",
    period: "Oct 2025",
    type: "6-Day Offline Workshop",
    bullets: [
      "Hands-on Generative AI curriculum with mentorship from research staff.",
    ],
    tags: ["AI", "Research"],
  },
  {
    role: "AI / ML Workshop — IISc Bangalore",
    company: "Indian Institute of Science",
    location: "Bengaluru",
    period: "Oct 2024",
    type: "2-Day Offline Workshop",
    bullets: [
      "Hands-on AI + ML curriculum at IISc with mentorship from research staff.",
    ],
    tags: ["AI", "Research"],
  },
  {
    role: "AWS Cloud Computing Workshop",
    company: "AP Skill Development Corporation",
    location: "Andhra Pradesh",
    period: "September 2024",
    type: "6-Day Offline",
    bullets: ["End-to-end AWS fundamentals: compute, storage, IAM and deployment."],
    tags: ["AWS", "Cloud"],
  },
  // {
  //   role: "Embedded Systems Workshop",
  //   company: "Ignite Embedded Systems",
  //   location: "Offline",
  //   period: "2024",
  //   type: "6-Day Workshop",
  //   bullets: ["Hardware-software integration, microcontrollers and firmware basics."],
  //   tags: ["Embedded", "Hardware"],
  // },
  {
    role: "Research & Development Intern",
    company: "Inno3Dtech (3D Printing Startup)",
    location: "Multiple Venues",
    period: "2024 — 2025 September",
    type: "Full-time ",
    bullets: [
      "Represented the startup at 8+ technical events and exhibitions.",
      "Developed 3D printing solutions for clients, including custom prototypes and functional parts.",
      "Generated qualified leads; conducted a 3-day offline workshop.",
    ],
    tags: ["Public Speaking", "3D Printing", "Prototyping"],
  },
];

export const projects = [
  {
    title: "MERN E-Commerce Platform",
    description:
      "Full-stack commerce platform with Razorpay payments, optimized checkout and a 25% bump in transaction speed and satisfaction.",
    tech: ["MongoDB", "Express", "React", "Node", "TypeScript", "Firebase", "Tailwind"],
    date: "2026",
    github: "https://github.com/siddhardhaungarala/ECommerce-TechStore.git",
    demo: "https://plantasy.co.in/",
    imagePrompt:
      "abstract 3D isometric e-commerce dashboard, rainbow gradient glow on dark violet background, futuristic UI, soft bloom, cinematic",
  },
  {
    title: "Remote Sensing Satellite Image Detection",
    description:
      "Developed a system for detecting and analyzing satellite images for environmental monitoring and disaster response.",
    tech: ["Python", "TensorFlow", "OpenCV", "YOLOv8", "R-CNN"],
    date: "2025-2026",
    github: "https://github.com/siddhardhaungarala/Remote-Sensing.git",
    demo: "#",
    imagePrompt:
      "satellite view of Earth with glowing neon outlines of detected features like forests, water bodies and urban areas, dark space background, cinematic",
  },
  {
    title: "Exam Cell Management",
    description:
      "Operations system for a college exam cell that cut administrative load by ~22%, with role-based dashboards and reports.",
    tech: ["PHP", "MySQLi", "JS", "Bootstrap", "HTML5", "CSS"],
    date: "2023",
    github: "https://github.com/siddhardhaungarala/Exam-Cell-Automation.git",
    demo: "#",
    imagePrompt:
      "dashboard UI with charts and data tables glowing in violet and green, dark academic vibe, neon outlines, isometric",
  },
  {
    title: "To-Do & Task Scheduling Mobile App",
    description:
      "Cross-platform mobile app to schedule and track tasks across the day, backed by Firebase Realtime DB and Auth.",
    tech: ["Flutter", "Dart", "Firebase Realtime DB", "Firebase Auth"],
    date: "2024",
    github: "https://github.com/siddhardhaungarala/ToDo.git",
    demo: "",
    imagePrompt:
      "two iPhone mockups floating side by side showing a colorful task scheduling app, rainbow particles, dark studio",
  },
  {
    title: "College E-Library",
    description:
      "Knowledge sharing platform for students to access notes, books and learn collaboratively across departments.",
    tech: ["PHP", "MySQL", "Bootstrap", "jQuery", "AJAX"],
    date: "Sep 2022",
    github: "https://github.com/siddhardhaungarala/E-Library.git",
    demo: "",
    imagePrompt:
      "stack of glowing 3D books floating in violet space with rainbow light streaks, cinematic",
  },
  {
    title: "Dermatology Clinic + Appointment Dashboard",
    description:
      "Marketing site plus an internal appointment dashboard for a dermatology clinic, ready for staff booking workflows.",
    tech: ["React", "TypeScript", "Tailwind", "Firebase"],
    date: "2024",
    github: "https://github.com/siddhardhaungarala/",
    demo: "https://revibes-clinic.web.app/",
    imagePrompt:
      "elegant clinic website mockup floating on a pastel pink and violet gradient, premium healthcare design",
  },
];

export const certifications = [
  "AI/ML Workshop — IISc Bangalore",
  "Generative AI Workshop — Zen Ai",
  "AWS Cloud Computing — APSSDC",
  "React Essential Training — LinkedIn Learning",
  "IT Essentials — Cisco",
  "IoT & IIoT — NPTEL",
  "Figma to WordPress — Udemy",
  "Agile with AI — LinkedIn",
  "Power BI — LinkedIn",
];


