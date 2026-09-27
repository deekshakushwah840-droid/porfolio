import React, { useState } from 'react';
import { HACKATHON_MISSIONS } from '../data/portfolioData';
import { HackathonMission } from '../types/portfolio';
import { AnimatedSectionHeader } from './ui/AnimatedSectionHeader';

export const HackathonUniverse: React.FC = () => {
  const [selectedHackathon, setSelectedHackathon] = useState<HackathonMission | null>(null);

  return (
    <section id="hackathons" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto select-none">
      {/* Animated Section Header with staggered title words and soft glow zone */}
      <AnimatedSectionHeader
        category="COMPETITIVE SPRINT ENGINEERING"
        title="Hackathons"
        subtitle="Competitive hackathon participation and rapid collaborative software development."
        glowColor="blue"
      />

      {/* Hackathons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {HACKATHON_MISSIONS.map((hackathon) => (
          <div
            key={hackathon.id}
            onClick={() => setSelectedHackathon(hackathon)}
            className="p-7 rounded-2xl cosmic-glass border border-blue-500/20 hover:border-sky-400/60 relative overflow-hidden transition-all duration-300 hover:shadow-[0_0_35px_rgba(56,189,248,0.2)] group cursor-pointer conic-border-wrap"
          >
            {/* Ambient Nebula Light */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-sky-600/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center justify-between text-[11px] font-mono mb-4 border-b border-white/5 pb-3">
              <span className="text-sky-300 font-semibold">{hackathon.scope}</span>
              <span className="text-slate-400">{hackathon.category}</span>
            </div>

            <h3 className="text-xl font-display font-bold text-slate-100 group-hover:text-sky-200 transition-colors mb-2">
              {hackathon.title}
            </h3>

            <div className="text-xs font-mono text-sky-400/90 mb-4">
              Category: {hackathon.category}
            </div>

            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed mb-6">
              {hackathon.description}
            </p>

            <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-500">EVENT DETAILS</span>
              <span className="text-sky-400 group-hover:text-sky-200 flex items-center gap-1.5 font-semibold">
                <span>View Details</span>
                <span>↗</span>
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Pop-Up Modal for Hackathon Details */}
      {selectedHackathon && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-2xl animate-in fade-in duration-200 select-none"
          onClick={() => setSelectedHackathon(null)}
        >
          <div
            className="relative w-full max-w-xl rounded-2xl bg-[#030712]/95 border border-sky-400/30 p-6 sm:p-8 shadow-[0_0_50px_rgba(56,189,248,0.25)] text-slate-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
              <span className="text-xs font-mono uppercase text-sky-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                <span>{selectedHackathon.category}</span>
              </span>
              <button
                onClick={() => setSelectedHackathon(null)}
                className="text-xs font-mono text-slate-400 hover:text-white px-2 py-1 rounded border border-white/10 cursor-pointer"
              >
                ✕ ESC
              </button>
            </div>

            <h3 className="text-2xl font-display font-bold text-slate-100 mb-1">
              {selectedHackathon.title}
            </h3>
            <div className="text-xs font-mono text-sky-300 mb-4">
              {selectedHackathon.category} · Scope: {selectedHackathon.scope}
            </div>

            <p className="text-sm text-slate-300 font-sans leading-relaxed mb-6">
              {selectedHackathon.description}
            </p>

            <div className="p-4 rounded-xl bg-black/50 border border-blue-500/20 text-xs font-mono text-slate-300 mb-6">
              <span className="text-sky-400 block mb-1 uppercase text-[10px]">
                Technical Agility & Sprint Execution
              </span>
              Hands-on engineering under strict hackathon time boundaries, collaborating with team members to deliver working software solutions.
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setSelectedHackathon(null)}
                className="px-4 py-2 text-xs font-mono uppercase text-slate-100 bg-sky-950 hover:bg-sky-900 border border-sky-500/40 rounded-lg transition-colors cursor-pointer"
              >
                Close Details [ESC]
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
