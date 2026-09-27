import React, { useState } from 'react';
import { DEVELOPER_PROFILE } from '../data/portfolioData';
import { AnimatedSectionHeader } from './ui/AnimatedSectionHeader';

export const SpaceTransmission: React.FC = () => {
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [signalMessage, setSignalMessage] = useState('');
  const [transmissionStatus, setTransmissionStatus] = useState<'idle' | 'transmitting' | 'transmitted'>('idle');
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const handleSendSignal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName.trim() || !senderEmail.trim() || !signalMessage.trim()) return;

    setTransmissionStatus('transmitting');
    setTimeout(() => {
      setTransmissionStatus('transmitted');
      const subject = encodeURIComponent(`Message from ${senderName}`);
      const body = encodeURIComponent(`From: ${senderName} (${senderEmail})\n\nMessage:\n${signalMessage}`);
      window.location.href = `mailto:${DEVELOPER_PROFILE.email}?subject=${subject}&body=${body}`;

      setTimeout(() => {
        setSenderName('');
        setSenderEmail('');
        setSignalMessage('');
        setTransmissionStatus('idle');
      }, 4000);
    }, 1200);
  };

  return (
    <section id="contact" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto select-none">
      {/* Animated Section Header with staggered title words and soft glow zone */}
      <AnimatedSectionHeader
        category="GET IN TOUCH"
        title="Contact"
        subtitle="Reach out for software opportunities, engineering collaborations, or inquiries."
        glowColor="cyan"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Contact Information Channels */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-2xl cosmic-glass border border-white/10 relative overflow-hidden shadow-[0_16px_40px_-15px_rgba(6,182,212,0.12)]">
            <div className="text-[11px] font-mono uppercase text-slate-500 mb-4 tracking-wider border-b border-white/5 pb-2.5">
              CONTACT INFORMATION
            </div>

            <div className="space-y-4">
              {/* Email Channel */}
              <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-mono uppercase text-slate-500">
                    Email
                  </div>
                  <div className="text-xs sm:text-sm font-mono text-slate-200 truncate mt-0.5">
                    {DEVELOPER_PROFILE.email}
                  </div>
                </div>
                <button
                  onClick={() => handleCopy(DEVELOPER_PROFILE.email, 'email')}
                  className="px-2.5 py-1 text-[11px] font-mono text-cyan-300 hover:text-white bg-slate-900 border border-white/10 rounded transition-colors cursor-pointer"
                >
                  {copiedField === 'email' ? 'Copied ✓' : 'Copy'}
                </button>
              </div>

              {/* GitHub */}
              <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-mono uppercase text-slate-500">
                    GitHub Profile
                  </div>
                  <div className="text-xs sm:text-sm font-mono text-slate-200 mt-0.5">
                    {DEVELOPER_PROFILE.githubUsername}
                  </div>
                </div>
                <a
                  href={DEVELOPER_PROFILE.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="px-2.5 py-1 text-[11px] font-mono text-cyan-300 hover:text-white bg-slate-900 border border-white/10 rounded transition-colors"
                >
                  View Profile ↗
                </a>
              </div>

              {/* LinkedIn */}
              <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-mono uppercase text-slate-500">
                    LinkedIn Network
                  </div>
                  <div className="text-xs sm:text-sm font-mono text-slate-200 mt-0.5">
                    {DEVELOPER_PROFILE.linkedinUsername}
                  </div>
                </div>
                <a
                  href={DEVELOPER_PROFILE.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="px-2.5 py-1 text-[11px] font-mono text-cyan-300 hover:text-white bg-slate-900 border border-white/10 rounded transition-colors"
                >
                  Connect ↗
                </a>
              </div>

              {/* Phone */}
              <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-mono uppercase text-slate-500">
                    Phone
                  </div>
                  <div className="text-xs sm:text-sm font-mono text-slate-200 mt-0.5">
                    {DEVELOPER_PROFILE.phone}
                  </div>
                </div>
                <button
                  onClick={() => handleCopy(DEVELOPER_PROFILE.phone, 'phone')}
                  className="px-2.5 py-1 text-[11px] font-mono text-cyan-300 hover:text-white bg-slate-900 border border-white/10 rounded transition-colors cursor-pointer"
                >
                  {copiedField === 'phone' ? 'Copied ✓' : 'Copy'}
                </button>
              </div>

              {/* Location */}
              <div className="p-3.5 rounded-xl bg-black/40 border border-white/5">
                <div className="text-[10px] font-mono uppercase text-slate-500">
                  Location
                </div>
                <div className="text-xs font-mono text-slate-200 mt-0.5">
                  {DEVELOPER_PROFILE.location} ({DEVELOPER_PROFILE.coordinates})
                </div>
              </div>

              {/* Resume Download Channel */}
              <div className="p-4 rounded-xl bg-sky-950/40 border border-sky-400/30 flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-mono uppercase text-sky-400 font-semibold">
                    Official Resume
                  </div>
                  <div className="text-xs font-mono text-slate-200 mt-0.5">
                    Deeksha_Kushwah_Resume.pdf
                  </div>
                </div>
                <a
                  href="/resume.pdf"
                  download="Deeksha_Kushwah_Resume.pdf"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="px-3 py-1.5 text-xs font-mono font-medium text-slate-100 bg-sky-900 hover:bg-sky-800 border border-sky-400/50 rounded-lg transition-all shadow-[0_0_12px_rgba(56,189,248,0.25)] flex items-center gap-1.5 cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5 text-sky-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span>Download</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Contact Message Form */}
        <div className="lg:col-span-7">
          <div className="p-6 sm:p-8 rounded-2xl cosmic-panel border border-white/10 relative overflow-hidden backdrop-blur-xl shadow-[0_16px_40px_-15px_rgba(6,182,212,0.18)]">
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-6">
              <div className="text-xs font-mono uppercase text-cyan-300 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span>SEND A MESSAGE</span>
              </div>
              <span className="text-[11px] font-mono text-slate-500">
                DIRECT INBOX
              </span>
            </div>

            <form onSubmit={handleSendSignal} className="space-y-4">
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="e.g. Sarah Chen"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-black/60 border border-white/10 focus:border-cyan-400 focus:outline-none text-xs sm:text-sm font-sans text-slate-100 placeholder:text-slate-600 transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                  Your Email
                </label>
                <input
                  type="email"
                  required
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  placeholder="e.g. sarah.chen@example.com"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-black/60 border border-white/10 focus:border-cyan-400 focus:outline-none text-xs sm:text-sm font-sans text-slate-100 placeholder:text-slate-600 transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                  Message
                </label>
                <textarea
                  required
                  rows={4}
                  value={signalMessage}
                  onChange={(e) => setSignalMessage(e.target.value)}
                  placeholder="Write your message, project idea, or opportunity..."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-black/60 border border-white/10 focus:border-cyan-400 focus:outline-none text-xs sm:text-sm font-sans text-slate-100 placeholder:text-slate-600 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={transmissionStatus === 'transmitting'}
                className="w-full py-3 px-4 rounded-lg bg-cyan-950/90 hover:bg-cyan-900 border border-cyan-500/40 text-xs sm:text-sm font-mono uppercase tracking-wider text-slate-100 transition-all duration-300 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {transmissionStatus === 'transmitting' ? (
                  <>
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                    <span>SENDING MESSAGE...</span>
                  </>
                ) : transmissionStatus === 'transmitted' ? (
                  <>
                    <span className="text-emerald-400">✓</span>
                    <span>MESSAGE SENT SUCCESSFULLY</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <span>→</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
