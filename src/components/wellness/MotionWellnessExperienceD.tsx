import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Droplets,
  Moon,
  Activity,
  Apple,
  ShieldCheck,
  Plus,
  Minus,
  CheckCircle,
  Clock,
  Sparkles,
  Info
} from 'lucide-react';
import { useHealthData } from '@/context/HealthDataContext';
import { Button } from '@/components/common/Button';
import { SpeechReader } from '@/components/common/SpeechReader';

export const MotionWellnessExperienceD: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'goals' | 'reminders' | 'timeline'>('goals');
  const { wellnessGoals, updateGoalProgress, reminders, toggleReminder, notes } = useHealthData();

  // Circular progress ring calculator
  const calculateCircleProgress = (current: number, target: number) => {
    const percentage = Math.min(100, Math.round((current / target) * 100));
    const radius = 38;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;
    return { percentage, strokeDashoffset, circumference };
  };

  const getPillarIcon = (type: string) => {
    switch (type) {
      case 'hydration': return <Droplets className="w-5 h-5 text-emerald-500" />;
      case 'sleep': return <Moon className="w-5 h-5 text-lavender-500" />;
      case 'movement': return <Activity className="w-5 h-5 text-teal-600" />;
      default: return <Sparkles className="w-5 h-5 text-emerald-600" />;
    }
  };

  return (
    <section className="py-24 bg-gradient-to-b from-canvas via-mint-50/40 to-canvas relative overflow-hidden" aria-labelledby="motion-wellness-heading">
      {/* Organic background aura */}
      <div className="absolute top-1/2 left-10 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-lavender-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/25 text-teal-800">
            <span>Interactive Motion Graphics</span>
          </div>
          <h2 id="motion-wellness-heading" className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-800 tracking-tight font-display">
            Living Wellness <span className="text-gradient-teal">Interactive Sandbox</span>
          </h2>
          <p className="text-base text-navy-700/80 leading-relaxed">
            Interact with goal progress rings, active routine reminders, and personal timelines. Visualizations reflect only genuine, user-entered values.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 rounded-2xl bg-white/90 backdrop-blur-md border border-teal-800/15 shadow-sm">
            <button
              onClick={() => setActiveTab('goals')}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 relative ${
                activeTab === 'goals'
                  ? 'text-white bg-teal-800 shadow-sm'
                  : 'text-navy-700 hover:text-teal-900 hover:bg-teal-50'
              }`}
            >
              Goal Progress Rings
            </button>
            <button
              onClick={() => setActiveTab('reminders')}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 relative ${
                activeTab === 'reminders'
                  ? 'text-white bg-teal-800 shadow-sm'
                  : 'text-navy-700 hover:text-teal-900 hover:bg-teal-50'
              }`}
            >
              Active Reminders
            </button>
            <button
              onClick={() => setActiveTab('timeline')}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 relative ${
                activeTab === 'timeline'
                  ? 'text-white bg-teal-800 shadow-sm'
                  : 'text-navy-700 hover:text-teal-900 hover:bg-teal-50'
              }`}
            >
              Health Note Cadence
            </button>
          </div>
        </div>

        {/* Tab Panels */}
        <AnimatePresence mode="wait">
          {activeTab === 'goals' && (
            <motion.div
              key="goals"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {wellnessGoals.map((goal) => {
                const { percentage, strokeDashoffset, circumference } = calculateCircleProgress(goal.current, goal.target);
                return (
                  <div
                    key={goal.id}
                    className="bg-white/80 backdrop-blur-md rounded-3xl p-6 border border-teal-800/10 shadow-card hover:shadow-glass-hover transition-all flex flex-col items-center text-center relative group"
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between w-full mb-4">
                      <div className="p-2 rounded-xl bg-canvas border border-teal-800/10">
                        {getPillarIcon(goal.type)}
                      </div>
                      <span className="text-xs font-bold text-navy-600 bg-teal-50 px-2 py-0.5 rounded-md">
                        {percentage}% Complete
                      </span>
                    </div>

                    {/* SVG Animated Circular Progress Ring */}
                    <div className="relative w-32 h-32 my-2 flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                        {/* Background track */}
                        <circle
                          cx="50"
                          cy="50"
                          r="38"
                          stroke="#E2E8F0"
                          strokeWidth="8"
                          fill="transparent"
                        />
                        {/* Animated progress ring */}
                        <motion.circle
                          cx="50"
                          cy="50"
                          r="38"
                          stroke={goal.type === 'sleep' ? '#B9A5FF' : '#11BFA4'}
                          strokeWidth="8"
                          strokeDasharray={circumference}
                          initial={{ strokeDashoffset: circumference }}
                          animate={{ strokeDashoffset }}
                          transition={{ duration: 0.8, ease: 'easeOut' }}
                          strokeLinecap="round"
                          fill="transparent"
                        />
                      </svg>

                      {/* Center value */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <span className="text-2xl font-extrabold text-navy-800 font-display">
                          {goal.current}
                        </span>
                        <span className="text-[10px] text-navy-600 uppercase tracking-wider font-semibold">
                          of {goal.target} {goal.unit}
                        </span>
                      </div>
                    </div>

                    <h4 className="text-base font-bold text-navy-800 mt-2">{goal.label}</h4>
                    <p className="text-xs text-navy-600/70 mt-1">Logged today by you</p>

                    {/* Increment / Decrement buttons */}
                    <div className="flex items-center gap-3 mt-5">
                      <button
                        onClick={() => updateGoalProgress(goal.type, goal.current - 1)}
                        className="w-8 h-8 rounded-full bg-canvas hover:bg-teal-100/60 border border-teal-800/15 flex items-center justify-center text-navy-700 transition-colors"
                        aria-label={`Decrease ${goal.label}`}
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => updateGoalProgress(goal.type, goal.current + 1)}
                        className="w-8 h-8 rounded-full bg-teal-800 hover:bg-emerald-600 text-white flex items-center justify-center transition-colors shadow-sm"
                        aria-label={`Increase ${goal.label}`}
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          )}

          {activeTab === 'reminders' && (
            <motion.div
              key="reminders"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="max-w-3xl mx-auto space-y-4"
            >
              {reminders.map((rem) => {
                const isCompleted = rem.status === 'completed';
                return (
                  <div
                    key={rem.id}
                    onClick={() => toggleReminder(rem.id)}
                    className={`p-5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                      isCompleted
                        ? 'bg-white/60 border-emerald-500/30 opacity-75'
                        : 'bg-white border-teal-800/15 shadow-sm hover:shadow-card hover:border-emerald-500/40'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                        isCompleted ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-teal-700/40'
                      }`}>
                        {isCompleted && <CheckCircle className="w-4 h-4" />}
                      </div>
                      <div>
                        <h4 className={`text-sm sm:text-base font-bold ${isCompleted ? 'line-through text-navy-500' : 'text-navy-800'}`}>
                          {rem.label}
                        </h4>
                        <div className="flex items-center gap-2 mt-1 text-xs text-navy-600/70">
                          <Clock className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{new Date(rem.scheduled_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                      </div>
                    </div>
                    <span className={`text-xs px-3 py-1 rounded-full font-semibold ${
                      isCompleted ? 'bg-emerald-100 text-emerald-800' : 'bg-teal-50 text-teal-800 border border-teal-800/10'
                    }`}>
                      {isCompleted ? 'Completed' : 'Upcoming'}
                    </span>
                  </div>
                );
              })}
            </motion.div>
          )}

          {activeTab === 'timeline' && (
            <motion.div
              key="timeline"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="max-w-3xl mx-auto relative pl-8 border-l-2 border-emerald-500/30 space-y-8 my-4"
            >
              {notes.map((note) => (
                <div key={note.id} className="relative group">
                  {/* Timeline indicator node */}
                  <div className="absolute -left-[41px] top-1.5 w-5 h-5 rounded-full bg-white border-4 border-emerald-500 group-hover:scale-125 transition-transform" />
                  <div className="bg-white/85 backdrop-blur-md p-6 rounded-2xl border border-teal-800/10 shadow-sm">
                    <div className="flex items-center justify-between gap-4 mb-2">
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-800/10">
                        {note.category}
                      </span>
                      <span className="text-xs text-navy-600/70 font-medium">
                        {note.note_date}
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-navy-800 mb-2">{note.title}</h4>
                    <p className="text-sm text-navy-700/80 leading-relaxed">{note.note}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Honesty Disclosure */}
        <div className="mt-12 text-center">
          <p className="text-xs text-navy-600/70 inline-flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>Progress rings and metrics reflect only numbers directly submitted by the user. No automatic sensor simulation.</span>
          </p>
        </div>
      </div>
    </section>
  );
};
