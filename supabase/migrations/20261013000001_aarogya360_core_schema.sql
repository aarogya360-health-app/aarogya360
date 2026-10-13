-- ====================================================================
-- AAROGYA360 DATABASE SCHEMA & ROW LEVEL SECURITY (RLS) MIGRATION
-- Migration: 20261013000001_aarogya360_core_schema.sql
-- Description: Creates profiles, health_notes, report_metadata, reminders,
--              Row Level Security policies, indexes, and storage security.
-- ====================================================================

-- 1. PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.profiles (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    display_name TEXT NOT NULL,
    date_of_birth DATE,
    preferred_language TEXT NOT NULL DEFAULT 'en',
    blood_group TEXT,
    emergency_contact JSONB, -- { name: string, phone: string, relationship?: string }
    created_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc'::text, NOW()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON public.profiles(user_id);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles RLS Policies: users manage only their own profile
CREATE POLICY "Users can view own profile"
    ON public.profiles FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile"
    ON public.profiles FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own profile"
    ON public.profiles FOR DELETE
    USING (auth.uid() = user_id);


-- 2. HEALTH NOTES TABLE
CREATE TABLE IF NOT EXISTS public.health_notes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('General', 'Consultation', 'Symptoms', 'Medication Note', 'Vitals Note', 'Lifestyle')),
    note TEXT NOT NULL,
    note_date DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc'::text, NOW()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_health_notes_user_id ON public.health_notes(user_id);
CREATE INDEX IF NOT EXISTS idx_health_notes_date ON public.health_notes(note_date DESC);

-- Enable RLS
ALTER TABLE public.health_notes ENABLE ROW LEVEL SECURITY;

-- Health Notes RLS Policies
CREATE POLICY "Users can view own health notes"
    ON public.health_notes FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own health notes"
    ON public.health_notes FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own health notes"
    ON public.health_notes FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own health notes"
    ON public.health_notes FOR DELETE
    USING (auth.uid() = user_id);


-- 3. REPORT METADATA TABLE
CREATE TABLE IF NOT EXISTS public.report_metadata (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    file_path TEXT NOT NULL,
    file_name TEXT NOT NULL,
    file_type TEXT NOT NULL,
    file_size_bytes BIGINT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_report_metadata_user_id ON public.report_metadata(user_id);
CREATE INDEX IF NOT EXISTS idx_report_metadata_created_at ON public.report_metadata(created_at DESC);

-- Enable RLS
ALTER TABLE public.report_metadata ENABLE ROW LEVEL SECURITY;

-- Report Metadata RLS Policies
CREATE POLICY "Users can view own report metadata"
    ON public.report_metadata FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own report metadata"
    ON public.report_metadata FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own report metadata"
    ON public.report_metadata FOR DELETE
    USING (auth.uid() = user_id);


-- 4. REMINDERS TABLE
CREATE TABLE IF NOT EXISTS public.reminders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    label TEXT NOT NULL,
    scheduled_at TIMESTAMPTZ NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'dismissed')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc'::text, NOW()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_reminders_user_id ON public.reminders(user_id);
CREATE INDEX IF NOT EXISTS idx_reminders_scheduled_at ON public.reminders(scheduled_at ASC);

-- Enable RLS
ALTER TABLE public.reminders ENABLE ROW LEVEL SECURITY;

-- Reminders RLS Policies
CREATE POLICY "Users can view own reminders"
    ON public.reminders FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own reminders"
    ON public.reminders FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own reminders"
    ON public.reminders FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own reminders"
    ON public.reminders FOR DELETE
    USING (auth.uid() = user_id);


-- 5. AUTOMATIC UPDATED_AT TRIGGER FUNCTION
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply triggers
DROP TRIGGER IF EXISTS trigger_profiles_updated_at ON public.profiles;
CREATE TRIGGER trigger_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS trigger_health_notes_updated_at ON public.health_notes;
CREATE TRIGGER trigger_health_notes_updated_at
    BEFORE UPDATE ON public.health_notes
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS trigger_reminders_updated_at ON public.reminders;
CREATE TRIGGER trigger_reminders_updated_at
    BEFORE UPDATE ON public.reminders
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();


-- 6. PRIVATE STORAGE BUCKET CONFIGURATION & POLICIES
-- Create medical-reports private bucket if storage schema exists
INSERT INTO storage.buckets (id, name, public)
VALUES ('medical-reports', 'medical-reports', false)
ON CONFLICT (id) DO NOTHING;

-- Storage Policies: authenticated users can upload and download only files in their own folder
CREATE POLICY "Users can upload medical reports into own directory"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
    bucket_id = 'medical-reports' AND
    (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Users can view own medical reports"
ON storage.objects FOR SELECT
TO authenticated
USING (
    bucket_id = 'medical-reports' AND
    (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Users can delete own medical reports"
ON storage.objects FOR DELETE
TO authenticated
USING (
    bucket_id = 'medical-reports' AND
    (storage.foldername(name))[1] = auth.uid()::text
);
