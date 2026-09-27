import React, { useState } from 'react';

interface ConstellationNode {
  id: string;
  label: string;
  sector: string;
  x: number; // percentage
  y: number; // percentage
  size: number;
  targetId: string;
  description: string;
  category: string;
}

interface InteractiveConstellationProps {
  onSelectNode: (targetId: string) => void;
}

export const InteractiveConstellation: React.FC<InteractiveConstellationProps> = ({ onSelectNode }) => {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  // Section navigation nodes
  const nodes: ConstellationNode[] = [
    {
      id: 'deeksha',
      label: 'HOME',
      sector: 'START',
      x: 50,
      y: 50,
      size: 14,
      targetId: 'overview',
      description: 'Deeksha Kushwah · Bhopal, Madhya Pradesh, India',
      category: 'Profile Overview'
    },
    {
      id: 'skills',
      label: 'SKILLS',
      sector: 'SECTOR-01',
      x: 24,
      y: 28,
      size: 11,
      targetId: 'skills',
      description: 'C++, C, Algorithms & Data Structures',
      category: 'Core Programming'
    },
    {
      id: 'technologies',
      label: 'TOOLS',
      sector: 'SECTOR-02',
      x: 44,
      y: 18,
      size: 11,
      targetId: 'skills',
      description: 'GitHub, VS Code, Problem-Solving, Teamwork, Communication',
      category: 'Tools & Competencies'
    },
    {
      id: 'projects',
      label: 'PROJECTS',
      sector: 'SECTOR-03',
      x: 76,
      y: 24,
      size: 12,
      targetId: 'projects',
      description: 'Silent Mode Detector, DSPACE AI, Student Grading System',
      category: 'Engineered Systems'
    },
    {
      id: 'certifications',
      label: 'CERTIFICATIONS',
      sector: 'SECTOR-04',
      x: 82,
      y: 65,
      size: 10,
      targetId: 'certifications',
      description: 'Oracle AI Foundation Associate (2025), Simplilearn C-Basics',
      category: 'Verified Credentials'
    },
    {
      id: 'hackathons',
      label: 'HACKATHONS',
      sector: 'SECTOR-05',
      x: 58,
      y: 84,
      size: 11,
      targetId: 'hackathons',
      description: 'NASA Online Hackathon, College Hackathons including SIH',
      category: 'Competitive Sprints'
    },
    {
      id: 'achievements',
      label: 'ACHIEVEMENTS',
      sector: 'SECTOR-06',
      x: 28,
      y: 80,
      size: 11,
      targetId: 'achievements',
      description: 'Google Student Ambassador, NASA Space Apps Global Nominee',
      category: 'Honors & Leadership'
    },
    {
      id: 'contact',
      label: 'CONTACT',
      sector: 'SECTOR-07',
      x: 16,
      y: 52,
      size: 10,
      targetId: 'contact',
      description: 'Direct Email, GitHub, LinkedIn, and Phone',
      category: 'Get in Touch'
    }
  ];

  const links = [
    { from: 'deeksha', to: 'skills' },
    { from: 'skills', to: 'technologies' },
    { from: 'technologies', to: 'projects' },
    { from: 'projects', to: 'certifications' },
    { from: 'certifications', to: 'hackathons' },
    { from: 'hackathons', to: 'achievements' },
    { from: 'achievements', to: 'contact' },
    { from: 'contact', to: 'skills' },
    // Radial connections to central Core
    { from: 'deeksha', to: 'projects' },
    { from: 'deeksha', to: 'certifications' },
    { from: 'deeksha', to: 'hackathons' },
    { from: 'deeksha', to: 'achievements' },
    { from: 'deeksha', to: 'contact' }
  ];

  const hoveredNode = nodes.find(n => n.id === activeNode);

  return (
    <div className="relative py-12 px-4 max-w-5xl mx-auto select-none">
      <div className="text-center mb-6">
        <div className="text-[11px] font-mono tracking-widest text-sky-400 uppercase mb-1">
          NAVIGATION MAP // OVERVIEW
        </div>
        <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-100">
          Interactive Constellation Map
        </h3>
        <p className="text-xs text-slate-400 max-w-md mx-auto mt-1 font-sans">
          Click any node to navigate directly across portfolio sections.
        </p>
      </div>

      <div className="relative w-full h-[380px] sm:h-[440px] rounded-2xl cosmic-glass border border-blue-500/20 overflow-hidden p-4">
        {/* Subtle coordinate grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#38bdf806_1px,transparent_1px),linear-gradient(to_bottom,#38bdf806_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

        {/* Orbit Ring Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-80 sm:h-80 rounded-full border border-sky-500/10 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 sm:w-[480px] sm:h-[480px] rounded-full border border-blue-500/10 pointer-events-none" />

        {/* SVG Constellation Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {links.map((link, idx) => {
            const fromNode = nodes.find(n => n.id === link.from)!;
            const toNode = nodes.find(n => n.id === link.to)!;
            const isIlluminated = activeNode === link.from || activeNode === link.to;

            return (
              <line
                key={idx}
                x1={`${fromNode.x}%`}
                y1={`${fromNode.y}%`}
                x2={`${toNode.x}%`}
                y2={`${toNode.y}%`}
                stroke={isIlluminated ? 'rgba(56, 189, 248, 0.85)' : 'rgba(59, 130, 246, 0.18)'}
                strokeWidth={isIlluminated ? 1.6 : 1}
                strokeDasharray={isIlluminated ? 'none' : '3 3'}
                className="transition-all duration-300"
              />
            );
          })}
        </svg>

        {/* Interactive Star Nodes */}
        {nodes.map((node) => {
          const isSelected = activeNode === node.id;
          const isCore = node.id === 'deeksha';

          return (
            <div
              key={node.id}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              onMouseEnter={() => setActiveNode(node.id)}
              onMouseLeave={() => setActiveNode(null)}
              onClick={() => onSelectNode(node.targetId)}
            >
              <div
                className={`absolute inset-0 -m-3 rounded-full transition-all duration-300 ${
                  isSelected
                    ? 'bg-sky-500/25 scale-150 animate-pulse'
                    : 'bg-transparent group-hover:bg-white/5'
                }`}
              />

              <div
                className={`relative rounded-full transition-all duration-300 flex items-center justify-center ${
                  isCore
                    ? 'bg-slate-100 shadow-[0_0_15px_3px_rgba(255,255,255,0.85)]'
                    : isSelected
                    ? 'bg-sky-200 shadow-[0_0_12px_2px_rgba(56,189,248,0.9)] scale-125'
                    : 'bg-sky-400/80 shadow-[0_0_6px_rgba(56,189,248,0.4)]'
                }`}
                style={{ width: `${node.size}px`, height: `${node.size}px` }}
              />

              <div
                className={`absolute left-1/2 -translate-x-1/2 top-4 whitespace-nowrap text-[10px] sm:text-xs font-mono tracking-wider transition-colors duration-200 ${
                  isSelected ? 'text-sky-200 font-bold' : 'text-slate-400 group-hover:text-slate-200'
                }`}
              >
                {node.label}
              </div>
            </div>
          );
        })}

        {/* Telemetry Tooltip Inspector Box */}
        {hoveredNode ? (
          <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-xs p-3 rounded-lg bg-slate-950/90 border border-sky-400/30 backdrop-blur-md transition-all">
            <div className="flex items-center justify-between text-[10px] font-mono text-sky-300 uppercase mb-1">
              <span>{hoveredNode.sector}</span>
              <span>{hoveredNode.category}</span>
            </div>
            <div className="text-xs font-display font-bold text-slate-100">
              {hoveredNode.label}
            </div>
            <p className="text-[11px] text-slate-300 mt-1 font-sans">
              {hoveredNode.description}
            </p>
            <div className="mt-2 text-[10px] font-mono text-sky-400 flex items-center gap-1">
              <span>Click to view section</span>
              <span>→</span>
            </div>
          </div>
        ) : (
          <div className="absolute bottom-3 left-4 text-[11px] font-mono text-slate-500">
            8 PORTFOLIO SECTIONS AVAILABLE · CLICK ANY NODE
          </div>
        )}
      </div>
    </div>
  );
};
