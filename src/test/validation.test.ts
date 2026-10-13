import { describe, it, expect } from 'vitest';
import {
  signInSchema,
  signUpSchema,
  healthNoteSchema,
  reminderSchema,
  validateReportFile,
  MAX_FILE_SIZE,
} from '../utils/validation';

describe('Validation Schemas', () => {
  describe('signInSchema', () => {
    it('should validate valid email and password', () => {
      const result = signInSchema.safeParse({
        email: 'user@aarogya360.health',
        password: 'securePassword123',
      });
      expect(result.success).toBe(true);
    });

    it('should fail on invalid email format', () => {
      const result = signInSchema.safeParse({
        email: 'not-an-email',
        password: 'validPassword123',
      });
      expect(result.success).toBe(false);
    });

    it('should fail on short password (< 6 chars)', () => {
      const result = signInSchema.safeParse({
        email: 'user@aarogya360.health',
        password: '123',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('signUpSchema', () => {
    it('should validate valid registration inputs with agreed terms', () => {
      const result = signUpSchema.safeParse({
        displayName: 'Prardhana Rao',
        email: 'prardhana@aarogya360.health',
        password: 'Password123',
        confirmPassword: 'Password123',
        agreeToTerms: true,
      });
      expect(result.success).toBe(true);
    });

    it('should reject mismatched passwords', () => {
      const result = signUpSchema.safeParse({
        displayName: 'Prardhana Rao',
        email: 'prardhana@aarogya360.health',
        password: 'Password123',
        confirmPassword: 'DifferentPassword456',
        agreeToTerms: true,
      });
      expect(result.success).toBe(false);
    });

    it('should reject unacknowledged terms', () => {
      const result = signUpSchema.safeParse({
        displayName: 'Prardhana Rao',
        email: 'prardhana@aarogya360.health',
        password: 'Password123',
        confirmPassword: 'Password123',
        agreeToTerms: false,
      });
      expect(result.success).toBe(false);
    });
  });

  describe('healthNoteSchema', () => {
    it('should validate complete health note', () => {
      const result = healthNoteSchema.safeParse({
        title: 'Morning Blood Pressure Log',
        category: 'Vitals Note',
        note: 'BP was measured at 120/80 mmHg before breakfast.',
        note_date: '2026-10-13',
      });
      expect(result.success).toBe(true);
    });

    it('should reject too short notes (< 5 characters)', () => {
      const result = healthNoteSchema.safeParse({
        title: 'Note',
        category: 'General',
        note: 'Bad',
        note_date: '2026-10-13',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('reminderSchema', () => {
    it('should validate scheduled reminder label and date', () => {
      const result = reminderSchema.safeParse({
        label: 'Evening Walk & Mobility',
        scheduled_at: '2026-10-13T18:00:00.000Z',
      });
      expect(result.success).toBe(true);
    });

    it('should reject blank reminder labels', () => {
      const result = reminderSchema.safeParse({
        label: '',
        scheduled_at: '2026-10-13T18:00:00.000Z',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('validateReportFile', () => {
    it('should accept valid PDF within size limit', () => {
      const file = new File(['mock content'], 'test_panel.pdf', { type: 'application/pdf' });
      const result = validateReportFile(file);
      expect(result.valid).toBe(true);
    });

    it('should accept valid JPG image', () => {
      const file = new File(['mock image'], 'rx.jpg', { type: 'image/jpeg' });
      const result = validateReportFile(file);
      expect(result.valid).toBe(true);
    });

    it('should reject unpermitted file types like .exe', () => {
      const file = new File(['binary'], 'virus.exe', { type: 'application/x-msdownload' });
      const result = validateReportFile(file);
      expect(result.valid).toBe(false);
      expect(result.error).toContain('Only PDF, JPG, PNG, and WebP');
    });

    it('should reject files exceeding MAX_FILE_SIZE (10MB)', () => {
      const largeFile = {
        name: 'huge.pdf',
        type: 'application/pdf',
        size: MAX_FILE_SIZE + 1024,
      } as unknown as File;
      const result = validateReportFile(largeFile);
      expect(result.valid).toBe(false);
      expect(result.error).toContain('exceeds 10MB limit');
    });
  });
});
