import React from 'react';
import { Menu, Mic, Volume2, ShieldAlert, Sparkles, Database } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/common/Button';

interface DashboardHeaderProps {
  onToggleMobileMenu: () => void;
  onOpenVoiceModal: () => void;
  title: string;
  subtitle?: string;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  onToggleMobileMenu,
  onOpenVoiceModal,
  title,
  subtitle,
}) => {
  const { isConfigured, authMode } = useAuth();

  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-teal-800/10 sticky top-0 z-30 px-4 sm:px-8 py-4">
      {/* Unconfigured Supabase Banner notice */}
      {!isConfigured && (
        <div className="mb-3 px-3.5 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-900 text-xs flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              <strong>Demo & Local Mode Active:</strong> Supabase cloud credentials are not yet configured in <code>.env</code>. Your changes persist locally.
            </span>
          </div>
          <span className="font-semibold text-amber-800 hidden sm:inline">
            Connect Supabase anytime for cloud sync
          </span>
        </div>
      )}

      <div className="flex items-center justify-between gap-4">
        {/* Title & mobile trigger */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleMobileMenu}
            className="p-2 -ml-2 rounded-xl text-navy-800 hover:bg-teal-50 lg:hidden"
            aria-label="Toggle navigation menu"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-navy-800 font-display">
              {title}
            </h1>
            {subtitle && (
              <p className="text-xs sm:text-sm text-navy-600/80">{subtitle}</p>
            )}
          </div>
        </div>

        {/* Quick Tools */}
        <div className="flex items-center gap-2.5">
          <Button
            variant="secondary"
            size="sm"
            onClick={onOpenVoiceModal}
            leftIcon={<Mic className="w-4 h-4 text-emerald-600" />}
            title="Open Hands-Free Voice Dictation"
          >
            <span className="hidden sm:inline">Voice Assistant</span>
          </Button>
        </div>
      </div>
    </header>
  );
};
