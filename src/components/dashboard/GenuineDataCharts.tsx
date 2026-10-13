import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, PieChart, Info } from 'lucide-react';
import { HealthNote, WellnessGoal } from '@/types/database';

interface GenuineDataChartsProps {
  notes: HealthNote[];
  goals: WellnessGoal[];
}

export const GenuineDataCharts: React.FC<GenuineDataChartsProps> = ({ notes, goals }) => {
  // Aggregate notes by category
  const categories: Record<string, number> = {};
  notes.forEach((n) => {
    categories[n.category] = (categories[n.category] || 0) + 1;
  });

  const categoryEntries = Object.entries(categories);
  const totalNotes = notes.length;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Chart 1: Notes By Category */}
      <div className="bg-white/85 backdrop-blur-md p-6 rounded-3xl border border-teal-800/10 shadow-card">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <PieChart className="w-5 h-5 text-teal-800" />
            <h3 className="text-base font-bold text-navy-800">
              Personal Notes Distribution
            </h3>
          </div>
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800">
            {totalNotes} Total Entries
          </span>
        </div>

        {totalNotes === 0 ? (
          <div className="py-12 text-center text-xs text-navy-600">
            No health notes recorded yet. Create your first note to generate this distribution chart.
          </div>
        ) : (
          <div className="space-y-3.5 pt-2">
            {categoryEntries.map(([cat, count]) => {
              const percent = Math.round((count / totalNotes) * 100);
              return (
                <div key={cat} className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-navy-700">{cat}</span>
                    <span className="text-navy-500">{count} notes ({percent}%)</span>
                  </div>
                  <div className="h-2 w-full bg-canvas rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percent}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      className="h-full bg-gradient-to-r from-teal-800 to-emerald-500 rounded-full"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <p className="text-[11px] text-navy-600/70 mt-5 pt-3 border-t border-teal-800/10 flex items-center gap-1.5">
          <Info className="w-3 h-3 text-emerald-600 shrink-0" />
          <span>Calculated exclusively from your active personal health logs.</span>
        </p>
      </div>

      {/* Chart 2: Daily Wellness Goals Actual Progress */}
      <div className="bg-white/85 backdrop-blur-md p-6 rounded-3xl border border-teal-800/10 shadow-card">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-emerald-600" />
            <h3 className="text-base font-bold text-navy-800">
              Today's Entered Wellness Goals
            </h3>
          </div>
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800">
            Live Inputs
          </span>
        </div>

        <div className="space-y-4 pt-2">
          {goals.map((g) => {
            const percent = Math.min(100, Math.round((g.current / g.target) * 100));
            return (
              <div key={g.id} className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-navy-700">{g.label}</span>
                  <span className="text-navy-500">
                    {g.current} / {g.target} {g.unit} ({percent}%)
                  </span>
                </div>
                <div className="h-2.5 w-full bg-canvas rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percent}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className={`h-full rounded-full ${
                      percent >= 100
                        ? 'bg-emerald-500'
                        : percent >= 50
                        ? 'bg-teal-700'
                        : 'bg-lavender-500'
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-[11px] text-navy-600/70 mt-5 pt-3 border-t border-teal-800/10 flex items-center gap-1.5">
          <Info className="w-3 h-3 text-emerald-600 shrink-0" />
          <span>No simulated biometrics. Values update when you manually record your habits.</span>
        </p>
      </div>
    </div>
  );
};
