import React from 'react';

export const HeartbeatWave: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`w-full overflow-hidden relative ${className}`}>
      <svg
        className="w-full h-16 sm:h-20 text-emerald-400/80"
        viewBox="0 0 1200 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="ecgGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#073B3A" stopOpacity="0.1" />
            <stop offset="30%" stopColor="#11BFA4" stopOpacity="0.8" />
            <stop offset="60%" stopColor="#D9FFF1" stopOpacity="1" />
            <stop offset="80%" stopColor="#11BFA4" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#073B3A" stopOpacity="0.1" />
          </linearGradient>
          <filter id="ecgGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Base guideline */}
        <line x1="0" y1="60" x2="1200" y2="60" stroke="#11BFA4" strokeWidth="1" strokeOpacity="0.15" strokeDasharray="4 4" />

        {/* Animated ECG Pulse Waveform */}
        <path
          d="M0,60 L200,60 L240,60 L250,50 L260,70 L275,60 L320,60 L340,30 L355,100 L370,15 L385,75 L395,60 L440,60 L460,55 L475,60 L600,60 L700,60 L740,60 L750,50 L760,70 L775,60 L820,60 L840,30 L855,100 L870,15 L885,75 L895,60 L940,60 L960,55 L975,60 L1200,60"
          stroke="url(#ecgGrad)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animate-ecg"
          filter="url(#ecgGlow)"
        />
      </svg>
    </div>
  );
};
