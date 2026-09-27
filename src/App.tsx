/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { CosmicBackground } from './components/CosmicBackground';
import { CosmicAtmosphere } from './components/CosmicAtmosphere';
import { CosmicCursor } from './components/CosmicCursor';
import { SpaceLoadingScreen } from './components/SpaceLoadingScreen';
import { CosmicNavigation } from './components/CosmicNavigation';
import { HeroSection } from './components/HeroSection';
import { InteractiveConstellation } from './components/InteractiveConstellation';
import { AboutCosmicStory } from './components/AboutCosmicStory';
import { AcademicConstellation } from './components/AcademicConstellation';
import { TechnologyGalaxy } from './components/TechnologyGalaxy';
import { ProjectOrbitalCarousel } from './components/ProjectOrbitalCarousel';
import { CertificationsStarMap } from './components/CertificationsStarMap';
import { HackathonUniverse } from './components/HackathonUniverse';
import { AchievementsCosmicEvents } from './components/AchievementsCosmicEvents';
import { SpaceTransmission } from './components/SpaceTransmission';
import { CosmicFooter } from './components/CosmicFooter';
import { MissionDetailModal } from './components/MissionDetailModal';
import { TelemetryDossierModal } from './components/TelemetryDossierModal';
import { LostInSpace404 } from './components/LostInSpace404';
import { ProjectMission } from './types/portfolio';

// Section reveal transition animation
const sectionRevealProps = {
  initial: { opacity: 0, y: 24, filter: 'blur(8px)' },
  whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
  viewport: { once: true, amount: 0.12 },
  transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
};

export default function App() {
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('overview');
  const [selectedMission, setSelectedMission] = useState<ProjectMission | null>(null);
  const [isDossierOpen, setIsDossierOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [is404, setIs404] = useState(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      return path !== '/' && path !== '' && !path.endsWith('.html') && !path.endsWith('.pdf');
    }
    return false;
  });

  // Track scroll position for Back to Top button
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // IntersectionObserver for tracking active section in cosmic nav
  useEffect(() => {
    if (loading) return;

    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.2, rootMargin: '-60px 0px -40% 0px' }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [loading]);

  const handleScrollTo = (targetId: string) => {
    // Check direct ID or alias mapping
    let el = document.getElementById(targetId);
    if (!el && targetId === 'academic') el = document.getElementById('education');
    if (!el && targetId === 'technologies') el = document.getElementById('skills');
    if (!el && targetId === 'education') el = document.getElementById('academic');
    if (!el && targetId === 'skills') el = document.getElementById('technologies');

    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (is404) {
    return (
      <LostInSpace404
        onReturnHome={() => {
          setIs404(false);
          window.history.pushState({}, '', '/');
        }}
      />
    );
  }

  return (
    <div className="relative min-h-screen bg-[#020617] text-slate-100 selection:bg-sky-500/30 selection:text-white">
      {/* Cinematic Deep Space Loading Screen */}
      {loading && <SpaceLoadingScreen onComplete={() => setLoading(false)} />}

      {/* Living 3D WebGL Galaxy & Multi-Depth Cosmic Blue Canvas */}
      <CosmicBackground />

      {/* Atmospheric Depth: Film Grain, Edge Vignette & Gentle Glow Zones */}
      <CosmicAtmosphere />

      {/* Subtle Desktop Cosmic Cursor Particle */}
      <CosmicCursor />

      {/* Cosmic Navigation Header */}
      <CosmicNavigation
        activeSection={activeSection}
        onOpenTransmissionModal={() => handleScrollTo('contact')}
        onOpenTelemetryModal={() => setIsDossierOpen(true)}
      />

      {/* Main Celestial Portfolio Content */}
      <main className="relative z-10">
        {/* 1. Hero Section: 3D Headline with SUDDEN POP-UP Entrance, 3D Rotating Roles, Cybernetic Badge */}
        <HeroSection
          onExploreMissions={() => handleScrollTo('projects')}
          onOpenTransmission={() => handleScrollTo('contact')}
        />

        {/* 2. Interactive Constellation Navigation (Deeksha -> Skills -> Technologies -> Projects -> Certifications -> Hackathons -> Achievements -> Contact) */}
        <motion.div {...sectionRevealProps}>
          <InteractiveConstellation
            onSelectNode={(targetId) => handleScrollTo(targetId)}
          />
        </motion.div>

        <div className="max-w-6xl mx-auto h-px bg-gradient-to-r from-transparent via-sky-500/25 to-transparent my-12" />

        {/* 3. About: Cosmic Story (Progressive Z-Space Revelation) */}
        <motion.div {...sectionRevealProps}>
          <AboutCosmicStory />
        </motion.div>

        <div className="max-w-6xl mx-auto h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent my-12" />

        {/* 4. Academic Constellation: Glowing Orbital Line connecting Class 10 -> Class 12 -> B.Tech */}
        <motion.div {...sectionRevealProps}>
          <AcademicConstellation />
        </motion.div>

        <div className="max-w-6xl mx-auto h-px bg-gradient-to-r from-transparent via-sky-500/25 to-transparent my-12" />

        {/* 5. Technology Galaxy: Required Dual Independent Infinite Marquee Frames + C/C++ Programming Constellation */}
        <motion.div {...sectionRevealProps}>
          <TechnologyGalaxy />
        </motion.div>

        <div className="max-w-6xl mx-auto h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent my-12" />

        {/* 6. Project Missions: Rounded 3D Continuous Orbital Carousel + Click Pop-Up Modal */}
        <motion.div {...sectionRevealProps}>
          <ProjectOrbitalCarousel
            onSelectMission={(mission) => setSelectedMission(mission)}
          />
        </motion.div>

        <div className="max-w-6xl mx-auto h-px bg-gradient-to-r from-transparent via-sky-500/25 to-transparent my-12" />

        {/* 7. Certifications: Cosmic Star Map (Oracle AI Associate 2025, Simplilearn C-Basics) */}
        <motion.div {...sectionRevealProps}>
          <CertificationsStarMap />
        </motion.div>

        <div className="max-w-6xl mx-auto h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent my-12" />

        {/* 8. Hackathon Universe: Interactive Stellar Systems with Click-to-Expand Modals */}
        <motion.div {...sectionRevealProps}>
          <HackathonUniverse />
        </motion.div>

        <div className="max-w-6xl mx-auto h-px bg-gradient-to-r from-transparent via-sky-500/25 to-transparent my-12" />

        {/* 9. Cosmic Achievements: Google Student Ambassador, NASA Space Apps Global Nominee */}
        <motion.div {...sectionRevealProps}>
          <AchievementsCosmicEvents />
        </motion.div>

        <div className="max-w-6xl mx-auto h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent my-12" />

        {/* 10. Contact: Send a Signal (Email, GitHub, LinkedIn, Telephony) */}
        <motion.div {...sectionRevealProps}>
          <SpaceTransmission />
        </motion.div>
      </main>

      {/* Cosmic Footer */}
      <CosmicFooter
        onOpenTransmission={() => handleScrollTo('contact')}
        onOpenTelemetry={() => setIsDossierOpen(true)}
      />

      {/* Pop-Up Modals (Glassmorphism, backdrop-blur, thin blue border, soft glow) */}
      <MissionDetailModal
        mission={selectedMission}
        onClose={() => setSelectedMission(null)}
      />

      <TelemetryDossierModal
        isOpen={isDossierOpen}
        onClose={() => setIsDossierOpen(false)}
      />

      {/* Floating Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-slate-900/90 hover:bg-slate-800 border border-sky-400/40 hover:border-sky-300 text-sky-300 hover:text-white shadow-[0_0_20px_rgba(56,189,248,0.35)] backdrop-blur-md transition-all duration-300 cursor-pointer animate-in fade-in"
          aria-label="Back to top"
          title="Back to top"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}
    </div>
  );
}
