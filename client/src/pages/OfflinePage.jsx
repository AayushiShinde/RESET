import React, { useState, useEffect } from 'react';
import { Leaf, Clock, ArrowRight, ShieldCheck, Sparkles, Check } from 'lucide-react';

export function OfflinePage({ challenge, onFinish }) {
  const [elapsedMinutes, setElapsedMinutes] = useState(0);
  const targetDuration = challenge?.duration_minutes || 30;

  useEffect(() => {
    // Gentle quiet ticker
    const interval = setInterval(() => {
      setElapsedMinutes(m => m + 1);
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="offline-view animate-fade" style={{ background: '#fcfbf7' }}>
      <div style={{ maxWidth: '600px', width: '100%', margin: '0 auto', textAlign: 'center' }}>
        
        {/* Minimal Brand Mark */}
        <div style={{
          width: '76px',
          height: '76px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--forest-100) 0%, var(--forest-50) 100%)',
          color: 'var(--forest-800)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '2.5rem',
          margin: '0 auto 2rem',
          boxShadow: 'var(--shadow-md)',
          border: '1px solid var(--forest-200)'
        }}>
          🌿
        </div>

        <h1 style={{
          fontSize: 'clamp(2.75rem, 6.5vw, 4.5rem)',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--forest-900)',
          marginBottom: '0.75rem',
          fontWeight: 700
        }}>
          RESET
        </h1>

        <h3 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)',
          color: 'var(--forest-800)',
          fontWeight: 400,
          fontStyle: 'italic',
          marginBottom: '2rem'
        }}>
          Your reset has started.
        </h3>

        <div className="card" style={{
          background: '#ffffff',
          border: '1.5px solid var(--earth-200)',
          borderRadius: 'var(--radius-xl)',
          padding: '2.75rem 2rem',
          marginBottom: '3rem',
          boxShadow: 'var(--shadow-md)'
        }}>
          <p style={{
            fontSize: '1.45rem',
            fontWeight: 700,
            color: 'var(--forest-900)',
            marginBottom: '0.75rem'
          }}>
            You don't need this app anymore.
          </p>

          <p style={{
            fontSize: '1.3rem',
            color: 'var(--forest-700)',
            fontFamily: 'var(--font-serif)',
            marginBottom: '1.75rem'
          }}>
            Put your phone away. 🌿
          </p>

          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'var(--forest-50)',
            padding: '0.6rem 1.25rem',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.9rem',
            color: 'var(--forest-800)',
            fontWeight: 500,
            border: '1px solid var(--forest-100)'
          }}>
            <span>📖 Reading offline • Target: {targetDuration} minutes</span>
          </div>

          <div style={{
            marginTop: '2rem',
            fontSize: '0.9rem',
            color: 'var(--earth-600)',
            lineHeight: '1.65',
            borderTop: '1px solid var(--earth-200)',
            paddingTop: '1.5rem'
          }}>
            Place your phone out of arm's reach or in another room.
            <br />
            There are no push notifications, streaks, or timers demanding your screen time.
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', alignItems: 'center' }}>
          <button
            onClick={() => onFinish(targetDuration)}
            className="btn btn-primary btn-large"
            id="btn-return-ready"
            style={{ width: '100%', maxWidth: '380px' }}
          >
            Return when you're ready
            <ArrowRight size={18} />
          </button>

          <button
            onClick={() => onFinish(targetDuration, true)}
            className="btn btn-quiet"
            id="btn-finish-early"
            style={{
              fontSize: '0.9rem',
              color: 'var(--forest-800)',
              cursor: 'pointer'
            }}
          >
            I've finished my session early ({targetDuration} min)
          </button>
        </div>
      </div>
    </div>
  );
}
