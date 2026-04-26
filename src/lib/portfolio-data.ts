export const siteConfig = {
  name: "Ayan Ali Khan",
  role: "Full-Stack Developer",
  tagline: "Crafting digital experiences with code and creativity",
  email: "scoutayan853@gmail.com",
  available: true,
  socials: {
    github: "https://github.com/AyanAlikhan11",
    linkedin: "https://www.linkedin.com/in/ayan-ali-khan1",
    instagram: "https://www.instagram.com/scout_ayan",
    twitter: "https://x.com/ayan_khan31351",
  },
};

export const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "My Work", href: "#work" },
  { name: "Contact", href: "#contact" },
];

export const services = [
  {
    title: "Web Development",
    description:
      "Building responsive, performant web applications with modern frameworks. From single-page apps to complex enterprise platforms, I deliver clean, maintainable code.",
    icon: "Globe",
  },
  {
    title: "AI/IoT",
    description:
      "Integrating AI into products. From building intelligent chatbots to developing innovative hardware models, I bridge the gap between smart technology and real-world needs.",
    icon: "Brain",
  },
  {
    title: "UI/UX Design",
    description:
      "Creating intuitive, beautiful interfaces that users love. I focus on accessibility, interaction design, and crafting pixel-perfect experiences across all devices.",
    icon: "Palette",
  },
];

export const projects = [
  {
    title: "ARVEZA Store",
    description:
      "Full-stack e-commerce platform with product management, authentication, cart system, and admin dashboard.",
    fullDescription:
      "A production-level e-commerce platform featuring secure authentication, dynamic product listing, cart and checkout system, admin panel for product and order management, and optimized UI performance. Integrated cloud-based image storage and scalable backend architecture.",
    image: "/projects/arveza.png",
      gradient: "from-violet-500/20 via-purple-500/10 to-fuchsia-500/20",
    gradientDark: "dark:from-violet-500/10 dark:via-purple-500/5 dark:to-fuchsia-500/10",
    techStack: ["Next.js", "TypeScript", "Firebase", "Cloudinary", "Tailwind CSS"],
    liveUrl: "https://www.arveza.store",
    githubUrl: "https://github.com/AyanAlikhan11/ARVEZA",
    features: [
      "Admin product management system",
      "Secure authentication",
      "Cart & checkout flow",
      "Cloud image uploads",
    ],
  },

  {
    title: "Sky Avenue Afterparty",
    description:
      "Modern event landing website with responsive design, animations, and high-performance UI.",
    fullDescription:
      "A production-ready event and landing platform built with modern UI principles. Focused on performance, responsiveness, and visual appeal with smooth animations and optimized user experience across all devices.",
    
    image: "/projects/skyavenue.png",
    gradient: "from-emerald-500/20 via-teal-500/10 to-cyan-500/20",
    gradientDark: "dark:from-emerald-500/10 dark:via-teal-500/5 dark:to-cyan-500/10",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    liveUrl: "https://www.skyavenueafterparty.in",
    githubUrl: "https://github.com/AyanAlikhan11/skyavenue.git",
    features: [
      "Responsive landing design",
      "Smooth UI",
      "Optimized performance",
      "Modern UI/UX layout",
    ],
  },

  {
    title: "The Aethon Group",
    description:
      "Corporate frontend website with modern UI, reusable components, and smooth animations.",
    fullDescription:
      "A corporate web platform currently under active development focusing on clean UI architecture, reusable components, and high-performance frontend design. Emphasis on scalability and interactive user experience.",
    
    image: "/projects/thearthon.png",
    gradient: "from-sky-500/20 via-cyan-500/10 to-teal-500/20",
    gradientDark: "dark:from-sky-500/10 dark:via-cyan-500/5 dark:to-teal-500/10",
    techStack: ["React", "Next.js", "Tailwind CSS", "Framer Motion"],
    liveUrl: "https://the-aethon-group.vercel.app/",
    githubUrl: "https://github.com/AyanAlikhan11/TheAethon-Group.git",
    features: [
      "Reusable UI components",
      "Modern animations",
      "Responsive design system",
      "Performance optimized frontend",
    ],
  },

  {
    title: "Rapid Rescuers",
    description:
      "Real-time emergency blood donor matching system using geolocation and smart filtering.",
    fullDescription:
      "A life-saving platform that connects hospitals with nearby blood donors in real time using geolocation tracking, Google Maps integration, and intelligent matching algorithms. Designed to reduce emergency response time significantly.",
    
    image: "/projects/rapidrescuers.png",
    gradient: "from-rose-500/20 via-pink-500/10 to-orange-500/20",
    gradientDark: "dark:from-rose-500/10 dark:via-pink-500/5 dark:to-orange-500/10",
    techStack: ["Next.js", "Firebase", "Google Maps API", "TypeScript", "Node.js"],
    liveUrl: "https://rapid-rescuers.vercel.app/",
    githubUrl: "https://github.com/AyanAlikhan11/Rapid-Rescuers.git",
    features: [
      "Real-time donor matching",
      "Google Maps integration",
      "Location-based filtering",
      "Emergency response optimization",
    ],
  },

  {
    title: "NOWCAST (News + Weather App)",
    description:
      "API-based application combining real-time news and weather forecasting.",
    fullDescription:
      "A dynamic application that fetches live news and weather data using external APIs. Includes clean UI, caching logic, and optimized data fetching for real-time updates.",
    
    image: "/projects/nowcast.jpeg",
    gradient: "from-amber-500/20 via-yellow-500/10 to-lime-500/20",
    gradientDark: "dark:from-amber-500/10 dark:via-yellow-500/5 dark:to-lime-500/10",
    techStack: ["React", "Node.js", "Express", "APIs", "JavaScript"],
    liveUrl: "https://github.com/AyanAlikhan11/Nowcast",
    githubUrl: "https://github.com/AyanAlikhan11/Nowcast",
    features: [
      "Live news API integration",
      "Weather forecasting system",
      "Fast API response handling",
      "Clean responsive UI",
    ],
  },

  {
    title: "Smart IoT Object Detection System",
    description:
      "IoT-based smart object detection system integrated with Google Vision API.",
    fullDescription:
      "An IoT + AI powered system that detects objects in real-time using camera input and Google Vision API. Designed for smart automation and monitoring use cases with edge-device support.",
    
    image: "/projects/img7.jpeg",
    gradient: "from-indigo-500/20 via-blue-500/10 to-cyan-500/20",
    gradientDark: "dark:from-indigo-500/10 dark:via-blue-500/5 dark:to-cyan-500/10",
    techStack: ["IoT", "Python", "Google Vision API", "AI/ML", "Sensors"],
    liveUrl: "",
    githubUrl: "https://www.linkedin.com/posts/ayan-ali-khan1_sheeramcharan-innovation-iot-activity-7448395320541208576-v7zL",
    features: [
      "Real-time object detection",
      "Google Vision API integration",
      "IoT sensor connectivity",
      "AI-based processing pipeline",
    ],
  },
];

export const skills = [
  { name: "Next.js", category: "Frontend" },
  { name: "TypeScript", category: "Language" },
  { name: "Tailwind CSS", category: "Frontend" },
  { name: "Node.js", category: "Backend" },
  { name: "Firebase", category: "Database" },
  { name: "Python", category: "Language" },
  { name: "C", category: "Language" },
  { name: "HTML", category: "Language" },
  { name: "CSS", category: "Language" },
  { name: "JavaScript", category: "Language" },

];

export const experience = [
  {
  role: "Full-Stack Developer",
  company: "ARVEZA Store / Sky Avenue Afterparty / Rapid Rescuers",
  companyUrl: "https://github.com/AyanAlikhan11?tab=repositories",
  period: "2025 — Present",
  description:
    "Built and contributed to multiple production-grade full-stack applications:\n\n" +
    "• ARVEZA Store – Developed a complete e-commerce platform with authentication, product management, cart system, admin dashboard, and cloud image uploads.\n\n" +
    "• Sky Avenue Afterparty – Built a modern event landing page with responsive UI, optimized performance, and smooth animations for enhanced user experience.\n\n" +
    "• Rapid Rescuers (GDGoC STCET TechSprint) – Designed a real-time emergency blood donor matching system using geolocation and Google Maps API, improving response efficiency by up to 70% and securing 8th position in hackathon.",
  techStack: ["Next.js", "TypeScript", "Firebase", "Cloudinary", "Tailwind CSS"],
},

  {
    role: "IoT Developer",
    company: "Smart Object Detection System",
    companyUrl:
      "https://www.linkedin.com/posts/ayan-ali-khan1_sheeramcharan-innovation-iot-activity-7448395320541208576-v7zL",
    period: "2024",
    description:
      "Developed an IoT-based smart object detection system integrated with Google Vision API. Enabled real-time object recognition using camera input and cloud-based AI processing for smart automation and monitoring.",
    techStack: ["IoT", "Google Vision API", "Python", "AI/ML", "Sensors", "Edge Computing"],
  },

  {
    role: "Web Development Coordinator",
    company: "GDGoC STCET (Google Developer Group on Campus)",
    companyUrl: "https://gdgoncampus.stcet.ac.in/#/team",
    period: "2025 — Present",
    description:
      "Serving as Web Development Coordinator at GDGoC STCET, leading and contributing to web development initiatives, organizing technical sessions, and collaborating on student-driven projects and hackathons.",
    techStack: ["Leadership", "Web Development", "Community Building", "React", "Next.js"],
  },

  {
    role: "Certification",
    company: "Google Cloud Study Jam 2025",
    companyUrl: "https://www.linkedin.com/posts/ayan-ali-khan1_googlecloud-gcp-gdg-activity-7394260808483913728-vjrg?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFTGmUwBFgskltgUJsQUyBrkXB922LZ36s0",
    period: "2025",
    description:
      "Completed Google Cloud Study Jam 2025, gaining hands-on experience with cloud infrastructure, deployment, and core Google Cloud services.",
    techStack: ["Google Cloud", "Cloud Computing", "DevOps Basics"],
  },
];

export const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "VP of Engineering, TechNova Inc.",
    avatar: "SM",
    content:
      "Alex is one of the most talented developers I've worked with. He doesn't just write code — he architects solutions that scale. His work on our analytics platform migration was nothing short of exceptional, delivering ahead of schedule with zero critical bugs.",
    rating: 5,
  },
  {
    name: "David Park",
    role: "CTO, DataFlow Labs",
    avatar: "DP",
    content:
      "What sets Alex apart is his ability to bridge the gap between technical complexity and business value. He built our AI dashboard in record time, and our clients loved it. He's a rare combination of deep technical skills and excellent communication.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Product Manager, PixelCraft",
    avatar: "ER",
    content:
      "Working with Alex was a game-changer for our agency. He elevated the quality of every project he touched and mentored our junior developers. His attention to detail and commitment to clean code made him the go-to person for our most demanding clients.",
    rating: 5,
  },
  {
    name: "James Liu",
    role: "Founder, StartUp Hub",
    avatar: "JL",
    content:
      "Alex joined us when we were just an idea on a napkin. He built our entire MVP almost single-handedly and his work was instrumental in us securing our seed round. He's the kind of developer every startup needs — fast, reliable, and endlessly creative.",
    rating: 5,
  },
];

export const aboutText = {
  headline: "Passionate about building products that make a difference",
  paragraphs: [
    "I'm a full-stack developer with 1+ years of experience turning ideas into polished, production-ready software. I specialize in building modern web applications that combine beautiful design with powerful functionality.",
    "My approach blends technical expertise with a deep understanding of user needs. Whether it's architecting scalable backends, crafting responsive frontends, or building intelligent conversational interfaces/AI, I focus on delivering solutions that are both elegant and effective.",
    "When I'm not coding, you'll find me exploring open-source projects, designing and building innovative hardware models. I also enjoy participating in technical competitions, where I translate complex ideas into visual posters and working prototypes. I believe in continuous learning and sharing knowledge with the developer community.",
  ],
};
