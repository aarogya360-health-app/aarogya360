import React from 'react';

// 1. Health Awareness: Custom leaf & botanical wellness illustration
export const ArtworkLeaf: React.FC = () => (
  <div className="relative w-20 h-20 flex items-center justify-center">
    <div className="absolute inset-0 bg-mint-200/50 rounded-2xl blur-lg" />
    <svg className="w-16 h-16 relative z-10" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#11BFA4" />
          <stop offset="100%" stopColor="#073B3A" />
        </linearGradient>
      </defs>
      {/* Background organic circle */}
      <circle cx="50" cy="50" r="42" fill="#D9FFF1" fillOpacity="0.6" />
      {/* Botanical Leaf */}
      <path
        d="M26 68 C 26 38, 48 20, 74 24 C 76 52, 58 74, 26 68 Z"
        fill="url(#leafGrad)"
      />
      {/* Vein lines */}
      <path d="M30 65 Q 50 48 70 28" stroke="#D9FFF1" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M44 53 Q 52 46 60 48" stroke="#D9FFF1" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
      <path d="M36 61 Q 44 56 48 60" stroke="#D9FFF1" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
      {/* Wellness sunlight dot */}
      <circle cx="72" cy="22" r="5" fill="#11BFA4" />
    </svg>
  </div>
);

// 2. Symptom Information: Animated pulse-wave illustration
export const ArtworkPulse: React.FC = () => (
  <div className="relative w-20 h-20 flex items-center justify-center">
    <div className="absolute inset-0 bg-emerald-400/20 rounded-2xl blur-lg" />
    <svg className="w-16 h-16 relative z-10" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="pulseWaveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#11BFA4" stopOpacity="0.2" />
          <stop offset="50%" stopColor="#11BFA4" />
          <stop offset="100%" stopColor="#073B3A" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="42" fill="#F1F7F6" />
      <circle cx="50" cy="50" r="32" stroke="#11BFA4" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
      {/* Pulsing cardiogram wave */}
      <path
        d="M14 50 L34 50 L40 34 L48 68 L56 22 L64 58 L70 48 L76 50 L86 50"
        stroke="url(#pulseWaveGrad)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="56" cy="22" r="3.5" fill="#11BFA4" className="animate-ping" />
      <circle cx="56" cy="22" r="3" fill="#073B3A" />
    </svg>
  </div>
);

// 3. Daily Wellness: Floating water drop & organic cellular ripples
export const ArtworkWater: React.FC = () => (
  <div className="relative w-20 h-20 flex items-center justify-center">
    <div className="absolute inset-0 bg-teal-500/20 rounded-2xl blur-lg" />
    <svg className="w-16 h-16 relative z-10" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="dropGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D9FFF1" />
          <stop offset="40%" stopColor="#11BFA4" />
          <stop offset="100%" stopColor="#073B3A" />
        </linearGradient>
      </defs>
      {/* Organic ripples */}
      <circle cx="50" cy="55" r="38" stroke="#11BFA4" strokeWidth="1" opacity="0.2" />
      <circle cx="50" cy="55" r="28" stroke="#11BFA4" strokeWidth="1.5" opacity="0.4" />
      {/* Water Droplet */}
      <path
        d="M50 16 C 50 16, 30 46, 30 60 C 30 71, 39 80, 50 80 C 61 80, 70 71, 70 60 C 70 46, 50 16, 50 16 Z"
        fill="url(#dropGrad)"
      />
      {/* Highlight curve */}
      <path
        d="M42 48 C 38 54, 38 64, 44 70"
        stroke="#FFFFFF"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.6"
      />
    </svg>
  </div>
);

// 4. Health Records: Layered medical document illustration with secure shield
export const ArtworkFolder: React.FC = () => (
  <div className="relative w-20 h-20 flex items-center justify-center">
    <div className="absolute inset-0 bg-navy-800/15 rounded-2xl blur-lg" />
    <svg className="w-16 h-16 relative z-10" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="folderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0E625F" />
          <stop offset="100%" stopColor="#102A43" />
        </linearGradient>
      </defs>
      {/* Background layer card */}
      <rect x="22" y="18" width="56" height="64" rx="8" fill="#D9FFF1" stroke="#11BFA4" strokeWidth="1.5" />
      {/* Foreground primary record */}
      <rect x="28" y="24" width="54" height="64" rx="8" fill="url(#folderGrad)" />
      {/* Text Lines */}
      <line x1="38" y1="38" x2="68" y2="38" stroke="#D9FFF1" strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />
      <line x1="38" y1="46" x2="62" y2="46" stroke="#D9FFF1" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
      <line x1="38" y1="54" x2="55" y2="54" stroke="#D9FFF1" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      {/* Secure verification seal */}
      <circle cx="66" cy="68" r="10" fill="#11BFA4" />
      <path d="M62 68 L65 71 L71 65" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
);

// 5. Voice Accessibility: Animated sound-wave concentric rings with microphone
export const ArtworkSoundwaves: React.FC = () => (
  <div className="relative w-20 h-20 flex items-center justify-center">
    <div className="absolute inset-0 bg-lavender-400/25 rounded-2xl blur-lg" />
    <svg className="w-16 h-16 relative z-10" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#B9A5FF" />
          <stop offset="100%" stopColor="#073B3A" />
        </linearGradient>
      </defs>
      {/* Sound rings */}
      <circle cx="50" cy="50" r="42" stroke="#B9A5FF" strokeWidth="1" strokeDasharray="4 3" opacity="0.4" />
      <circle cx="50" cy="50" r="32" stroke="#11BFA4" strokeWidth="1.5" opacity="0.6" />
      <circle cx="50" cy="50" r="22" fill="#D9FFF1" />
      {/* Microphone glyph */}
      <rect x="45" y="36" width="10" height="18" rx="5" fill="#073B3A" />
      <path d="M40 48 C 40 55, 60 55, 60 48" stroke="#073B3A" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <line x1="50" y1="56" x2="50" y2="64" stroke="#073B3A" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  </div>
);

// 6. Medical Reports: Document illustration with decorative laser scanning-line effect
export const ArtworkScanner: React.FC = () => (
  <div className="relative w-20 h-20 flex items-center justify-center overflow-hidden rounded-2xl">
    <div className="absolute inset-0 bg-emerald-400/20 rounded-2xl blur-lg" />
    <svg className="w-16 h-16 relative z-10" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="docGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#F1F7F6" />
        </linearGradient>
      </defs>
      {/* Document Sheet */}
      <rect x="24" y="16" width="52" height="68" rx="6" fill="url(#docGrad)" stroke="#11BFA4" strokeWidth="1.5" />
      {/* Medical Cross Symbol in Header */}
      <rect x="46" y="24" width="8" height="12" fill="#073B3A" rx="1.5" />
      <rect x="44" y="26" width="12" height="8" fill="#073B3A" rx="1.5" />
      {/* Document data bars */}
      <rect x="32" y="44" width="36" height="3" rx="1.5" fill="#102A43" opacity="0.7" />
      <rect x="32" y="52" width="28" height="3" rx="1.5" fill="#102A43" opacity="0.5" />
      <rect x="32" y="60" width="32" height="3" rx="1.5" fill="#102A43" opacity="0.5" />
      <rect x="32" y="68" width="22" height="3" rx="1.5" fill="#11BFA4" />
    </svg>
    {/* Decorative Green Laser Scanning Beam */}
    <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_8px_#11BFA4] animate-scanline pointer-events-none" />
  </div>
);
