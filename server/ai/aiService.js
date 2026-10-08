import { GemmaProvider } from './gemmaProvider.js';
import { FallbackProvider } from './fallbackProvider.js';
import { traceSpan, captureError } from '../sentry.js';

export class AIService {
  constructor() {
    this.gemmaProvider = new GemmaProvider();
    this.fallbackProvider = new FallbackProvider();
    this.activeProviderName = process.env.AI_PROVIDER || 'gemma';
  }

  /**
   * Generates a personalized offline Re:Set challenge
   */
  async generateReset(params) {
    return traceSpan('generateReset', 'ai.generate', async () => {
      try {
        if (this.activeProviderName === 'fallback') {
          return await this.fallbackProvider.generateReset(params);
        }

        // Attempt Gemma first
        try {
          return await this.gemmaProvider.generateReset(params);
        } catch (gemmaErr) {
          console.warn('[AIService] Gemma inference unavailable, falling back to deterministic challenge:', gemmaErr.message);
          captureError(gemmaErr, { context: 'Gemma generation fallback triggered', params });
          return await this.fallbackProvider.generateReset(params);
        }
      } catch (err) {
        captureError(err, { context: 'generateReset critical failure', params });
        throw err;
      }
    }, { activity: params.activity, duration: params.durationMinutes });
  }

  /**
   * Analyzes an offline session reflection
   */
  async analyzeReflection(params) {
    return traceSpan('analyzeReflection', 'ai.reflection', async () => {
      try {
        if (this.activeProviderName === 'fallback') {
          return await this.fallbackProvider.analyzeReflection(params);
        }

        try {
          return await this.gemmaProvider.analyzeReflection(params);
        } catch (gemmaErr) {
          console.warn('[AIService] Gemma inference unavailable, using deterministic reflection:', gemmaErr.message);
          captureError(gemmaErr, { context: 'Gemma reflection fallback triggered', params });
          return await this.fallbackProvider.analyzeReflection(params);
        }
      } catch (err) {
        captureError(err, { context: 'analyzeReflection critical failure', params });
        throw err;
      }
    }, { bookTitle: params.bookTitle, feeling: params.feeling });
  }

  getStatus() {
    const hasKey = Boolean(process.env.GEMMA_API_KEY || process.env.HF_TOKEN);
    const isLocal = process.env.AI_PROVIDER === 'gemma-local';
    return {
      preferredProvider: this.activeProviderName,
      model: this.gemmaProvider.model,
      openWeight: true,
      hasCredentials: hasKey,
      isLocalRuntime: isLocal,
      mode: hasKey || isLocal ? 'open-weight-gemma' : 'offline-deterministic-fallback',
      description: 'Gemma 2 open-weight architecture with zero-surveillance fallback'
    };
  }
}

export const aiService = new AIService();
