import { describe, it, expect } from 'vitest';
import { getLanguageCode, checkSpeechSupport } from '../utils/speech';

describe('Speech & Voice Accessibility', () => {
  it('correctly maps language keys to BCP 47 locale codes', () => {
    expect(getLanguageCode('en')).toBe('en-US');
    expect(getLanguageCode('te')).toBe('te-IN');
    expect(getLanguageCode('hi')).toBe('hi-IN');
  });

  it('checks speech support gracefully without crashing', () => {
    const support = checkSpeechSupport();
    expect(support).toHaveProperty('hasSpeechSynthesis');
    expect(support).toHaveProperty('hasSpeechRecognition');
  });
});
