import React, { useState, useEffect, useRef } from 'react';
import { PROJECT_MISSIONS } from '../data/portfolioData';
import { ProjectMission } from '../types/portfolio';
import { AnimatedSectionHeader } from './ui/AnimatedSectionHeader';

interface ProjectOrbitalCarouselProps {
  onSelectMission: (mission: ProjectMission) => void;
}

export const ProjectOrbitalCarousel: React.FC<ProjectOrbitalCarouselProps> = ({ onSelectMission }) => {
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);
  const [cardTilt, setCardTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Touch and drag swipe state
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const startAngleRef = useRef(0);
  const hasSwipedRef = useRef(false);

  const requestRef = useRef<number | null>(null);

  // Smooth continuous auto-rotation through space
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const animateOrbit = () => {
      if (!isPaused && !isDraggingRef.current) {
        setRotationAngle((prev) => (prev + 0.22) % 360);
      }
      requestRef.current = requestAnimationFrame(animateOrbit);
    };

    requestRef.current = requestAnimationFrame(animateOrbit);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isPaused]);

  // Track active project based on closest to front (angle = 0)
  useEffect(() => {
    const normalized = ((rotationAngle % 360) + 360) % 360;
    let minDiff = 360;
    let closestIdx = 0;
    PROJECT_MISSIONS.forEach((_, i) => {
      const angle = (i * 120 + normalized) % 360;
      const diff = Math.min(angle, 360 - angle);
      if (diff < minDiff) {
        minDiff = diff;
        closestIdx = i;
      }
    });
    setActiveProjectIdx(closestIdx);
  }, [rotationAngle]);

  const rotateTo = (targetIdx: number) => {
    const targetAngle = -targetIdx * 120;
    setRotationAngle(targetAngle);
  };

  const handleNext = () => {
    setRotationAngle((prev) => Math.round(prev / 120) * 120 - 120);
  };

  const handlePrev = () => {
    setRotationAngle((prev) => Math.round(prev / 120) * 120 + 120);
  };

  // Touch swipe gesture handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      isDraggingRef.current = true;
      hasSwipedRef.current = false;
      dragStartXRef.current = e.touches[0].clientX;
      startAngleRef.current = rotationAngle;
      setIsPaused(true);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingRef.current || e.touches.length !== 1) return;
    const currentX = e.touches[0].clientX;
    const deltaX = currentX - dragStartXRef.current;
    if (Math.abs(deltaX) > 8) {
      hasSwipedRef.current = true;
    }
    // 0.45 factor maps swipe distance to rotation angle smoothly
    setRotationAngle(startAngleRef.current + deltaX * 0.45);
  };

  const handleTouchEnd = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setIsPaused(false);
    // Snap to nearest 120deg interval
    setRotationAngle((prev) => Math.round(prev / 120) * 120);
  };

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -14;
    setCardTilt({ x: y, y: x });
  };

  const handleCardMouseLeave = () => {
    setCardTilt({ x: 0, y: 0 });
    setHoveredId(null);
    setIsPaused(false);
  };

  // Radius of the 3D circular orbit
  const orbitRadius = typeof window !== 'undefined' && window.innerWidth < 640 ? 190 : 310;

  return (
    <section id="projects" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto select-none overflow-hidden">
      {/* Animated Section Header with staggered title words and soft glow zone */}
      <AnimatedSectionHeader
        category="FEATURED WORK"
        title="Project Missions"
        subtitle="Software applications displayed in an interactive 3D orbital carousel. Swipe on mobile or hover to pause, click any project to view details."
        glowColor="blue"
      />

      {/* 3D Circular Orbit Stage with Touch Swipe Events */}
      <div
        className="relative w-full h-[520px] sm:h-[560px] flex items-center justify-center perspective-1500 touch-pan-y cursor-grab active:cursor-grabbing"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Orbital Ellipse Guide Ring in Space */}
        <div
          className="absolute w-[440px] h-[440px] sm:w-[680px] sm:h-[680px] rounded-full border border-blue-500/20 border-dashed pointer-events-none"
          style={{
            transform: 'rotateX(75deg)',
            boxShadow: '0 0 50px rgba(56, 189, 248, 0.08)'
          }}
        />

        {/* 3D Rotating Carousel Container */}
        <div
          className="relative w-full h-full flex items-center justify-center transform-style-3d transition-transform duration-300 ease-out"
          style={{
            transform: `rotateY(${rotationAngle}deg)`
          }}
        >
          {PROJECT_MISSIONS.map((mission, index) => {
            const cardBaseAngle = index * 120;
            const isHovered = hoveredId === mission.id;
            const isActive = activeProjectIdx === index;

            return (
              <div
                key={mission.id}
                onMouseEnter={() => {
                  setIsPaused(true);
                  setHoveredId(mission.id);
                }}
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
                onClick={() => {
                  if (!hasSwipedRef.current) {
                    onSelectMission(mission);
                  }
                }}
                style={{
                  transform: `rotateY(${cardBaseAngle}deg) translateZ(${orbitRadius}px) ${
                    isHovered
                      ? `rotateX(${cardTilt.x}deg) rotateY(${cardTilt.y}deg) scale(1.04)`
                      : ''
                  }`
                }}
                className={`absolute w-[300px] sm:w-[350px] p-6 rounded-2xl cosmic-glass border cursor-pointer transition-all duration-300 ease-out transform-style-3d ${
                  isActive
                    ? 'border-sky-400/60 shadow-[0_0_35px_rgba(56,189,248,0.25)] bg-[#0a1426]/95'
                    : 'border-blue-500/20 shadow-[0_0_20px_rgba(0,0,0,0.6)] bg-[#070d1a]/80 opacity-80 hover:opacity-100'
                }`}
              >
                {/* Mission Header */}
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 mb-3 border-b border-white/5 pb-2.5">
                  <span className="text-sky-300 font-bold tracking-wider">{mission.missionNumber}</span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
                    <span className="text-slate-300">{mission.status}</span>
                  </span>
                </div>

                <div className="text-[10px] font-mono text-sky-400 uppercase tracking-wide mb-1">
                  {mission.category}
                </div>

                <h3 className="text-lg sm:text-xl font-display font-bold text-slate-100 group-hover:text-sky-200 transition-colors">
                  {mission.name}
                </h3>

                <p className="text-xs text-sky-300/80 font-mono mt-1 mb-3">
                  {mission.designation}
                </p>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans line-clamp-3 mb-4">
                  {mission.shortDesc}
                </p>

                {/* Tech Stack - Zero Pill Format */}
                <div className="text-xs font-mono text-slate-400 flex flex-wrap items-center gap-x-2 gap-y-1 py-2.5 border-t border-white/5">
                  {mission.technologies.map((tech, i) => (
                    <React.Fragment key={tech}>
                      <span className="text-slate-200 font-medium">{tech}</span>
                      {i < mission.technologies.length - 1 && (
                        <span className="text-slate-600" aria-hidden="true">·</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                {/* Action CTA */}
                <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-500 text-[10px]">
                    {mission.coordinates}
                  </span>
                  <span className="text-sky-400 flex items-center gap-1 font-semibold group-hover:text-sky-200">
                    <span>View Project</span>
                    <span>→</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Orbit Controls & Indicator Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-4 select-none">
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            className="min-h-[44px] px-3.5 py-2.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-blue-500/20 text-slate-300 hover:text-white transition-colors cursor-pointer text-xs font-mono"
            aria-label="Rotate orbit left"
          >
            ← Previous
          </button>

          <button
            onClick={() => setIsPaused(!isPaused)}
            className="min-h-[44px] px-4 py-2.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-blue-500/20 text-slate-300 hover:text-white transition-colors cursor-pointer text-xs font-mono flex items-center gap-2"
          >
            <span className={`w-1.5 h-1.5 rounded-full ${isPaused ? 'bg-amber-400' : 'bg-sky-400 animate-pulse'}`} />
            <span>{isPaused ? 'Resume Rotation' : 'Pause Rotation'}</span>
          </button>

          <button
            onClick={handleNext}
            className="min-h-[44px] px-3.5 py-2.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-blue-500/20 text-slate-300 hover:text-white transition-colors cursor-pointer text-xs font-mono"
            aria-label="Rotate orbit right"
          >
            Next →
          </button>
        </div>

        {/* Orbit Node Selector Dots */}
        <div className="flex items-center gap-2">
          {PROJECT_MISSIONS.map((mission, i) => (
            <button
              key={mission.id}
              onClick={() => rotateTo(i)}
              className={`h-2.5 rounded-full transition-all cursor-pointer min-w-[20px] ${
                activeProjectIdx === i
                  ? 'w-7 bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.8)]'
                  : 'w-2.5 bg-slate-700 hover:bg-slate-500'
              }`}
              aria-label={`Rotate to ${mission.name}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
