import React from 'react';
import { CosmicBackground } from './CosmicBackground';
import { CosmicAtmosphere } from './CosmicAtmosphere';

interface LostInSpace404Props {
  onReturnHome?: () => void;
}

export const LostInSpace404: React.FC<LostInSpace404Props> = ({ onReturnHome }) => {
  const handleHomeClick = () => {
    if (onReturnHome) {
      onReturnHome();
    } else {
      window.history.pushState({}, '', '/');
      window.location.href = '/';
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-[#020617] text-slate-100 p-4 overflow-hidden select-none">
      {/* Living Starfield Background */}
      <CosmicBackground />
      <CosmicAtmosphere />

      {/* 404 Glass Container */}
      <div className="relative z-10 max-w-lg w-full p-8 sm:p-10 rounded-2xl cosmic-panel border border-blue-500/30 backdrop-blur-2xl shadow-[0_20px_50px_rgba(2,6,23,0.9)] text-center">
        {/* Orbital Beacon Icon */}
        <div className="mx-auto w-20 h-20 rounded-full bg-slate-900/90 border border-sky-400/40 flex items-center justify-center mb-6 relative shadow-[0_0_30px_rgba(56,189,248,0.25)]">
          <div className="absolute inset-0 rounded-full border border-sky-400/20 animate-ping opacity-75" />
          <svg className="w-10 h-10 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>

        {/* 404 Error Code */}
        <div className="text-xs font-mono uppercase text-sky-400 tracking-widest mb-1 flex items-center justify-center gap-2">
          <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
          <span>ERROR 404 // COORDINATE UNREACHABLE</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-100 tracking-tight mb-3">
          Lost in Space
        </h1>

        <p className="text-sm text-slate-300 font-sans leading-relaxed mb-8">
          The requested coordinate or page could not be located in this sector of the galaxy. Return to the main developer portfolio to resume exploration.
        </p>

        {/* Return to Homepage Button */}
        <button
          onClick={handleHomeClick}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-sky-950/90 hover:bg-sky-900 border border-sky-400/40 text-sm font-mono tracking-wider uppercase text-slate-100 shadow-[0_0_25px_rgba(56,189,248,0.3)] hover:shadow-[0_0_35px_rgba(56,189,248,0.5)] transition-all duration-300 cursor-pointer"
        >
          <span>← Back to Homepage</span>
        </button>

        <div className="mt-8 pt-4 border-t border-white/5 text-[11px] font-mono text-slate-500">
          Deeksha Kushwah · Developer Portfolio
        </div>
      </div>
    </div>
  );
};
