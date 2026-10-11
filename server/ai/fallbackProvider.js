/**
 * FallbackProvider
 * Deterministic offline challenges when AI API is unavailable.
 * Rule: Never pretend that AI generated the result if it was generated offline.
 */

export class FallbackProvider {
  constructor() {
    this.name = 'Fallback Offline Provider';
  }

  async generateReset({ activity = 'reading', reason = '', durationMinutes = 30, preference = '' }) {
    const mins = Number(durationMinutes) || 30;

    // Tailor offline challenges based on reason or duration
    let locationSuggestion = 'Choose somewhere different from your usual room.';
    let phoneRule = 'Put your phone away while reading — in another room or out of sight.';
    let reflectionPrompt = 'When you finish, remember one idea, sentence, or feeling that stayed with you.';
    let nextStep = `Try another ${mins}-minute reading session later this week.`;

    const lowerReason = (reason || '').toLowerCase();
    if (lowerReason.includes('scroll') || lowerReason.includes('phone') || lowerReason.includes('screen')) {
      locationSuggestion = 'Sit near a window or in a chair where you never browse your phone.';
      phoneRule = 'Leave your phone plugged in across the room on silent.';
      reflectionPrompt = 'Notice the exact moment your mind wished for a screen, and what happened when you kept reading instead.';
    } else if (lowerReason.includes('tired') || lowerReason.includes('exhausted') || lowerReason.includes('time')) {
      locationSuggestion = 'A comfortable spot with good reading light, not in bed.';
      phoneRule = 'Place your phone face-down behind you.';
      reflectionPrompt = 'Which passage felt calming rather than demanding?';
    }

    return {
      title: 'Your first RESET',
      duration_minutes: mins,
      activity: activity || 'reading',
      location_suggestion: locationSuggestion,
      phone_rule: phoneRule,
      reflection_prompt: reflectionPrompt,
      next_step: nextStep,
      _aiMetadata: {
        isFallback: true,
        provider: 'Deterministic Fallback',
        model: 'Local Offline Engine (Gemma-aligned)',
        note: 'AI service unavailable or offline mode active. Deterministic offline challenge loaded.'
      }
    };
  }

  async analyzeReflection({ bookTitle = '', reflection = '', feeling = 'Good' }) {
    let summary = 'You took intentional time to step away from screens and read.';
    let encouragement = 'Returning matters more than consistency. Every minute away from the scroll is reclaimed life.';
    let nextStep = 'Try another 20–30 minute reading session this week when you feel the pull of your phone.';

    const lower = (reflection || '').toLowerCase();
    if (lower.includes('wait') || lower.includes('time') || lower.includes('busy')) {
      summary = 'You noticed that waiting for large blocks of free time may be what was keeping you from reading.';
      encouragement = 'You made space for reading today instead of waiting for the perfect moment.';
      nextStep = 'Keep your book beside your tea or morning spot so small moments become reading moments.';
    } else if (lower.includes('quiet') || lower.includes('peace') || lower.includes('calm')) {
      summary = 'You noticed the calming mental shift that happens when digital noise stops.';
      encouragement = 'Your mind adapted quickly to stillness once the notifications were gone.';
      nextStep = 'Protect another small pocket of quiet tomorrow.';
    } else if (lower.includes('hard') || lower.includes('difficult') || lower.includes('focus') || feeling === 'Difficult') {
      summary = 'You noticed that retraining focus away from algorithmic feeds feels unfamiliar at first.';
      encouragement = 'Noticing difficulty is not failure — it is proof that your brain is adjusting to natural pacing.';
      nextStep = 'Give yourself permission to read just 10 pages next time without rushing.';
    }

    return {
      summary,
      encouragement,
      nextStep,
      _aiMetadata: {
        isFallback: true,
        provider: 'Deterministic Fallback',
        model: 'Local Offline Engine (Gemma-aligned)',
        note: 'AI service unavailable. Deterministic human-centered reflection generated.'
      }
    };
  }
}
