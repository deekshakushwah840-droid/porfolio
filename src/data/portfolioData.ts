import { ProjectMission, SkillNode, EducationRecord, CertificationStar, HackathonMission, AchievementEvent } from '../types/portfolio';

export const DEVELOPER_PROFILE = {
  name: "Deeksha Kushwah",
  tagline: "Developer Portfolio Inside a Living Digital Galaxy",
  location: "Bhopal, Madhya Pradesh, India",
  coordinates: "23.2599° N, 77.4126° E",
  currentStatus: "B.Tech IT, Information Technology",
  email: "deekshakushwah840@gmail.com",
  phone: "+91 7024042808",
  github: "https://github.com/Deeksha-kushwah",
  githubUsername: "Deeksha-kushwah",
  linkedin: "https://www.linkedin.com/in/deeksha-kushwah",
  linkedinUsername: "Deeksha Kushwah",
  summary: "Currently pursuing my B.Tech in Information Technology with hackathon experience, a solid foundation in C++/C, and a genuine passion for real-world technology solutions through continuous learning and teamwork.",
  titles: [
    "IT Student",
    "C++/C Developer",
    "Hackathon Participant",
    "Problem Solver"
  ],
  stats: [
    { label: "Academic Standing", value: "CGPA: 7.14", detail: "Latest SGPA: 8.4" },
    { label: "Hackathon Recognition", value: "Global Nominee", detail: "NASA Space Apps" },
    { label: "Campus Leadership", value: "Ambassador", detail: "Google Student Program" },
    { label: "Spatial Coordinate", value: "Bhopal, India", detail: "BGI Group" }
  ]
};

export const EDUCATION_DATA: EducationRecord[] = [
  {
    id: "btech-it",
    degree: "B.Tech — Information Technology",
    institution: "Bansal Institute of Science and Technology, Bhopal (BGI Group)",
    period: "2024 – 2028",
    score: "CGPA: 7.14",
    scoreLabel: "Latest SGPA: 8.4",
    details: "Foundational engineering coursework in C++, C, Computer Science principles, and algorithmic problem solving.",
    orbitDistance: "ORBIT 01 // INNER CORE"
  },
  {
    id: "senior-secondary-12th",
    degree: "Senior Secondary (12th)",
    institution: "Navneet Gyan Mandir H.S. School, Vidisha",
    period: "2024",
    score: "70%",
    scoreLabel: "Board Examination",
    details: "Focus in science, advanced mathematics, and computational fundamentals.",
    orbitDistance: "ORBIT 02 // MID APOGEE"
  },
  {
    id: "secondary-10th",
    degree: "Secondary (10th)",
    institution: "Swastik Senior Sec. School, Vidisha",
    period: "2022",
    score: "76.4%",
    scoreLabel: "Secondary Education",
    details: "Strong academic foundation in science, analytical thinking, and mathematics.",
    orbitDistance: "ORBIT 03 // ORIGIN TRAJECTORY"
  }
];

// Dual Marquee Verified Skills (Row 1: Programming, Row 2: Tools & Skills)
export const SKILLS_ROW_PROGRAMMING: SkillNode[] = [
  {
    name: "C++",
    category: "Programming",
    role: "Core Computational Systems & Algorithms",
    color: "#38bdf8",
    description: "Algorithmic problem-solving, data structures, and computational system logic."
  },
  {
    name: "C",
    category: "Programming",
    role: "Foundational Memory & Low-Level Logic",
    color: "#06b6d4",
    description: "Memory allocation, pointers, and structured procedural programming."
  }
];

export const SKILLS_ROW_TOOLS: SkillNode[] = [
  {
    name: "GitHub",
    category: "Tools & Platforms",
    role: "Version Control & Code Collaboration",
    color: "#f8fafc",
    description: "Git source version control, branching workflows, and open-source collaboration."
  },
  {
    name: "Visual Studio Code",
    category: "Tools & Platforms",
    role: "Primary Development IDE",
    color: "#818cf8",
    description: "Integrated development workspace for C++, C, debugging, and terminal workflows."
  },
  {
    name: "Problem-Solving",
    category: "Core Engineering",
    role: "Algorithmic & Analytical Thinking",
    color: "#c084fc",
    description: "Deconstructing complex technical problems into structured, reliable logic."
  },
  {
    name: "Team Collaboration",
    category: "Core Engineering",
    role: "Multi-Disciplinary Innovation",
    color: "#93c5fd",
    description: "Sprint coordination in intense competitive hackathons like NASA Space Apps & SIH."
  },
  {
    name: "Communication",
    category: "Core Engineering",
    role: "Technical Articulation & Community",
    color: "#a5b4fc",
    description: "Presenting solutions effectively and engaging as a Google Student Ambassador."
  }
];

export const PROJECT_MISSIONS: ProjectMission[] = [
  {
    id: "silent-mode-detector",
    missionNumber: "MISSION 01",
    name: "Silent Mode Detector For Missed Call",
    designation: "Smart Mobile Application Designed for Women's Safety",
    status: "Operational",
    category: "Mobile Systems / Women Safety",
    coordinates: "CYGNI-ALPHA // SECTOR 01",
    shortDesc: "A smart Android mobile application designed for women's safety, detecting urgent missed calls in silent mode to trigger automated emergency escalation.",
    fullDesc: "Engineered in Kotlin using Android Studio to tackle emergency situations where calls go unheeded because a phone is on silent mode. The application implements background telephony listener services to monitor incoming call frequencies from designated contacts. Upon detecting consecutive missed alerts within a threshold timeframe, it automatically overrides mute constraints, escalates system volume to maximum, and triggers vital acoustic alerts.",
    keyFeatures: [
      "Background incoming call frequency detection via Android Telephony APIs",
      "Dynamic system audio override switching device from silent mode to emergency acoustic alert",
      "Priority contact configuration for urgent alert triggering",
      "Optimized battery consumption through native broadcast listeners"
    ],
    technologies: ["Kotlin", "Android Studio"],
    architecture: "Event-driven background service topology with native Android broadcast receiver listening for missed call frequency thresholds.",
    metrics: [
      { label: "Target Platform", value: "Android Native" },
      { label: "Core Stack", value: "Kotlin / Studio" },
      { label: "Mission Objective", value: "Women Safety" }
    ]
  },
  {
    id: "dspace-ai",
    missionNumber: "MISSION 02",
    name: "DSPACE",
    designation: "AI-Powered React Dynamic Interaction Platform",
    status: "Active",
    category: "AI & Web Architecture",
    coordinates: "ORION-NEBULA // SECTOR 02",
    shortDesc: "A React-based dynamic interface utilizing AI for interactive data exploration, contextual reasoning, and real-time query rendering.",
    fullDesc: "DSPACE is an intelligent web application built with React that bridges users with artificial intelligence for fluid data interaction. Designed with responsive state management and dynamic UI rendering, the system enables users to submit information queries and receive dynamically structured synthesis and contextual representations.",
    keyFeatures: [
      "Dynamic AI-assisted data query pipeline with structured visual outputs",
      "Responsive state architecture built with React and modular component design",
      "Interactive data cards with animated parameter adjustments and real-time feedback",
      "Seamless integration of modern web technologies with asynchronous AI endpoints"
    ],
    technologies: ["React", "AI Integration"],
    architecture: "Client-side React architecture communicating with intelligent asynchronous backend pipelines with reactive UI updates.",
    metrics: [
      { label: "Interface Engine", value: "React" },
      { label: "Data Pipeline", value: "AI Dynamic Sync" },
      { label: "Query Architecture", value: "Reactive State" }
    ]
  },
  {
    id: "student-grading-system",
    missionNumber: "MISSION 03",
    name: "Student Management Grading System",
    designation: "Computational Academic Records & Evaluation Engine",
    status: "Complete",
    category: "Core Systems / Algorithmic C++",
    coordinates: "ANDROMEDA // SECTOR 03",
    shortDesc: "A robust computational records and automated evaluation platform built in C++ featuring weighted grade algorithms and structured persistent records.",
    fullDesc: "Developed to provide high computational integrity for academic institutions. Implements structured data management in C++, allowing efficient student profile insertion, searching, multi-subject weighted GPA/CGPA computation, rank ordering, and formatted report card generation with file stream persistence.",
    keyFeatures: [
      "Algorithmic grading and GPA/CGPA calculation based on customizable academic rubrics",
      "Persistent file stream storage for secure student records",
      "Optimized search and retrieval algorithms for student record lookup",
      "Terminal reporting with structured grade distribution analysis"
    ],
    technologies: ["C++", "Data Structures"],
    architecture: "Modular C++ architecture utilizing Object-Oriented principles, file stream serialization for record persistence, and sorting algorithms for student ranking.",
    metrics: [
      { label: "Core Language", value: "C++" },
      { label: "Persistence", value: "File Streams" },
      { label: "Grade Compute", value: "Algorithmic" }
    ]
  }
];

export const CERTIFICATIONS: CertificationStar[] = [
  {
    id: "oracle-ai-2025",
    title: "Oracle AI Foundation Associate (2025)",
    issuer: "Oracle University",
    year: "2025",
    type: "Artificial Intelligence & Cloud",
    description: "Official credential validating comprehensive understanding of foundational Artificial Intelligence concepts, machine learning workflows, deep learning architectures, and generative AI paradigms.",
    skillsCovered: ["Artificial Intelligence", "Machine Learning", "Neural Networks", "Generative AI"],
    starSpectral: "Spectral Class B (Cosmic Cyan & Deep Blue)"
  },
  {
    id: "simplilearn-c",
    title: "C-Basics Fundamental",
    issuer: "Simplilearn",
    year: "2024",
    type: "Systems Programming & Algorithms",
    description: "Certification covering computational thinking, memory allocation, pointer manipulation, structured programming, and algorithm design in C.",
    skillsCovered: ["C Programming", "Pointers & Memory", "Control Structures", "Data Arrays"],
    starSpectral: "Spectral Class A (Starlight Silver)"
  }
];

export const HACKATHON_MISSIONS: HackathonMission[] = [
  {
    id: "nasa-online-hackathon",
    title: "NASA Online Hackathon",
    category: "Global Space Innovation",
    scope: "Aerospace & Earth Data",
    description: "Participated in global space innovation challenge, leveraging computational problem-solving and space telemetry data under strict sprint constraints.",
    trajectory: "EXPEDITION TRAJECTORY 01"
  },
  {
    id: "college-hackathons-sih",
    title: "College Hackathons, including SIH",
    category: "National & Collegiate Challenges",
    scope: "Real-World Tech Solutions",
    description: "Competed in high-intensity college hackathons including the Smart India Hackathon (SIH), designing and demonstrating functional prototypes under rapid turnaround times.",
    trajectory: "EXPEDITION TRAJECTORY 02"
  }
];

export const ACHIEVEMENTS: AchievementEvent[] = [
  {
    id: "global-nominee-nasa",
    title: "Global Nominee — NASA Space Apps Challenge Hackathon",
    eventClass: "Supernova",
    organization: "NASA Space Apps Challenge Hackathon",
    year: "2024",
    impact: "International Recognition",
    details: "Achieved the prestigious distinction of Global Nominee in the international NASA Space Apps Challenge Hackathon, honored among thousands of participating teams worldwide."
  },
  {
    id: "google-ambassador",
    title: "Google Student Ambassador",
    eventClass: "Planetary",
    organization: "Bansal Institute of Science and Technology",
    year: "Current",
    impact: "Campus Tech Leadership",
    details: "Selected as Google Student Ambassador in college to represent Google developer initiatives, foster tech innovation, and mentor peers across engineering disciplines."
  }
];
