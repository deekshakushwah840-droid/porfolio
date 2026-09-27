import React, { useState, useEffect, useRef } from 'react';

interface CountUpStatProps {
  targetValue: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}

export const CountUpStat: React.FC<CountUpStatProps> = ({
  targetValue,
  decimals = 0,
  prefix = '',
  suffix = '',
  duration = 1400,
  className = ''
}) => {
  const [currentVal, setCurrentVal] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);

            const startTime = performance.now();
            const animate = (now: number) => {
              const elapsed = now - startTime;
              const progress = Math.min(elapsed / duration, 1);
              // Ease out cubic
              const easeOut = 1 - Math.pow(1 - progress, 3);
              const val = easeOut * targetValue;
              setCurrentVal(val);

              if (progress < 1) {
                requestAnimationFrame(animate);
              } else {
                setCurrentVal(targetValue);
              }
            };

            requestAnimationFrame(animate);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated, targetValue, duration]);

  return (
    <span ref={elementRef} className={`tabular-nums inline-block ${className}`}>
      {prefix}
      {currentVal.toFixed(decimals)}
      {suffix}
    </span>
  );
};
