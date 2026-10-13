import React from 'react';
import { ShieldCheck, Lock, Database, Trash2, CheckCircle2, AlertCircle } from 'lucide-react';
import { SpeechReader } from '@/components/common/SpeechReader';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-10">
      <div className="space-y-4 text-center sm:text-left">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-teal-800/5 border border-teal-800/15 text-teal-800">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Privacy Governance & Data Architecture</span>
          </div>
          <SpeechReader
            textToRead="Aarogya360 Privacy Notice: Your personal health entries and laboratory documents belong strictly to you. We employ Row-Level Security and private encrypted cloud storage with zero advertising trackers or data monetization."
            label="Listen to Privacy Policy"
          />
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-800 font-display">
          Privacy Policy & Data Rights
        </h1>
        <p className="text-sm text-navy-600/80">
          Last revised: October 2026 • Aarogya360 Living Wellness Engineering
        </p>
      </div>

      <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-10 border border-teal-800/10 shadow-card space-y-8 text-sm text-navy-700/85 leading-relaxed">
        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-navy-800 flex items-center gap-2">
            <Lock className="w-5 h-5 text-teal-800" />
            <span>1. Core Privacy Philosophy: Data Sovereignty</span>
          </h2>
          <p>
            At Aarogya360, your sensitive health notes and clinical report records are guarded as confidential property. We enforce an uncompromising security posture:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-navy-800">
            <li><strong>No Commercial Data Brokerage:</strong> We never monetize, rent, or sell your health records or demographic details.</li>
            <li><strong>No Ad Trackers:</strong> Aarogya360 contains zero commercial advertising SDKs, pixel trackers, or behavioural marketing telemetry.</li>
            <li><strong>Client-Side & Cloud Parity:</strong> Personal data is processed exclusively to deliver your intended health organization workflows.</li>
          </ul>
        </section>

        {/* Section 2 */}
        <section className="space-y-3 pt-4 border-t border-teal-800/10">
          <h2 className="text-lg font-bold text-navy-800 flex items-center gap-2">
            <Database className="w-5 h-5 text-emerald-600" />
            <span>2. Technical Storage & Row Level Security (RLS)</span>
          </h2>
          <p>
            When connected to our production infrastructure, records are managed in a high-security PostgreSQL database managed by Supabase. Access is governed mathematically via <strong>PostgreSQL Row Level Security (RLS)</strong>:
          </p>
          <div className="p-4 rounded-2xl bg-canvas border border-teal-800/10 font-mono text-xs space-y-1 text-teal-900">
            <p>-- Example RLS Policy Applied to Personal Records</p>
            <p>CREATE POLICY "Users can access only own records" ON health_notes</p>
            <p>FOR ALL USING (auth.uid() = user_id);</p>
          </div>
          <p className="text-xs text-navy-600">
            This means database queries from one user cannot physically return or query records belonging to another patient, even under concurrent multi-tenant execution.
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-3 pt-4 border-t border-teal-800/10">
          <h2 className="text-lg font-bold text-navy-800 flex items-center gap-2">
            <Trash2 className="w-5 h-5 text-rose-600" />
            <span>3. Right to Complete Deletion (Account Purge)</span>
          </h2>
          <p>
            You have the absolute right to purge your information at any time. When you select "Delete Health Note", "Delete Report", or "Purge Cached Data":
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-navy-800">
            <li>The database record is deleted immediately via cascading database triggers.</li>
            <li>The file object in the private storage bucket is permanently removed.</li>
            <li>Any local storage cache in your browser is wiped clean.</li>
          </ul>
        </section>

        {/* Section 4 */}
        <section className="space-y-3 pt-4 border-t border-teal-800/10">
          <h2 className="text-lg font-bold text-navy-800">
            4. Voice Accessibility & Microphone Usage
          </h2>
          <p className="text-xs text-navy-700 leading-relaxed">
            Aarogya360 uses the standard browser Web Speech API for voice dictation and text-to-speech. We never activate your microphone without a deliberate user press on the microphone button. Audio streams are processed by your browser's speech recognition subsystem and are not stored or recorded on Aarogya360 servers.
          </p>
        </section>
      </div>
    </div>
  );
};
