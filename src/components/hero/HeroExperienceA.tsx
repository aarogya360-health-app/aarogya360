import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  FileText,
  Bell,
  Heart,
  Info
} from 'lucide-react';
import { Button } from '@/components/common/Button';
import { MedicalOrb } from './MedicalOrb';
import { HeartbeatWave } from './HeartbeatWave';
import { useAuth } from '@/context/AuthContext';

export const HeroExperienceA: React.FC = () => {
  const { user } = useAuth();
  const [mouseOffset, setMouseOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Subtle pointer parallax calculation
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
    setMouseOffset({ x, y });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-canvas via-mint-50/50 to-canvas pt-12 pb-20 bg-grid-medical"
      aria-label="Aarogya360 Hero Introduction"
    >
      {/* Ambient background blur elements */}
      <div className="absolute top-1/4 left-10 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-lavender-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headlines & CTAs */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            {/* Pill Tag */}
            <motion.div variants={itemVariants} className="inline-block">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/25 text-teal-800 backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600 animate-spin-very-slow" />
                <span>Next-Generation Living Wellness Platform</span>
              </span>
            </motion.div>

            {/* Staggered Main Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-navy-800 tracking-tight leading-[1.12] font-display"
            >
              Your Health.{' '}
              <span className="text-gradient-teal">Your World.</span>{' '}
              <br />
              <span className="text-navy-900 underline decoration-emerald-400/40 decoration-wavy decoration-2">
                In Harmony.
              </span>
            </motion.h1>

            {/* Supporting Copy */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-navy-700/85 max-w-2xl leading-relaxed"
            >
              Organize personal health logs, securely archive laboratory reports, set customized routine reminders, and explore verified wellness insights — with privacy-by-design and row-level security.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
            >
              <Link to={user ? "/dashboard" : "/signup"} className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto shadow-lg shadow-teal-800/15"
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                >
                  {user ? 'Enter Health Dashboard' : 'Get Started Free'}
                </Button>
              </Link>
              <a href="#services" className="w-full sm:w-auto">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  Explore Wellness Services
                </Button>
              </a>
            </motion.div>

            {/* Trust & Architecture points */}
            <motion.div
              variants={itemVariants}
              className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-navy-600/80 font-medium border-t border-teal-800/10"
            >
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>PostgreSQL Row-Level Security</span>
              </div>
              <div className="flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-teal-700" />
                <span>Private Encrypted Storage</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Bell className="w-4 h-4 text-emerald-600" />
                <span>User-Scheduled Reminders</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Experience A Visual Centerpiece */}
          <div className="lg:col-span-5 relative flex flex-col items-center justify-center">
            {/* Parallax Container */}
            <motion.div
              animate={{
                x: mouseOffset.x,
                y: mouseOffset.y,
              }}
              transition={{ type: 'spring', damping: 25, stiffness: 120 }}
              className="relative flex items-center justify-center"
            >
              {/* Medical Orb Core */}
              <MedicalOrb />

              {/* Floating Information Card 1 (Top Right) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="absolute -top-4 -right-4 sm:-right-8 bg-white/90 backdrop-blur-xl p-3.5 rounded-2xl border border-teal-800/15 shadow-glass text-left max-w-[210px]"
              >
                <div className="flex items-center gap-2 text-xs font-bold text-teal-800">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span>Cloud Health Vault</span>
                </div>
                <p className="text-[11px] text-navy-600 mt-1 leading-snug">
                  Encrypted files accessible only by authenticated session.
                </p>
              </motion.div>

              {/* Floating Information Card 2 (Bottom Left) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, x: -20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="absolute -bottom-6 -left-4 sm:-left-8 bg-white/90 backdrop-blur-xl p-3.5 rounded-2xl border border-teal-800/15 shadow-glass text-left max-w-[220px]"
              >
                <div className="flex items-center gap-2 text-xs font-bold text-teal-900">
                  <Heart className="w-3.5 h-3.5 text-rose-500" />
                  <span>Living Wellness Cadence</span>
                </div>
                <p className="text-[11px] text-navy-600 mt-1 leading-snug">
                  Hydration, movement & rest tracked by your genuine entries.
                </p>
              </motion.div>
            </motion.div>

            {/* Decorative Disclosure Statement */}
            <p className="text-[11px] text-navy-600/70 text-center mt-8 flex items-center justify-center gap-1.5 italic">
              <Info className="w-3 h-3 shrink-0 text-emerald-600" />
              <span>Decorative artwork illustration. Aarogya360 does not simulate unverified hardware biometrics.</span>
            </p>
          </div>
        </div>

        {/* Heartbeat Grid Divider */}
        <div className="mt-16 sm:mt-20">
          <HeartbeatWave />
        </div>
      </div>
    </section>
  );
};
