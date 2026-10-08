import React, { useState, useEffect } from 'react';
import { Leaf, Clock, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export function OfflinePage({ challenge, onFinish }) {
  const [elapsedMinutes, setElapsedMinutes] = useState(0);
  const targetDuration = challenge?.duration_minutes || 30;

  useEffect(() => {
    // Gentle quiet ticker (does not make any sound or aggressive alarms)
    const interval = setInterval(() => {
      setElapsedMinutes(m => m + 1);
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="offline-view animate-fade" style={{ background: '#fdfcf9' }}>
      <div style={{ maxWidth: '580px', width: '100%', margin: '0 auto', textAlign: 'center' }}>
        
        {/* Minimal Brand Mark */}
        <div style={{
          width: '72px',
          height: '72px',
          borderRadius: '50%',
          background: 'var(--forest-100)',
          color: 'var(--forest-800)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '2.4rem',
          margin: '0 auto 2rem',
          boxShadow: 'var(--shadow-sm)'
        }}>
          🌿
        </div>

        <h1 style={{
          fontSize: 'clamp(2.5rem, 6vw, 4rem)',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: 'var(--forest-900)',
          marginBottom: '0.75rem',
          fontWeight: 600
        }}>
          RE:SET
        </h1>

        <h3 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)',
          color: 'var(--forest-800)',
          fontWeight: 400,
          fontStyle: 'italic',
          marginBottom: '1.75rem'
        }}>
          Your reset has started.
        </h3>

        <div style={{
          background: 'var(--bg-card)',
          border: '1.5px solid var(--earth-200)',
          borderRadius: 'var(--radius-lg)',
          padding: '2.5rem 2rem',
          marginBottom: '3rem',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <p style={{
            fontSize: '1.4rem',
            fontWeight: 700,
            color: 'var(--forest-900)',
            marginBottom: '0.75rem'
          }}>
            You don't need this app anymore.
          </p>

          <p style={{
            fontSize: '1.25rem',
            color: 'var(--forest-700)',
            fontFamily: 'var(--font-serif)',
            marginBottom: '1.5rem'
          }}>
            Put your phone away. 🌿
          </p>

          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'var(--forest-50)',
            padding: '0.5rem 1rem',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.875rem',
            color: 'var(--forest-800)'
          }}>
            <span>📖 Reading offline • Target: {targetDuration} minutes</span>
          </div>

          <div style={{
            marginTop: '1.75rem',
            fontSize: '0.85rem',
            color: 'var(--earth-600)',
            lineHeight: '1.6',
            borderTop: '1px solid var(--earth-200)',
            paddingTop: '1.25rem'
          }}>
            Place your phone out of arm's reach or in another room.
            <br />
            There are no push notifications, streaks, or timers demanding your screen time.
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
          <button
            onClick={() => onFinish(targetDuration)}
            className="btn btn-primary btn-large"
            id="btn-return-ready"
            style={{ width: '100%', maxWidth: '380px' }}
          >
            Return when you're ready
            <ArrowRight size={18} />
          </button>

          {/* Dedicated Judge Simulation Button */}
          <div style={{
            background: 'var(--bg-subtle)',
            border: '1px dashed var(--earth-300)',
            borderRadius: 'var(--radius-md)',
            padding: '0.75rem 1.25rem',
            width: '100%',
            maxWidth: '380px',
            textAlign: 'center'
          }}>
            <button
              onClick={() => onFinish(targetDuration, true)}
              className="btn btn-secondary"
              id="btn-simulate-30"
              style={{
                width: '100%',
                fontSize: '0.9rem',
                padding: '0.55rem 1rem',
                border: '1px solid var(--forest-700)',
                color: 'var(--forest-800)'
              }}
            >
              <Sparkles size={15} />
              Simulate {targetDuration} Minutes (Demo)
            </button>
            <span style={{
              display: 'block',
              marginTop: '0.4rem',
              fontSize: '0.75rem',
              color: 'var(--text-soft)',
              fontStyle: 'italic'
            }}>
              Demo mode — simulating the end of the session for competition review.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
