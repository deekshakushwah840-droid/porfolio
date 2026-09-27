import React, { useEffect } from 'react';
import { DEVELOPER_PROFILE, EDUCATION_DATA, SKILLS_ROW_PROGRAMMING, SKILLS_ROW_TOOLS, PROJECT_MISSIONS, CERTIFICATIONS, HACKATHON_MISSIONS, ACHIEVEMENTS } from '../data/portfolioData';

interface TelemetryDossierModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TelemetryDossierModal: React.FC<TelemetryDossierModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-2xl animate-in fade-in duration-200 select-none"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-2xl bg-[#030712]/95 border border-white/20 p-6 sm:p-10 shadow-[0_0_60px_rgba(6,182,212,0.25)] text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Ribbon */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
            <span className="text-xs font-mono tracking-widest text-cyan-300 uppercase">
              DEVELOPER PROFILE // VERIFIED RESUME
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => window.print()}
              className="text-xs font-mono text-slate-400 hover:text-white px-2.5 py-1 rounded border border-white/10 hover:border-white/30 cursor-pointer"
            >
              Print / Save PDF
            </button>
            <button
              onClick={onClose}
              className="text-xs font-mono text-slate-400 hover:text-white px-2.5 py-1 rounded border border-white/10 hover:border-white/30 cursor-pointer"
              aria-label="Close modal"
            >
              ✕ ESC
            </button>
          </div>
        </div>

        {/* Identity Section */}
        <div className="mb-8">
          <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-1">
            PROFILE SUMMARY
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-100">
            {DEVELOPER_PROFILE.name}
          </h2>
          <div className="text-xs font-mono text-slate-400 mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
            <span>{DEVELOPER_PROFILE.location}</span>
            <span className="text-slate-600">·</span>
            <span>{DEVELOPER_PROFILE.email}</span>
            <span className="text-slate-600">·</span>
            <span>{DEVELOPER_PROFILE.phone}</span>
          </div>
        </div>

        {/* Professional Summary */}
        <div className="mb-8 p-4 rounded-xl bg-slate-950/60 border border-white/5">
          <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
            Professional Summary
          </h4>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
            {DEVELOPER_PROFILE.summary}
          </p>
        </div>

        {/* Education History (Verified figures) */}
        <div className="mb-8 space-y-4">
          <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-300 border-b border-white/10 pb-2">
            Education (Corrected Verified Figures)
          </h4>
          <div className="space-y-3">
            {EDUCATION_DATA.map((edu) => (
              <div key={edu.id} className="p-3.5 rounded-lg bg-black/40 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="text-sm font-display font-bold text-slate-100">
                    {edu.degree}
                  </div>
                  <div className="text-xs text-slate-400">
                    {edu.institution}
                  </div>
                </div>
                <div className="text-xs font-mono text-right sm:text-right">
                  <div className="text-slate-400">{edu.period}</div>
                  <div className="text-cyan-300 font-semibold">{edu.score} {edu.scoreLabel ? `(${edu.scoreLabel})` : ''}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Capabilities (No fabricated web-dev skills) */}
        <div className="mb-8 space-y-3">
          <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-300 border-b border-white/10 pb-2">
            Technical Capabilities
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
            <div className="p-3 rounded-lg bg-black/40 border border-white/5">
              <span className="text-slate-500 block text-[10px] uppercase">Programming</span>
              <span className="text-slate-200 mt-1 block">
                {SKILLS_ROW_PROGRAMMING.map(s => s.name).join(', ')}
              </span>
            </div>
            <div className="p-3 rounded-lg bg-black/40 border border-white/5">
              <span className="text-slate-500 block text-[10px] uppercase">Tools & Engineering Skills</span>
              <span className="text-slate-200 mt-1 block">
                {SKILLS_ROW_TOOLS.map(s => s.name).join(', ')}
              </span>
            </div>
          </div>
        </div>

        {/* Key Projects */}
        <div className="mb-8 space-y-3">
          <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-300 border-b border-white/10 pb-2">
            Key Engineered Projects
          </h4>
          <div className="space-y-3">
            {PROJECT_MISSIONS.map((p) => (
              <div key={p.id} className="p-3.5 rounded-lg bg-black/40 border border-white/5">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-display font-bold text-slate-100">
                    {p.name}
                  </div>
                  <span className="text-[10px] font-mono text-cyan-300">
                    {p.technologies.join(', ')}
                  </span>
                </div>
                <p className="text-xs text-slate-300 font-sans mt-1">
                  {p.shortDesc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Hackathons, Certifications & Achievements */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-black/40 border border-white/5">
            <h5 className="text-[11px] font-mono uppercase text-cyan-300 mb-2">
              Verified Certifications
            </h5>
            <ul className="space-y-2 text-xs text-slate-300">
              {CERTIFICATIONS.map(c => (
                <li key={c.id}>
                  <div className="font-semibold text-slate-200">{c.title}</div>
                  <div className="text-[11px] text-slate-500">{c.issuer} · {c.year}</div>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-black/40 border border-white/5">
            <h5 className="text-[11px] font-mono uppercase text-cyan-300 mb-2">
              Hackathons
            </h5>
            <ul className="space-y-2 text-xs text-slate-300">
              {HACKATHON_MISSIONS.map(h => (
                <li key={h.id}>
                  <div className="font-semibold text-slate-200">{h.title}</div>
                  <div className="text-[11px] text-slate-500">{h.category}</div>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-black/40 border border-white/5">
            <h5 className="text-[11px] font-mono uppercase text-cyan-300 mb-2">
              Honors & Leadership
            </h5>
            <ul className="space-y-2 text-xs text-slate-300">
              {ACHIEVEMENTS.map(a => (
                <li key={a.id}>
                  <div className="font-semibold text-slate-200">{a.title}</div>
                  <div className="text-[11px] text-slate-500">{a.organization}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
