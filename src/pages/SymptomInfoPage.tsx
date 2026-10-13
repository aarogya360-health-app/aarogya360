import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  HeartPulse,
  Search,
  AlertTriangle,
  HelpCircle,
  Stethoscope,
  ShieldCheck,
  ChevronRight,
  Info,
  PhoneCall
} from 'lucide-react';
import { SpeechReader } from '@/components/common/SpeechReader';
import { Button } from '@/components/common/Button';

interface SymptomEntry {
  id: string;
  name: string;
  category: string;
  generalDescription: string;
  potentialFactors: string[];
  selfCareObservations: string[];
  doctorDiscussionPoints: string[];
  urgentCareWarning: string;
}

export const SymptomInfoPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedSymptom, setSelectedSymptom] = useState<SymptomEntry | null>(null);

  const symptomDatabase: SymptomEntry[] = [
    {
      id: 'headache',
      name: 'Tension & Fatigue Headache',
      category: 'Neurological / Cranial',
      generalDescription: 'A dull, aching sensation around the forehead, temples, or back of the neck. Frequently linked to digital eye strain, muscle tension, lack of sleep, or dehydration.',
      potentialFactors: ['Dehydration & inadequate water intake', 'Prolonged screen exposure without breaks', 'Cervical spine / neck muscle stiffness', 'Emotional stress & sleep disruption'],
      selfCareObservations: ['Hydrate with 500ml water', 'Take a 20-minute screen break in dim lighting', 'Apply gentle cool compress to the forehead', 'Practice diaphragmatic breathing'],
      doctorDiscussionPoints: ['Frequency and duration of headache episodes', 'Specific triggers (foods, lights, stress)', 'Any over-the-counter remedies already attempted'],
      urgentCareWarning: 'Seek IMMEDIATE emergency care if you experience a "thunderclap" sudden explosive headache, visual field loss, fever with stiff neck, slurred speech, or confusion.',
    },
    {
      id: 'fatigue',
      name: 'Unexplained Physical Fatigue',
      category: 'Systemic / Energy',
      generalDescription: 'A persistent feeling of tiredness, low energy, and sluggishness that is not readily refreshed by a typical night of sleep.',
      potentialFactors: ['Disrupted circadian rhythm or sleep apnea', 'Suboptimal iron, ferritin, or vitamin B12 levels', 'Thyroid hormonal imbalances', 'Chronic stress & adrenal exhaustion'],
      selfCareObservations: ['Log sleep hours consistently for 7 days', 'Ensure 15 minutes of direct morning sunlight', 'Avoid caffeine within 8 hours of bedtime', 'Maintain regular meal intervals'],
      doctorDiscussionPoints: ['How long the exhaustion has persisted', 'Impact on work and daily activities', 'Request routine complete blood count and thyroid panel if indicated'],
      urgentCareWarning: 'Go to emergency care if severe fatigue is accompanied by chest discomfort, fainting (syncope), severe shortness of breath, or irregular heart palpitations.',
    },
    {
      id: 'cough',
      name: 'Mild Cough & Throat Irritation',
      category: 'Respiratory',
      generalDescription: 'A dry or tickling cough reflex caused by airborne dust, seasonal allergens, or upper respiratory viral clearing.',
      potentialFactors: ['Seasonal air quality changes / pollen', 'Post-nasal drip from common cold', 'Acid reflux (GERD) following meals', 'Dry indoor air or air conditioning'],
      selfCareObservations: ['Sip warm water or herbal chamomile tea', 'Use a clean room humidifier', 'Avoid smoke, aerosol sprays, and harsh dust', 'Elevate pillows while resting'],
      doctorDiscussionPoints: ['Duration of cough (acute vs chronic > 3 weeks)', 'Whether coughing produces discolored phlegm', 'Personal history of asthma or allergies'],
      urgentCareWarning: 'Seek IMMEDIATE medical help if you experience coughing up blood, stridor (high-pitched whistling breath), inability to speak full sentences, or blue-tinted lips.',
    },
    {
      id: 'indigestion',
      name: 'Digestive Discomfort & Bloating',
      category: 'Gastrointestinal',
      generalDescription: 'A sensation of abdominal fullness, mild burning in the upper abdomen, or intestinal gas following meals.',
      potentialFactors: ['Eating too quickly without adequate chewing', 'High intake of spicy, heavily fried, or acidic foods', 'Sensitivity to lactose or specific FODMAP carbohydrates', 'Psychological stress affecting gut motility'],
      selfCareObservations: ['Eat smaller, unhurried meals', 'Avoid lying flat within 2 hours of eating', 'Take a gentle 15-minute post-meal stroll', 'Stay hydrated between meals rather than chugging during meals'],
      doctorDiscussionPoints: ['Timing of discomfort relative to meals', 'Foods that trigger symptoms', 'Any recent unintended weight changes'],
      urgentCareWarning: 'Seek IMMEDIATE emergency care if accompanied by intense stabbing abdominal pain, vomiting blood or coffee-ground material, black tarry stools, or rigid abdomen.',
    },
    {
      id: 'joint-stiffness',
      name: 'Joint Stiffness & Muscle Aches',
      category: 'Musculoskeletal',
      generalDescription: 'Tightness, reduced range of motion, or aching in joints and muscle groups, particularly noticeable upon waking.',
      potentialFactors: ['Sedentary posture during workday', 'Cold ambient weather or sudden intense exertion', 'Suboptimal vitamin D3 levels', 'Early inflammatory joint conditions'],
      selfCareObservations: ['Perform gentle morning mobility and cat-cow stretches', 'Take warm showers to loosen muscular tension', 'Incorporate low-impact walking or swimming', 'Assess desk and chair ergonomics'],
      doctorDiscussionPoints: ['Which specific joints are affected', 'Morning stiffness duration (over or under 30 minutes)', 'Any visible redness or heat over the joints'],
      urgentCareWarning: 'Consult an urgent care physician immediately if a joint is visibly hot to the touch, rapidly swelling, associated with high fever, or unable to bear weight.',
    },
  ];

  const filtered = symptomDatabase.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.generalDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* 1. High-Contrast Red Flag Urgent Care Warning Box */}
      <div className="rounded-3xl bg-rose-900 text-white p-6 sm:p-8 shadow-xl border border-rose-500/40 relative overflow-hidden">
        <div className="relative z-10 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-rose-500 text-white animate-pulse">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs uppercase font-extrabold tracking-widest text-rose-300">
                Critical Safety Protocol
              </span>
              <h2 className="text-xl sm:text-2xl font-black font-display text-white">
                When to Seek Immediate Emergency Medical Care
              </h2>
            </div>
          </div>

          <p className="text-sm text-rose-100/90 leading-relaxed max-w-4xl">
            Aarogya360 provides educational overviews only. If you or someone around you experiences any of the following <strong>red-flag symptoms</strong>, do not use web tools — dial <strong>112</strong> (India), <strong>911</strong> (US), or proceed directly to an emergency department:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs pt-2">
            <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-400/20">
              <strong className="block text-rose-200">Chest Pressure</strong>
              Crushing central chest pain, radiating to jaw, neck, or left arm.
            </div>
            <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-400/20">
              <strong className="block text-rose-200">Severe Breathlessness</strong>
              Struggling to draw breath, sudden wheezing, or bluish fingertips/lips.
            </div>
            <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-400/20">
              <strong className="block text-rose-200">Neurological Flags (FAST)</strong>
              Sudden facial drooping, arm weakness, speech slurring, or syncope.
            </div>
            <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-400/20">
              <strong className="block text-rose-200">Severe Allergic Reaction</strong>
              Facial or tongue swelling, severe hives, throat tightness following food/bite.
            </div>
          </div>

          <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-rose-200">
            <PhoneCall className="w-4 h-4 text-rose-400" />
            <span>Emergency Services Hotline: 112 / 911 / Local Ambulance</span>
          </div>
        </div>
      </div>

      {/* 2. Educational Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-teal-800/5 border border-teal-800/15 text-teal-800">
          <Stethoscope className="w-4 h-4 text-emerald-600" />
          <span>Educational Symptom Encyclopedia</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-800 font-display">
          Understanding Everyday Symptoms
        </h1>
        <p className="text-base text-navy-700/80 leading-relaxed">
          Learn common lifestyle factors, self-care observations, and constructive questions to discuss with your personal doctor. Never self-prescribe medications.
        </p>

        {/* Search Input */}
        <div className="relative max-w-lg mx-auto pt-2">
          <Search className="w-5 h-5 text-navy-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search symptoms (e.g. headache, fatigue, cough)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-2xl border border-teal-800/20 bg-white shadow-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none text-sm text-navy-900"
          />
        </div>
      </div>

      {/* 3. Symptom Cards & Detail Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Symptom Cards Grid */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between text-xs font-semibold text-navy-600 px-1">
            <span>Common Observations ({filtered.length})</span>
            <span>Click to explore clinical dialogue</span>
          </div>

          {filtered.map((symptom) => (
            <div
              key={symptom.id}
              onClick={() => setSelectedSymptom(symptom)}
              className={`p-6 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between ${
                selectedSymptom?.id === symptom.id
                  ? 'bg-white border-teal-800 shadow-glass ring-2 ring-emerald-500/20'
                  : 'bg-white/85 border-teal-800/10 hover:border-emerald-500/40 hover:bg-white shadow-card'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-800/10">
                    {symptom.category}
                  </span>
                  <SpeechReader
                    textToRead={`${symptom.name}. ${symptom.generalDescription}`}
                    label="Listen"
                    compact
                  />
                </div>
                <h3 className="text-lg font-bold text-navy-800 mb-1.5">{symptom.name}</h3>
                <p className="text-xs text-navy-600/80 leading-relaxed line-clamp-2">
                  {symptom.generalDescription}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-teal-800/10 flex items-center justify-between text-xs font-semibold text-teal-800">
                <span>View questions for your doctor</span>
                <ChevronRight className="w-4 h-4 text-emerald-600" />
              </div>
            </div>
          ))}
        </div>

        {/* Selected Symptom Detailed Educational Breakdown */}
        <div className="lg:col-span-6">
          {selectedSymptom ? (
            <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-teal-800/15 shadow-xl space-y-6 sticky top-28">
              <div className="flex items-start justify-between gap-4 border-b border-teal-800/10 pb-4">
                <div>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                    {selectedSymptom.category}
                  </span>
                  <h2 className="text-2xl font-extrabold text-navy-800 font-display mt-2">
                    {selectedSymptom.name}
                  </h2>
                </div>
                <SpeechReader
                  textToRead={`${selectedSymptom.name}. Potential factors: ${selectedSymptom.potentialFactors.join(', ')}. Discussion points: ${selectedSymptom.doctorDiscussionPoints.join(', ')}`}
                  label="Listen to Full Guide"
                />
              </div>

              <p className="text-sm text-navy-700 leading-relaxed">
                {selectedSymptom.generalDescription}
              </p>

              {/* Potential Factors */}
              <div className="space-y-2">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-teal-800">
                  Common Everyday Contributors
                </h4>
                <ul className="space-y-1.5 text-xs text-navy-700">
                  {selectedSymptom.potentialFactors.map((f, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Questions for Doctor */}
              <div className="p-4 rounded-2xl bg-teal-50/80 border border-teal-800/15 space-y-2">
                <h4 className="text-xs font-bold text-teal-900 flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4 text-emerald-600" />
                  <span>Constructive Questions to Ask Your Doctor</span>
                </h4>
                <ul className="space-y-1.5 text-xs text-navy-700">
                  {selectedSymptom.doctorDiscussionPoints.map((q, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="font-bold text-teal-800 shrink-0">{i + 1}.</span>
                      <span>"{q}"</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Specific Urgent Warning */}
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-800 space-y-1">
                <strong className="block text-rose-900 font-bold">Red Flag Warning:</strong>
                <p className="leading-relaxed">{selectedSymptom.urgentCareWarning}</p>
              </div>
            </div>
          ) : (
            <div className="bg-white/70 rounded-3xl p-12 text-center border border-dashed border-teal-800/20 space-y-3">
              <Stethoscope className="w-12 h-12 text-teal-700 mx-auto" />
              <h3 className="text-base font-bold text-navy-800">Select an Everyday Symptom</h3>
              <p className="text-xs text-navy-600 max-w-sm mx-auto leading-relaxed">
                Click any symptom card on the left to review potential lifestyle contributors, self-observation tips, and questions for your doctor.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
