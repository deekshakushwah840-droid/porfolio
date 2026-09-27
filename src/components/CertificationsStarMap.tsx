import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CERTIFICATIONS } from '../data/portfolioData';
import { CertificationStar } from '../types/portfolio';
import { AnimatedSectionHeader } from './ui/AnimatedSectionHeader';

export const CertificationsStarMap: React.FC = () => {
  // Stack order state: array of indices [0, 1] representing [bottomCard, topCard]
  // In our deck, index at length-1 is top card resting on top
  const [deckOrder, setDeckOrder] = useState<number[]>([0, 1]);
  const [activeCertId, setActiveCertId] = useState<string>(CERTIFICATIONS[1].id);

  // Check reduced motion
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Selected certification for the telemetry inspector HUD
  const selectedCert =
    CERTIFICATIONS.find((c) => c.id === activeCertId) || CERTIFICATIONS[0];

  // Cycle the top card to the back of the stack
  const handleCycleTopCard = () => {
    setDeckOrder((prev) => {
      if (prev.length < 2) return prev;
      // Move current top card to the bottom of the stack
      const top = prev[prev.length - 1];
      const rest = prev.slice(0, prev.length - 1);
      const nextOrder = [top, ...rest];
      // Set the new top card as active
      const newTopIdx = nextOrder[nextOrder.length - 1];
      setActiveCertId(CERTIFICATIONS[newTopIdx].id);
      return nextOrder;
    });
  };

  // Directly select a specific card
  const handleSelectCard = (index: number) => {
    const cert = CERTIFICATIONS[index];
    setActiveCertId(cert.id);
    // Bring clicked card to the top if it isn't already
    setDeckOrder((prev) => {
      const filtered = prev.filter((i) => i !== index);
      return [...filtered, index];
    });
  };

  return (
    <section
      id="certifications"
      className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto select-none overflow-hidden"
    >
      {/* Animated Section Header with staggered title words and soft glow zone */}
      <AnimatedSectionHeader
        category="VERIFIED CREDENTIALS"
        title="Certifications"
        subtitle="Officially verified credentials in artificial intelligence and systems programming appearing in a sequential cascading glass stack."
        glowColor="cyan"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left Side: Cascading Glass Card Stack Area */}
        <div className="lg:col-span-7 flex flex-col items-center">
          {/* Deck Action / Interaction Hint */}
          <div className="w-full max-w-lg flex items-center justify-between text-xs font-mono mb-4 text-slate-400 px-2">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span className="uppercase text-slate-300 font-semibold">
                Credential Stack ({deckOrder.length} Verified)
              </span>
            </span>
            <button
              onClick={handleCycleTopCard}
              className="text-[11px] text-cyan-300 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer bg-slate-900/60 px-2.5 py-1 rounded-md border border-cyan-500/20 hover:border-cyan-400/40"
              title="Cycle through certificate stack"
            >
              <span>Cycle Stack</span>
              <span>↻</span>
            </button>
          </div>

          {/* Stacking Stage Container with trigger on scroll into view */}
          <motion.div
            className="relative w-full max-w-lg h-[340px] sm:h-[370px] flex items-center justify-center p-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.38 // Natural cascading rhythm: Card 2 pops up shortly after Card 1 finishes settling
                }
              }
            }}
          >
            {/* Ambient glass pedestal glow beneath stack */}
            <div className="absolute inset-x-8 bottom-4 h-24 bg-gradient-to-t from-cyan-900/20 via-blue-900/10 to-transparent blur-2xl pointer-events-none rounded-3xl" />

            {/* Stacked Cards rendered in deckOrder */}
            {deckOrder.map((certIdx, stackPosition) => {
              const cert = CERTIFICATIONS[certIdx];
              const isTop = stackPosition === deckOrder.length - 1;
              const isSelected = activeCertId === cert.id;

              // Offset calculations for realistic physical card deck stacking:
              // Bottom card (stackPosition 0): sits at (0, 0)
              // Top card (stackPosition 1): sits slightly offset (+16px X, +16px Y)
              // This leaves a clearly visible glowing edge of Certificate 1 peeking out from behind
              const offsetX = stackPosition === 0 ? 0 : 16;
              const offsetY = stackPosition === 0 ? 0 : 16;
              const zIndex = 10 + stackPosition * 10;

              return (
                <motion.div
                  key={cert.id}
                  onClick={() => {
                    if (isTop) {
                      // Clicking top card cycles to reveal next
                      handleCycleTopCard();
                    } else {
                      // Clicking peeking card brings it to top
                      handleSelectCard(certIdx);
                    }
                  }}
                  variants={{
                    hidden: prefersReducedMotion
                      ? { opacity: 0 }
                      : {
                          opacity: 0,
                          scale: 0.85,
                          y: 28,
                          x: offsetX,
                          rotate: stackPosition === 0 ? -1.5 : 1
                        },
                    visible: prefersReducedMotion
                      ? { opacity: 1 }
                      : {
                          opacity: 1,
                          scale: 1,
                          y: offsetY,
                          x: offsetX,
                          rotate: stackPosition === 0 ? -1.5 : 0.8,
                          transition: {
                            type: 'spring',
                            stiffness: 200, // Moderate stiffness: natural weighted pop-up
                            damping: 24, // Moderate damping: buttery smooth without bouncy overshoot
                            mass: 0.95
                          }
                        }
                  }}
                  whileHover={
                    isTop
                      ? {
                          y: offsetY - 6,
                          scale: 1.015,
                          transition: { type: 'spring', stiffness: 350, damping: 25 }
                        }
                      : {
                          x: offsetX - 8,
                          y: offsetY - 4,
                          transition: { type: 'spring', stiffness: 350, damping: 25 }
                        }
                  }
                  style={{
                    zIndex,
                    position: 'absolute'
                  }}
                  className={`w-[90%] sm:w-[92%] p-6 sm:p-7 rounded-2xl cursor-pointer select-none backdrop-blur-xl transition-colors duration-300 border ${
                    isTop
                      ? 'bg-[#09152b]/95 border-cyan-400/60 shadow-[0_24px_50px_-10px_rgba(2,6,23,0.95),0_0_35px_rgba(6,182,212,0.22)]'
                      : 'bg-[#060e1d]/85 border-blue-500/30 hover:border-cyan-400/50 shadow-[0_16px_35px_-10px_rgba(0,0,0,0.8)] opacity-90 hover:opacity-100'
                  }`}
                >
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2.5">
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`w-3 h-3 rounded-full transition-all ${
                          isTop
                            ? 'bg-cyan-300 shadow-[0_0_12px_2px_rgba(6,182,212,0.9)] animate-pulse'
                            : 'bg-blue-400/80'
                        }`}
                      />
                      <span className="text-xs font-mono text-cyan-300 font-semibold tracking-wide">
                        {cert.year} // {cert.issuer}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-black/40 border border-white/10 text-slate-400">
                        {cert.type.split(' ')[0]}
                      </span>
                      {isTop && (
                        <span className="text-[10px] font-mono text-cyan-400 font-bold bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-400/30">
                          TOP CARD
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Certificate Title */}
                  <h3 className="text-lg sm:text-xl font-display font-bold text-slate-100 mb-2 leading-snug">
                    {cert.title}
                  </h3>

                  {/* Summary Description */}
                  <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed line-clamp-3 mb-4">
                    {cert.description}
                  </p>

                  {/* Skills Covered Tags - Zero Pill Discipline */}
                  <div className="text-xs font-mono text-slate-400 flex flex-wrap items-center gap-x-2 gap-y-1 pt-3 border-t border-white/10">
                    <span className="text-[10px] uppercase text-slate-500 font-semibold">
                      Skills:
                    </span>
                    {cert.skillsCovered.map((skill, i) => (
                      <React.Fragment key={skill}>
                        <span className="text-cyan-200">{skill}</span>
                        {i < cert.skillsCovered.length - 1 && (
                          <span className="text-slate-600" aria-hidden="true">
                            ·
                          </span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>

                  {/* Card Bottom Edge CTA */}
                  <div className="mt-4 pt-2.5 border-t border-white/5 flex items-center justify-between text-xs font-mono">
                    <span className="text-[10px] text-slate-500">
                      {isTop ? 'CLICK TO CYCLE STACK' : 'CLICK TO BRING TO FRONT'}
                    </span>
                    <span className="text-cyan-300 font-semibold flex items-center gap-1">
                      <span>{isSelected ? 'Viewing' : 'Inspect'}</span>
                      <span>→</span>
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Stacking indicator dots */}
          <div className="flex items-center gap-2 mt-4 text-xs font-mono text-slate-400">
            <span>Stack Order:</span>
            {CERTIFICATIONS.map((c, i) => {
              const isCurrentTop =
                deckOrder[deckOrder.length - 1] === i;
              return (
                <button
                  key={c.id}
                  onClick={() => handleSelectCard(i)}
                  className={`px-2.5 py-1 rounded text-[11px] font-mono transition-all cursor-pointer ${
                    isCurrentTop
                      ? 'bg-cyan-950 text-cyan-200 border border-cyan-400/50 shadow-[0_0_10px_rgba(6,182,212,0.3)] font-semibold'
                      : 'bg-slate-900/60 text-slate-400 border border-white/5 hover:text-white'
                  }`}
                >
                  {i + 1}. {c.issuer}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Side: Selected Credential Detail HUD */}
        <div className="lg:col-span-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCert.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="p-6 sm:p-8 rounded-2xl cosmic-panel border border-cyan-500/40 relative overflow-hidden backdrop-blur-xl shadow-[0_20px_50px_-15px_rgba(6,182,212,0.2)]"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                <div className="text-xs font-mono uppercase text-cyan-400 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  <span>CREDENTIAL DETAILS</span>
                </div>
                <span className="text-[10px] font-mono text-slate-500">
                  OFFICIAL RECORD
                </span>
              </div>

              <h4 className="text-xl sm:text-2xl font-display font-bold text-slate-100 mb-1">
                {selectedCert.title}
              </h4>
              <div className="text-xs font-mono text-slate-400 mb-4">
                Issued by {selectedCert.issuer} · Year {selectedCert.year}
              </div>

              <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed mb-6">
                {selectedCert.description}
              </p>

              <div className="space-y-3 pt-4 border-t border-white/10">
                <div className="text-[10px] font-mono uppercase text-slate-500 font-semibold tracking-wider">
                  Verified Technical Competencies
                </div>
                <div className="text-xs font-mono text-slate-300 flex flex-wrap gap-x-2 gap-y-1">
                  {selectedCert.skillsCovered.map((skill, i) => (
                    <React.Fragment key={skill}>
                      <span className="text-cyan-200 font-medium">{skill}</span>
                      {i < selectedCert.skillsCovered.length - 1 && (
                        <span className="text-slate-600" aria-hidden="true">
                          ·
                        </span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-500">AUTHENTICITY: OFFICIAL</span>
                <span className="text-cyan-400 flex items-center gap-1 font-semibold">
                  <span>● Validated</span>
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
