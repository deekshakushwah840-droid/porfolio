import React, { useEffect } from 'react';
import { ProjectMission } from '../types/portfolio';

interface MissionDetailModalProps {
  mission: ProjectMission | null;
  onClose: () => void;
}

export const MissionDetailModal: React.FC<MissionDetailModalProps> = ({ mission, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (mission) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mission, onClose]);

  if (!mission) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-2xl animate-in fade-in duration-200 select-none"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#030712]/95 border border-white/15 p-6 sm:p-8 shadow-[0_0_50px_rgba(6,182,212,0.2)] text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Telemetry */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
            <span className="text-xs font-mono tracking-widest text-cyan-300 uppercase">
              {mission.missionNumber} // {mission.coordinates}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-md border border-white/10 hover:border-white/30 transition-colors cursor-pointer text-xs font-mono"
            aria-label="Close telemetry modal"
          >
            ✕ ESC
          </button>
        </div>

        {/* Mission Identification */}
        <div className="mb-6">
          <div className="text-xs font-mono uppercase text-slate-400 mb-1">
            {mission.category}
          </div>
          <h3 className="text-2xl sm:text-3xl font-display font-bold text-slate-100">
            {mission.name}
          </h3>
          <p className="text-xs sm:text-sm font-mono text-cyan-300 mt-1">
            {mission.designation}
          </p>
        </div>

        {/* Mission Metrics HUD */}
        {mission.metrics && (
          <div className="grid grid-cols-3 gap-3 mb-6">
            {mission.metrics.map((metric, i) => (
              <div key={i} className="p-3 rounded-lg bg-black/50 border border-white/5">
                <div className="text-[10px] font-mono text-slate-500 uppercase">
                  {metric.label}
                </div>
                <div className="text-sm font-mono font-bold text-slate-200 mt-0.5">
                  {metric.value}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Detailed Project Architecture Narrative */}
        <div className="space-y-4 mb-6">
          <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 border-b border-white/5 pb-1">
            Project Architecture & Implementation
          </h4>
          <p className="text-sm text-slate-300 leading-relaxed font-sans">
            {mission.fullDesc}
          </p>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-cyan-500/20 text-xs font-mono text-slate-300">
            <span className="text-cyan-400 block mb-1 uppercase text-[10px]">
              Architecture & System Flow
            </span>
            {mission.architecture}
          </div>
        </div>

        {/* Key Features */}
        <div className="space-y-3 mb-6">
          <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 border-b border-white/5 pb-1">
            Key Features & Capabilities
          </h4>
          <ul className="space-y-2">
            {mission.keyFeatures.map((feature, i) => (
              <li key={i} className="flex items-start gap-2.5 text-xs text-slate-300 font-sans">
                <span className="text-cyan-400 font-mono mt-0.5">›</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Technologies Deployed - Zero Pill format */}
        <div className="mb-8 pt-4 border-t border-white/10">
          <div className="text-[10px] font-mono uppercase text-slate-500 mb-2">
            Technologies Deployed
          </div>
          <div className="text-xs font-mono text-slate-300 flex flex-wrap gap-x-2 gap-y-1">
            {mission.technologies.map((tech, idx) => (
              <React.Fragment key={tech}>
                <span className="text-slate-200 font-medium">{tech}</span>
                {idx < mission.technologies.length - 1 && (
                  <span className="text-slate-600" aria-hidden="true">·</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Modal Footer (No fabricated project links) */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
          <div className="text-xs font-mono text-slate-500">
            DEVELOPER: DEEKSHA KUSHWAH
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-mono uppercase text-slate-100 bg-cyan-950 hover:bg-cyan-900 border border-cyan-500/40 rounded-lg transition-colors cursor-pointer"
          >
            Close [ESC]
          </button>
        </div>
      </div>
    </div>
  );
};
