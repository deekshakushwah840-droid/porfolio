import React from 'react';
import { ACHIEVEMENTS } from '../data/portfolioData';
import { AnimatedSectionHeader } from './ui/AnimatedSectionHeader';

export const AchievementsCosmicEvents: React.FC = () => {
  return (
    <section id="achievements" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto select-none">
      {/* Animated Section Header with staggered title words and soft glow zone */}
      <AnimatedSectionHeader
        category="HONORS & RECOGNITION"
        title="Achievements"
        subtitle="Key milestone recognitions recorded across international hackathons and campus engineering leadership."
        glowColor="violet"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {ACHIEVEMENTS.map((item) => {
          const isSupernova = item.eventClass === 'Supernova';

          return (
            <div
              key={item.id}
              className={`p-7 rounded-2xl cosmic-glass border relative overflow-hidden transition-all duration-300 hover:scale-[1.01] conic-border-wrap ${
                isSupernova
                  ? 'border-cyan-500/40 shadow-[0_16px_40px_-15px_rgba(6,182,212,0.22)] bg-gradient-to-b from-cyan-950/30 via-slate-900/60 to-black/80'
                  : 'border-violet-500/30 bg-slate-900/60 shadow-[0_16px_40px_-15px_rgba(139,92,246,0.18)]'
              }`}
            >
              {/* Event Class Indicator with pulsing aura */}
              <div className="flex items-center justify-between text-[11px] font-mono mb-4 border-b border-white/5 pb-3">
                <span className="flex items-center gap-2">
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      isSupernova
                        ? 'bg-cyan-300 shadow-[0_0_12px_3px_rgba(6,182,212,0.9)] animate-pulse'
                        : 'bg-violet-400 shadow-[0_0_10px_rgba(139,92,246,0.8)]'
                    }`}
                  />
                  <span className="text-cyan-300 font-bold uppercase tracking-wider">
                    {isSupernova ? 'INTERNATIONAL DISTINCTION' : 'CAMPUS LEADERSHIP'}
                  </span>
                </span>
                <span className="text-slate-500">{item.year}</span>
              </div>

              <h3 className="text-xl font-display font-bold text-slate-100 mb-1">
                {item.title}
              </h3>

              <div className="text-xs font-mono text-cyan-400/90 mb-3">
                {item.organization}
              </div>

              <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed mb-6">
                {item.details}
              </p>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-500">IMPACT LEVEL</span>
                <span className="text-slate-200 font-semibold">{item.impact}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
