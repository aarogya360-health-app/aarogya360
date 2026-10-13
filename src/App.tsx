import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import { HealthDataProvider } from '@/context/HealthDataContext';
import { AccessibilityProvider } from '@/context/AccessibilityContext';

import { RootLayout } from '@/layouts/RootLayout';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';

import { HomePage } from '@/pages/HomePage';
import { SignInPage } from '@/pages/SignInPage';
import { SignUpPage } from '@/pages/SignUpPage';
import { ForgotPasswordPage } from '@/pages/ForgotPasswordPage';
import { DashboardOverviewPage } from '@/pages/DashboardOverviewPage';
import { HealthNotesPage } from '@/pages/HealthNotesPage';
import { MedicalReportsPage } from '@/pages/MedicalReportsPage';
import { RemindersPage } from '@/pages/RemindersPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { SymptomInfoPage } from '@/pages/SymptomInfoPage';
import { DailyWellnessPage } from '@/pages/DailyWellnessPage';
import { PrivacyPolicyPage } from '@/pages/PrivacyPolicyPage';
import { MedicalDisclaimerPage } from '@/pages/MedicalDisclaimerPage';
import { NotFoundPage } from '@/pages/NotFoundPage';

export const App: React.FC = () => {
  return (
    <AccessibilityProvider>
      <AuthProvider>
        <HealthDataProvider>
          <BrowserRouter>
            <Routes>
              {/* Public Routes with Standard Header & Footer */}
              <Route element={<RootLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/symptoms" element={<SymptomInfoPage />} />
                <Route path="/wellness" element={<DailyWellnessPage />} />
                <Route path="/privacy" element={<PrivacyPolicyPage />} />
                <Route path="/disclaimer" element={<MedicalDisclaimerPage />} />
                <Route path="/signin" element={<SignInPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>

              {/* Authenticated Dashboard Routes */}
              <Route path="/dashboard" element={<DashboardLayout />}>
                <Route index element={<DashboardOverviewPage />} />
                <Route path="notes" element={<HealthNotesPage />} />
                <Route path="reports" element={<MedicalReportsPage />} />
                <Route path="reminders" element={<RemindersPage />} />
                <Route path="profile" element={<ProfilePage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </HealthDataProvider>
      </AuthProvider>
    </AccessibilityProvider>
  );
};

export default App;
