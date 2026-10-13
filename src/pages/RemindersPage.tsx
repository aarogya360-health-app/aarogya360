import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Bell,
  Plus,
  Clock,
  Calendar,
  CheckCircle,
  Trash2,
  AlertCircle,
  BellRing,
  Info
} from 'lucide-react';
import { useHealthData } from '@/context/HealthDataContext';
import { Reminder } from '@/types/database';
import { Button } from '@/components/common/Button';
import { Modal } from '@/components/common/Modal';
import { reminderSchema, ReminderFormData } from '@/utils/validation';
import { formatDateTime, formatRelativeTime } from '@/utils/date';

export const RemindersPage: React.FC = () => {
  const { reminders, createReminder, toggleReminder, deleteReminder, remindersLoading } = useHealthData();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [formData, setFormData] = useState<ReminderFormData>({
    label: '',
    scheduled_at: '',
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [notifPermission, setNotifPermission] = useState<NotificationPermission>(
    typeof Notification !== 'undefined' ? Notification.permission : 'default'
  );

  const requestNotificationPermission = async () => {
    if (typeof Notification !== 'undefined') {
      try {
        const perm = await Notification.requestPermission();
        setNotifPermission(perm);
        if (perm === 'granted') {
          new Notification('Aarogya360 Reminders Enabled', {
            body: 'You will receive browser notifications for scheduled routines.',
            icon: '/favicon.svg',
          });
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  const handleOpenModal = () => {
    // Default to tomorrow 9am
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(9, 0, 0, 0);
    const dateStr = tomorrow.toISOString().slice(0, 16);

    setFormData({
      label: '',
      scheduled_at: dateStr,
    });
    setFormErrors({});
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrors({});

    const result = reminderSchema.safeParse(formData);
    if (!result.success) {
      const errors: Record<string, string> = {};
      result.error.issues.forEach(issue => {
        if (issue.path[0]) {
          errors[issue.path[0].toString()] = issue.message;
        }
      });
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    try {
      await createReminder({
        label: formData.label,
        scheduled_at: new Date(formData.scheduled_at).toISOString(),
      });
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteConfirmId) return;
    await deleteReminder(deleteConfirmId);
    setDeleteConfirmId(null);
  };

  return (
    <div className="space-y-6">
      {/* Browser Notification Banner */}
      <div className="bg-white/80 backdrop-blur-md p-5 rounded-3xl border border-teal-800/10 shadow-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-teal-50 text-teal-800 shrink-0">
            <BellRing className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-navy-800">
              Desktop & Browser Notification Alerts
            </h3>
            <p className="text-xs text-navy-600/80">
              {notifPermission === 'granted'
                ? 'System notifications are active for this browser.'
                : 'Enable system notifications so you receive pop-up alerts for scheduled routines.'}
            </p>
          </div>
        </div>

        {notifPermission !== 'granted' && (
          <Button
            variant="secondary"
            size="sm"
            onClick={requestNotificationPermission}
            className="shrink-0"
          >
            Allow Notifications
          </Button>
        )}
      </div>

      {/* Limitation Notice */}
      <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-900 flex items-start gap-2.5">
        <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <div>
          <strong>Medication & Care Disclaimer:</strong> All reminders must reflect dosages and schedules explicitly prescribed or confirmed by your healthcare professional. Reminders may not sound if your device is asleep or browser is completely shut down.
        </div>
      </div>

      {/* Main Header & Add */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-navy-800 font-display">
            Active Care Schedule ({reminders.length})
          </h2>
          <p className="text-xs text-navy-600">Track and toggle your custom wellness routines</p>
        </div>
        <Button
          variant="primary"
          size="md"
          onClick={handleOpenModal}
          leftIcon={<Plus className="w-4 h-4" />}
        >
          Add Reminder
        </Button>
      </div>

      {/* List */}
      {remindersLoading ? (
        <div className="py-12 text-center text-xs font-semibold text-navy-600">
          Loading care reminders...
        </div>
      ) : reminders.length === 0 ? (
        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-12 text-center border border-teal-800/10 shadow-card space-y-4">
          <Bell className="w-10 h-10 text-navy-400 mx-auto" />
          <h3 className="text-base font-bold text-navy-800">No Reminders Created</h3>
          <p className="text-xs text-navy-600 max-w-sm mx-auto">
            Set alarms for morning hydration, doctor consultations, physical therapy stretching, or daily walks.
          </p>
          <Button variant="primary" size="sm" onClick={handleOpenModal} leftIcon={<Plus className="w-4 h-4" />}>
            Create First Reminder
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {reminders.map((reminder) => {
            const isCompleted = reminder.status === 'completed';
            return (
              <motion.div
                key={reminder.id}
                layout
                className={`p-5 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
                  isCompleted
                    ? 'bg-white/60 border-emerald-500/20 opacity-75'
                    : 'bg-white border-teal-800/10 shadow-sm hover:shadow-card hover:border-emerald-500/40'
                }`}
              >
                <div
                  onClick={() => toggleReminder(reminder.id)}
                  className="flex items-center gap-4 cursor-pointer flex-1"
                >
                  <button
                    type="button"
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors shrink-0 ${
                      isCompleted ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-teal-700/40 hover:border-emerald-500'
                    }`}
                    aria-label={isCompleted ? 'Mark reminder as pending' : 'Mark reminder as completed'}
                  >
                    {isCompleted && <CheckCircle className="w-4 h-4" />}
                  </button>

                  <div>
                    <h3 className={`text-sm sm:text-base font-bold ${isCompleted ? 'line-through text-navy-400' : 'text-navy-900'}`}>
                      {reminder.label}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-navy-500 mt-1">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-emerald-600" />
                        {formatDateTime(reminder.scheduled_at)}
                      </span>
                      <span>•</span>
                      <span className="text-teal-700 font-medium">
                        {formatRelativeTime(reminder.scheduled_at)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
                    isCompleted ? 'bg-emerald-100 text-emerald-800' : 'bg-teal-50 text-teal-800'
                  }`}>
                    {isCompleted ? 'Completed' : 'Upcoming'}
                  </span>
                  <button
                    onClick={() => setDeleteConfirmId(reminder.id)}
                    className="p-2 text-navy-600 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                    title="Delete reminder"
                    aria-label={`Delete ${reminder.label}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Create Reminder Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Schedule Care Routine"
        description="Set a date, time, and label for your personalized reminder."
        maxWidth="md"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-navy-800 mb-1">
              Reminder Label / Routine Title
            </label>
            <input
              type="text"
              value={formData.label}
              onChange={(e) => setFormData({ ...formData, label: e.target.value })}
              placeholder="e.g. Evening Blood Pressure Reading & Rest"
              className="w-full p-3 rounded-xl border border-teal-800/15 bg-canvas focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none text-sm text-navy-900"
            />
            {formErrors.label && (
              <p className="text-xs text-rose-600 mt-1">{formErrors.label}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-navy-800 mb-1">
              Scheduled Date & Time
            </label>
            <input
              type="datetime-local"
              value={formData.scheduled_at}
              onChange={(e) => setFormData({ ...formData, scheduled_at: e.target.value })}
              className="w-full p-3 rounded-xl border border-teal-800/15 bg-canvas focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none text-sm text-navy-900"
            />
            {formErrors.scheduled_at && (
              <p className="text-xs text-rose-600 mt-1">{formErrors.scheduled_at}</p>
            )}
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-teal-800/10">
            <Button variant="ghost" size="sm" type="button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit" isLoading={isSubmitting}>
              Schedule Reminder
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={Boolean(deleteConfirmId)}
        onClose={() => setDeleteConfirmId(null)}
        title="Delete Reminder?"
        description="Are you sure you want to delete this scheduled routine reminder?"
        maxWidth="sm"
      >
        <div className="flex justify-end gap-3 pt-2">
          <Button variant="ghost" size="sm" onClick={() => setDeleteConfirmId(null)}>
            Keep Reminder
          </Button>
          <Button variant="danger" size="sm" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  );
};
