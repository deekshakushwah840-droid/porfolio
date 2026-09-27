import React, { useState } from 'react';
import { AnimatedSectionHeader } from './ui/AnimatedSectionHeader';
import { CountUpStat } from './ui/CountUpStat';

export const AcademicConstellation: React.FC = () => {
  const [selectedIdx, setSelectedIdx] = useState<number>(2); // Default to current B.Tech

  // Chronological order along the curved orbital trajectory:
  // 1. Secondary (10th) [2022] ───> 2. Senior Secondary (12th) [2024] ───> 3. B.Tech IT [2024 – 2028]
  const academicMilestones = [
    {
      id: "class-10",
      stage: "Secondary (10th)",
      year: "2022",
      institution: "Swastik Senior Sec. School, Vidisha",
      scoreValue: 76.4,
      scoreSuffix: "%",
      scoreDecimals: 1,
      metricLabel: "Board Exam Percentage",
      details: "Strong academic foundation in science, analytical thinking, and mathematics.",
      coordinate: "Milestone 01",
      level: "Secondary Schooling"
    },
    {
      id: "class-12",
      stage: "Senior Secondary (12th)",
      year: "2024",
      institution: "Navneet Gyan Mandir H.S. School, Vidisha",
      scoreValue: 70,
      scoreSuffix: "%",
      scoreDecimals: 0,
      metricLabel: "Higher Secondary Score",
      details: "Focus in science, advanced mathematics, and computational fundamentals.",
      coordinate: "Milestone 02",
      level: "Higher Secondary"
    },
    {
      id: "btech-it",
      stage: "B.Tech — Information Technology",
      year: "2024 – 2028",
      institution: "Bansal Institute of Science and Technology, Bhopal (BGI Group)",
      scoreValue: 7.14,
      scorePrefix: "CGPA: ",
      scoreDecimals: 2,
      sgpaValue: 8.4,
      metricLabel: "Latest SGPA: 8.4",
      details: "Rigorous engineering curriculum in C++, C, Computer Science fundamentals, and software development.",
      coordinate: "Milestone 03 (Current)",
      level: "Undergraduate Degree"
    }
  ];

  return (
    <section id="education" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto select-none overflow-hidden">
      {/* Animated Section Header with staggered title words and soft glow zone */}
      <AnimatedSectionHeader
        category="ACADEMIC BACKGROUND"
        title="Education"
        subtitle="Verified educational trajectory from secondary schooling to engineering degree along a chronological orbital path."
        glowColor="blue"
      />

      {/* Curved Orbital Path Visualization */}
      <div className="relative mb-16 px-4">
        {/* SVG Curved Glowing Orbital Path Line for Desktop */}
        <div className="hidden lg:block relative w-full h-36">
          <svg
            className="w-full h-full overflow-visible"
            viewBox="0 0 1000 120"
            fill="none"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="orbitalPathGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#0284c7" stop-opacity="0.3" />
                <stop offset="50%" stop-color="#38bdf8" stop-opacity="0.9" />
                <stop offset="100%" stop-color="#818cf8" stop-opacity="1" />
              </linearGradient>
              <filter id="pathGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="5" result="glow" />
                <feMerge>
                  <feMergeNode in="glow" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Faint Outer Orbit Guide */}
            <path
              d="M 50 100 Q 500 -10 950 80"
              stroke="#1e3a8a"
              strokeWidth="4"
              strokeDasharray="6 6"
              strokeOpacity="0.4"
            />

            {/* Glowing Active Orbital Trajectory Line */}
            <path
              d="M 50 100 Q 500 -10 950 80"
              stroke="url(#orbitalPathGrad)"
              strokeWidth="3"
              filter="url(#pathGlow)"
            />

            {/* Milestone Anchor Rings along the curve */}
            {/* 10th Anchor: x=150, y=70 */}
            <circle cx="160" cy="74" r="16" fill="#020617" stroke="#0284c7" strokeWidth="1.5" />
            <circle cx="160" cy="74" r="7" fill={selectedIdx === 0 ? "#38bdf8" : "#0284c7"} />

            {/* 12th Anchor: x=500, y=28 */}
            <circle cx="500" cy="30" r="16" fill="#020617" stroke="#38bdf8" strokeWidth="1.5" />
            <circle cx="500" cy="30" r="7" fill={selectedIdx === 1 ? "#38bdf8" : "#0284c7"} />

            {/* B.Tech Anchor: x=840, y=65 */}
            <circle cx="840" cy="68" r="20" fill="#020617" stroke="#818cf8" strokeWidth="2" />
            <circle cx="840" cy="68" r="9" fill={selectedIdx === 2 ? "#818cf8" : "#38bdf8"} />
            <circle cx="840" cy="68" r="26" fill="none" stroke="#818cf8" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" className="animate-spin [animation-duration:20s]" />
          </svg>

          {/* Interactive Clickable Hotspots for the 3 anchors */}
          <div className="absolute inset-0 flex justify-between px-12 pointer-events-auto">
            <button
              onClick={() => setSelectedIdx(0)}
              className="text-left cursor-pointer group focus:outline-none"
              style={{ transform: 'translate(40px, 85px)' }}
            >
              <span className="text-[11px] font-mono text-slate-400 group-hover:text-sky-300 transition-colors uppercase flex items-center gap-1.5">
                <span>2022</span>
                <span className="text-slate-600">·</span>
                <span>Secondary (10th)</span>
              </span>
            </button>

            <button
              onClick={() => setSelectedIdx(1)}
              className="text-center cursor-pointer group focus:outline-none"
              style={{ transform: 'translate(0px, 45px)' }}
            >
              <span className="text-[11px] font-mono text-slate-400 group-hover:text-sky-300 transition-colors uppercase flex items-center gap-1.5">
                <span>2024</span>
                <span className="text-slate-600">·</span>
                <span>Senior Secondary (12th)</span>
              </span>
            </button>

            <button
              onClick={() => setSelectedIdx(2)}
              className="text-right cursor-pointer group focus:outline-none"
              style={{ transform: 'translate(-30px, 85px)' }}
            >
              <span className="text-[11px] font-mono text-sky-300 font-semibold group-hover:text-white transition-colors uppercase flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                <span>2024 – 2028</span>
                <span className="text-slate-600">·</span>
                <span>B.Tech IT (Current)</span>
              </span>
            </button>
          </div>
        </div>

        {/* Milestone Cards arranged chronologically */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10 mt-6 lg:mt-0">
          {academicMilestones.map((item, idx) => {
            const isSelected = selectedIdx === idx;

            return (
              <div
                key={item.id}
                onClick={() => setSelectedIdx(idx)}
                className={`p-6 rounded-2xl cosmic-glass border cursor-pointer transition-all duration-300 relative group conic-border-wrap ${
                  isSelected
                    ? 'border-sky-400 shadow-[0_0_35px_rgba(56,189,248,0.28)] bg-[#0a162c]/95 scale-[1.02]'
                    : 'border-blue-500/20 hover:border-sky-400/40 bg-[#070e1c]/70 hover:bg-slate-900/60'
                }`}
              >
                {/* Orbital Milestone Node Header */}
                <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-3">
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`w-3.5 h-3.5 rounded-full transition-all ${
                        isSelected
                          ? 'bg-sky-300 shadow-[0_0_12px_3px_rgba(56,189,248,0.9)] animate-pulse'
                          : 'bg-blue-500/80 group-hover:bg-sky-400'
                      }`}
                    />
                    <span className="text-xs font-mono text-sky-400 uppercase font-semibold">
                      {item.stage}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-slate-400 font-medium">{item.year}</span>
                </div>

                <div className="text-xs text-slate-300 font-sans mb-4 min-h-[38px] leading-relaxed">
                  {item.institution}
                </div>

                {/* Score badge with cosmic glow & count-up animation */}
                <div className="p-3 rounded-xl bg-black/50 border border-blue-500/20 flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-400">{item.metricLabel}</span>
                  <span className="text-sm font-mono font-bold text-sky-300 bg-sky-950/60 px-2.5 py-0.5 rounded border border-sky-400/30">
                    <CountUpStat
                      targetValue={item.scoreValue}
                      decimals={item.scoreDecimals}
                      prefix={item.scorePrefix}
                      suffix={item.scoreSuffix}
                    />
                  </span>
                </div>

                <p className="text-xs text-slate-400 mt-3 font-sans leading-relaxed">
                  {item.details}
                </p>

                <div className="mt-4 pt-2.5 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-500">
                  <span>{item.coordinate}</span>
                  <span className="text-sky-400/80 font-semibold">VERIFIED RECORD</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
