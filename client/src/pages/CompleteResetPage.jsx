import React, { useState } from 'react';
import { ArrowRight, BookOpen, Sparkles, Cpu, CheckCircle2, HeartHandshake, ShieldCheck } from 'lucide-react';
import { submitReflection } from '../api.js';

export function CompleteResetPage({ minutesCompleted = 30, challenge, onGoToPassport }) {
  const [feeling, setFeeling] = useState('Good');
  const [reflection, setReflection] = useState('I realized that I keep waiting until I have a lot of free time to read.');
  const [bookTitle, setBookTitle] = useState('Atomic Habits');
  
  const [loading, setLoading] = useState(false);
  const [aiResult, setAiResult] = useState(null);
  const [error, setError] = useState(null);

  const feelings = [
    { label: 'Good', emoji: '🙂' },
    { label: 'Peaceful', emoji: '😌' },
    { label: 'Difficult', emoji: '😕' }
  ];

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!reflection.trim()) {
      setError('Please write at least one sentence or feeling.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await submitReflection({
        bookTitle,
        reflection,
        feeling
      });
      setAiResult(data.aiAnalysis);
    } catch (err) {
      setError(err.message || 'Failed to submit reflection');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-narrow animate-fade" style={{ padding: '3.5rem 1.5rem' }}>
      {!aiResult ? (
        <div>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span className="badge badge-forest" style={{ marginBottom: '0.75rem' }}>
              Offline Session Complete
            </span>
            <h1>Welcome back.</h1>
            <p style={{ fontSize: '1.2rem', marginTop: '0.5rem', color: 'var(--forest-900)' }}>
              You gave yourself: <strong>{minutesCompleted} minutes</strong>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="card" style={{ background: '#ffffff', border: '1.5px solid var(--earth-200)' }}>
            
            {/* Self-Trust Ethical Callout */}
            <div style={{
              background: 'var(--forest-50)',
              border: '1px solid var(--forest-100)',
              borderRadius: 'var(--radius-md)',
              padding: '1rem',
              marginBottom: '2rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              fontSize: '0.88rem',
              color: 'var(--forest-900)'
            }}>
              <ShieldCheck size={20} style={{ color: 'var(--forest-700)', flexShrink: 0 }} />
              <div>
                <strong>Self-Trust Verification:</strong> Re:Set relies entirely on your honesty.
                No screen timers or surveillance trackers. Returning matters more than consistency.
              </div>
            </div>

            {/* How did it feel? */}
            <div className="form-group">
              <label className="form-label">
                How did it feel?
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
                {feelings.map((f) => (
                  <button
                    key={f.label}
                    type="button"
                    onClick={() => setFeeling(f.label)}
                    className={`chip-btn ${feeling === f.label ? 'active' : ''}`}
                    style={{
                      padding: '1rem',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '0.35rem',
                      fontSize: '1rem'
                    }}
                  >
                    <span style={{ fontSize: '1.75rem' }}>{f.emoji}</span>
                    <span>{f.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* What stayed with you? */}
            <div className="form-group">
              <label className="form-label" htmlFor="reflection-text">
                What stayed with you?
              </label>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                One idea, sentence, feeling, or thought from your reading.
              </p>
              <textarea
                id="reflection-text"
                className="form-textarea"
                rows={4}
                value={reflection}
                onChange={(e) => setReflection(e.target.value)}
                placeholder="I noticed that I kept reaching for my phone at first, but after 10 minutes..."
              />
            </div>

            {/* Optional: Book Title */}
            <div className="form-group">
              <label className="form-label" htmlFor="book-title">
                What were you reading? <span style={{ fontWeight: 400, color: 'var(--text-soft)' }}>(Optional)</span>
              </label>
              <input
                id="book-title"
                type="text"
                className="form-input"
                value={bookTitle}
                onChange={(e) => setBookTitle(e.target.value)}
                placeholder="e.g. Atomic Habits, The Overstory, Braiding Sweetgrass..."
              />
            </div>

            {error && (
              <div style={{
                background: '#fdf2f0',
                border: '1px solid #f2cfc7',
                borderRadius: 'var(--radius-md)',
                padding: '0.85rem 1rem',
                color: '#a33320',
                fontSize: '0.9rem',
                marginBottom: '1.25rem'
              }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
              id="btn-submit-reflection"
              style={{ width: '100%', padding: '1rem', fontSize: '1.05rem' }}
            >
              {loading ? (
                <>
                  <Sparkles size={18} className="animate-spin" />
                  Gemma is synthesizing your reflection...
                </>
              ) : (
                <>
                  <Cpu size={18} />
                  Submit Reflection to Gemma
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>
        </div>
      ) : (
        /* AI REFLECTION RESPONSE */
        <div className="animate-fade">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span className="badge badge-forest" style={{ marginBottom: '0.75rem' }}>
              Reflection Synthesized
            </span>
            <h1>You noticed something.</h1>
            <p>
              Processed with open-weight intelligence — zero guilt, zero streaks.
            </p>
          </div>

          <div className="card" style={{ background: '#ffffff', border: '2px solid var(--forest-800)', marginBottom: '2.5rem' }}>
            
            {/* Model Badge */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingBottom: '1rem',
              marginBottom: '1.5rem',
              borderBottom: '1px solid var(--earth-200)',
              fontSize: '0.85rem',
              color: 'var(--text-muted)'
            }}>
              <span>Open-Weight Analysis</span>
              <span className="badge badge-forest">
                {aiResult._aiMetadata?.model || 'Gemma 2'}
              </span>
            </div>

            {/* AI Summary */}
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--forest-800)', fontWeight: 700, marginBottom: '0.5rem' }}>
                What Gemma Observed
              </div>
              <blockquote style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.35rem',
                lineHeight: '1.5',
                color: 'var(--forest-900)',
                fontStyle: 'italic',
                borderLeft: '3px solid var(--forest-700)',
                paddingLeft: '1.25rem',
                margin: 0
              }}>
                "{aiResult.summary}"
              </blockquote>
            </div>

            {/* AI Encouragement */}
            <div style={{
              background: 'var(--forest-50)',
              padding: '1.25rem 1.5rem',
              borderRadius: 'var(--radius-md)',
              marginBottom: '2rem',
              border: '1px solid var(--forest-100)'
            }}>
              <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--forest-800)', fontWeight: 700, marginBottom: '0.35rem' }}>
                A Grounded Perspective
              </div>
              <p style={{ fontSize: '1.05rem', color: 'var(--forest-900)', margin: 0 }}>
                {aiResult.encouragement}
              </p>
            </div>

            {/* A Small Next Step */}
            <div style={{ marginBottom: '2.5rem' }}>
              <h3 style={{ fontSize: '1.15rem', color: 'var(--forest-900)', marginBottom: '0.5rem' }}>
                A small next step
              </h3>
              <p style={{ fontSize: '1.05rem', color: 'var(--text-main)' }}>
                {aiResult.nextStep}
              </p>
            </div>

            <div style={{ borderTop: '1px solid var(--earth-200)', paddingTop: '1.5rem', textAlign: 'center' }}>
              <button
                onClick={onGoToPassport}
                className="btn btn-primary btn-large"
                id="btn-view-passport"
                style={{ width: '100%' }}
              >
                View My Passport
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
