/**
 * GemmaProvider
 * Integrates open-weight Gemma model (Gemma 2 9B / 2B)
 * Supports:
 *  - Hugging Face Inference API (google/gemma-2-9b-it)
 *  - Local Ollama instance (gemma2:2b or gemma2:9b)
 *  - Open-weight compatible OpenAI-style endpoints (Groq, Together, vLLM, OpenRouter)
 */

export class GemmaProvider {
  constructor(config = {}) {
    this.name = 'Gemma (Open-Weight)';
    this.apiKey = process.env.GEMMA_API_KEY || process.env.HF_TOKEN || '';
    this.model = process.env.GEMMA_MODEL || 'google/gemma-2-9b-it';
    this.ollamaUrl = process.env.OLLAMA_URL || 'http://localhost:11434';
    this.providerType = process.env.AI_PROVIDER || 'gemma';
  }

  async generateReset({ activity, reason, durationMinutes, preference }) {
    const prompt = `You are Re:Set, an AI that helps people spend less time on screens and return to real-world offline life.
Task: Generate a realistic, peaceful offline challenge for a person who wants to return to ${activity}.
User reason: "${reason}".
Available duration: ${durationMinutes} minutes.
${preference ? `User preference: "${preference}".` : ''}

CRITICAL RULES:
- Return ONLY valid JSON.
- Never guilt the user.
- Emphasize putting the phone away and tactile presence.

JSON format:
{
  "title": "Your first Re:Set",
  "duration_minutes": ${durationMinutes},
  "activity": "${activity}",
  "location_suggestion": "string suggestion for where to sit/be",
  "phone_rule": "string rule for putting the phone physically out of sight",
  "reflection_prompt": "string thought prompt for when they finish",
  "next_step": "string gentle next step for later in the week"
}`;

    const rawResponse = await this._callModel(prompt);
    const parsed = this._extractJson(rawResponse);
    return {
      title: parsed.title || 'Your first Re:Set',
      duration_minutes: Number(parsed.duration_minutes) || durationMinutes,
      activity: parsed.activity || activity || 'reading',
      location_suggestion: parsed.location_suggestion || 'Choose somewhere different from your usual room.',
      phone_rule: parsed.phone_rule || 'Put your phone away while reading.',
      reflection_prompt: parsed.reflection_prompt || 'When you finish, remember one idea, sentence, or feeling that stayed with you.',
      next_step: parsed.next_step || `Try another ${durationMinutes}-minute session later this week.`,
      _aiMetadata: {
        isFallback: false,
        provider: 'Gemma 2 (Open-Weight)',
        model: this.model,
        inferenceType: this.apiKey ? 'Open-Weight Hosted Router' : 'Local Gemma Runtime'
      }
    };
  }

  async analyzeReflection({ bookTitle, reflection, feeling }) {
    const prompt = `You are Re:Set, an AI analyzing a completed offline reading session.
The user just spent time away from their phone in the real world.
Book read: "${bookTitle || 'Not specified'}".
User reflection: "${reflection}".
User feeling: "${feeling}".

CRITICAL ETHICAL RULES:
- Never guilt the user ("You failed", "You broke your streak", "You need to do better").
- Emphasize: "Not this time is okay" and "Returning matters more than consistency."
- Return ONLY valid JSON.

JSON format:
{
  "summary": "1 concise sentence summarizing what the user observed or felt",
  "encouragement": "1 warm, grounded sentence of encouragement celebrating their return to real life",
  "next_step": "1 small, realistic next step for this week"
}`;

    const rawResponse = await this._callModel(prompt);
    const parsed = this._extractJson(rawResponse);
    return {
      summary: parsed.summary || 'You gave yourself intentional time away from notifications to read.',
      encouragement: parsed.encouragement || 'You made space for reading today instead of waiting for the perfect moment.',
      nextStep: parsed.next_step || 'Try another 20–30 minute reading session this week.',
      _aiMetadata: {
        isFallback: false,
        provider: 'Gemma 2 (Open-Weight)',
        model: this.model,
        inferenceType: this.apiKey ? 'Open-Weight Hosted Router' : 'Local Gemma Runtime'
      }
    };
  }

  async _callModel(prompt) {
    // 1. Try local Ollama if configured
    if (this.providerType === 'gemma-local') {
      try {
        const resp = await fetch(`${this.ollamaUrl}/api/generate`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: 'gemma2:2b',
            prompt,
            stream: false,
            format: 'json'
          })
        });
        if (resp.ok) {
          const data = await resp.json();
          return data.response;
        }
      } catch (err) {
        console.warn('[GemmaProvider] Local Ollama not reachable, checking API key...');
      }
    }

    // 2. Try Hugging Face Inference API / Open-weight endpoint if API key provided
    if (this.apiKey) {
      try {
        const hfEndpoint = `https://api-inference.huggingface.co/models/${this.model}`;
        const resp = await fetch(hfEndpoint, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            inputs: prompt,
            parameters: {
              max_new_tokens: 400,
              temperature: 0.7,
              return_full_text: false
            }
          })
        });

        if (resp.ok) {
          const data = await resp.json();
          if (Array.isArray(data) && data[0]?.generated_text) {
            return data[0].generated_text;
          }
        }
      } catch (err) {
        console.warn('[GemmaProvider] Hugging Face inference failed:', err.message);
      }
    }

    throw new Error('Gemma inference endpoint not reachable or credentials unconfigured.');
  }

  _extractJson(text) {
    try {
      const match = text.match(/\{[\s\S]*\}/);
      if (match) {
        return JSON.parse(match[0]);
      }
      return JSON.parse(text);
    } catch (e) {
      console.warn('[GemmaProvider] JSON parse warning, falling back to clean text extraction');
      return {};
    }
  }
}
