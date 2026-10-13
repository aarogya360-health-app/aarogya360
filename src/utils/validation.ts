import { z } from 'zod';

export const signInSchema = z.object({
  email: z.string().trim().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

export type SignInFormData = z.infer<typeof signInSchema>;

export const signUpSchema = z.object({
  displayName: z.string().trim().min(2, 'Name must be at least 2 characters'),
  email: z.string().trim().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  confirmPassword: z.string().min(6, 'Please confirm your password'),
  agreeToTerms: z.boolean().refine(val => val === true, {
    message: 'You must acknowledge the terms and medical safety disclaimer',
  }),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export type SignUpFormData = z.infer<typeof signUpSchema>;

export const profileSchema = z.object({
  display_name: z.string().trim().min(2, 'Name must be at least 2 characters'),
  date_of_birth: z.string().optional().or(z.literal('')),
  preferred_language: z.enum(['en', 'te', 'hi']),
  blood_group: z.string().optional().or(z.literal('')),
  emergency_contact_name: z.string().optional().or(z.literal('')),
  emergency_contact_phone: z.string().optional().or(z.literal('')),
  emergency_contact_relationship: z.string().optional().or(z.literal('')),
});

export type ProfileFormData = z.infer<typeof profileSchema>;

export const healthNoteSchema = z.object({
  title: z.string().trim().min(2, 'Title must be at least 2 characters').max(100, 'Title cannot exceed 100 characters'),
  category: z.enum(['General', 'Consultation', 'Symptoms', 'Medication Note', 'Vitals Note', 'Lifestyle']),
  note: z.string().trim().min(5, 'Note text must be at least 5 characters'),
  note_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Please select a valid date (YYYY-MM-DD)'),
});

export type HealthNoteFormData = z.infer<typeof healthNoteSchema>;

export const reminderSchema = z.object({
  label: z.string().trim().min(2, 'Reminder label is required').max(120, 'Label cannot exceed 120 characters'),
  scheduled_at: z.string().min(1, 'Please select a date and time'),
});

export type ReminderFormData = z.infer<typeof reminderSchema>;

// Validate file uploads
export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
export const ALLOWED_FILE_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/png',
  'image/webp',
];

export const validateReportFile = (file: File): { valid: boolean; error?: string } => {
  if (!ALLOWED_FILE_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: 'Invalid file format. Only PDF, JPG, PNG, and WebP files are allowed.',
    };
  }
  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: 'File size exceeds 10MB limit. Please upload a smaller document.',
    };
  }
  return { valid: true };
};
