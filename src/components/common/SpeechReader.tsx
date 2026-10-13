import React from 'react';
import { Volume2, VolumeX, Pause, Play } from 'lucide-react';
import { useAccessibility } from '@/context/AccessibilityContext';

interface SpeechReaderProps {
  textToRead: string;
  label?: string;
  lang?: 'en' | 'te' | 'hi';
  compact?: boolean;
}

export const SpeechReader: React.FC<SpeechReaderProps> = ({
  textToRead,
  label = 'Listen',
  lang = 'en',
  compact = false,
}) => {
  const { isSpeakingActive, currentSpokenText, speak, stop, speechSupported } = useAccessibility();

  if (!speechSupported) {
    return null;
  }

  const isCurrentReading = isSpeakingActive && currentSpokenText === textToRead;

  const handleToggle = () => {
    if (isCurrentReading) {
      stop();
    } else {
      speak(textToRead, lang);
    }
  };

  if (compact) {
    return (
      <button
        onClick={handleToggle}
        aria-label={isCurrentReading ? 'Stop audio narration' : `Listen to ${label}`}
        className={`p-2 rounded-xl transition-all duration-200 border ${
          isCurrentReading
            ? 'bg-emerald-500 text-white border-emerald-600 shadow-glow-emerald animate-pulse'
            : 'bg-white/80 hover:bg-emerald-50 text-teal-800 border-teal-800/10 hover:border-emerald-500/30'
        }`}
        title={isCurrentReading ? 'Stop audio' : 'Listen with Voice Assistance'}
      >
        {isCurrentReading ? (
          <VolumeX className="w-4 h-4" />
        ) : (
          <Volume2 className="w-4 h-4 text-emerald-600" />
        )}
      </button>
    );
  }

  return (
    <button
      onClick={handleToggle}
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 border ${
        isCurrentReading
          ? 'bg-emerald-600 text-white border-emerald-700 shadow-glow-emerald'
          : 'bg-white/90 hover:bg-emerald-50/80 text-teal-800 border-teal-800/15 hover:border-emerald-500/40 shadow-sm'
      }`}
    >
      {isCurrentReading ? (
        <>
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-mint-200 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
          </span>
          <VolumeX className="w-3.5 h-3.5" />
          <span>Stop Listening</span>
        </>
      ) : (
        <>
          <Volume2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>{label}</span>
        </>
      )}
    </button>
  );
};
