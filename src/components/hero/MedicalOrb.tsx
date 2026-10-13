import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Shield, Dna, Heart, Sparkles, CheckCircle2 } from 'lucide-react';

export const MedicalOrb: React.FC = () => {
  return (
    <div className="relative w-72 h-72 sm:w-96 sm:h-96 md:w-[420px] md:h-[420px] flex items-center justify-center select-none pointer-events-none">
      {/* Outer ambient radiant glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/25 via-teal-800/20 to-lavender-400/20 rounded-full blur-3xl animate-pulse-slow" />

      {/* Primary SVG Medical Orb Core */}
      <svg
        className="w-full h-full relative z-10"
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="orbCoreGrad" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#D9FFF1" />
            <stop offset="25%" stopColor="#11BFA4" />
            <stop offset="65%" stopColor="#073B3A" />
            <stop offset="100%" stopColor="#041F1F" />
          </radialGradient>

          <radialGradient id="innerGlow" cx="50%" cy="50%" r="50%">
            <stop offset="70%" stopColor="#11BFA4" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#11BFA4" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="ringGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#11BFA4" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#D9FFF1" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#B9A5FF" stopOpacity="0.8" />
          </linearGradient>

          <linearGradient id="ringGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#B9A5FF" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#11BFA4" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#073B3A" stopOpacity="0.7" />
          </linearGradient>

          <filter id="orbShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="12" stdDeviation="16" floodColor="#073B3A" floodOpacity="0.4" />
          </filter>
        </defs>

        {/* Outer Ring 1 - Counter Clockwise */}
        <g className="animate-spin-reverse-slow origin-center">
          <ellipse
            cx="200"
            cy="200"
            rx="185"
            ry="75"
            transform="rotate(-25 200 200)"
            stroke="url(#ringGrad1)"
            strokeWidth="1.5"
            strokeDasharray="8 6 2 6"
            opacity="0.85"
          />
          <circle cx="50" cy="170" r="4" fill="#D9FFF1" />
          <circle cx="340" cy="235" r="3" fill="#B9A5FF" />
        </g>

        {/* Middle Ring 2 - Clockwise */}
        <g className="animate-spin-very-slow origin-center">
          <ellipse
            cx="200"
            cy="200"
            rx="160"
            ry="60"
            transform="rotate(45 200 200)"
            stroke="url(#ringGrad2)"
            strokeWidth="2"
            opacity="0.7"
          />
          <circle cx="90" cy="110" r="4.5" fill="#11BFA4" />
          <circle cx="310" cy="290" r="3.5" fill="#D9FFF1" />
        </g>

        {/* Central Glowing Orb Sphere */}
        <circle
          cx="200"
          cy="200"
          r="95"
          fill="url(#orbCoreGrad)"
          filter="url(#orbShadow)"
        />

        {/* Specular Highlight Sheen */}
        <ellipse
          cx="170"
          cy="150"
          rx="50"
          ry="32"
          transform="rotate(-20 170 150)"
          fill="#FFFFFF"
          opacity="0.25"
        />

        {/* Inner Cell / Wellness Pulse Pattern */}
        <circle cx="200" cy="200" r="65" stroke="#D9FFF1" strokeWidth="1" strokeDasharray="3 3" opacity="0.3" />
        <circle cx="200" cy="200" r="38" stroke="#11BFA4" strokeWidth="1.5" opacity="0.5" />
      </svg>

      {/* Floating Medical Symbols & Floating Particles */}
      <motion.div
        animate={{ y: [-6, 6, -6], rotate: [0, 4, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-4 left-6 z-20 p-2.5 rounded-2xl bg-white/90 backdrop-blur-md border border-teal-500/25 shadow-glass"
      >
        <Heart className="w-5 h-5 text-emerald-500" />
      </motion.div>

      <motion.div
        animate={{ y: [6, -6, 6], rotate: [0, -4, 0] }}
        transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
        className="absolute bottom-6 left-10 z-20 p-2.5 rounded-2xl bg-white/90 backdrop-blur-md border border-teal-500/25 shadow-glass"
      >
        <Shield className="w-5 h-5 text-teal-800" />
      </motion.div>

      <motion.div
        animate={{ y: [-8, 8, -8] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
        className="absolute top-12 right-6 z-20 p-2.5 rounded-2xl bg-white/90 backdrop-blur-md border border-lavender-400/30 shadow-glass"
      >
        <Dna className="w-5 h-5 text-lavender-500" />
      </motion.div>

      <motion.div
        animate={{ y: [7, -7, 7] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
        className="absolute bottom-12 right-8 z-20 p-2.5 rounded-2xl bg-white/90 backdrop-blur-md border border-emerald-500/30 shadow-glass"
      >
        <Activity className="w-5 h-5 text-emerald-600" />
      </motion.div>
    </div>
  );
};
