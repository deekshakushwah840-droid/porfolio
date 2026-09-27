import React from 'react';

export const CosmicAtmosphere: React.FC = () => {
  return (
    <>
      {/* 1. Cinematic Screen-Edge Vignette Darkening */}
      <div
        className="fixed inset-0 pointer-events-none z-[2]"
        style={{
          background: 'radial-gradient(ellipse 90% 85% at 50% 50%, transparent 45%, rgba(2, 6, 23, 0.45) 75%, rgba(2, 6, 23, 0.85) 100%)'
        }}
      />

      {/* 2. Faint Animated Film Grain Texture (2.5% opacity, cinematic film feel) */}
      <div
        className="fixed inset-[-50%] w-[200%] h-[200%] pointer-events-none z-[3] opacity-[0.028] mix-blend-screen animate-film-grain select-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      {/* 3. Subtle Multi-Stop Deep Ambient Atmospheric Nebular Glow Zones */}
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] pointer-events-none z-[1] opacity-60"
        style={{
          background: 'radial-gradient(circle at 50% 30%, rgba(6, 182, 212, 0.06) 0%, rgba(30, 58, 138, 0.04) 40%, rgba(139, 92, 246, 0.02) 65%, transparent 80%)'
        }}
      />
    </>
  );
};
