export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface EmergencyContact {
  name: string;
  phone: string;
  relationship?: string;
}

export interface Profile {
  user_id: string;
  display_name: string;
  date_of_birth?: string | null;
  preferred_language: 'en' | 'te' | 'hi';
  blood_group?: string | null;
  emergency_contact?: EmergencyContact | null;
  created_at: string;
  updated_at: string;
}

export type HealthNoteCategory =
  | 'General'
  | 'Consultation'
  | 'Symptoms'
  | 'Medication Note'
  | 'Vitals Note'
  | 'Lifestyle';

export interface HealthNote {
  id: string;
  user_id: string;
  title: string;
  category: HealthNoteCategory;
  note: string;
  note_date: string;
  created_at: string;
  updated_at: string;
}

export interface ReportMetadata {
  id: string;
  user_id: string;
  file_path: string;
  file_name: string;
  file_type: string;
  file_size_bytes: number;
  created_at: string;
  // Local simulated object URL for preview when running in demo/offline mode
  preview_url?: string;
}

export type ReminderStatus = 'pending' | 'completed' | 'dismissed';

export interface Reminder {
  id: string;
  user_id: string;
  label: string;
  scheduled_at: string;
  status: ReminderStatus;
  created_at: string;
  updated_at: string;
}

export interface WellnessGoal {
  id: string;
  type: 'hydration' | 'sleep' | 'movement' | 'mindfulness';
  target: number;
  current: number;
  unit: string;
  label: string;
}
