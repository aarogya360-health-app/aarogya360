import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  UploadCloud,
  Bell,
  User,
  Activity,
  HeartPulse,
  LogOut,
  Shield,
  ExternalLink
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export const DashboardSidebar: React.FC<{ onCloseMobile?: () => void }> = ({ onCloseMobile }) => {
  const { signOut, user, authMode } = useAuth();

  const navItems = [
    { name: 'Overview', to: '/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: 'Health Notes', to: '/dashboard/notes', icon: <FileText className="w-5 h-5" /> },
    { name: 'Medical Reports', to: '/dashboard/reports', icon: <UploadCloud className="w-5 h-5" /> },
    { name: 'Care Reminders', to: '/dashboard/reminders', icon: <Bell className="w-5 h-5" /> },
    { name: 'My Profile', to: '/dashboard/profile', icon: <User className="w-5 h-5" /> },
  ];

  return (
    <aside className="w-64 h-full bg-white border-r border-teal-800/10 flex flex-col justify-between py-6 px-4">
      <div className="space-y-6">
        {/* Brand */}
        <div className="px-3 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-teal-800 to-emerald-500 flex items-center justify-center text-white shadow-sm">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-navy-800 font-display">
              Aarogya<span className="text-emerald-500">360</span>
            </h2>
            <span className="text-[10px] text-teal-700 font-bold uppercase tracking-wider block">
              Health Dashboard
            </span>
          </div>
        </div>

        {/* Mode Tag */}
        <div className="px-3 py-2 rounded-xl bg-canvas border border-teal-800/10 text-xs">
          <div className="flex items-center justify-between text-[11px] text-navy-600 font-medium">
            <span>Session Mode:</span>
            <span className={`font-bold uppercase tracking-wider ${authMode === 'supabase' ? 'text-emerald-600' : 'text-teal-700'}`}>
              {authMode}
            </span>
          </div>
        </div>

        {/* Navigation links */}
        <nav className="space-y-1.5" aria-label="Dashboard Sidebar">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.to}
              end={item.to === '/dashboard'}
              onClick={onCloseMobile}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-teal-800 text-white shadow-sm shadow-teal-800/20'
                    : 'text-navy-700 hover:bg-teal-50 hover:text-teal-900'
                }`
              }
            >
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* Informational Shortcuts */}
        <div className="pt-4 border-t border-teal-800/10 space-y-1">
          <span className="px-3 text-[11px] font-bold uppercase tracking-wider text-navy-600/70">
            Resources
          </span>
          <NavLink
            to="/symptoms"
            className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-semibold text-navy-700 hover:bg-teal-50"
          >
            <span className="flex items-center gap-2">
              <HeartPulse className="w-4 h-4 text-emerald-600" />
              Symptom Guide
            </span>
            <ExternalLink className="w-3 h-3 text-navy-400" />
          </NavLink>
          <NavLink
            to="/wellness"
            className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-semibold text-navy-700 hover:bg-teal-50"
          >
            <span className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-600" />
              Daily Wellness
            </span>
            <ExternalLink className="w-3 h-3 text-navy-400" />
          </NavLink>
        </div>
      </div>

      {/* User info & Sign out */}
      <div className="pt-4 border-t border-teal-800/10 space-y-3">
        <div className="px-3 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center font-bold text-teal-800 text-sm">
            {user?.profile?.display_name?.charAt(0) || user?.email?.charAt(0) || 'U'}
          </div>
          <div className="truncate flex-1">
            <span className="block text-xs font-bold text-navy-800 truncate">
              {user?.profile?.display_name || 'Member'}
            </span>
            <span className="block text-[11px] text-navy-600 truncate">
              {user?.email}
            </span>
          </div>
        </div>

        <button
          onClick={() => signOut()}
          className="w-full flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};
