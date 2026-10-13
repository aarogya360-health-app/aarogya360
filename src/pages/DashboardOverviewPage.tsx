import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FileText,
  UploadCloud,
  Bell,
  HeartPulse,
  Mic,
  Plus,
  ArrowRight,
  Shield,
  Clock,
  User,
  Phone,
  FileCheck2,
  Calendar,
  Sparkles
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useHealthData } from '@/context/HealthDataContext';
import { Button } from '@/components/common/Button';
import { GenuineDataCharts } from '@/components/dashboard/GenuineDataCharts';
import { formatDate, formatDateTime } from '@/utils/date';

export const DashboardOverviewPage: React.FC = () => {
  const { user } = useAuth();
  const { notes, reports, reminders, wellnessGoals, toggleReminder } = useHealthData();

  // Greeting by hour
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const displayName = user?.profile?.display_name || user?.email?.split('@')[0] || 'Friend';

  const quickActions = [
    {
      title: 'New Health Note',
      description: 'Record observation or doctor advice',
      to: '/dashboard/notes',
      icon: <FileText className="w-5 h-5 text-teal-700" />,
      bg: 'bg-teal-50 hover:bg-teal-100/50',
    },
    {
      title: 'Upload Report',
      description: 'Archive PDF panel or prescription',
      to: '/dashboard/reports',
      icon: <UploadCloud className="w-5 h-5 text-emerald-600" />,
      bg: 'bg-emerald-50 hover:bg-emerald-100/50',
    },
    {
      title: 'Set Reminder',
      description: 'Care routine or appointment alert',
      to: '/dashboard/reminders',
      icon: <Bell className="w-5 h-5 text-lavender-500" />,
      bg: 'bg-lavender-50 hover:bg-lavender-100/50',
    },
    {
      title: 'Symptom Guide',
      description: 'Review educational guidance & red flags',
      to: '/symptoms',
      icon: <HeartPulse className="w-5 h-5 text-rose-500" />,
      bg: 'bg-rose-50 hover:bg-rose-100/50',
    },
  ];

  return (
    <div className="space-y-8">
      {/* 1. Personalised Greeting & Profile Summary Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-teal-900 via-teal-800 to-navy-900 text-white p-6 sm:p-8 shadow-xl border border-emerald-500/20">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-mint-200 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Living Wellness Space</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-display">
              {getGreeting()}, <span className="text-mint-200">{displayName}</span>
            </h2>
            <p className="text-sm text-mint-100/80 max-w-xl">
              Your personal health sanctuary. Review recent observations, view scheduled care routines, and manage your medical documents securely.
            </p>
          </div>

          {/* User Profile Mini Snapshot */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 shrink-0 text-xs space-y-2 min-w-[220px]">
            <div className="flex items-center justify-between text-mint-200 font-bold border-b border-white/10 pb-1.5">
              <span>Patient Profile</span>
              <Link to="/dashboard/profile" className="text-emerald-300 hover:underline">
                Edit
              </Link>
            </div>
            <div className="flex items-center justify-between text-ice-100">
              <span className="text-white/70">Blood Group:</span>
              <span className="font-semibold">{user?.profile?.blood_group || 'Not recorded'}</span>
            </div>
            <div className="flex items-center justify-between text-ice-100">
              <span className="text-white/70">Language:</span>
              <span className="font-semibold uppercase">{user?.profile?.preferred_language || 'EN'}</span>
            </div>
            {user?.profile?.emergency_contact && (
              <div className="flex items-center justify-between text-ice-100 pt-1 border-t border-white/10">
                <span className="text-white/70 flex items-center gap-1">
                  <Phone className="w-3 h-3 text-emerald-400" />
                  Emergency:
                </span>
                <span className="font-semibold truncate max-w-[120px]">
                  {user.profile.emergency_contact.phone}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2. Quick Actions Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions.map((action) => (
          <Link
            key={action.title}
            to={action.to}
            className="p-5 rounded-2xl bg-white border border-teal-800/10 shadow-sm hover:shadow-card hover:-translate-y-1 transition-all flex items-start gap-4 group"
          >
            <div className={`p-3 rounded-xl ${action.bg} transition-colors shrink-0`}>
              {action.icon}
            </div>
            <div>
              <h3 className="text-sm font-bold text-navy-800 group-hover:text-teal-800 transition-colors">
                {action.title}
              </h3>
              <p className="text-xs text-navy-600/70 mt-1 leading-snug">
                {action.description}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* 3. Genuine Data Charts (Experience B) */}
      <GenuineDataCharts notes={notes} goals={wellnessGoals} />

      {/* 4. Split Column: Recent Notes & Upcoming Reminders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Health Notes */}
        <div className="bg-white/85 backdrop-blur-md rounded-3xl p-6 border border-teal-800/10 shadow-card">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-teal-800" />
              <h3 className="text-base font-bold text-navy-800">Recent Health Notes</h3>
            </div>
            <Link
              to="/dashboard/notes"
              className="text-xs font-bold text-teal-800 hover:text-emerald-600 flex items-center gap-1"
            >
              <span>View All ({notes.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {notes.length === 0 ? (
            <div className="p-8 text-center bg-canvas rounded-2xl border border-dashed border-teal-800/20 text-xs text-navy-600">
              No health notes logged yet.
              <div className="mt-3">
                <Link to="/dashboard/notes">
                  <Button size="sm" variant="secondary" leftIcon={<Plus className="w-3.5 h-3.5" />}>
                    Create First Note
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {notes.slice(0, 3).map((note) => (
                <div
                  key={note.id}
                  className="p-4 rounded-2xl bg-canvas border border-teal-800/10 hover:border-emerald-500/30 transition-all space-y-1.5"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold px-2 py-0.5 rounded-full bg-teal-100 text-teal-800">
                      {note.category}
                    </span>
                    <span className="text-navy-500">{formatDate(note.note_date)}</span>
                  </div>
                  <h4 className="text-sm font-bold text-navy-800">{note.title}</h4>
                  <p className="text-xs text-navy-600/80 line-clamp-2 leading-relaxed">
                    {note.note}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Upcoming Reminders */}
        <div className="bg-white/85 backdrop-blur-md rounded-3xl p-6 border border-teal-800/10 shadow-card">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-emerald-600" />
              <h3 className="text-base font-bold text-navy-800">Upcoming Reminders</h3>
            </div>
            <Link
              to="/dashboard/reminders"
              className="text-xs font-bold text-teal-800 hover:text-emerald-600 flex items-center gap-1"
            >
              <span>Manage Reminders</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {reminders.length === 0 ? (
            <div className="p-8 text-center bg-canvas rounded-2xl border border-dashed border-teal-800/20 text-xs text-navy-600">
              No upcoming reminders set.
              <div className="mt-3">
                <Link to="/dashboard/reminders">
                  <Button size="sm" variant="secondary" leftIcon={<Plus className="w-3.5 h-3.5" />}>
                    Add Care Reminder
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {reminders.slice(0, 3).map((rem) => {
                const isCompleted = rem.status === 'completed';
                return (
                  <div
                    key={rem.id}
                    onClick={() => toggleReminder(rem.id)}
                    className="p-4 rounded-2xl bg-canvas border border-teal-800/10 hover:border-emerald-500/30 transition-all flex items-center justify-between gap-3 cursor-pointer"
                  >
                    <div className="space-y-1">
                      <h4 className={`text-sm font-bold ${isCompleted ? 'line-through text-navy-400' : 'text-navy-800'}`}>
                        {rem.label}
                      </h4>
                      <div className="flex items-center gap-1.5 text-xs text-navy-500">
                        <Clock className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{formatDateTime(rem.scheduled_at)}</span>
                      </div>
                    </div>
                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
                      isCompleted ? 'bg-emerald-100 text-emerald-800' : 'bg-teal-50 text-teal-800'
                    }`}>
                      {isCompleted ? 'Completed' : 'Pending'}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* 5. Recent Reports Snapshot */}
      <div className="bg-white/85 backdrop-blur-md rounded-3xl p-6 border border-teal-800/10 shadow-card">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <UploadCloud className="w-5 h-5 text-teal-800" />
            <h3 className="text-base font-bold text-navy-800">Recent Medical Reports</h3>
          </div>
          <Link to="/dashboard/reports" className="text-xs font-bold text-teal-800 hover:text-emerald-600 flex items-center gap-1">
            <span>Open Vault</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {reports.length === 0 ? (
          <div className="p-6 text-center text-xs text-navy-600">
            No reports uploaded yet. Store blood work, imaging summaries, or prescriptions privately.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {reports.slice(0, 2).map((rep) => (
              <div key={rep.id} className="p-4 rounded-2xl bg-canvas border border-teal-800/10 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 truncate">
                  <div className="p-2.5 rounded-xl bg-teal-100 text-teal-800 shrink-0">
                    <FileCheck2 className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <h4 className="text-xs font-bold text-navy-800 truncate">{rep.file_name}</h4>
                    <span className="text-[11px] text-navy-500">{formatDate(rep.created_at)}</span>
                  </div>
                </div>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-white border border-teal-800/10 shrink-0 text-navy-600">
                  {Math.round(rep.file_size_bytes / 1024)} KB
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
