import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Check, X, AlertCircle } from 'lucide-react';
import { Modal } from './Modal';
import { Button } from './Button';
import { VoiceRecognitionService, checkSpeechSupport } from '@/utils/speech';

interface VoiceInputModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTranscriptComplete: (transcript: string) => void;
  title?: string;
  placeholder?: string;
}

export const VoiceInputModal: React.FC<VoiceInputModalProps> = ({
  isOpen,
  onClose,
  onTranscriptComplete,
  title = 'Voice Health Dictation',
  placeholder = 'Speak clearly into your microphone...',
}) => {
  const [isListening, setIsListening] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>('');
  const [selectedLang, setSelectedLang] = useState<'en' | 'te' | 'hi'>('en');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [recognitionService, setRecognitionService] = useState<VoiceRecognitionService | null>(null);
  const [isSupported, setIsSupported] = useState<boolean>(true);

  useEffect(() => {
    const service = new VoiceRecognitionService();
    setRecognitionService(service);
    setIsSupported(service.isAvailable());
  }, []);

  useEffect(() => {
    if (!isOpen) {
      if (recognitionService && isListening) {
        recognitionService.stopListening();
      }
      setIsListening(false);
      setTranscript('');
      setErrorMsg(null);
    }
  }, [isOpen]);

  const handleStartListening = () => {
    if (!recognitionService) return;
    setErrorMsg(null);

    const started = recognitionService.startListening(
      selectedLang,
      (text: string, isFinal: boolean) => {
        setTranscript(prev => isFinal ? (prev ? `${prev} ${text}` : text) : `${prev} ${text}`);
      },
      (error: string) => {
        setErrorMsg(error);
        setIsListening(false);
      },
      () => {
        setIsListening(false);
      }
    );

    if (started) {
      setIsListening(true);
    }
  };

  const handleStopListening = () => {
    if (recognitionService) {
      recognitionService.stopListening();
    }
    setIsListening(false);
  };

  const handleApply = () => {
    if (transcript.trim()) {
      onTranscriptComplete(transcript.trim());
    }
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      description="Hands-free voice accessibility for notes and symptoms. Powered by browser speech recognition."
      maxWidth="md"
    >
      <div className="flex flex-col items-center text-center space-y-6 py-2">
        {/* Language selector */}
        <div className="flex items-center gap-2 bg-canvas px-3 py-1.5 rounded-xl border border-teal-800/10 text-xs">
          <span className="text-navy-600 font-medium">Input Language:</span>
          <button
            onClick={() => setSelectedLang('en')}
            className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
              selectedLang === 'en' ? 'bg-teal-800 text-white shadow-sm' : 'text-navy-700 hover:bg-white'
            }`}
          >
            English
          </button>
          <button
            onClick={() => setSelectedLang('te')}
            className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
              selectedLang === 'te' ? 'bg-teal-800 text-white shadow-sm' : 'text-navy-700 hover:bg-white'
            }`}
          >
            తెలుగు (Telugu)
          </button>
          <button
            onClick={() => setSelectedLang('hi')}
            className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
              selectedLang === 'hi' ? 'bg-teal-800 text-white shadow-sm' : 'text-navy-700 hover:bg-white'
            }`}
          >
            हिन्दी (Hindi)
          </button>
        </div>

        {/* Animated Microphone Beacon */}
        <div className="relative flex items-center justify-center my-4">
          {/* Animated concentric pulse rings when listening */}
          {isListening && (
            <>
              <div className="absolute w-32 h-32 rounded-full border-2 border-emerald-400/40 animate-ping" />
              <div className="absolute w-28 h-28 rounded-full border-2 border-mint-300/60 animate-pulse" />
            </>
          )}

          <button
            onClick={isListening ? handleStopListening : handleStartListening}
            disabled={!isSupported}
            className={`relative z-10 w-24 h-24 rounded-full flex flex-col items-center justify-center transition-all duration-300 shadow-xl ${
              isListening
                ? 'bg-rose-500 text-white shadow-rose-500/40 scale-105 animate-pulse'
                : 'bg-gradient-to-br from-teal-800 to-emerald-600 text-white hover:shadow-glow-emerald hover:scale-105'
            }`}
            aria-label={isListening ? 'Stop recording voice' : 'Start microphone recording'}
          >
            {isListening ? (
              <>
                <MicOff className="w-8 h-8" />
                <span className="text-[10px] mt-1 font-bold uppercase tracking-wider">Listening</span>
              </>
            ) : (
              <>
                <Mic className="w-8 h-8" />
                <span className="text-[10px] mt-1 font-bold uppercase tracking-wider">Tap to Speak</span>
              </>
            )}
          </button>
        </div>

        {/* Browser limitation message */}
        {!isSupported && (
          <div className="flex items-center gap-2 text-amber-700 bg-amber-50 p-3 rounded-xl border border-amber-200 text-xs text-left">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>Speech recognition is not natively supported in this browser. You can type directly in the field below.</span>
          </div>
        )}

        {/* Error message */}
        {errorMsg && (
          <div className="flex items-center gap-2 text-rose-700 bg-rose-50 p-3 rounded-xl border border-rose-200 text-xs text-left w-full">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Live Transcript Area */}
        <div className="w-full text-left">
          <label className="block text-xs font-semibold text-navy-700 mb-1.5">
            Voice Transcript Output
          </label>
          <textarea
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            rows={4}
            placeholder={isListening ? "Listening... start speaking now..." : placeholder}
            className="w-full p-3.5 text-sm rounded-xl border border-teal-800/20 bg-white/90 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all resize-none text-navy-900"
          />
        </div>

        {/* Action buttons */}
        <div className="flex items-center justify-end gap-3 w-full pt-2">
          <Button variant="ghost" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={handleApply}
            disabled={!transcript.trim()}
            leftIcon={<Check className="w-4 h-4" />}
          >
            Use Transcribed Text
          </Button>
        </div>
      </div>
    </Modal>
  );
};
