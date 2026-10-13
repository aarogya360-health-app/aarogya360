import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { useAuth } from './AuthContext';
import { HealthNote, ReportMetadata, Reminder, WellnessGoal, HealthNoteCategory } from '@/types/database';
import { validateReportFile } from '@/utils/validation';

interface HealthDataContextType {
  // Notes
  notes: HealthNote[];
  notesLoading: boolean;
  createNote: (note: Omit<HealthNote, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => Promise<{ success: boolean; error?: string }>;
  updateNote: (id: string, updates: Partial<HealthNote>) => Promise<{ success: boolean; error?: string }>;
  deleteNote: (id: string) => Promise<{ success: boolean; error?: string }>;

  // Reports
  reports: ReportMetadata[];
  reportsLoading: boolean;
  uploadReport: (
    file: File,
    onProgress?: (percent: number) => void
  ) => Promise<{ success: boolean; error?: string }>;
  deleteReport: (id: string) => Promise<{ success: boolean; error?: string }>;

  // Reminders
  reminders: Reminder[];
  remindersLoading: boolean;
  createReminder: (reminder: Omit<Reminder, 'id' | 'user_id' | 'status' | 'created_at' | 'updated_at'>) => Promise<{ success: boolean; error?: string }>;
  toggleReminder: (id: string) => Promise<{ success: boolean; error?: string }>;
  deleteReminder: (id: string) => Promise<{ success: boolean; error?: string }>;

  // Wellness Goals (User-entered metrics only)
  wellnessGoals: WellnessGoal[];
  updateGoalProgress: (type: WellnessGoal['type'], current: number) => void;
  updateGoalTarget: (type: WellnessGoal['type'], target: number) => void;
}

const HealthDataContext = createContext<HealthDataContextType | undefined>(undefined);

// Initial sample data for Demo mode
const INITIAL_DEMO_NOTES: HealthNote[] = [
  {
    id: 'note-1',
    user_id: 'demo-user-aarogya-001',
    title: 'Annual Preventive Health Consultation',
    category: 'Consultation',
    note: 'Consulted Dr. Varma. Recommended 30 mins daily brisk walk, vitamin D check, and routine lipid profile next quarter. Everything in normal range.',
    note_date: '2026-10-02',
    created_at: new Date(Date.now() - 11 * 86400000).toISOString(),
    updated_at: new Date(Date.now() - 11 * 86400000).toISOString(),
  },
  {
    id: 'note-2',
    user_id: 'demo-user-aarogya-001',
    title: 'Hydration & Posture Log',
    category: 'Lifestyle',
    note: 'Maintained 2.5L water intake today. Used standing desk ergonomically for 3 intervals of 45 mins. Noticeable reduction in neck stiffness.',
    note_date: '2026-10-10',
    created_at: new Date(Date.now() - 3 * 86400000).toISOString(),
    updated_at: new Date(Date.now() - 3 * 86400000).toISOString(),
  },
  {
    id: 'note-3',
    user_id: 'demo-user-aarogya-001',
    title: 'Seasonal Allergy Observation',
    category: 'Symptoms',
    note: 'Mild sneezing and throat tickle following exposure to outdoor dust. Drank warm chamomile tea. Monitored temperature (normal: 98.4 F).',
    note_date: '2026-10-12',
    created_at: new Date(Date.now() - 86400000).toISOString(),
    updated_at: new Date(Date.now() - 86400000).toISOString(),
  },
];

const INITIAL_DEMO_REPORTS: ReportMetadata[] = [
  {
    id: 'rep-1',
    user_id: 'demo-user-aarogya-001',
    file_path: 'demo/annual_health_summary_2026.pdf',
    file_name: 'Annual_Health_Panel_2026.pdf',
    file_type: 'application/pdf',
    file_size_bytes: 1420500, // ~1.4 MB
    created_at: new Date(Date.now() - 10 * 86400000).toISOString(),
  },
  {
    id: 'rep-2',
    user_id: 'demo-user-aarogya-001',
    file_path: 'demo/ophthalmology_prescription.pdf',
    file_name: 'Eye_Clinic_Vision_Prescription.pdf',
    file_type: 'application/pdf',
    file_size_bytes: 480200, // ~480 KB
    created_at: new Date(Date.now() - 25 * 86400000).toISOString(),
  },
];

const INITIAL_DEMO_REMINDERS: Reminder[] = [
  {
    id: 'rem-1',
    user_id: 'demo-user-aarogya-001',
    label: 'Morning Hydration & Breathing Exercise',
    scheduled_at: new Date(Date.now() + 18000000).toISOString(), // ~5 hours later
    status: 'pending',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'rem-2',
    user_id: 'demo-user-aarogya-001',
    label: 'Doctor Follow-Up Consultation Booking',
    scheduled_at: new Date(Date.now() + 86400000 * 2).toISOString(), // in 2 days
    status: 'pending',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'rem-3',
    user_id: 'demo-user-aarogya-001',
    label: 'Evening Gentle Mobility Stretching',
    scheduled_at: new Date(Date.now() + 32000000).toISOString(),
    status: 'completed',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

const INITIAL_GOALS: WellnessGoal[] = [
  { id: 'goal-1', type: 'hydration', target: 8, current: 6, unit: 'glasses', label: 'Daily Water' },
  { id: 'goal-2', type: 'sleep', target: 8, current: 7, unit: 'hours', label: 'Rest & Sleep' },
  { id: 'goal-3', type: 'movement', target: 45, current: 30, unit: 'mins', label: 'Daily Activity' },
  { id: 'goal-4', type: 'mindfulness', target: 15, current: 15, unit: 'mins', label: 'Mindful Breathing' },
];

export const HealthDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, authMode } = useAuth();

  const [notes, setNotes] = useState<HealthNote[]>([]);
  const [notesLoading, setNotesLoading] = useState<boolean>(true);

  const [reports, setReports] = useState<ReportMetadata[]>([]);
  const [reportsLoading, setReportsLoading] = useState<boolean>(true);

  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [remindersLoading, setRemindersLoading] = useState<boolean>(true);

  const [wellnessGoals, setWellnessGoals] = useState<WellnessGoal[]>(() => {
    try {
      const saved = localStorage.getItem('aarogya360_wellness_goals');
      return saved ? JSON.parse(saved) : INITIAL_GOALS;
    } catch {
      return INITIAL_GOALS;
    }
  });

  // Save goals
  const updateGoalProgress = (type: WellnessGoal['type'], current: number) => {
    setWellnessGoals(prev => {
      const updated = prev.map(g => g.type === type ? { ...g, current: Math.max(0, current) } : g);
      try { localStorage.setItem('aarogya360_wellness_goals', JSON.stringify(updated)); } catch {}
      return updated;
    });
  };

  const updateGoalTarget = (type: WellnessGoal['type'], target: number) => {
    setWellnessGoals(prev => {
      const updated = prev.map(g => g.type === type ? { ...g, target: Math.max(1, target) } : g);
      try { localStorage.setItem('aarogya360_wellness_goals', JSON.stringify(updated)); } catch {}
      return updated;
    });
  };

  // Load Data
  useEffect(() => {
    let mounted = true;

    async function loadData() {
      if (!user) {
        setNotes([]);
        setReports([]);
        setReminders([]);
        setNotesLoading(false);
        setReportsLoading(false);
        setRemindersLoading(false);
        return;
      }

      if (isSupabaseConfigured && supabase && authMode === 'supabase') {
        try {
          // Fetch notes
          const { data: notesData } = await supabase
            .from('health_notes')
            .select('*')
            .eq('user_id', user.id)
            .order('note_date', { ascending: false });

          // Fetch reports
          const { data: reportsData } = await supabase
            .from('report_metadata')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false });

          // Fetch reminders
          const { data: remindersData } = await supabase
            .from('reminders')
            .select('*')
            .eq('user_id', user.id)
            .order('scheduled_at', { ascending: true });

          if (mounted) {
            setNotes(notesData || []);
            setReports(reportsData || []);
            setReminders(remindersData || []);
          }
        } catch (err) {
          console.error('Failed to load user data from Supabase:', err);
        } finally {
          if (mounted) {
            setNotesLoading(false);
            setReportsLoading(false);
            setRemindersLoading(false);
          }
        }
      } else {
        // Demo Mode / Local fallback
        try {
          const savedNotes = localStorage.getItem(`aarogya_notes_${user.id}`);
          const savedReports = localStorage.getItem(`aarogya_reports_${user.id}`);
          const savedReminders = localStorage.getItem(`aarogya_reminders_${user.id}`);

          if (mounted) {
            setNotes(savedNotes ? JSON.parse(savedNotes) : INITIAL_DEMO_NOTES);
            setReports(savedReports ? JSON.parse(savedReports) : INITIAL_DEMO_REPORTS);
            setReminders(savedReminders ? JSON.parse(savedReminders) : INITIAL_DEMO_REMINDERS);
            setNotesLoading(false);
            setReportsLoading(false);
            setRemindersLoading(false);
          }
        } catch {
          if (mounted) {
            setNotes(INITIAL_DEMO_NOTES);
            setReports(INITIAL_DEMO_REPORTS);
            setReminders(INITIAL_DEMO_REMINDERS);
            setNotesLoading(false);
            setReportsLoading(false);
            setRemindersLoading(false);
          }
        }
      }
    }

    loadData();

    return () => {
      mounted = false;
    };
  }, [user, authMode]);

  // Persist demo mode updates
  const saveDemoNotes = (newNotes: HealthNote[]) => {
    if (user) {
      try { localStorage.setItem(`aarogya_notes_${user.id}`, JSON.stringify(newNotes)); } catch {}
    }
  };

  const saveDemoReports = (newReports: ReportMetadata[]) => {
    if (user) {
      try { localStorage.setItem(`aarogya_reports_${user.id}`, JSON.stringify(newReports)); } catch {}
    }
  };

  const saveDemoReminders = (newReminders: Reminder[]) => {
    if (user) {
      try { localStorage.setItem(`aarogya_reminders_${user.id}`, JSON.stringify(newReminders)); } catch {}
    }
  };

  // 1. NOTES CRUD
  const createNote = async (
    noteData: Omit<HealthNote, 'id' | 'user_id' | 'created_at' | 'updated_at'>
  ): Promise<{ success: boolean; error?: string }> => {
    if (!user) return { success: false, error: 'User is not authenticated' };

    const newId = `note-${Date.now()}`;
    const timestamp = new Date().toISOString();

    const newNote: HealthNote = {
      ...noteData,
      id: newId,
      user_id: user.id,
      created_at: timestamp,
      updated_at: timestamp,
    };

    if (isSupabaseConfigured && supabase && authMode === 'supabase') {
      try {
        const { data, error } = await supabase
          .from('health_notes')
          .insert({
            user_id: user.id,
            title: noteData.title,
            category: noteData.category,
            note: noteData.note,
            note_date: noteData.note_date,
          })
          .select()
          .single();

        if (error) return { success: false, error: error.message };
        if (data) {
          setNotes(prev => [data, ...prev]);
          return { success: true };
        }
      } catch (err: any) {
        return { success: false, error: err.message || 'Failed to save health note' };
      }
    }

    // Demo Mode
    setNotes(prev => {
      const updated = [newNote, ...prev];
      saveDemoNotes(updated);
      return updated;
    });
    return { success: true };
  };

  const updateNote = async (id: string, updates: Partial<HealthNote>): Promise<{ success: boolean; error?: string }> => {
    if (!user) return { success: false, error: 'User is not authenticated' };

    if (isSupabaseConfigured && supabase && authMode === 'supabase') {
      try {
        const { data, error } = await supabase
          .from('health_notes')
          .update({
            ...updates,
            updated_at: new Date().toISOString(),
          })
          .eq('id', id)
          .eq('user_id', user.id)
          .select()
          .single();

        if (error) return { success: false, error: error.message };
        if (data) {
          setNotes(prev => prev.map(n => n.id === id ? data : n));
          return { success: true };
        }
      } catch (err: any) {
        return { success: false, error: err.message || 'Failed to update health note' };
      }
    }

    // Demo Mode
    setNotes(prev => {
      const updated = prev.map(n => n.id === id ? { ...n, ...updates, updated_at: new Date().toISOString() } : n);
      saveDemoNotes(updated);
      return updated;
    });
    return { success: true };
  };

  const deleteNote = async (id: string): Promise<{ success: boolean; error?: string }> => {
    if (!user) return { success: false, error: 'User is not authenticated' };

    if (isSupabaseConfigured && supabase && authMode === 'supabase') {
      try {
        const { error } = await supabase
          .from('health_notes')
          .delete()
          .eq('id', id)
          .eq('user_id', user.id);

        if (error) return { success: false, error: error.message };
      } catch (err: any) {
        return { success: false, error: err.message || 'Failed to delete health note' };
      }
    }

    setNotes(prev => {
      const updated = prev.filter(n => n.id !== id);
      saveDemoNotes(updated);
      return updated;
    });
    return { success: true };
  };

  // 2. REPORTS UPLOAD & DELETE
  const uploadReport = async (
    file: File,
    onProgress?: (percent: number) => void
  ): Promise<{ success: boolean; error?: string }> => {
    if (!user) return { success: false, error: 'User is not authenticated' };

    const validation = validateReportFile(file);
    if (!validation.valid) {
      return { success: false, error: validation.error };
    }

    // Progress simulation hook
    let progress = 10;
    onProgress?.(progress);

    if (isSupabaseConfigured && supabase && authMode === 'supabase') {
      try {
        const fileExt = file.name.split('.').pop();
        const filePath = `${user.id}/${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;

        onProgress?.(40);

        // Upload to private bucket
        const { error: uploadError } = await supabase.storage
          .from('medical-reports')
          .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false,
          });

        if (uploadError) return { success: false, error: uploadError.message };

        onProgress?.(80);

        // Store metadata
        const { data: metaData, error: metaError } = await supabase
          .from('report_metadata')
          .insert({
            user_id: user.id,
            file_path: filePath,
            file_name: file.name,
            file_type: file.type,
            file_size_bytes: file.size,
          })
          .select()
          .single();

        if (metaError) return { success: false, error: metaError.message };

        onProgress?.(100);
        if (metaData) {
          setReports(prev => [metaData, ...prev]);
        }
        return { success: true };
      } catch (err: any) {
        return { success: false, error: err.message || 'Upload failed' };
      }
    }

    // Demo Mode upload simulation
    for (let p = 25; p <= 90; p += 25) {
      await new Promise(r => setTimeout(r, 120));
      onProgress?.(p);
    }

    const demoReport: ReportMetadata = {
      id: `rep-${Date.now()}`,
      user_id: user.id,
      file_path: `demo/${file.name}`,
      file_name: file.name,
      file_type: file.type,
      file_size_bytes: file.size,
      created_at: new Date().toISOString(),
      preview_url: URL.createObjectURL(file),
    };

    onProgress?.(100);
    setReports(prev => {
      const updated = [demoReport, ...prev];
      saveDemoReports(updated);
      return updated;
    });

    return { success: true };
  };

  const deleteReport = async (id: string): Promise<{ success: boolean; error?: string }> => {
    if (!user) return { success: false, error: 'User is not authenticated' };

    const report = reports.find(r => r.id === id);
    if (!report) return { success: false, error: 'Report not found' };

    if (isSupabaseConfigured && supabase && authMode === 'supabase') {
      try {
        // Delete from storage
        await supabase.storage.from('medical-reports').remove([report.file_path]);

        // Delete metadata
        const { error } = await supabase
          .from('report_metadata')
          .delete()
          .eq('id', id)
          .eq('user_id', user.id);

        if (error) return { success: false, error: error.message };
      } catch (err: any) {
        return { success: false, error: err.message || 'Failed to delete report' };
      }
    }

    setReports(prev => {
      const updated = prev.filter(r => r.id !== id);
      saveDemoReports(updated);
      return updated;
    });
    return { success: true };
  };

  // 3. REMINDERS CRUD
  const createReminder = async (
    reminderData: Omit<Reminder, 'id' | 'user_id' | 'status' | 'created_at' | 'updated_at'>
  ): Promise<{ success: boolean; error?: string }> => {
    if (!user) return { success: false, error: 'User is not authenticated' };

    const newReminder: Reminder = {
      ...reminderData,
      id: `rem-${Date.now()}`,
      user_id: user.id,
      status: 'pending',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured && supabase && authMode === 'supabase') {
      try {
        const { data, error } = await supabase
          .from('reminders')
          .insert({
            user_id: user.id,
            label: reminderData.label,
            scheduled_at: reminderData.scheduled_at,
            status: 'pending',
          })
          .select()
          .single();

        if (error) return { success: false, error: error.message };
        if (data) {
          setReminders(prev => [...prev, data]);
          return { success: true };
        }
      } catch (err: any) {
        return { success: false, error: err.message || 'Failed to create reminder' };
      }
    }

    // Demo Mode
    setReminders(prev => {
      const updated = [...prev, newReminder];
      saveDemoReminders(updated);
      return updated;
    });
    return { success: true };
  };

  const toggleReminder = async (id: string): Promise<{ success: boolean; error?: string }> => {
    if (!user) return { success: false, error: 'User is not authenticated' };

    const reminder = reminders.find(r => r.id === id);
    if (!reminder) return { success: false, error: 'Reminder not found' };

    const newStatus: Reminder['status'] = reminder.status === 'completed' ? 'pending' : 'completed';

    if (isSupabaseConfigured && supabase && authMode === 'supabase') {
      try {
        const { error } = await supabase
          .from('reminders')
          .update({
            status: newStatus,
            updated_at: new Date().toISOString(),
          })
          .eq('id', id)
          .eq('user_id', user.id);

        if (error) return { success: false, error: error.message };
      } catch (err: any) {
        return { success: false, error: err.message || 'Failed to update reminder' };
      }
    }

    setReminders(prev => {
      const updated = prev.map(r => r.id === id ? { ...r, status: newStatus } : r);
      saveDemoReminders(updated);
      return updated;
    });
    return { success: true };
  };

  const deleteReminder = async (id: string): Promise<{ success: boolean; error?: string }> => {
    if (!user) return { success: false, error: 'User is not authenticated' };

    if (isSupabaseConfigured && supabase && authMode === 'supabase') {
      try {
        const { error } = await supabase
          .from('reminders')
          .delete()
          .eq('id', id)
          .eq('user_id', user.id);

        if (error) return { success: false, error: error.message };
      } catch (err: any) {
        return { success: false, error: err.message || 'Failed to delete reminder' };
      }
    }

    setReminders(prev => {
      const updated = prev.filter(r => r.id !== id);
      saveDemoReminders(updated);
      return updated;
    });
    return { success: true };
  };

  return (
    <HealthDataContext.Provider
      value={{
        notes,
        notesLoading,
        createNote,
        updateNote,
        deleteNote,
        reports,
        reportsLoading,
        uploadReport,
        deleteReport,
        reminders,
        remindersLoading,
        createReminder,
        toggleReminder,
        deleteReminder,
        wellnessGoals,
        updateGoalProgress,
        updateGoalTarget,
      }}
    >
      {children}
    </HealthDataContext.Provider>
  );
};

export const useHealthData = () => {
  const context = useContext(HealthDataContext);
  if (!context) {
    throw new Error('useHealthData must be used within a HealthDataProvider');
  }
  return context;
};
