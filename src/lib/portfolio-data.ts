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
    role: "Instructor · Core Team",
    company: "Ghostcoder (College Community)",
    location: "Remote",
    period: "Oct 2024 — Present",
    type: "Part-time · Contractual",
    bullets: [
      "Authored 50+ blogs on backend development with AI tooling.",
      "Mentored peers on AI, web, and systems concepts to grow community exposure.",
    ],
    tags: ["Mentoring", "Technical Writing", "AI"],
  },
  {
    role: "AI / ML Workshop — IISc Bangalore",
    company: "Indian Institute of Science",
    location: "Bengaluru",
    period: "2024",
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
    period: "Oct 2024",
    type: "6-Day Offline",
    bullets: ["End-to-end AWS fundamentals: compute, storage, IAM and deployment."],
    tags: ["AWS", "Cloud"],
  },
  {
    role: "Embedded Systems Workshop",
    company: "Ignite Embedded Systems",
    location: "Offline",
    period: "2024",
    type: "6-Day Workshop",
    bullets: ["Hardware-software integration, microcontrollers and firmware basics."],
    tags: ["Embedded", "Hardware"],
  },
  {
    role: "Brand Representative",
    company: "Inno3Dtech (3D Printing Startup)",
    location: "Multiple Venues",
    period: "2023 — 2024",
    type: "Events & Exhibitions",
    bullets: [
      "Represented the startup at 8+ technical events and exhibitions.",
      "Generated qualified leads; conducted a 3-day offline workshop.",
    ],
    tags: ["Public Speaking", "3D Printing"],
  },
];

export const projects = [
  {
    title: "MERN E-Commerce Platform",
    description:
      "Full-stack commerce platform with Razorpay payments, optimized checkout and a 25% bump in transaction speed and satisfaction.",
    tech: ["MongoDB", "Express", "React", "Node", "TypeScript", "Firebase", "Tailwind"],
    date: "2025",
    github: "https://github.com/siddhardhaungarala/mern-ecommerce",
    demo: "https://siddhardhungarala.web.app",
    imagePrompt:
      "abstract 3D isometric e-commerce dashboard, rainbow gradient glow on dark violet background, futuristic UI, soft bloom, cinematic",
  },
  {
    title: "Hospital Landing Page",
    description:
      "Crafted a polished hospital marketing site in 72 hours — built on the MERN stack with Firebase Firestore powering the data layer.",
    tech: ["React", "TypeScript", "Firebase", "Firestore", "Tailwind"],
    date: "2024",
    github: "https://github.com/siddhardhaungarala/hospital-landing",
    demo: "https://siddhardhungarala.web.app",
    imagePrompt:
      "minimal medical landing page mockup floating in space, soft pink and blue rainbow lighting, glassmorphism",
  },
  {
    title: "Exam Cell Management",
    description:
      "Operations system for a college exam cell that cut administrative load by ~22%, with role-based dashboards and reports.",
    tech: ["PHP", "MySQLi", "JS", "Bootstrap", "HTML5", "CSS"],
    date: "2023",
    github: "https://github.com/siddhardhaungarala/exam-cell",
    demo: "",
    imagePrompt:
      "dashboard UI with charts and data tables glowing in violet and green, dark academic vibe, neon outlines, isometric",
  },
  {
    title: "To-Do & Task Scheduling Mobile App",
    description:
      "Cross-platform mobile app to schedule and track tasks across the day, backed by Firebase Realtime DB and Auth.",
    tech: ["Flutter", "Dart", "Firebase Realtime DB", "Firebase Auth"],
    date: "2024",
    github: "https://github.com/siddhardhaungarala/todo-flutter",
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
    github: "https://github.com/siddhardhaungarala/college-elibrary",
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
    github: "https://github.com/siddhardhaungarala/derma-clinic",
    demo: "https://siddhardhungarala.web.app",
    imagePrompt:
      "elegant clinic website mockup floating on a pastel pink and violet gradient, premium healthcare design",
  },
];

export const certifications = [
  "AI/ML Workshop — IISc Bangalore",
  "AWS Cloud Computing — APSSDC",
  "React Essential Training — LinkedIn Learning",
  "IT Essentials — Cisco",
  "IoT & IIoT — NPTEL",
  "Figma to WordPress — Udemy",
  "Agile with AI — LinkedIn",
  "Power BI — LinkedIn",
];
