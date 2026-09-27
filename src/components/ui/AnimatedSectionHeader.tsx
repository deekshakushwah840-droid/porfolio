import React from 'react';
import { motion, Variants } from 'motion/react';

interface AnimatedSectionHeaderProps {
  category: string;
  title: string;
  subtitle: string;
  glowColor?: 'cyan' | 'blue' | 'violet';
}

export const AnimatedSectionHeader: React.FC<AnimatedSectionHeaderProps> = ({
  category,
  title,
  subtitle,
  glowColor = 'cyan'
}) => {
  const words = title.split(' ');

  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 24, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.7,
        ease: 'easeOut',
        staggerChildren: 0.08
      }
    }
  };

  const wordVariants: Variants = {
    hidden: { opacity: 0, y: 16, filter: 'blur(4px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };

  const glowStyles = {
    cyan: 'radial-gradient(ellipse 650px 220px at 50% 50%, rgba(6,182,212,0.08) 0%, rgba(59,130,246,0.04) 50%, transparent 80%)',
    blue: 'radial-gradient(ellipse 650px 220px at 50% 50%, rgba(56,189,248,0.08) 0%, rgba(30,58,138,0.06) 50%, transparent 80%)',
    violet: 'radial-gradient(ellipse 650px 220px at 50% 50%, rgba(139,92,246,0.08) 0%, rgba(6,182,212,0.04) 50%, transparent 80%)'
  };

  return (
    <div className="relative text-center mb-16 select-none">
      {/* Subtle multi-stop gradient glow zone behind header (5-8% opacity) */}
      <div
        className="absolute inset-0 -top-12 -bottom-8 pointer-events-none"
        style={{ background: glowStyles[glowColor] }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="relative z-10"
      >
        {/* Category Pill with gentle pulsing aura */}
        <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-sky-400 uppercase mb-3 px-3 py-1 rounded-full bg-sky-950/40 border border-sky-400/20 backdrop-blur-md shadow-[0_0_15px_rgba(6,182,212,0.15)]">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
          <span>{category}</span>
        </div>

        {/* Staggered Heading */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-slate-100 flex flex-wrap justify-center gap-x-2 sm:gap-x-3 gap-y-1">
          {words.map((word, idx) => (
            <motion.span key={idx} variants={wordVariants} className="inline-block">
              {word}
            </motion.span>
          ))}
        </h2>

        {/* Subtitle */}
        <p className="text-sm text-slate-400 max-w-xl mx-auto mt-3 font-sans leading-relaxed">
          {subtitle}
        </p>
      </motion.div>
    </div>
  );
};
