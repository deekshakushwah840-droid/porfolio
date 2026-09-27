import React, { useState, useEffect, useRef } from 'react';
import { SKILLS_ROW_PROGRAMMING, SKILLS_ROW_TOOLS } from '../data/portfolioData';
import { SkillNode } from '../types/portfolio';
import { AnimatedSectionHeader } from './ui/AnimatedSectionHeader';

export const TechnologyGalaxy: React.FC = () => {
  const allSkills: SkillNode[] = [...SKILLS_ROW_PROGRAMMING, ...SKILLS_ROW_TOOLS];
  const [activeSkill, setActiveSkill] = useState<SkillNode>(SKILLS_ROW_PROGRAMMING[0]);
  const [isPaused, setIsPaused] = useState(false);
  const [orbitAngle, setOrbitAngle] = useState(0);
  const [displayMode, setDisplayMode] = useState<'orbital' | 'marquee'>('orbital');

  const requestRef = useRef<number | null>(null);

  // Smooth continuous slow rotation for orbital layout
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const animateOrbit = () => {
      if (!isPaused) {
        setOrbitAngle((prev) => (prev + 0.35) % 360);
      }
      requestRef.current = requestAnimationFrame(animateOrbit);
    };

    requestRef.current = requestAnimationFrame(animateOrbit);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isPaused]);

  // Seamless repeated loop arrays for marquee mode
  const row1Items = [
    ...SKILLS_ROW_PROGRAMMING,
    ...SKILLS_ROW_PROGRAMMING,
    ...SKILLS_ROW_PROGRAMMING,
    ...SKILLS_ROW_PROGRAMMING,
    ...SKILLS_ROW_PROGRAMMING,
    ...SKILLS_ROW_PROGRAMMING
  ];
  const row2Items = [
    ...SKILLS_ROW_TOOLS,
    ...SKILLS_ROW_TOOLS,
    ...SKILLS_ROW_TOOLS,
    ...SKILLS_ROW_TOOLS
  ];

  return (
    <section id="skills" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto select-none overflow-hidden">
      {/* Animated Section Header with staggered title words and soft glow zone */}
      <AnimatedSectionHeader
        category="TECHNICAL SKILLS"
        title="Skills"
        subtitle="Programming languages, development tools, and engineering competencies arranged in continuous orbital paths."
        glowColor="cyan"
      />

      {/* View Switcher Controls */}
      <div className="flex items-center justify-center gap-3 mb-10">
        <button
          onClick={() => setDisplayMode('orbital')}
          className={`px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-2 ${
            displayMode === 'orbital'
              ? 'bg-sky-950/90 text-sky-200 border border-sky-400/50 shadow-[0_0_15px_rgba(56,189,248,0.3)]'
              : 'bg-slate-900/60 text-slate-400 hover:text-white border border-white/5'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
          <span>Orbital View</span>
        </button>

        <button
          onClick={() => setDisplayMode('marquee')}
          className={`px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-2 ${
            displayMode === 'marquee'
              ? 'bg-sky-950/90 text-sky-200 border border-sky-400/50 shadow-[0_0_15px_rgba(56,189,248,0.3)]'
              : 'bg-slate-900/60 text-slate-400 hover:text-white border border-white/5'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-blue-400" />
          <span>Stream View</span>
        </button>

        {displayMode === 'orbital' && (
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="px-3.5 py-2 rounded-lg text-xs font-mono text-slate-400 hover:text-white bg-slate-900/40 border border-white/10 hover:border-sky-400/30 transition-colors cursor-pointer"
            title="Toggle orbital rotation"
          >
            {isPaused ? 'Resume Orbit' : 'Pause Orbit'}
          </button>
        )}
      </div>

      {displayMode === 'orbital' ? (
        /* ORBITAL LAYOUT: Skill nodes revolving around a glowing central systems core */
        <div
          className="relative w-full max-w-4xl mx-auto h-[540px] sm:h-[620px] rounded-3xl cosmic-glass border border-blue-500/25 p-6 flex items-center justify-center overflow-hidden mb-12 shadow-[0_20px_60px_-15px_rgba(56,189,248,0.15)]"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Subtle multi-layer galaxy backdrop in container */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-950/30 via-slate-950/40 to-transparent pointer-events-none" />

          {/* Concentric Orbit Guide Rings */}
          {/* Orbit 1: Programming Ring (Radius: 130px / 165px) */}
          <div className="absolute w-[260px] h-[260px] sm:w-[330px] sm:h-[330px] rounded-full border border-sky-500/25 border-dashed pointer-events-none" />

          {/* Orbit 2: Tools & Skills Ring (Radius: 210px / 265px) */}
          <div className="absolute w-[420px] h-[420px] sm:w-[530px] sm:h-[530px] rounded-full border border-blue-500/20 border-dotted pointer-events-none" />

          {/* Central System Core */}
          <div className="relative z-10 w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-slate-950/90 border border-sky-400/50 flex flex-col items-center justify-center text-center p-2 shadow-[0_0_35px_rgba(56,189,248,0.4)] backdrop-blur-xl">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-300 animate-pulse mb-1 shadow-[0_0_10px_rgba(56,189,248,0.9)]" />
            <span className="text-[10px] font-mono text-sky-300 font-bold uppercase tracking-wider">
              CORE
            </span>
            <span className="text-[9px] font-mono text-slate-400 leading-tight">
              Systems
            </span>
          </div>

          {/* Orbiting Ring 1: Programming Nodes (C++, C) */}
          {SKILLS_ROW_PROGRAMMING.map((skill, index) => {
            const baseAngle = index * 180;
            const currentAngleRad = ((baseAngle + orbitAngle) * Math.PI) / 180;
            const radius = typeof window !== 'undefined' && window.innerWidth < 640 ? 130 : 165;
            const x = Math.cos(currentAngleRad) * radius;
            const y = Math.sin(currentAngleRad) * radius;
            const isSelected = activeSkill.name === skill.name;

            return (
              <div
                key={skill.name}
                onClick={() => setActiveSkill(skill)}
                style={{
                  transform: `translate(${x}px, ${y}px)`
                }}
                className={`absolute z-20 group flex items-center gap-2.5 px-4 py-2 rounded-xl cursor-pointer transition-transform duration-100 ease-out select-none backdrop-blur-md border ${
                  isSelected
                    ? 'bg-slate-900/95 border-sky-400 shadow-[0_0_25px_rgba(56,189,248,0.4)] scale-110'
                    : 'bg-[#070e1c]/85 border-sky-500/30 hover:border-sky-400 hover:scale-105 shadow-[0_4px_15px_rgba(0,0,0,0.5)]'
                }`}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full shadow-[0_0_8px_rgba(56,189,248,0.9)]"
                  style={{ backgroundColor: skill.color }}
                />
                <div className="text-left">
                  <div className="text-xs sm:text-sm font-display font-bold text-slate-100 group-hover:text-sky-200">
                    {skill.name}
                  </div>
                  <div className="text-[9px] font-mono text-sky-400/90 uppercase tracking-tight">
                    Programming
                  </div>
                </div>
              </div>
            );
          })}

          {/* Orbiting Ring 2: Tools & Competencies (GitHub, VS Code, Problem-Solving, Team, Communication) */}
          {SKILLS_ROW_TOOLS.map((skill, index) => {
            const baseAngle = index * (360 / SKILLS_ROW_TOOLS.length);
            // Reverse rotation direction for visual interest
            const currentAngleRad = ((baseAngle - orbitAngle * 0.75) * Math.PI) / 180;
            const radius = typeof window !== 'undefined' && window.innerWidth < 640 ? 210 : 265;
            const x = Math.cos(currentAngleRad) * radius;
            const y = Math.sin(currentAngleRad) * radius;
            const isSelected = activeSkill.name === skill.name;

            return (
              <div
                key={skill.name}
                onClick={() => setActiveSkill(skill)}
                style={{
                  transform: `translate(${x}px, ${y}px)`
                }}
                className={`absolute z-20 group flex items-center gap-2 px-3.5 py-1.5 rounded-xl cursor-pointer transition-transform duration-100 ease-out select-none backdrop-blur-md border ${
                  isSelected
                    ? 'bg-slate-900/95 border-blue-400 shadow-[0_0_25px_rgba(37,99,235,0.4)] scale-110'
                    : 'bg-[#070e1c]/85 border-blue-500/25 hover:border-blue-400 hover:scale-105 shadow-[0_4px_15px_rgba(0,0,0,0.5)]'
                }`}
              >
                <span
                  className="w-2 h-2 rounded-full shadow-[0_0_8px_rgba(37,99,235,0.9)]"
                  style={{ backgroundColor: skill.color }}
                />
                <div className="text-left">
                  <div className="text-xs font-display font-bold text-slate-100 group-hover:text-sky-200 whitespace-nowrap">
                    {skill.name}
                  </div>
                  <div className="text-[8.5px] font-mono text-slate-400 uppercase tracking-tight">
                    {skill.category === 'Tools & Platforms' ? 'Tools' : 'Soft Skills'}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Telemetry Guide Label */}
          <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-[11px] font-mono text-slate-500 border-t border-white/5 pt-2">
            <span>INNER: PROGRAMMING · OUTER: TOOLS &amp; SOFT SKILLS</span>
            <span className="text-sky-400/80">HOVER TO PAUSE ROTATION</span>
          </div>
        </div>
      ) : (
        /* MARQUEE STREAM VIEW */
        <div className="space-y-8 mb-14">
          {/* FRAME 1: Programming (Moves LEFT → RIGHT) */}
          <div className="rounded-2xl cosmic-glass border border-blue-500/20 p-6 relative overflow-hidden shadow-[0_16px_40px_-15px_rgba(56,189,248,0.15)] marquee-container">
            <div className="flex items-center justify-between text-xs font-mono mb-4 border-b border-white/5 pb-2 text-slate-400">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
                <span className="text-slate-200 uppercase font-semibold">Row 1: Programming Languages</span>
              </span>
              <span className="text-[11px] text-sky-400">Direction: Left → Right · Hover to pause</span>
            </div>

            <div className="overflow-hidden py-2">
              <div className="animate-marquee-ltr flex items-center gap-6">
                {row1Items.map((skill, index) => {
                  const isSelected = activeSkill?.name === skill.name;

                  return (
                    <div
                      key={`${skill.name}-${index}`}
                      onClick={() => setActiveSkill(skill)}
                      onMouseEnter={() => setActiveSkill(skill)}
                      className={`group relative flex items-center gap-3 px-6 py-3.5 rounded-xl cursor-pointer border transition-all duration-300 backdrop-blur-md select-none ${
                        isSelected
                          ? 'bg-slate-900/90 border-sky-400 shadow-[0_0_25px_rgba(56,189,248,0.35)] scale-105'
                          : 'bg-[#070e1c]/70 border-blue-500/15 hover:border-sky-400/50 hover:bg-slate-900/60'
                      }`}
                    >
                      <span
                        className="w-2.5 h-2.5 rounded-full shadow-[0_0_8px_rgba(56,189,248,0.8)]"
                        style={{ backgroundColor: skill.color }}
                      />
                      <div className="whitespace-nowrap">
                        <div className="text-sm sm:text-base font-display font-bold text-slate-100 group-hover:text-sky-200">
                          {skill.name}
                        </div>
                        <div className="text-[10px] font-mono text-slate-400">
                          {skill.category}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* FRAME 2: Tools & Skills (Moves RIGHT → LEFT) */}
          <div className="rounded-2xl cosmic-glass border border-blue-500/20 p-6 relative overflow-hidden shadow-[0_16px_40px_-15px_rgba(37,99,235,0.15)] marquee-container">
            <div className="flex items-center justify-between text-xs font-mono mb-4 border-b border-white/5 pb-2 text-slate-400">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
                <span className="text-slate-200 uppercase font-semibold">Row 2: Tools & Core Competencies</span>
              </span>
              <span className="text-[11px] text-blue-400">Direction: Right → Left · Hover to pause</span>
            </div>

            <div className="overflow-hidden py-2">
              <div className="animate-marquee-rtl flex items-center gap-6">
                {row2Items.map((skill, index) => {
                  const isSelected = activeSkill?.name === skill.name;

                  return (
                    <div
                      key={`${skill.name}-${index}`}
                      onClick={() => setActiveSkill(skill)}
                      onMouseEnter={() => setActiveSkill(skill)}
                      className={`group relative flex items-center gap-3 px-6 py-3.5 rounded-xl cursor-pointer border transition-all duration-300 backdrop-blur-md select-none ${
                        isSelected
                          ? 'bg-slate-900/90 border-blue-400 shadow-[0_0_25px_rgba(37,99,235,0.35)] scale-105'
                          : 'bg-[#070e1c]/70 border-blue-500/15 hover:border-blue-400/50 hover:bg-slate-900/60'
                      }`}
                    >
                      <span
                        className="w-2.5 h-2.5 rounded-full shadow-[0_0_8px_rgba(37,99,235,0.8)]"
                        style={{ backgroundColor: skill.color }}
                      />
                      <div className="whitespace-nowrap">
                        <div className="text-sm sm:text-base font-display font-bold text-slate-100 group-hover:text-sky-200">
                          {skill.name}
                        </div>
                        <div className="text-[10px] font-mono text-slate-400">
                          {skill.category}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Programming Languages Focus (C and C++) */}
      <div className="p-6 sm:p-8 rounded-2xl cosmic-panel border border-blue-500/25 mb-10 relative overflow-hidden backdrop-blur-xl">
        <div className="flex items-center justify-between text-xs font-mono mb-6 border-b border-white/5 pb-3">
          <span className="text-sky-300 uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
            <span>CORE PROGRAMMING LANGUAGES // C & C++</span>
          </span>
          <span className="text-[11px] text-slate-500">SYSTEMS & ALGORITHMS</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
          {/* Constellation Link Line between C and C++ */}
          <div className="hidden md:block absolute top-1/2 left-1/4 right-1/4 h-0.5 -translate-y-1/2 bg-gradient-to-r from-sky-400/60 via-blue-400/40 to-sky-400/60 border-t border-dashed border-sky-300/40 pointer-events-none" />

          {/* Node 1: C++ */}
          <div
            onClick={() => setActiveSkill(SKILLS_ROW_PROGRAMMING[0])}
            className={`p-5 rounded-xl border transition-all cursor-pointer group ${
              activeSkill.name === 'C++'
                ? 'bg-slate-900/90 border-sky-400 shadow-[0_0_25px_rgba(56,189,248,0.25)]'
                : 'bg-black/50 border-sky-500/30 hover:border-sky-400'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className="w-4 h-4 rounded-full bg-sky-300 shadow-[0_0_12px_3px_rgba(56,189,248,0.9)] animate-pulse" />
                <h4 className="text-xl font-display font-bold text-slate-100 group-hover:text-sky-200">
                  C++
                </h4>
              </div>
              <span className="text-[10px] font-mono text-sky-400 uppercase">Core Systems</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
              Algorithmic problem-solving, data structures, and computational system logic. Used extensively in student grading and performance computation.
            </p>
          </div>

          {/* Node 2: C */}
          <div
            onClick={() => setActiveSkill(SKILLS_ROW_PROGRAMMING[1])}
            className={`p-5 rounded-xl border transition-all cursor-pointer group ${
              activeSkill.name === 'C'
                ? 'bg-slate-900/90 border-blue-400 shadow-[0_0_25px_rgba(37,99,235,0.25)]'
                : 'bg-black/50 border-blue-500/30 hover:border-sky-400'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className="w-4 h-4 rounded-full bg-blue-400 shadow-[0_0_12px_3px_rgba(37,99,235,0.9)] animate-pulse" />
                <h4 className="text-xl font-display font-bold text-slate-100 group-hover:text-sky-200">
                  C
                </h4>
              </div>
              <span className="text-[10px] font-mono text-blue-400 uppercase">Memory & Logic</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
              Procedural architecture, pointers, direct memory allocation, and computational thinking verified by Simplilearn certification.
            </p>
          </div>
        </div>
      </div>

      {/* Selected Skill Detail HUD */}
      {activeSkill && (
        <div className="p-5 rounded-xl cosmic-panel border border-blue-500/30 max-w-xl mx-auto backdrop-blur-xl transition-all shadow-[0_10px_30px_rgba(2,6,23,0.8)]">
          <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2">
            <span className="text-xs font-mono uppercase text-sky-300 tracking-wider">
              SKILL DETAILS // {activeSkill.name}
            </span>
            <span className="text-[10px] font-mono text-slate-400 font-semibold">{activeSkill.category}</span>
          </div>
          <div className="text-xs font-mono text-slate-300 mb-1">{activeSkill.role}</div>
          <p className="text-xs text-slate-400 font-sans">{activeSkill.description}</p>
        </div>
      )}
    </section>
  );
};
