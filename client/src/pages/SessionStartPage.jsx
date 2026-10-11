import React, { useEffect, useState } from 'react';
import { recordSessionStart, fetchSessionDetails } from '../api.js';
import { PhoneOff, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';

export function SessionStartPage({ sessionId, onPutPhoneAway }) {
  const [session, setSession] = useState(null);
  const [checkedIn, setCheckedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function initCheckIn() {
      try {
        const details = await fetchSessionDetails(sessionId);
        setSession(details.session);
        // Automatically register arrival check-in on QR scan
        await recordSessionStart(sessionId);
        setCheckedIn(true);
      } catch (err) {
        console.error('Check-in initialization error:', err);
      } finally {
        setLoading(false);
      }
    }
    initCheckIn();
  }, [sessionId]);

  return (
    <div className="offline-view animate-fade" style={{ background: '#fcfbf7' }}>
      <div style={{ maxWidth: '580px', width: '100%', margin: '0 auto', textAlign: 'center' }}>
        
        <span className="badge badge-forest" style={{ marginBottom: '1.25rem' }}>
          Physical Venue QR Verified
        </span>

        <h1 style={{
          fontSize: 'clamp(2.5rem, 6vw, 3.8rem)',
          color: 'var(--forest-900)',
          marginBottom: '0.5rem',
          fontWeight: 700
        }}>
          You're here.
        </h1>

        <h3 style={{
          fontSize: 'clamp(1.4rem, 3.5vw, 2rem)',
          color: 'var(--forest-800)',
          fontWeight: 400,
          fontStyle: 'italic',
          marginBottom: '2rem'
        }}>
          RESET starts now.
        </h3>

        <div className="card" style={{
          background: '#ffffff',
          border: '2px solid var(--forest-800)',
          padding: '2.5rem 2rem',
          marginBottom: '2.5rem',
          textAlign: 'center',
          boxShadow: 'var(--shadow-md)'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>📖</div>
          
          <h2 style={{ fontSize: '1.5rem', color: 'var(--forest-900)', marginBottom: '0.5rem' }}>
            {session?.title || 'Saturday RESET — Reading Together'}
          </h2>

          <p style={{ fontSize: '1rem', color: 'var(--earth-600)', marginBottom: '1.5rem' }}>
            📍 {session?.venue || 'Community Library'} • ⏱ {session?.durationMinutes || 30} minutes
          </p>

          <div style={{
            background: 'var(--forest-50)',
            padding: '1.25rem',
            borderRadius: 'var(--radius-md)',
            marginBottom: '1.5rem',
            border: '1px solid var(--forest-100)'
          }}>
            <p style={{
              fontSize: '1.3rem',
              fontWeight: 700,
              color: 'var(--forest-900)',
              margin: 0
            }}>
              Your phone is no longer needed.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            <ShieldCheck size={16} style={{ color: 'var(--forest-700)' }} />
            <span>Attendance verified: You showed up. Now step away from the screen.</span>
          </div>
        </div>

        <button
          onClick={() => onPutPhoneAway(session?.durationMinutes || 30)}
          className="btn btn-primary btn-large"
          id="btn-put-phone-away"
          style={{ width: '100%', maxWidth: '360px', padding: '1.1rem' }}
        >
          <PhoneOff size={20} />
          Begin RESET — Put phone away
        </button>
      </div>
    </div>
  );
}
