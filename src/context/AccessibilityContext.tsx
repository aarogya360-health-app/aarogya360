import React, { createContext, useContext, useState, useEffect } from 'react';
import { speakText, stopSpeaking, isSpeaking, checkSpeechSupport } from '@/utils/speech';

interface AccessibilityContextType {
  isSpeakingActive: boolean;
  speechSupported: boolean;
  currentSpokenText: string | null;
  speechRate: number;
  setSpeechRate: (rate: number) => void;
  speak: (text: string, lang?: 'en' | 'te' | 'hi') => void;
  stop: () => void;
  reducedMotion: boolean;
  toggleReducedMotion: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSpeakingActive, setIsSpeakingActive] = useState<boolean>(false);
  const [currentSpokenText, setCurrentSpokenText] = useState<string | null>(null);
  const [speechRate, setSpeechRate] = useState<number>(1.0);
  const [speechSupported, setSpeechSupported] = useState<boolean>(true);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);

  useEffect(() => {
    const support = checkSpeechSupport();
    setSpeechSupported(support.hasSpeechSynthesis);

    // Check system prefers-reduced-motion
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setReducedMotion(mediaQuery.matches);

      const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    }
  }, []);

  const speak = (text: string, lang: 'en' | 'te' | 'hi' = 'en') => {
    if (!speechSupported) return;

    if (isSpeakingActive) {
      stopSpeaking();
      setIsSpeakingActive(false);
      setCurrentSpokenText(null);
      return;
    }

    setIsSpeakingActive(true);
    setCurrentSpokenText(text);

    speakText(
      text,
      lang,
      speechRate,
      () => {
        setIsSpeakingActive(false);
        setCurrentSpokenText(null);
      },
      (err) => {
        console.warn('Speech error:', err);
        setIsSpeakingActive(false);
        setCurrentSpokenText(null);
      }
    );
  };

  const stop = () => {
    stopSpeaking();
    setIsSpeakingActive(false);
    setCurrentSpokenText(null);
  };

  const toggleReducedMotion = () => {
    setReducedMotion(prev => !prev);
  };

  return (
    <AccessibilityContext.Provider
      value={{
        isSpeakingActive,
        speechSupported,
        currentSpokenText,
        speechRate,
        setSpeechRate,
        speak,
        stop,
        reducedMotion,
        toggleReducedMotion,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};
