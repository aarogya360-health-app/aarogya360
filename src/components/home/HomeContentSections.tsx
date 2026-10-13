import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Lock,
  Volume2,
  Mic,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Database,
  Layers,
  HeartHandshake
} from 'lucide-react';
import { Button } from '@/components/common/Button';
import { SpeechReader } from '@/components/common/SpeechReader';

export const TrustAndAccessibilityStatement: React.FC = () => {
  return (
    <section className="py-16 bg-white border-y border-teal-800/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-2xl bg-canvas border border-teal-800/10 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-teal-800 text-mint-100 flex items-center justify-center mb-4">
                <Database className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="text-lg font-bold text-navy-800 mb-2">Honest Data Architecture</h3>
              <p className="text-sm text-navy-600/80 leading-relaxed">
                We believe in genuine transparency. Records are saved exclusively to your authenticated PostgreSQL profile with strict Row-Level Security. We do not invent simulated sensor readings or publish fake stats.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-teal-800/10 text-xs font-semibold text-teal-800">
              Supabase PostgreSQL & Storage
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-canvas border border-teal-800/10 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-teal-800 text-mint-100 flex items-center justify-center mb-4">
                <Volume2 className="w-5 h-5 text-lavender-400" />
              </div>
              <h3 className="text-lg font-bold text-navy-800 mb-2">Inclusive Voice Accessibility</h3>
              <p className="text-sm text-navy-600/80 leading-relaxed">
                Native Web Speech integration offers built-in text-to-speech for all instructional content and speech recognition for hands-free health note dictation. Built to support English, Telugu, and Hindi.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-teal-800/10 text-xs font-semibold text-teal-800">
              Web Speech API Standards
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-canvas border border-teal-800/10 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-teal-800 text-mint-100 flex items-center justify-center mb-4">
                <Lock className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="text-lg font-bold text-navy-800 mb-2">Zero Data Monetization</h3>
              <p className="text-sm text-navy-600/80 leading-relaxed">
                Your medical files and personal health observations are completely private. We never sell user data, run third-party advertising trackers, or share health logs with unauthorized entities.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-teal-800/10 text-xs font-semibold text-teal-800">
              Privacy by Design
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-canvas relative overflow-hidden" aria-labelledby="about-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-teal-800/5 border border-teal-800/15 text-teal-800">
              <span>The Aarogya360 Philosophy</span>
            </div>
            <h2 id="about-heading" className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-800 tracking-tight font-display">
              Designed for Human Life,{' '}
              <span className="text-gradient-teal">Not Just Medical Records</span>
            </h2>
            <p className="text-base text-navy-700/85 leading-relaxed">
              Traditional healthcare portals are often fragmented, intimidating, and complex. Aarogya360 was engineered to bridge the divide between medical seriousness and daily living wellness.
            </p>
            <p className="text-sm text-navy-600/80 leading-relaxed">
              Whether you are maintaining records of a chronic condition, logging family doctor appointments, tracking your hydration and sleep routines, or uploading confidential laboratory tests — Aarogya360 provides a calming, dignified, and secure space.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-white border border-teal-800/10 shadow-sm">
                <span className="block text-2xl font-black text-teal-800 font-display">100%</span>
                <span className="text-xs text-navy-600 font-medium">User Data Ownership</span>
              </div>
              <div className="p-4 rounded-xl bg-white border border-teal-800/10 shadow-sm">
                <span className="block text-2xl font-black text-emerald-600 font-display">256-bit</span>
                <span className="text-xs text-navy-600 font-medium">Supabase Storage Encryption</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative p-8 rounded-3xl bg-gradient-to-br from-teal-900 to-navy-900 text-white shadow-xl border border-emerald-500/20">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <HeartHandshake className="w-6 h-6 text-emerald-400" />
                  <span className="font-bold text-base tracking-wide">Living Wellness Charter</span>
                </div>
                <SpeechReader
                  textToRead="Aarogya360 Living Wellness Charter: We commit to never diagnose without a doctor, never fabricate telemetry, and always guard your personal health dignity."
                  label="Listen"
                  compact
                />
              </div>

              <div className="space-y-4 text-sm text-mint-100/90 leading-relaxed">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  </div>
                  <p><strong>Clarity Over Jargon:</strong> Health information should empower, not confuse or intimidate patients.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  </div>
                  <p><strong>Patient Autonomy:</strong> You retain complete control over your notes, files, and reminders.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  </div>
                  <p><strong>Strict Medical Demarcation:</strong> Software supports healthy living, but certified physicians provide medical diagnoses.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const VoiceAssistanceSection: React.FC<{ onOpenVoiceModal?: () => void }> = ({ onOpenVoiceModal }) => {
  return (
    <section className="py-20 bg-white border-y border-teal-800/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-mint-50 via-white to-canvas p-8 sm:p-12 border border-teal-800/15 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-card">
          <div className="space-y-4 max-w-2xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-lavender-400/20 text-navy-800">
              <Mic className="w-3.5 h-3.5 text-lavender-500" />
              <span>Voice Accessibility Built-In</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-navy-800 font-display">
              Listen to Any Article or Dictate Health Notes with Your Voice
            </h3>
            <p className="text-sm sm:text-base text-navy-600/85 leading-relaxed">
              Designed for elderly individuals, visually impaired users, or anyone experiencing fatigue. Aarogya360 supports hands-free narration and multi-lingual voice transcription.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
            {onOpenVoiceModal && (
              <Button
                variant="primary"
                size="lg"
                onClick={onOpenVoiceModal}
                leftIcon={<Mic className="w-5 h-5 text-emerald-300" />}
              >
                Try Voice Dictation
              </Button>
            )}
            <SpeechReader
              textToRead="Welcome to Aarogya360 voice accessibility. Press any speaker icon across the website to hear educational guides and health summaries spoken clearly."
              label="Test Audio Narration"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export const MedicalSafetyDisclaimerSection: React.FC = () => {
  return (
    <section className="py-16 bg-canvas border-b border-teal-800/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-3xl bg-amber-500/5 border-2 border-amber-500/20 flex flex-col sm:flex-row items-start gap-5">
          <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-700 shrink-0">
            <AlertTriangle className="w-7 h-7" />
          </div>
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-navy-900">
              Important Medical Safety & Emergency Notice
            </h3>
            <p className="text-sm text-navy-700/85 leading-relaxed">
              Aarogya360 is not a hospital, clinic, diagnostic laboratory, or emergency healthcare dispatch. The educational information, symptom encyclopedias, and wellness logs provided on this application are intended strictly for general personal awareness and organizational convenience.
            </p>
            <p className="text-xs text-navy-600/80 leading-relaxed">
              Never disregard professional medical advice or delay seeking emergency treatment because of something you have read on this application. In any medical emergency, call 112 (India), 911 (US), or your local emergency telephone number immediately.
            </p>
            <div className="pt-2">
              <Link
                to="/disclaimer"
                className="text-xs font-bold text-teal-800 hover:text-emerald-600 underline underline-offset-2 transition-colors"
              >
                Read Comprehensive Medical Disclaimer & Policies →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const FinalCTASection: React.FC = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-canvas to-mint-100/50 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/15 border border-emerald-500/30 text-teal-800">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>Begin Your Living Wellness Journey</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-navy-900 tracking-tight font-display max-w-2xl mx-auto">
          Take Charge of Your Personal Health Today
        </h2>
        <p className="text-base sm:text-lg text-navy-700/80 max-w-xl mx-auto leading-relaxed">
          Create an account to organize your health notes, set reminders, and archive medical reports with private Row Level Security.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Link to="/signup" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto shadow-lg shadow-teal-800/20" rightIcon={<ArrowRight className="w-5 h-5" />}>
              Create Free Account
            </Button>
          </Link>
          <Link to="/symptoms" className="w-full sm:w-auto">
            <Button variant="secondary" size="lg" className="w-full sm:w-auto">
              Explore Symptom Guide
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
