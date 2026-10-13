import React from 'react';
import { AlertTriangle, ShieldAlert, PhoneCall, Stethoscope, HeartHandshake } from 'lucide-react';
import { SpeechReader } from '@/components/common/SpeechReader';

export const MedicalDisclaimerPage: React.FC = () => {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-10">
      <div className="space-y-4 text-center sm:text-left">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-rose-500/10 border border-rose-500/25 text-rose-800">
            <AlertTriangle className="w-4 h-4 text-rose-600" />
            <span>Clinical Notice & Safety Charter</span>
          </div>
          <SpeechReader
            textToRead="Aarogya360 Medical Disclaimer: The contents of this website are for educational and personal health organization purposes only. It is not medical advice, clinical diagnosis, or drug prescription. Always consult a licensed healthcare professional for any medical concerns."
            label="Listen to Disclaimer"
          />
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-800 font-display">
          Medical Safety Disclaimer & Policies
        </h1>
        <p className="text-sm text-navy-600/80">
          Essential information regarding our role as a health organization technology platform.
        </p>
      </div>

      {/* Emergency Alert Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-rose-950 text-white border-2 border-rose-500/50 shadow-xl space-y-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-rose-600 text-white">
            <PhoneCall className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <span className="text-xs font-bold text-rose-300 uppercase tracking-wider block">Immediate Life Threat</span>
            <h2 className="text-xl font-bold font-display text-white">Medical Emergency Protocol</h2>
          </div>
        </div>
        <p className="text-sm text-rose-100/90 leading-relaxed">
          If you or someone in your care is experiencing severe chest pain, shortness of breath, unexplained fainting, sudden loss of speech or vision, heavy bleeding, or acute allergic reaction — <strong>DO NOT rely on this website</strong>. Immediately dial <strong>112</strong> (India), <strong>911</strong> (US), or visit the nearest emergency medical facility.
        </p>
      </div>

      <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-10 border border-teal-800/10 shadow-card space-y-8 text-sm text-navy-700/85 leading-relaxed">
        {/* Clause 1 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-navy-800 flex items-center gap-2">
            <Stethoscope className="w-5 h-5 text-teal-800" />
            <span>1. Informational and Organizational Scope Only</span>
          </h2>
          <p>
            Aarogya360 is an interactive personal software platform designed to help users organize personal wellness records, archive diagnostic reports, and explore educational lifestyle material. <strong>Aarogya360 is not a licensed healthcare provider, medical clinic, pharmacy, or diagnostic laboratory.</strong>
          </p>
        </section>

        {/* Clause 2 */}
        <section className="space-y-3 pt-4 border-t border-teal-800/10">
          <h2 className="text-lg font-bold text-navy-800 flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-emerald-600" />
            <span>2. No Doctor-Patient Relationship Created</span>
          </h2>
          <p>
            Your access to or use of Aarogya360 does not facilitate or constitute a doctor-patient, therapist-patient, or other healthcare professional relationship between you and Aarogya360. Content on this site is not tailored medical advice for your unique biology.
          </p>
        </section>

        {/* Clause 3 */}
        <section className="space-y-3 pt-4 border-t border-teal-800/10">
          <h2 className="text-lg font-bold text-navy-800 flex items-center gap-2">
            <HeartHandshake className="w-5 h-5 text-lavender-500" />
            <span>3. Medication and Treatment Schedules</span>
          </h2>
          <p>
            Any medication or care reminders configured by users in the dashboard must be based strictly on prescriptions, directions, or schedules explicitly given by your personal physician. <strong>Never start, alter, or stop any prescribed medication or medical treatment regimen based on information found on Aarogya360.</strong>
          </p>
        </section>

        {/* Clause 4 */}
        <section className="space-y-3 pt-4 border-t border-teal-800/10">
          <h2 className="text-lg font-bold text-navy-800">
            4. Absence of Automated Clinical Diagnostics
          </h2>
          <p className="text-xs text-navy-600 leading-relaxed">
            Aarogya360 does not execute automated clinical diagnostic algorithms on uploaded medical documents or laboratory panels. The documents stored in your vault remain private files for your own organizational convenience and clinical discussions with certified human doctors.
          </p>
        </section>
      </div>
    </div>
  );
};
