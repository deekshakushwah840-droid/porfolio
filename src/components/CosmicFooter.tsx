import React from 'react';
import { DEVELOPER_PROFILE } from '../data/portfolioData';

interface CosmicFooterProps {
  onOpenTransmission: () => void;
  onOpenTelemetry: () => void;
}

export const CosmicFooter: React.FC<CosmicFooterProps> = ({
  onOpenTransmission,
  onOpenTelemetry
}) => {
  return (
    <footer className="relative border-t border-white/5 bg-[#030712]/90 py-12 px-4 sm:px-6 lg:px-8 text-xs font-mono text-slate-500 select-none">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <div className="text-slate-200 font-display font-bold text-sm tracking-wide">
            {DEVELOPER_PROFILE.name.toUpperCase()}
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">
            Space-Themed Developer Portfolio · {DEVELOPER_PROFILE.location}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-[11px]">
          <a
            href={DEVELOPER_PROFILE.github}
            target="_blank"
            rel="noreferrer noopener"
            className="hover:text-cyan-300 transition-colors"
          >
            GitHub
          </a>
          <a
            href={DEVELOPER_PROFILE.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            className="hover:text-cyan-300 transition-colors"
          >
            LinkedIn
          </a>
          <button
            onClick={onOpenTelemetry}
            className="hover:text-cyan-300 transition-colors cursor-pointer"
          >
            Quick Resume
          </button>
          <button
            onClick={onOpenTransmission}
            className="hover:text-cyan-300 transition-colors cursor-pointer"
          >
            Contact Me
          </button>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="hover:text-cyan-300 transition-colors cursor-pointer flex items-center gap-1 text-slate-400"
          >
            <span>Back to top</span>
            <span>↑</span>
          </button>
        </div>

        <div className="text-[11px] text-slate-400">
          © {new Date().getFullYear()} {DEVELOPER_PROFILE.name}
        </div>
      </div>
    </footer>
  );
};
