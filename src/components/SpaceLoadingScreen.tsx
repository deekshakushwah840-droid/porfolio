import React, { useEffect, useState } from 'react';
import { DEVELOPER_PROFILE } from '../data/portfolioData';

interface SpaceLoadingScreenProps {
  onComplete: () => void;
}

export const SpaceLoadingScreen: React.FC<SpaceLoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState('LOADING PORTFOLIO');

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.floor(Math.random() * 20) + 14;
        if (next >= 40 && next < 70) {
          setPhase('INITIALIZING 3D ENVIRONMENT');
        } else if (next >= 70 && next < 95) {
          setPhase('READY');
        } else if (next >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 200);
          return 100;
        }
        return next;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-[#030712] flex flex-col items-center justify-center p-6 text-center select-none transition-opacity duration-500">
      {/* Subtle orbiting galaxy rings */}
      <div className="relative w-28 h-28 mb-8 flex items-center justify-center">
        {/* Outer orbital ring */}
        <div className="absolute inset-0 rounded-full border border-cyan-500/25 border-dashed animate-spin [animation-duration:12s]" />
        
        {/* Middle orbital ring */}
        <div className="absolute inset-2 rounded-full border border-cyan-400/40 border-t-transparent animate-spin [animation-duration:6s] [animation-direction:reverse]" />
        
        {/* Core luminous star */}
        <div className="relative w-4 h-4 rounded-full bg-slate-100 shadow-[0_0_15px_3px_rgba(6,182,212,0.85)] animate-pulse" />
        
        {/* Orbiting micro satellite */}
        <div className="absolute w-2 h-2 rounded-full bg-cyan-300 top-1 left-1/2 -translate-x-1/2 shadow-[0_0_8px_rgba(6,182,212,0.9)] animate-spin [animation-duration:3s]" />
      </div>

      {/* Primary status display */}
      <div className="space-y-3 max-w-sm">
        <div className="text-xs font-mono tracking-widest text-cyan-300 uppercase">
          {phase}
        </div>
        <div className="text-xl font-display font-bold tracking-wider text-slate-100">
          DEEKSHA KUSHWAH
        </div>
        <p className="text-xs text-slate-400 font-mono">
          PORTFOLIO · {DEVELOPER_PROFILE.location}
        </p>
      </div>

      {/* Telemetry Progress Bar */}
      <div className="w-64 mt-8">
        <div className="flex justify-between text-[11px] font-mono text-slate-500 mb-1.5 tabular-nums">
          <span>PROGRESS</span>
          <span>{Math.min(progress, 100)}%</span>
        </div>
        <div className="h-1 w-full bg-slate-900 rounded-full overflow-hidden border border-white/5">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 via-sky-400 to-slate-200 transition-all duration-150 ease-out"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
      </div>

      {/* Quick skip button */}
      <button
        onClick={onComplete}
        className="mt-8 text-xs font-mono text-slate-500 hover:text-slate-300 transition-colors cursor-pointer py-1 px-3 border border-white/5 hover:border-white/20 rounded"
      >
        Skip [ESC]
      </button>
    </div>
  );
};
