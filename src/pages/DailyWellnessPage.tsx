import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Droplets,
  Moon,
  Apple,
  Activity,
  ShieldCheck,
  Plus,
  Minus,
  Sparkles,
  CheckCircle2,
  Heart,
  Volume2
} from 'lucide-react';
import { useHealthData } from '@/context/HealthDataContext';
import { SpeechReader } from '@/components/common/SpeechReader';
import { Button } from '@/components/common/Button';

export const DailyWellnessPage: React.FC = () => {
  const { wellnessGoals, updateGoalProgress } = useHealthData();
  const [selectedPillar, setSelectedPillar] = useState<'hydration' | 'sleep' | 'nutrition' | 'movement' | 'preventive'>('hydration');

  const pillars = [
    {
      id: 'hydration' as const,
      name: 'Hydration Routine',
      icon: <Droplets className="w-5 h-5 text-emerald-500" />,
      tagline: 'Cells, Energy, & Cognition',
      summary: 'Adequate hydration supports cellular nutrient transport, cognitive vigilance, joint lubrication, and renal waste clearance.',
      practicalHabits: [
        'Drink a glass of ambient water right upon waking to counter overnight respiratory fluid loss.',
        'Carry a reusable stainless steel water bottle and sip consistently across work intervals.',
        'Monitor urine coloration: pale straw yellow indicates optimal hydration status.',
        'Increase intake on warm days or during active physical movement.',
      ],
      caution: 'Avoid forced excessive water chugging which can disrupt serum electrolyte balance. Hydrate progressively throughout the day.',
    },
    {
      id: 'sleep' as const,
      name: 'Rest & Sleep Habits',
      icon: <Moon className="w-5 h-5 text-lavender-500" />,
      tagline: 'Cellular Restoration & Brain Glymphatics',
      summary: 'Consistent 7-9 hours of restful sleep enables neural waste clearing, immune cell priming, memory consolidation, and metabolic balance.',
      practicalHabits: [
        'Anchor your morning wake time consistently, even during weekends, to set your master circadian clock.',
        'Dim high-intensity blue screen lighting 60 minutes prior to retiring for the night.',
        'Keep bedroom temperature cool, dark, and well-ventilated.',
        'Avoid heavy dinners or stimulating caffeinated beverages within 6 hours of bedtime.',
      ],
      caution: 'Chronic unrefreshing sleep accompanied by snoring or daytime gasping should be evaluated for obstructive sleep apnea by a physician.',
    },
    {
      id: 'nutrition' as const,
      name: 'Balanced Nutrition',
      icon: <Apple className="w-5 h-5 text-rose-500" />,
      tagline: 'Whole Foods, Fiber, & Micro-Nutrients',
      summary: 'Wholesome nutrition centers on diversity, fiber-rich legumes, whole grains, colorful produce, and moderate healthy fats.',
      practicalHabits: [
        'Aim for half of your lunch plate to consist of varied vegetables, leafy greens, or salads.',
        'Prioritize whole food fiber sources to feed beneficial gut microbiome bacteria.',
        'Stay mindful of hidden sodium and refined sugars in ultra-processed packaged snacks.',
        'Eat unhurriedly with awareness of satiety and natural hunger cues.',
      ],
      caution: 'Aarogya360 strictly rejects extreme restrictive fad diets or unverified supplement regimens. Consult a registered clinical dietitian for individual medical nutrition therapy.',
    },
    {
      id: 'movement' as const,
      name: 'Everyday Movement',
      icon: <Activity className="w-5 h-5 text-teal-600" />,
      tagline: 'Cardiovascular Vitality & Joint Mobility',
      summary: 'Human physiology thrives on regular low-intensity movement interspersed throughout the sedentary hours of modern work.',
      practicalHabits: [
        'Aim for 150 minutes of moderate aerobic movement (such as brisk walking) spread weekly.',
        'Break up long 60-minute sitting stints with 2 minutes of posture stretching or pacing.',
        'Take stairs instead of elevators where joint health comfortably permits.',
        'Incorporate gentle bodyweight mobility to preserve functional spinal and hip range of motion.',
      ],
      caution: 'Begin new exercise programs progressively. If you experience chest tightness, dizziness, or sharp joint pain, pause and speak with your doctor.',
    },
    {
      id: 'preventive' as const,
      name: 'Preventive Health',
      icon: <ShieldCheck className="w-5 h-5 text-emerald-600" />,
      tagline: 'Routine Check-Ups & Early Screening',
      summary: 'Preventive awareness emphasizes scheduled periodic clinical screenings, annual dental checks, blood pressure monitoring, and immunization updates.',
      practicalHabits: [
        'Keep an organized digital archive of past lab reports and prescription notes in your Aarogya360 vault.',
        'Check baseline blood pressure annually starting from age 20, or as recommended by your physician.',
        'Stay up to date with seasonal immunizations and age-appropriate cancer screenings.',
        'Discuss family medical history proactively during annual primary care visits.',
      ],
      caution: 'Preventive screening recommendations vary with age, gender, and family history. Schedule dedicated time with your family doctor.',
    },
  ];

  const currentPillarData = pillars.find(p => p.id === selectedPillar) || pillars[0];

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/25 text-teal-800">
          <Sparkles className="w-4 h-4 text-emerald-600" />
          <span>Living Wellness Foundations</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-800 font-display">
          Daily Wellness & Lifestyle Habits
        </h1>
        <p className="text-base text-navy-700/80 leading-relaxed">
          Grounded, evidence-informed habits for daily vitality. No extreme diets, no pseudoscientific supplements, and no unsupported health claims.
        </p>
      </div>

      {/* Pillar Selector Tabs */}
      <div className="flex items-center justify-start lg:justify-center gap-3 overflow-x-auto pb-2 scrollbar-none">
        {pillars.map((pillar) => (
          <button
            key={pillar.id}
            onClick={() => setSelectedPillar(pillar.id)}
            className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all border ${
              selectedPillar === pillar.id
                ? 'bg-teal-800 text-white border-teal-800 shadow-md'
                : 'bg-white/80 hover:bg-teal-50 text-navy-800 border-teal-800/10'
            }`}
          >
            {pillar.icon}
            <span>{pillar.name}</span>
          </button>
        ))}
      </div>

      {/* Main Selected Pillar Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-10 border border-teal-800/10 shadow-card space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-teal-800/10 pb-5">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                {currentPillarData.tagline}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-800 font-display mt-1">
                {currentPillarData.name}
              </h2>
            </div>
            <SpeechReader
              textToRead={`${currentPillarData.name}. ${currentPillarData.summary}. Key habits: ${currentPillarData.practicalHabits.join('. ')}`}
              label="Listen to Pillar"
            />
          </div>

          <p className="text-sm sm:text-base text-navy-700/85 leading-relaxed">
            {currentPillarData.summary}
          </p>

          {/* Practical Habits */}
          <div className="space-y-3 pt-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-teal-800">
              Evidence-Based Practical Practices
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {currentPillarData.practicalHabits.map((habit, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-canvas border border-teal-800/10 flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-xs text-navy-800 leading-relaxed font-medium">{habit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Responsible Caution */}
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-900 leading-relaxed space-y-1">
            <strong className="block font-bold">Clinical Caution:</strong>
            <p>{currentPillarData.caution}</p>
          </div>
        </div>

        {/* Live User Daily Goal Widget */}
        <div className="lg:col-span-4 bg-white/90 backdrop-blur-md rounded-3xl p-6 border border-teal-800/10 shadow-card space-y-6">
          <div className="flex items-center justify-between border-b border-teal-800/10 pb-3">
            <h3 className="text-base font-bold text-navy-800">Today's Habits Tracker</h3>
            <span className="text-[10px] uppercase font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded">
              Your Entries
            </span>
          </div>

          <div className="space-y-4">
            {wellnessGoals.map((goal) => {
              const percent = Math.min(100, Math.round((goal.current / goal.target) * 100));
              return (
                <div key={goal.id} className="p-3.5 rounded-2xl bg-canvas border border-teal-800/10 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-navy-800">
                    <span>{goal.label}</span>
                    <span className="text-emerald-700">{goal.current} / {goal.target} {goal.unit}</span>
                  </div>
                  <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${percent}%` }}
                      className="h-full bg-gradient-to-r from-teal-800 to-emerald-500 rounded-full transition-all duration-300"
                    />
                  </div>
                  <div className="flex items-center justify-end gap-2 pt-1">
                    <button
                      onClick={() => updateGoalProgress(goal.type, goal.current - 1)}
                      className="w-6 h-6 rounded-lg bg-white border border-teal-800/15 flex items-center justify-center text-navy-700 hover:bg-teal-50 text-xs"
                      aria-label={`Decrease ${goal.label}`}
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => updateGoalProgress(goal.type, goal.current + 1)}
                      className="w-6 h-6 rounded-lg bg-teal-800 text-white flex items-center justify-center hover:bg-emerald-600 text-xs"
                      aria-label={`Increase ${goal.label}`}
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="text-[11px] text-navy-600/70 text-center leading-snug">
            Goals are saved locally. Modify entries any time as part of your living wellness cadence.
          </p>
        </div>
      </div>
    </div>
  );
};
