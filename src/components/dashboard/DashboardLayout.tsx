import React, { useState } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { DashboardSidebar } from './DashboardSidebar';
import { DashboardHeader } from './DashboardHeader';
import { VoiceInputModal } from '@/components/common/VoiceInputModal';
import { DisclaimerBanner } from '@/components/common/DisclaimerBanner';

export const DashboardLayout: React.FC = () => {
  const { user, loading } = useAuth();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState<boolean>(false);
  const [voiceModalOpen, setVoiceModalOpen] = useState<boolean>(false);
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-canvas flex flex-col items-center justify-center p-4">
        <div className="w-12 h-12 rounded-2xl bg-teal-800 flex items-center justify-center animate-spin">
          <div className="w-6 h-6 border-2 border-mint-200 border-t-transparent rounded-full" />
        </div>
        <p className="mt-4 text-sm font-semibold text-navy-800">
          Loading Aarogya360 Health Space...
        </p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/dashboard/notes': return { title: 'Personal Health Notes', subtitle: 'Encrypted entries and medical consultations' };
      case '/dashboard/reports': return { title: 'Medical Report Vault', subtitle: 'Secure cloud storage for test panels & prescriptions' };
      case '/dashboard/reminders': return { title: 'Care & Medication Reminders', subtitle: 'User-configured reminders for daily routines' };
      case '/dashboard/profile': return { title: 'Health Profile & Contacts', subtitle: 'Manage personal health baseline and emergency info' };
      case '/dashboard':
      default:
        return { title: 'Health Overview', subtitle: 'Your personal health status and upcoming care' };
    }
  };

  const { title, subtitle } = getPageTitle();

  return (
    <div className="min-h-screen bg-canvas flex flex-col">
      <DisclaimerBanner />

      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block shrink-0">
          <DashboardSidebar />
        </div>

        {/* Mobile Sidebar Drawer */}
        <AnimatePresence>
          {mobileSidebarOpen && (
            <div className="fixed inset-0 z-50 lg:hidden flex">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileSidebarOpen(false)}
                className="fixed inset-0 bg-navy-900/60 backdrop-blur-sm"
              />
              <motion.div
                initial={{ x: -280 }}
                animate={{ x: 0 }}
                exit={{ x: -280 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="relative z-10 w-72 max-w-[85vw] h-full"
              >
                <DashboardSidebar onCloseMobile={() => setMobileSidebarOpen(false)} />
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Main Dashboard Workspace */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          <DashboardHeader
            onToggleMobileMenu={() => setMobileSidebarOpen(true)}
            onOpenVoiceModal={() => setVoiceModalOpen(true)}
            title={title}
            subtitle={subtitle}
          />

          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
            <Outlet />
          </main>
        </div>
      </div>

      {/* Voice Assistant Modal */}
      <VoiceInputModal
        isOpen={voiceModalOpen}
        onClose={() => setVoiceModalOpen(false)}
        onTranscriptComplete={(transcript) => {
          // Toast or helper notification
          alert(`Voice transcription captured:\n"${transcript}"\nYou can copy or insert this text into any Health Note.`);
        }}
        title="Living Wellness Voice Assistant"
      />
    </div>
  );
};
