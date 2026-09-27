import { jsPDF } from "jspdf";
import fs from "fs";
import path from "path";

// Ensure public directory exists
const publicDir = path.resolve("./public");
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const doc = new jsPDF({
  orientation: "portrait",
  unit: "mm",
  format: "a4",
});

const pageWidth = 210;
const pageHeight = 297;
const margin = 16;
const contentWidth = pageWidth - margin * 2;

// Professional Palette (Deep Navy / Slate / Accent Cyan)
const primaryColor = [15, 23, 42]; // #0f172a
const accentColor = [2, 132, 199]; // #0284c7
const textColor = [51, 65, 85]; // #334155
const mutedColor = [100, 116, 139]; // #64748b

let y = 18;

// Header: Name & Contact
doc.setFont("helvetica", "bold");
doc.setFontSize(22);
doc.setTextColor(...primaryColor);
doc.text("DEEKSHA KUSHWAH", margin, y);

y += 6;
doc.setFont("helvetica", "normal");
doc.setFontSize(10);
doc.setTextColor(...accentColor);
doc.text("B.Tech Information Technology Student · C++/C Developer · Problem Solver", margin, y);

y += 5;
doc.setFontSize(8.5);
doc.setTextColor(...textColor);
const contactLine = "Bhopal, Madhya Pradesh, India  |  +91 7024042808  |  deekshakushwah840@gmail.com";
doc.text(contactLine, margin, y);

y += 4.5;
const linksLine = "GitHub: github.com/Deeksha-kushwah  |  LinkedIn: linkedin.com/in/deeksha-kushwah";
doc.text(linksLine, margin, y);

y += 4;
doc.setDrawColor(226, 232, 240);
doc.setLineWidth(0.4);
doc.line(margin, y, pageWidth - margin, y);

// Section Header Helper
function addSectionHeader(title) {
  y += 7;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(...primaryColor);
  doc.text(title.toUpperCase(), margin, y);
  
  y += 1.5;
  doc.setDrawColor(...accentColor);
  doc.setLineWidth(0.6);
  doc.line(margin, y, margin + 45, y);
  
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.2);
  doc.line(margin + 45, y, pageWidth - margin, y);
  y += 4.5;
}

// 1. EDUCATION
addSectionHeader("Education");

// B.Tech
doc.setFont("helvetica", "bold");
doc.setFontSize(9.5);
doc.setTextColor(...primaryColor);
doc.text("B.Tech in Information Technology", margin, y);
doc.setFont("helvetica", "normal");
doc.setTextColor(...mutedColor);
doc.text("2024 – 2028", pageWidth - margin, y, { align: "right" });

y += 4;
doc.setFontSize(8.5);
doc.setTextColor(...textColor);
doc.text("Bansal Institute of Science and Technology, Bhopal (BGI Group)", margin, y);
doc.setFont("helvetica", "bold");
doc.setTextColor(...accentColor);
doc.text("CGPA: 7.14  (Latest SGPA: 8.4)", pageWidth - margin, y, { align: "right" });

y += 3.8;
doc.setFont("helvetica", "normal");
doc.setTextColor(...textColor);
doc.text("Coursework: C++, C Programming, Data Structures, Computer Science Principles, Algorithmic Logic", margin, y);

// 12th
y += 5;
doc.setFont("helvetica", "bold");
doc.setFontSize(9.5);
doc.setTextColor(...primaryColor);
doc.text("Senior Secondary (12th Grade)", margin, y);
doc.setFont("helvetica", "normal");
doc.setTextColor(...mutedColor);
doc.text("2024", pageWidth - margin, y, { align: "right" });

y += 4;
doc.setFontSize(8.5);
doc.setTextColor(...textColor);
doc.text("Navneet Gyan Mandir H.S. School, Vidisha", margin, y);
doc.setFont("helvetica", "bold");
doc.setTextColor(...accentColor);
doc.text("Score: 70%", pageWidth - margin, y, { align: "right" });

// 10th
y += 5;
doc.setFont("helvetica", "bold");
doc.setFontSize(9.5);
doc.setTextColor(...primaryColor);
doc.text("Secondary (10th Grade)", margin, y);
doc.setFont("helvetica", "normal");
doc.setTextColor(...mutedColor);
doc.text("2022", pageWidth - margin, y, { align: "right" });

y += 4;
doc.setFontSize(8.5);
doc.setTextColor(...textColor);
doc.text("Swastik Senior Sec. School, Vidisha", margin, y);
doc.setFont("helvetica", "bold");
doc.setTextColor(...accentColor);
doc.text("Score: 76.4%", pageWidth - margin, y, { align: "right" });

// 2. TECHNICAL SKILLS
addSectionHeader("Technical Skills");

doc.setFont("helvetica", "bold");
doc.setFontSize(8.5);
doc.setTextColor(...primaryColor);
doc.text("Programming Languages:", margin, y);
doc.setFont("helvetica", "normal");
doc.setTextColor(...textColor);
doc.text("C++, C (Systems & Algorithmic Problem Solving, Memory Management, Pointers)", margin + 42, y);

y += 4.5;
doc.setFont("helvetica", "bold");
doc.setTextColor(...primaryColor);
doc.text("Development Tools:", margin, y);
doc.setFont("helvetica", "normal");
doc.setTextColor(...textColor);
doc.text("GitHub (Version Control, Branching, Collaboration), Visual Studio Code", margin + 42, y);

y += 4.5;
doc.setFont("helvetica", "bold");
doc.setTextColor(...primaryColor);
doc.text("Core Competencies:", margin, y);
doc.setFont("helvetica", "normal");
doc.setTextColor(...textColor);
doc.text("Problem-Solving, Team Collaboration, Analytical Thinking, Technical Communication", margin + 42, y);

// 3. PROJECTS
addSectionHeader("Technical Projects");

// Project 1: Silent Mode Detector
doc.setFont("helvetica", "bold");
doc.setFontSize(9.5);
doc.setTextColor(...primaryColor);
doc.text("Silent Mode Detector For Missed Call", margin, y);
doc.setFont("helvetica", "normal");
doc.setTextColor(...mutedColor);
doc.text("Android Studio · Kotlin", pageWidth - margin, y, { align: "right" });

y += 4;
doc.setFontSize(8.5);
doc.setTextColor(...textColor);
const p1Lines = [
  "• Engineered an Android mobile application dedicated to women's safety during critical emergency scenarios.",
  "• Implemented background telephony listeners detecting repeated incoming missed calls from urgent contacts.",
  "• Programmed dynamic system volume escalation overriding device mute mode to trigger audible alert alarms."
];
p1Lines.forEach(line => {
  doc.text(line, margin, y);
  y += 3.8;
});

// Project 2: DSPACE
y += 2;
doc.setFont("helvetica", "bold");
doc.setFontSize(9.5);
doc.setTextColor(...primaryColor);
doc.text("DSPACE — Dynamic AI Interaction Platform", margin, y);
doc.setFont("helvetica", "normal");
doc.setTextColor(...mutedColor);
doc.text("React · Web Architecture · AI Integration", pageWidth - margin, y, { align: "right" });

y += 4;
doc.setFontSize(8.5);
doc.setTextColor(...textColor);
const p2Lines = [
  "• Developed an interactive web application leveraging React and asynchronous AI pipeline connectivity.",
  "• Designed modular responsive components providing intuitive query input, real-time feedback, and dynamic rendering.",
  "• Implemented clean UI state management and user-guided data exploration cards."
];
p2Lines.forEach(line => {
  doc.text(line, margin, y);
  y += 3.8;
});

// Project 3: Student Management Grading System
y += 2;
doc.setFont("helvetica", "bold");
doc.setFontSize(9.5);
doc.setTextColor(...primaryColor);
doc.text("Student Management Grading System", margin, y);
doc.setFont("helvetica", "normal");
doc.setTextColor(...mutedColor);
doc.text("C++ · Algorithms · File Streams", pageWidth - margin, y, { align: "right" });

y += 4;
doc.setFontSize(8.5);
doc.setTextColor(...textColor);
const p3Lines = [
  "• Built an automated academic evaluation system in C++ utilizing object-oriented principles and structured data models.",
  "• Implemented weighted GPA/CGPA grading algorithms, sorting routines for student ranking, and query filters.",
  "• Designed persistent file stream serialization enabling reliable storage and automated report card export."
];
p3Lines.forEach(line => {
  doc.text(line, margin, y);
  y += 3.8;
});

// 4. CERTIFICATIONS
addSectionHeader("Certifications");

doc.setFont("helvetica", "bold");
doc.setFontSize(8.5);
doc.setTextColor(...primaryColor);
doc.text("Oracle AI Foundation Associate", margin, y);
doc.setFont("helvetica", "normal");
doc.setTextColor(...mutedColor);
doc.text("Oracle University  |  2025", pageWidth - margin, y, { align: "right" });

y += 3.8;
doc.setTextColor(...textColor);
doc.text("Covers Artificial Intelligence foundations, Machine Learning concepts, Neural Networks, and Generative AI paradigms.", margin, y);

y += 4.5;
doc.setFont("helvetica", "bold");
doc.setTextColor(...primaryColor);
doc.text("C-Basics Fundamental", margin, y);
doc.setFont("helvetica", "normal");
doc.setTextColor(...mutedColor);
doc.text("Simplilearn  |  2024", pageWidth - margin, y, { align: "right" });

y += 3.8;
doc.setTextColor(...textColor);
doc.text("Covers memory management, pointer manipulation, structured computational flow, and procedural algorithms in C.", margin, y);

// 5. ACHIEVEMENTS & EXTRACURRICULAR
addSectionHeader("Achievements & Leadership");

doc.setFont("helvetica", "bold");
doc.setFontSize(8.5);
doc.setTextColor(...primaryColor);
doc.text("Global Nominee — NASA Space Apps Challenge Hackathon", margin, y);
doc.setFont("helvetica", "normal");
doc.setTextColor(...mutedColor);
doc.text("International Recognition  |  2024", pageWidth - margin, y, { align: "right" });

y += 3.8;
doc.setTextColor(...textColor);
doc.text("Nominated globally in the prestigious NASA Space Apps Challenge Hackathon for collaborative engineering innovation.", margin, y);

y += 4.5;
doc.setFont("helvetica", "bold");
doc.setTextColor(...primaryColor);
doc.text("Google Student Ambassador", margin, y);
doc.setFont("helvetica", "normal");
doc.setTextColor(...mutedColor);
doc.text("Campus Leadership  |  Current", pageWidth - margin, y, { align: "right" });

y += 3.8;
doc.setTextColor(...textColor);
doc.text("Selected to represent Google student developer initiatives, mentor peers, and organize technical knowledge sessions on campus.", margin, y);

y += 4.5;
doc.setFont("helvetica", "bold");
doc.setTextColor(...primaryColor);
doc.text("Collegiate & National Hackathons Participant (including SIH)", margin, y);
doc.setFont("helvetica", "normal");
doc.setTextColor(...mutedColor);
doc.text("Competitions", pageWidth - margin, y, { align: "right" });

y += 3.8;
doc.setTextColor(...textColor);
doc.text("Actively competed in fast-paced software hackathons including Smart India Hackathon (SIH), building functional prototypes.", margin, y);

// Output to file
const pdfBuffer = Buffer.from(doc.output("arraybuffer"));
fs.writeFileSync(path.join(publicDir, "resume.pdf"), pdfBuffer);
console.log("Generated /public/resume.pdf successfully!");
