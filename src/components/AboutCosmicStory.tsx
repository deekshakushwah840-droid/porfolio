import React, { useState, useEffect } from 'react';
import { DEVELOPER_PROFILE } from '../data/portfolioData';
import { AnimatedSectionHeader } from './ui/AnimatedSectionHeader';
import { CountUpStat } from './ui/CountUpStat';

export const AboutCosmicStory: React.FC = () => {
  const [activeSentence, setActiveSentence] = useState(0);

  const cosmicSentences = [
    "I am currently pursuing my B.Tech in Information Technology at Bansal Institute of Science and Technology (BGI Group, Bhopal), with a solid foundation in programming and real-world software problem solving.",
    "Driven by innovation and collaborative engineering, I earned the distinction of Global Nominee in the international NASA Space Apps Challenge Hackathon.",
    "Selected as Google Student Ambassador in my college, I actively foster developer initiatives, workshops, and peer collaboration across engineering departments.",
    "My core programming foundation is anchored in C++ and C, reinforced by verified credentials in Artificial Intelligence (Oracle AI Foundation Associate 2025) and C systems fundamentals (Simplilearn)."
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSentence((prev) => (prev < cosmicSentences.length - 1 ? prev + 1 : prev));
    }, 2200);
    return () => clearInterval(timer);
  }, [cosmicSentences.length]);

  return (
    <section id="about" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto select-none">
      {/* Animated Section Header with staggered title words and soft glow zone */}
      <AnimatedSectionHeader
        category="PROFILE & BACKGROUND"
        title="About Me"
        subtitle="Computer science engineering background, academic standing, and developer leadership from Bhopal, India."
        glowColor="blue"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Side: Progressive Narrative */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 sm:p-8 rounded-2xl cosmic-glass border border-blue-500/20 relative overflow-hidden shadow-[0_16px_40px_-15px_rgba(6,182,212,0.12)]">
            <div className="absolute top-0 right-0 w-64 h-64 bg-sky-600/10 rounded-full blur-3xl pointer-events-none" />

            <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 mb-6 flex items-center justify-between border-b border-white/5 pb-3">
              <span>PROFILE OVERVIEW // DEEKSHA KUSHWAH</span>
              <span className="text-sky-400 font-semibold">STATUS: VERIFIED</span>
            </div>

            <div className="space-y-5">
              {cosmicSentences.map((sentence, idx) => {
                const isRevealed = idx <= activeSentence;
                const isLatest = idx === activeSentence;

                return (
                  <div
                    key={idx}
                    className={`transition-all duration-700 ease-out flex items-start gap-3.5 ${
                      isRevealed
                        ? 'opacity-100 blur-0 translate-y-0'
                        : 'opacity-15 blur-sm translate-y-3'
                    }`}
                  >
                    <span
                      className={`text-xs font-mono font-bold mt-1 tabular-nums ${
                        isLatest ? 'text-sky-300' : 'text-slate-600'
                      }`}
                    >
                      {String(idx + 1).padStart(2, '0')}.
                    </span>
                    <p
                      className={`text-sm sm:text-base leading-relaxed ${
                        isLatest
                          ? 'text-slate-100 font-medium'
                          : 'text-slate-400'
                      }`}
                    >
                      {sentence}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Manual sentence indicator buttons */}
            <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between">
              <div className="flex gap-1.5">
                {cosmicSentences.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveSentence(i)}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${
                      i <= activeSentence ? 'w-6 bg-sky-400' : 'w-2 bg-slate-800'
                    }`}
                    aria-label={`Jump to sentence ${i + 1}`}
                  />
                ))}
              </div>
              <span className="text-[11px] font-mono text-slate-500">
                LOG {activeSentence + 1}/{cosmicSentences.length}
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Key Distinctions & Focus */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 rounded-xl cosmic-panel border border-blue-500/20 hover:border-sky-400/40 transition-all shadow-[0_10px_25px_-10px_rgba(6,182,212,0.1)]">
            <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 mb-1">
              CURRENT STATUS
            </div>
            <div className="text-base font-display font-bold text-slate-100">
              {DEVELOPER_PROFILE.currentStatus}
            </div>
            <div className="text-xs text-slate-400 mt-0.5">
              Bansal Institute of Science and Technology, Bhopal (BGI Group)
            </div>
            <div className="mt-3 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">Tenure: 2024–2028</span>
              <span className="text-sky-300 font-bold bg-sky-950/60 px-2 py-0.5 rounded border border-sky-500/30">
                CGPA: <CountUpStat targetValue={7.14} decimals={2} /> | SGPA: <CountUpStat targetValue={8.4} decimals={1} />
              </span>
            </div>
          </div>

          <div className="p-5 rounded-xl cosmic-panel border border-blue-500/20 hover:border-sky-400/40 transition-all shadow-[0_10px_25px_-10px_rgba(6,182,212,0.1)]">
            <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 mb-2">
              KEY HONORS & APPOINTMENTS
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-sky-400 mt-1 shrink-0 shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
                <div>
                  <div className="text-xs font-bold text-slate-200">
                    NASA Space Apps Challenge — Global Nominee
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Recognized in the prestigious international space hackathon.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-blue-400 mt-1 shrink-0 shadow-[0_0_8px_rgba(37,99,235,0.8)]" />
                <div>
                  <div className="text-xs font-bold text-slate-200">
                    Google Student Ambassador
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Selected in college to lead developer initiatives and workshops.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-xl cosmic-panel border border-blue-500/20 hover:border-sky-400/40 transition-all shadow-[0_10px_25px_-10px_rgba(6,182,212,0.1)]">
            <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 mb-1">
              LOCATION
            </div>
            <div className="text-xs sm:text-sm font-mono text-slate-200">
              {DEVELOPER_PROFILE.location}
            </div>
            <div className="text-[11px] font-mono text-sky-400 mt-0.5">
              Coordinates: {DEVELOPER_PROFILE.coordinates}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
