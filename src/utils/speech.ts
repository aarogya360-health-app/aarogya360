// Voice Accessibility and Speech Utilities

export interface SpeechSupport {
  hasSpeechSynthesis: boolean;
  hasSpeechRecognition: boolean;
}

export const checkSpeechSupport = (): SpeechSupport => {
  const hasSpeechSynthesis = typeof window !== 'undefined' && 'speechSynthesis' in window;
  const hasSpeechRecognition = typeof window !== 'undefined' && (
    'SpeechRecognition' in window || 'webkitSpeechRecognition' in window
  );
  return { hasSpeechSynthesis, hasSpeechRecognition };
};

export const getLanguageCode = (lang: 'en' | 'te' | 'hi'): string => {
  switch (lang) {
    case 'te': return 'te-IN';
    case 'hi': return 'hi-IN';
    case 'en':
    default: return 'en-US';
  }
};

let currentUtterance: SpeechSynthesisUtterance | null = null;

export const speakText = (
  text: string,
  lang: 'en' | 'te' | 'hi' = 'en',
  rate: number = 1.0,
  onEnd?: () => void,
  onError?: (err: any) => void
): boolean => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return false;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = getLanguageCode(lang);
  utterance.rate = rate;
  utterance.pitch = 1.0;

  utterance.onend = () => {
    currentUtterance = null;
    onEnd?.();
  };

  utterance.onerror = (e) => {
    currentUtterance = null;
    onError?.(e);
  };

  currentUtterance = utterance;
  window.speechSynthesis.speak(utterance);
  return true;
};

export const stopSpeaking = (): void => {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    currentUtterance = null;
  }
};

export const isSpeaking = (): boolean => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return false;
  return window.speechSynthesis.speaking;
};

// Web Speech API SpeechRecognition wrapper
export class VoiceRecognitionService {
  private recognition: any = null;
  private isListening: boolean = false;

  constructor() {
    if (typeof window !== 'undefined') {
      const SpeechRecognitionClass = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognitionClass) {
        this.recognition = new SpeechRecognitionClass();
        this.recognition.continuous = false;
        this.recognition.interimResults = true;
      }
    }
  }

  public isAvailable(): boolean {
    return this.recognition !== null;
  }

  public startListening(
    lang: 'en' | 'te' | 'hi',
    onResult: (transcript: string, isFinal: boolean) => void,
    onError: (error: string) => void,
    onEnd: () => void
  ): boolean {
    if (!this.recognition) {
      onError('Speech recognition is not supported in this browser. Please use standard text input.');
      return false;
    }

    if (this.isListening) {
      try {
        this.recognition.stop();
      } catch {}
    }

    this.recognition.lang = getLanguageCode(lang);

    this.recognition.onresult = (event: any) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }

      if (finalTranscript) {
        onResult(finalTranscript, true);
      } else if (interimTranscript) {
        onResult(interimTranscript, false);
      }
    };

    this.recognition.onerror = (event: any) => {
      this.isListening = false;
      const errorMsg = event.error === 'not-allowed'
        ? 'Microphone permission was denied. Please allow microphone access in your browser settings.'
        : `Voice input error: ${event.error}`;
      onError(errorMsg);
    };

    this.recognition.onend = () => {
      this.isListening = false;
      onEnd();
    };

    try {
      this.recognition.start();
      this.isListening = true;
      return true;
    } catch (err: any) {
      this.isListening = false;
      onError(err?.message || 'Failed to start microphone recognition.');
      return false;
    }
  }

  public stopListening(): void {
    if (this.recognition && this.isListening) {
      try {
        this.recognition.stop();
      } catch {}
      this.isListening = false;
    }
  }
}
