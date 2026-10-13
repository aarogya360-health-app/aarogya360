import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, ShieldCheck, Heart, AlertTriangle, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-navy-900 text-white pt-16 pb-12 border-t border-teal-800/40 relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-teal-800/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-800 to-emerald-500 flex items-center justify-center shadow-glow-emerald">
                <Activity className="w-5 h-5 text-mint-100" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-white font-display">
                Aarogya<span className="text-emerald-400">360</span>
              </span>
            </div>
            <p className="text-sm text-ice-200/80 max-w-sm leading-relaxed">
              "Your Health. Your World. In Harmony." Empowering individuals with intelligent personal health organization, secure report storage, and accessible wellness routines.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-800/40 border border-teal-500/20 text-xs text-mint-200">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Row-Level Security & Private Cloud Storage</span>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-4">
              Platform
            </h4>
            <ul className="space-y-2.5 text-sm text-ice-200/80">
              <li>
                <Link to="/" className="hover:text-emerald-300 transition-colors">
                  Home Overview
                </Link>
              </li>
              <li>
                <Link to="/#services" className="hover:text-emerald-300 transition-colors">
                  Living Wellness Services
                </Link>
              </li>
              <li>
                <Link to="/symptoms" className="hover:text-emerald-300 transition-colors">
                  Symptom Information
                </Link>
              </li>
              <li>
                <Link to="/wellness" className="hover:text-emerald-300 transition-colors">
                  Daily Wellness Routine
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-emerald-300 transition-colors">
                  Health Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Health Records */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-4">
              Personal Tools
            </h4>
            <ul className="space-y-2.5 text-sm text-ice-200/80">
              <li>
                <Link to="/dashboard/notes" className="hover:text-emerald-300 transition-colors">
                  Personal Health Notes
                </Link>
              </li>
              <li>
                <Link to="/dashboard/reports" className="hover:text-emerald-300 transition-colors">
                  Medical Report Archive
                </Link>
              </li>
              <li>
                <Link to="/dashboard/reminders" className="hover:text-emerald-300 transition-colors">
                  Medication & Care Reminders
                </Link>
              </li>
              <li>
                <Link to="/dashboard/profile" className="hover:text-emerald-300 transition-colors">
                  Profile & Contacts
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Medical Notice */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-4">
              Safety & Governance
            </h4>
            <ul className="space-y-2.5 text-sm text-ice-200/80">
              <li>
                <Link to="/disclaimer" className="hover:text-emerald-300 transition-colors">
                  Medical Safety Disclaimer
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-emerald-300 transition-colors">
                  Privacy Policy & Data Security
                </Link>
              </li>
              <li>
                <a
                  href="#emergency"
                  className="text-rose-400 hover:text-rose-300 font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <AlertTriangle className="w-3.5 h-3.5" />
                  Emergency Notice (112/911)
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Emergency Callout Box */}
        <div id="emergency" className="my-8 p-4 rounded-2xl bg-rose-950/40 border border-rose-500/30 text-rose-200 text-xs sm:text-sm flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />
            <span>
              <strong>Crucial Warning:</strong> Aarogya360 is NOT an emergency response service. If you or someone you are assisting is experiencing severe chest pain, shortness of breath, acute trauma, or sudden stroke symptoms, call emergency services immediately or head to the nearest hospital.
            </span>
          </div>
          <button
            onClick={scrollToTop}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white shrink-0 transition-colors flex items-center gap-1 text-xs"
            aria-label="Back to top of page"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-ice-200/60 gap-4">
          <p>© {new Date().getFullYear()} Aarogya360. Built with React, TypeScript, Supabase PostgreSQL, and Living Wellness Design System.</p>
          <p className="flex items-center gap-1">
            Carefully crafted for user privacy and accessibility.
          </p>
        </div>
      </div>
    </footer>
  );
};
