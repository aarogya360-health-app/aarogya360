# Aarogya360 — Living Wellness Healthcare Web Application

> **Tagline:** *"Your Health. Your World. In Harmony."*

Aarogya360 is a full-stack, animated healthcare and wellness platform engineered to organize personal health observations, manage routine care reminders, securely store laboratory documents with private Row Level Security (RLS), and provide educational symptom information.

---

## 🌟 The Four Signature Visual Experiences

1. **Experience A: Cinematic 3D-Inspired Hero (`HeroExperienceA.tsx`)**
   - Staggered headline entrance animation: *"Your Health. Your World. In Harmony."*
   - Custom SVG medical orb featuring counter-rotating glowing orbital rings and floating medical glyphs (DNA, Heart, Shield, Cardiogram).
   - Dynamic animated heartbeat ECG line moving across an emerald grid.
   - Gentle desktop pointer parallax effect and high-contrast accessible CTA buttons.

2. **Experience B: Premium Health Dashboard (`DashboardOverviewPage.tsx`)**
   - Personalized time-of-day greeting and patient profile summary (blood group, language, emergency contact).
   - Real-time action cards: *New Health Note*, *Upload Medical Report*, *Schedule Reminder*, *Symptom Guide*, and *Voice Assistant*.
   - Responsive sidebar on desktop and animated slide-out mobile navigation drawer.
   - Genuine data analytics charts derived strictly from user-entered logs (zero simulated biometrics).

3. **Experience C: Six Individually Illustrated Service Cards (`ServiceCardsExperienceC.tsx`)**
   - **Health Awareness:** Custom botanical leaf & radiant soft mint glow.
   - **Symptom Information:** Animated pulse-wave illustration with diagnostic frequency lines.
   - **Daily Wellness:** Floating water drop with organic cellular ripples.
   - **Health Records:** Layered medical folder illustration with verified security badge.
   - **Voice Accessibility:** Concentric acoustic rings with interactive microphone beacon.
   - **Medical Reports:** Clinical document illustration featuring a decorative laser scan-line effect.
   - Built-in accessible text-to-speech narration buttons on every card.

4. **Experience D: Interactive Wellness Motion Graphics (`MotionWellnessExperienceD.tsx`)**
   - Interactive SVG progress rings calculating percentage completion based strictly on genuine user-entered goals.
   - Active routine reminders with instant completion toggles.
   - Health note chronology timeline.

---

## 🎨 Living Wellness Design System

- **Midnight Teal:** `#073B3A` (Primary foundation)
- **Emerald:** `#11BFA4` (Vitality & active elements)
- **Soft Mint:** `#D9FFF1` (Accents & highlights)
- **Ice White:** `#F8FCFC` (Surface glow)
- **Deep Navy:** `#102A43` (Text & high contrast headings)
- **Lavender:** `#B9A5FF` (Restful sleep & mental wellness accents)
- **Soft Neutral Background:** `#F1F7F6` (Calming canvas)

Accessibility & Motion:
- Respects `prefers-reduced-motion` at the CSS and component levels.
- Accessible ARIA modal dialogs with focus trapping and `Escape` key listeners.
- High-contrast emergency red-flag callout box with prominent hotline numbers (112 / 911).

---

## 🛠 Tech Stack

- **Frontend:** React 18, TypeScript, Vite, Tailwind CSS, Framer Motion, Lucide Icons
- **Backend & Auth:** Supabase Auth (Email & Password), Supabase PostgreSQL with Row Level Security (RLS), Supabase Storage (Private Buckets)
- **Forms & Validation:** React Hook Form, Zod
- **Voice Accessibility:** Web Speech API (`SpeechSynthesis` & `SpeechRecognition`)
- **Testing:** Vitest, React Testing Library, JSDOM

---

## 🚀 Getting Started

### 1. Prerequisites
Ensure **Node.js (v18+)** and **npm** are installed.

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

If Supabase credentials are not provided initially, **Aarogya360 automatically boots in Instant Demo / Local Offline Mode**. You can freely test, create notes, upload documents, and toggle reminders without any setup blockers!

To connect to your live Supabase cloud:
1. Create a project on [supabase.com](https://supabase.com).
2. Go to **Project Settings** → **API**.
3. Copy **Project URL** and **anon / public key** into `.env`:
   ```env
   VITE_SUPABASE_URL=https://xyzcompany.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOi...
   ```
4. Run the database migration script located at `supabase/migrations/20261013000001_aarogya360_core_schema.sql` in the Supabase SQL Editor.

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 5. Run Unit Tests
```bash
npm run test
```

### 6. Build for Production
```bash
npm run build
```

---

## 🔒 Security & Medical Responsibility

- **Zero Fabricated Biometrics:** Aarogya360 never simulates artificial oxygen levels, blood pressure, or blood sugar without real hardware inputs.
- **RLS Guarded:** All personal notes, reports, and reminders are isolated by `auth.uid() = user_id`.
- **Medical Disclaimer:** Aarogya360 is an informational and health organization tool. It does not provide medical diagnoses, treatment plans, or drug prescriptions. Always consult a licensed medical doctor.
