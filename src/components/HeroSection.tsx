import React, { useState, useEffect } from 'react';
import { DEVELOPER_PROFILE } from '../data/portfolioData';
import { MagneticButton } from './ui/MagneticButton';
import { CountUpStat } from './ui/CountUpStat';

interface HeroSectionProps {
  onExploreMissions: () => void;
  onOpenTransmission: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreMissions,
  onOpenTransmission
}) => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [rolePhase, setRolePhase] = useState<'approaching' | 'focused' | 'departing'>('approaching');
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [isPoppedUp, setIsPoppedUp] = useState(false);

  // Sudden 3D pop-up entrance on load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPoppedUp(true);
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  // 3D role space-travel sequence:
  // Originates far in space -> zooms forward into sharp focus -> holds -> recedes back into deep space and fades
  useEffect(() => {
    setRolePhase('approaching');

    const focusTimer = setTimeout(() => {
      setRolePhase('focused');
    }, 750);

    const departTimer = setTimeout(() => {
      setRolePhase('departing');
    }, 3000);

    const nextRoleTimer = setTimeout(() => {
      setRoleIndex((prev) => (prev + 1) % DEVELOPER_PROFILE.titles.length);
    }, 3800);

    return () => {
      clearTimeout(focusTimer);
      clearTimeout(departTimer);
      clearTimeout(nextRoleTimer);
    };
  }, [roleIndex]);

  // Interactive 3D mouse parallax
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 16;
    setMouseOffset({ x, y });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
  };

  return (
    <section
      id="overview"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[94vh] flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden select-none"
    >
      {/* Subtle multi-stop gradient glow zone behind hero section */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 75% 55% at 50% 45%, rgba(6, 182, 212, 0.08) 0%, rgba(30, 58, 138, 0.06) 40%, rgba(139, 92, 246, 0.03) 65%, transparent 80%)'
        }}
      />

      {/* Background Cosmic Orbital Glyphs */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-25">
        <div className="w-[520px] h-[520px] sm:w-[720px] sm:h-[720px] rounded-full border border-sky-500/25 border-dashed animate-spin [animation-duration:80s]" />
        <div className="absolute w-[360px] h-[360px] sm:w-[540px] sm:h-[540px] rounded-full border border-blue-500/20 animate-spin [animation-duration:55s] [animation-direction:reverse]" />
        <div className="absolute w-[220px] h-[220px] sm:w-[320px] sm:h-[320px] rounded-full border border-blue-400/20 border-dotted" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center perspective-1500">
        {/* Cybernetic Badge with gentle pulsing aura */}
        <div className="inline-flex flex-wrap items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-blue-500/30 text-xs font-mono text-slate-300 mb-8 backdrop-blur-md badge-pulse-aura">
          <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse shadow-[0_0_8px_rgba(56,189,248,0.9)]" />
          <span className="text-slate-200 font-semibold">{DEVELOPER_PROFILE.location}</span>
          <span className="text-slate-600">·</span>
          <span className="text-sky-300">{DEVELOPER_PROFILE.currentStatus}</span>
        </div>

        {/* Real 3D Typography with SUDDEN POP-UP Entrance & Floating Drift */}
        <div
          className={`transform-style-3d mb-6 transition-all duration-700 ease-out ${
            isPoppedUp ? 'animate-floating-drift' : ''
          }`}
          style={{
            transform: isPoppedUp
              ? `rotateY(${mouseOffset.x}deg) rotateX(${-mouseOffset.y}deg) translateZ(10px)`
              : 'scale(0.3) translateZ(-350px) rotateX(15deg)',
            opacity: isPoppedUp ? 1 : 0,
            filter: isPoppedUp ? 'blur(0px)' : 'blur(10px)'
          }}
        >
          {/* Greeting */}
          <div className="text-sm sm:text-base md:text-lg font-mono tracking-widest text-sky-400/90 uppercase mb-2">
            Hi, I'm
          </div>

          {/* 3D Pop-Up Name */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-slate-100 via-sky-100 to-sky-300 drop-shadow-[0_12px_30px_rgba(2,6,23,0.9)]">
            Deeksha Kushwah
          </h1>
        </div>

        {/* 3D Role Space-Travel Sequence */}
        <div className="h-16 sm:h-20 flex items-center justify-center overflow-hidden mb-8 perspective-1000">
          <div
            className={`font-mono uppercase tracking-widest transition-all duration-700 ease-out ${
              rolePhase === 'approaching'
                ? 'opacity-0 scale-70 blur-md translate-y-8 translate-z-[-140px] text-slate-400'
                : rolePhase === 'focused'
                ? 'opacity-100 scale-100 blur-0 translate-y-0 translate-z-[0px] text-sky-200 shadow-sm'
                : 'opacity-0 scale-125 blur-lg -translate-y-8 translate-z-[120px] text-slate-500'
            }`}
          >
            <div className="flex items-center gap-3 text-lg sm:text-2xl md:text-3xl font-semibold">
              <span className="text-sky-400/60 font-mono text-sm tracking-normal">⟨</span>
              <span>{DEVELOPER_PROFILE.titles[roleIndex]}</span>
              <span className="text-sky-400/60 font-mono text-sm tracking-normal">⟩</span>
            </div>
          </div>
        </div>

        {/* Verified Mission Summary */}
        <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-300 leading-relaxed font-sans mb-10">
          {DEVELOPER_PROFILE.summary}
        </p>

        {/* CTA Buttons with magnetic hover effect */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <MagneticButton
            onClick={onExploreMissions}
            className="group px-6 py-3 text-xs sm:text-sm font-mono tracking-wider uppercase text-slate-100 bg-sky-950/80 hover:bg-sky-900 border border-sky-400/40 rounded-lg transition-colors duration-300 shadow-[0_0_20px_-3px_rgba(56,189,248,0.35)] overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              <span>View Projects</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </span>
          </MagneticButton>

          {/* Download Resume PDF Button */}
          <a
            href="/resume.pdf"
            download="Deeksha_Kushwah_Resume.pdf"
            target="_blank"
            rel="noreferrer noopener"
            className="px-6 py-3 text-xs sm:text-sm font-mono tracking-wider uppercase text-sky-200 hover:text-white bg-slate-900/90 hover:bg-slate-800 border border-sky-400/40 hover:border-sky-300 rounded-lg transition-all duration-200 shadow-[0_0_18px_rgba(56,189,248,0.2)] flex items-center gap-2 cursor-pointer"
          >
            <svg className="w-4 h-4 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>Download Resume</span>
          </a>

          <MagneticButton
            onClick={onOpenTransmission}
            className="px-6 py-3 text-xs sm:text-sm font-mono tracking-wider uppercase text-slate-200 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-blue-500/20 hover:border-sky-400/30 rounded-lg transition-colors duration-200 shadow-[0_0_15px_rgba(56,189,248,0.1)]"
          >
            Contact Me
          </MagneticButton>

          <a
            href={DEVELOPER_PROFILE.github}
            target="_blank"
            rel="noreferrer noopener"
            className="px-5 py-3 text-xs sm:text-sm font-mono tracking-wider uppercase text-slate-400 hover:text-sky-300 border border-transparent hover:border-blue-500/20 rounded-lg transition-all duration-200 flex items-center gap-1.5"
          >
            <span>GitHub</span>
            <span>↗</span>
          </a>

          <a
            href={DEVELOPER_PROFILE.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            className="px-5 py-3 text-xs sm:text-sm font-mono tracking-wider uppercase text-slate-400 hover:text-sky-300 border border-transparent hover:border-blue-500/20 rounded-lg transition-all duration-200 flex items-center gap-1.5"
          >
            <span>LinkedIn</span>
            <span>↗</span>
          </a>
        </div>

        {/* Telemetry Coordinate Footer with CountUp numbers */}
        <div className="mt-14 pt-8 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
          <div className="p-3.5 rounded-xl cosmic-panel border border-blue-500/15">
            <div className="text-[11px] font-mono uppercase text-slate-500 tracking-wider">
              Academic Standing
            </div>
            <div className="text-sm font-mono font-bold text-slate-200 mt-0.5">
              CGPA: <CountUpStat targetValue={7.14} decimals={2} />
            </div>
            <div className="text-[10px] text-sky-400 truncate">
              Latest SGPA: <CountUpStat targetValue={8.4} decimals={1} />
            </div>
          </div>

          <div className="p-3.5 rounded-xl cosmic-panel border border-blue-500/15">
            <div className="text-[11px] font-mono uppercase text-slate-500 tracking-wider">
              Hackathon Recognition
            </div>
            <div className="text-sm font-mono font-bold text-slate-200 mt-0.5">
              Global Nominee
            </div>
            <div className="text-[10px] text-sky-400 truncate">
              NASA Space Apps
            </div>
          </div>

          <div className="p-3.5 rounded-xl cosmic-panel border border-blue-500/15">
            <div className="text-[11px] font-mono uppercase text-slate-500 tracking-wider">
              Campus Leadership
            </div>
            <div className="text-sm font-mono font-bold text-slate-200 mt-0.5">
              Ambassador
            </div>
            <div className="text-[10px] text-sky-400 truncate">
              Google Student Program
            </div>
          </div>

          <div className="p-3.5 rounded-xl cosmic-panel border border-blue-500/15">
            <div className="text-[11px] font-mono uppercase text-slate-500 tracking-wider">
              Location
            </div>
            <div className="text-sm font-mono font-bold text-slate-200 mt-0.5">
              Bhopal, India
            </div>
            <div className="text-[10px] text-sky-400 truncate">
              BGI Group
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
