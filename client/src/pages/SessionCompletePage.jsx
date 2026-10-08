import React, { useState } from 'react';
import { recordSessionComplete, submitReflection } from '../api.js';
import { ShieldCheck, Cpu, ArrowRight, Heart, Sparkles, BookOpen } from 'lucide-react';

export function SessionCompletePage({ sessionId, onGoToPassport, onGoToOrganizer }) {
  const [completedStatus, setCompletedStatus] = useState(null); // true | false | null
  const [bookTitle, setBookTitle] = useState('');
  const [reflection, setReflection] = useState('');
  const [feeling, setFeeling] = useState('Peaceful');

  const [loading, setLoading] = useState(false);
  const [aiResult, setAiResult] = useState(null);
  const [submittedNotThisTime, setSubmittedNotThisTime] = useState(false);

  const handleChoice = async (didComplete) => {
    setCompletedStatus(didComplete);
    if (!didComplete) {
      setLoading(true);
      try {
        await recordSessionComplete(sessionId, false);
        setSubmittedNotThisTime(true);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    } else {
      // Record completed checkout
      try {
        await recordSessionComplete(sessionId, true);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleReflectionSubmit = async (e) => {
    e?.preventDefault();
    if (!reflection.trim()) return;

    setLoading(true);
    try {
      const result = await submitReflection({
        sessionId,
        bookTitle,
        reflection,
        feeling
      });
      setAiResult(result.aiAnalysis);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-narrow animate-fade" style={{ padding: '3.5rem 1.5rem' }}>
      
      {/* 1. Initial Choice: Did you complete your Re:Set? */}
      {completedStatus === null && (
        <div style={{ textAlign: 'center' }}>
          <span className="badge badge-forest" style={{ marginBottom: '1rem' }}>
            Venue Checkout QR
          </span>
          <h1 style={{ marginBottom: '0.5rem' }}>Welcome back.</h1>
          <h3 style={{ marginBottom: '2.5rem', color: 'var(--forest-800)', fontWeight: 400, fontStyle: 'italic' }}>
            Did you complete your Re:Set?
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '380px', margin: '0 auto 2.5rem' }}>
            <button
              onClick={() => handleChoice(true)}
              className="btn btn-primary btn-large"
              id="btn-completed-it"
              style={{ width: '100%', fontSize: '1.15rem' }}
            >
              🌿 I completed it
            </button>

            <button
              onClick={() => handleChoice(false)}
              className="btn btn-secondary btn-large"
              id="btn-not-this-time"
              style={{ width: '100%', fontSize: '1.05rem', color: 'var(--earth-800)' }}
            >
              Not this time
            </button>
          </div>

          <div style={{
            background: 'var(--bg-subtle)',
            border: '1px solid var(--earth-200)',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem',
            fontSize: '0.88rem',
            color: 'var(--forest-900)',
            maxWidth: '460px',
            margin: '0 auto'
          }}>
            <ShieldCheck size={18} style={{ color: 'var(--forest-700)', display: 'inline', marginRight: '0.4rem' }} />
            <strong>Ethical Verification:</strong> We do not verify that you read every page. We verify that you showed up.
          </div>
        </div>
      )}

      {/* 2. User selected "Not this time" */}
      {completedStatus === false && submittedNotThisTime && (
        <div className="card" style={{ background: '#ffffff', textAlign: 'center', padding: '3rem 2rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌱</div>
          <h2 style={{ fontSize: '1.8rem', color: 'var(--forest-900)', marginBottom: '1rem' }}>
            Not this time is completely okay.
          </h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: '1.7', maxWidth: '480px', margin: '0 auto 2rem' }}>
            You showed up and gave space to the attempt. In Re:Set, there are no broken streaks, no penalty points, and no shame.
            <br />
            <strong>Returning matters more than consistency.</strong>
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={onGoToOrganizer} className="btn btn-secondary">
              View Community Stats
            </button>
            <button onClick={onGoToPassport} className="btn btn-primary">
              View My Passport
            </button>
          </div>
        </div>
      )}

      {/* 3. User selected "I completed it" -> Fill Reflection */}
      {completedStatus === true && !aiResult && (
        <form onSubmit={handleReflectionSubmit} className="card" style={{ background: '#ffffff' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <span className="badge badge-forest" style={{ marginBottom: '0.5rem' }}>
              Community Reading Circle
            </span>
            <h2 style={{ fontSize: '1.75rem', color: 'var(--forest-900)' }}>
              What stayed with you?
            </h2>
            <p style={{ fontSize: '0.95rem' }}>
              One idea, sentence, feeling, or thought from this session.
            </p>
          </div>

          <div className="form-group">
            <textarea
              className="form-textarea"
              rows={4}
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              placeholder="e.g. The silence in the room was so comforting. I finally understood chapter 3..."
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              What were you reading? <span style={{ fontWeight: 400, color: 'var(--text-soft)' }}>(Optional)</span>
            </label>
            <input
              type="text"
              className="form-input"
              value={bookTitle}
              onChange={(e) => setBookTitle(e.target.value)}
              placeholder="Book title..."
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary"
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
                Send Reflection to Gemma AI
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>
      )}

      {/* 4. AI Reflection Synthesized */}
      {completedStatus === true && aiResult && (
        <div className="card" style={{ background: '#ffffff', border: '2px solid var(--forest-800)' }}>
          <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
            <span className="badge badge-forest" style={{ marginBottom: '0.5rem' }}>
              Gemma Reflection
            </span>
            <h2 style={{ fontSize: '1.75rem', color: 'var(--forest-900)' }}>
              You noticed something.
            </h2>
          </div>

          <blockquote style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.25rem',
            color: 'var(--forest-900)',
            fontStyle: 'italic',
            borderLeft: '3px solid var(--forest-700)',
            paddingLeft: '1.25rem',
            marginBottom: '1.75rem'
          }}>
            "{aiResult.summary}"
          </blockquote>

          <div style={{
            background: 'var(--forest-50)',
            padding: '1.25rem',
            borderRadius: 'var(--radius-md)',
            marginBottom: '1.75rem',
            fontSize: '0.95rem',
            color: 'var(--forest-900)'
          }}>
            <strong>Encouragement:</strong> {aiResult.encouragement}
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <h4 style={{ fontSize: '1rem', color: 'var(--forest-800)', marginBottom: '0.25rem' }}>
              A small next step
            </h4>
            <p style={{ fontSize: '0.95rem' }}>{aiResult.nextStep}</p>
          </div>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', borderTop: '1px solid var(--earth-200)', paddingTop: '1.5rem' }}>
            <button onClick={onGoToOrganizer} className="btn btn-secondary">
              View Organizer Dashboard
            </button>
            <button onClick={onGoToPassport} className="btn btn-primary">
              View My Passport
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
