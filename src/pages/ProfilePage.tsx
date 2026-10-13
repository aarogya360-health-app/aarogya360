import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Phone,
  Calendar,
  Languages,
  Droplet,
  Save,
  CheckCircle2,
  Trash2,
  ShieldAlert,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/common/Button';
import { Modal } from '@/components/common/Modal';
import { profileSchema, ProfileFormData } from '@/utils/validation';

export const ProfilePage: React.FC = () => {
  const { user, updateProfile, signOut } = useAuth();

  const [formData, setFormData] = useState<ProfileFormData>({
    display_name: user?.profile?.display_name || '',
    date_of_birth: user?.profile?.date_of_birth || '',
    preferred_language: (user?.profile?.preferred_language as 'en' | 'te' | 'hi') || 'en',
    blood_group: user?.profile?.blood_group || '',
    emergency_contact_name: user?.profile?.emergency_contact?.name || '',
    emergency_contact_phone: user?.profile?.emergency_contact?.phone || '',
    emergency_contact_relationship: user?.profile?.emergency_contact?.relationship || '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);
  const [deleteDataModalOpen, setDeleteDataModalOpen] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setSaveSuccess(false);

    const result = profileSchema.safeParse(formData);
    if (!result.success) {
      const errMap: Record<string, string> = {};
      result.error.issues.forEach(issue => {
        if (issue.path[0]) {
          errMap[issue.path[0].toString()] = issue.message;
        }
      });
      setErrors(errMap);
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await updateProfile({
        display_name: formData.display_name,
        date_of_birth: formData.date_of_birth || null,
        preferred_language: formData.preferred_language,
        blood_group: formData.blood_group || null,
        emergency_contact: formData.emergency_contact_phone ? {
          name: formData.emergency_contact_name || 'Emergency Contact',
          phone: formData.emergency_contact_phone,
          relationship: formData.emergency_contact_relationship || undefined,
        } : null,
      });

      if (res.success) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 4000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClearAccountData = () => {
    // Clear demo/local storage keys
    try {
      localStorage.removeItem('aarogya360_demo_user');
      localStorage.removeItem(`aarogya_notes_${user?.id}`);
      localStorage.removeItem(`aarogya_reports_${user?.id}`);
      localStorage.removeItem(`aarogya_reminders_${user?.id}`);
    } catch {}
    signOut();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Profile Form Card */}
      <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-10 border border-teal-800/10 shadow-card space-y-8">
        <div className="flex items-center justify-between border-b border-teal-800/10 pb-5">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-teal-800 to-emerald-500 text-white font-extrabold text-2xl flex items-center justify-center shadow-sm">
              {formData.display_name?.charAt(0) || 'U'}
            </div>
            <div>
              <h2 className="text-xl font-bold text-navy-800 font-display">
                Personal Health Baseline
              </h2>
              <p className="text-xs text-navy-600">
                Email: <span className="font-medium text-teal-800">{user?.email}</span>
              </p>
            </div>
          </div>

          {saveSuccess && (
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Profile Updated</span>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-navy-800 mb-1.5">
                Display Name / Full Name
              </label>
              <input
                type="text"
                value={formData.display_name}
                onChange={(e) => setFormData({ ...formData, display_name: e.target.value })}
                className="w-full p-3 rounded-xl border border-teal-800/15 bg-canvas focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none text-sm text-navy-900"
              />
              {errors.display_name && (
                <p className="text-xs text-rose-600 mt-1">{errors.display_name}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-navy-800 mb-1.5">
                Date of Birth
              </label>
              <input
                type="date"
                value={formData.date_of_birth || ''}
                onChange={(e) => setFormData({ ...formData, date_of_birth: e.target.value })}
                className="w-full p-3 rounded-xl border border-teal-800/15 bg-canvas focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none text-sm text-navy-900"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-navy-800 mb-1.5">
                Preferred Interface Language
              </label>
              <select
                value={formData.preferred_language}
                onChange={(e) => setFormData({ ...formData, preferred_language: e.target.value as 'en' | 'te' | 'hi' })}
                className="w-full p-3 rounded-xl border border-teal-800/15 bg-canvas focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none text-sm text-navy-900"
              >
                <option value="en">English (Universal)</option>
                <option value="te">తెలుగు (Telugu)</option>
                <option value="hi">हिन्दी (Hindi)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-navy-800 mb-1.5">
                Blood Group (Optional)
              </label>
              <select
                value={formData.blood_group || ''}
                onChange={(e) => setFormData({ ...formData, blood_group: e.target.value })}
                className="w-full p-3 rounded-xl border border-teal-800/15 bg-canvas focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none text-sm text-navy-900"
              >
                <option value="">Not Specified</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="pt-4 border-t border-teal-800/10 space-y-4">
            <h3 className="text-sm font-bold text-navy-800 flex items-center gap-2">
              <Phone className="w-4 h-4 text-emerald-600" />
              <span>Designated Emergency Contact (Optional)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-navy-700 mb-1">
                  Contact Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Ramesh Rao"
                  value={formData.emergency_contact_name || ''}
                  onChange={(e) => setFormData({ ...formData, emergency_contact_name: e.target.value })}
                  className="w-full p-3 rounded-xl border border-teal-800/15 bg-canvas text-sm text-navy-900 focus:border-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-navy-700 mb-1">
                  Contact Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="e.g. +91 98765 43210"
                  value={formData.emergency_contact_phone || ''}
                  onChange={(e) => setFormData({ ...formData, emergency_contact_phone: e.target.value })}
                  className="w-full p-3 rounded-xl border border-teal-800/15 bg-canvas text-sm text-navy-900 focus:border-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-navy-700 mb-1">
                  Relationship
                </label>
                <input
                  type="text"
                  placeholder="e.g. Spouse / Sibling"
                  value={formData.emergency_contact_relationship || ''}
                  onChange={(e) => setFormData({ ...formData, emergency_contact_relationship: e.target.value })}
                  className="w-full p-3 rounded-xl border border-teal-800/15 bg-canvas text-sm text-navy-900 focus:border-emerald-500 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end pt-4">
            <Button
              variant="primary"
              size="md"
              type="submit"
              isLoading={isSubmitting}
              leftIcon={<Save className="w-4 h-4" />}
            >
              Update Profile Information
            </Button>
          </div>
        </form>
      </div>

      {/* Account Deletion & Data Privacy Box */}
      <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-rose-500/20 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-navy-800 flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-rose-600" />
          <span>Data Governance & Account Purge</span>
        </h3>
        <p className="text-xs text-navy-600/85 leading-relaxed">
          Under our privacy-first charter, you have the unilateral right to delete your health records and personal data. Deleting your session clears locally cached patient data and logs you out completely.
        </p>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setDeleteDataModalOpen(true)}
          className="text-rose-600 border-rose-300 hover:bg-rose-50"
          leftIcon={<Trash2 className="w-4 h-4" />}
        >
          Purge Cached Data & Sign Out
        </Button>
      </div>

      {/* Deletion Modal */}
      <Modal
        isOpen={deleteDataModalOpen}
        onClose={() => setDeleteDataModalOpen(false)}
        title="Confirm Data Purge"
        description="Are you sure you want to clear your local session cache and sign out?"
        maxWidth="sm"
      >
        <div className="space-y-4">
          <p className="text-xs text-navy-600">
            This will purge your locally saved health notes, reminders, and report references from this browser.
          </p>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="ghost" size="sm" onClick={() => setDeleteDataModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" size="sm" onClick={handleClearAccountData}>
              Purge & Sign Out
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
