import React, { useEffect, useState } from 'react';

export const CosmicCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect touch device
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable = !!target.closest('button, a, input, textarea, [role="button"], .clickable-node');
        setIsHovering(isClickable);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    // Smooth trailing animation loop
    let animId: number;
    const updateTrail = () => {
      setTrailingPos(prev => ({
        x: prev.x + (pos.x - prev.x) * 0.22,
        y: prev.y + (pos.y - prev.y) * 0.22
      }));
      animId = requestAnimationFrame(updateTrail);
    };
    animId = requestAnimationFrame(updateTrail);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, [pos.x, pos.y, isVisible]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <>
      {/* Primary cosmic core particle */}
      <div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-slate-100 pointer-events-none z-50 transition-transform duration-75"
        style={{
          transform: `translate3d(${pos.x - 4}px, ${pos.y - 4}px, 0) scale(${isHovering ? 1.8 : 1})`,
          boxShadow: '0 0 10px 2px rgba(6, 182, 212, 0.7)'
        }}
      />
      {/* Soft trailing cosmic orbit ring */}
      <div
        className="fixed top-0 left-0 w-7 h-7 rounded-full border border-cyan-400/40 pointer-events-none z-50 transition-all duration-150"
        style={{
          transform: `translate3d(${trailingPos.x - 14}px, ${trailingPos.y - 14}px, 0) scale(${isHovering ? 1.6 : 1})`,
          backgroundColor: isHovering ? 'rgba(6, 182, 212, 0.12)' : 'transparent',
          borderColor: isHovering ? 'rgba(6, 182, 212, 0.7)' : 'rgba(6, 182, 212, 0.35)'
        }}
      />
    </>
  );
};
