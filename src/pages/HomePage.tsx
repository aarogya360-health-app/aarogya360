import React, { useState } from 'react';
import { HeroExperienceA } from '@/components/hero/HeroExperienceA';
import { ServiceCardsExperienceC } from '@/components/serviceCards/ServiceCardsExperienceC';
import { MotionWellnessExperienceD } from '@/components/wellness/MotionWellnessExperienceD';
import {
  TrustAndAccessibilityStatement,
  AboutSection,
  VoiceAssistanceSection,
  MedicalSafetyDisclaimerSection,
  FinalCTASection,
} from '@/components/home/HomeContentSections';
import { VoiceInputModal } from '@/components/common/VoiceInputModal';

export const HomePage: React.FC = () => {
  const [voiceModalOpen, setVoiceModalOpen] = useState<boolean>(false);

  return (
    <div className="relative">
      {/* 2. Cinematic Hero (Experience A) */}
      <HeroExperienceA />

      {/* 3. Concise Trust & Accessibility Statement (No fake stats) */}
      <TrustAndAccessibilityStatement />

      {/* 4. Six Unique Animated Service Cards (Experience C) */}
      <ServiceCardsExperienceC onOpenVoiceModal={() => setVoiceModalOpen(true)} />

      {/* 5. Interactive Wellness Showcase (Experience D) */}
      <MotionWellnessExperienceD />

      {/* 6. About Aarogya360 Section */}
      <AboutSection />

      {/* 7. Health Accessibility and Voice Assistance Section */}
      <VoiceAssistanceSection onOpenVoiceModal={() => setVoiceModalOpen(true)} />

      {/* 8. Clear Medical Safety Disclaimer Section */}
      <MedicalSafetyDisclaimerSection />

      {/* 9. Final CTA Section */}
      <FinalCTASection />

      {/* Interactive Voice Dictation Modal */}
      <VoiceInputModal
        isOpen={voiceModalOpen}
        onClose={() => setVoiceModalOpen(false)}
        onTranscriptComplete={(transcript) => {
          alert(`Voice sample transcribed:\n"${transcript}"\nIn your dashboard, voice input can be directly attached to any health note.`);
        }}
        title="Experience Aarogya360 Voice Accessibility"
      />
    </div>
  );
};
