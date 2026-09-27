export interface ProjectMission {
  id: string;
  name: string;
  designation: string;
  missionNumber: string;
  status: 'Operational' | 'Active' | 'Complete';
  category: string;
  shortDesc: string;
  fullDesc: string;
  keyFeatures: string[];
  technologies: string[];
  architecture: string;
  githubUrl?: string;
  liveUrl?: string;
  metrics?: { label: string; value: string }[];
  coordinates: string;
}

export interface SkillNode {
  name: string;
  category: 'Programming' | 'Tools & Platforms' | 'Core Engineering';
  role: string;
  color: string;
  description: string;
}

export interface EducationRecord {
  id: string;
  degree: string;
  institution: string;
  period: string;
  score: string;
  scoreLabel: string;
  details?: string;
  orbitDistance: string;
}

export interface CertificationStar {
  id: string;
  title: string;
  issuer: string;
  year: string;
  type: string;
  description: string;
  skillsCovered: string[];
  starSpectral: string;
}

export interface HackathonMission {
  id: string;
  title: string;
  category: string;
  scope: string;
  description: string;
  trajectory: string;
}

export interface AchievementEvent {
  id: string;
  title: string;
  eventClass: 'Supernova' | 'Planetary' | 'Comet' | 'Solar Alignment';
  organization: string;
  year: string;
  impact: string;
  details: string;
}
