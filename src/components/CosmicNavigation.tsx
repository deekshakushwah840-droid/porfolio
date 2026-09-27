import React, { useState, useEffect } from 'react';
import { DEVELOPER_PROFILE } from '../data/portfolioData';

interface CosmicNavigationProps {
  activeSection: string;
  onOpenTransmissionModal: () => void;
  onOpenTelemetryModal: () => void;
}

export const CosmicNavigation: React.FC<CosmicNavigationProps> = ({
  activeSection,
  onOpenTransmissionModal,
  onOpenTelemetryModal
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Overview', href: '#overview' },
    { label: 'About', href: '#about' },
    { label: 'Education', href: '#education' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Certifications', href: '#certifications' },
    { label: 'Hackathons', href: '#hackathons' },
    { label: 'Achievements', href: '#achievements' },
    { label: 'Contact', href: '#contact' }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#020617]/85 backdrop-blur-md border-b border-blue-500/20 py-3 shadow-[0_4px_30px_rgba(2,6,23,0.9)]'
          : 'bg-transparent border-b border-white/5 py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Zone 1: Wordmark with location */}
          <div className="flex items-center gap-3">
            <a
              href="#overview"
              className="group flex items-center gap-2.5 text-base sm:text-lg font-display font-bold tracking-tight text-slate-100 hover:text-white transition-colors"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-70"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-300"></span>
              </span>
              <span className="tracking-wider">{DEVELOPER_PROFILE.name.toUpperCase()}</span>
            </a>
            <span className="hidden xl:inline text-[11px] font-mono text-slate-400 border-l border-blue-500/20 pl-3">
              {DEVELOPER_PROFILE.location}
            </span>
          </div>

          {/* Zone 2: Recruiter-Friendly Clean Navigation Links with active orbital dot */}
          <nav className="hidden lg:flex items-center gap-5 text-xs font-medium uppercase tracking-wider text-slate-400">
            {navLinks.map((link) => {
              const linkId = link.href.substring(1);
              const isActive = activeSection === linkId || (linkId === 'education' && activeSection === 'academic') || (linkId === 'skills' && activeSection === 'technologies');
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`relative py-1 transition-colors hover:text-slate-100 ${
                    isActive ? 'text-sky-300 font-semibold' : ''
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.9)]" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Actions (Download Resume & Contact) */}
          <div className="flex items-center gap-3">
            <a
              href="/resume.pdf"
              download="Deeksha_Kushwah_Resume.pdf"
              target="_blank"
              rel="noreferrer noopener"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono tracking-wide text-sky-200 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-sky-400/40 rounded-md transition-all cursor-pointer shadow-[0_0_12px_rgba(56,189,248,0.2)]"
              title="Download Deeksha Kushwah's Resume (PDF)"
            >
              <svg className="w-3.5 h-3.5 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Download Resume</span>
            </a>

            <button
              onClick={onOpenTransmissionModal}
              className="px-3.5 py-1.5 text-xs font-mono font-medium text-slate-100 bg-sky-950/80 hover:bg-sky-900 border border-sky-500/40 hover:border-sky-400 rounded-md transition-all shadow-[0_0_15px_-3px_rgba(56,189,248,0.3)] cursor-pointer"
            >
              Contact Me
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 text-slate-400 hover:text-white border border-blue-500/20 rounded-md cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#020617]/95 backdrop-blur-xl border-b border-blue-500/20 px-4 pt-3 pb-6 mt-3 space-y-1.5">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-xs font-mono uppercase tracking-wider text-slate-300 hover:text-white"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
            <a
              href="/resume.pdf"
              download="Deeksha_Kushwah_Resume.pdf"
              target="_blank"
              rel="noreferrer noopener"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 text-xs font-mono font-medium text-sky-200 bg-slate-900 border border-sky-400/40 rounded flex items-center justify-center gap-2"
            >
              <svg className="w-3.5 h-3.5 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Download Resume (PDF)</span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTransmissionModal();
              }}
              className="w-full text-center py-2 text-xs font-mono font-medium text-slate-100 bg-sky-950 border border-sky-500/40 rounded"
            >
              Contact Me
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
