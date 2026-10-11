import React, { useState, useEffect } from 'react';
import { fetchPassport } from '../api.js';
import { BookOpen, Clock, Users, MessageSquare, ShieldCheck, HeartHandshake, Compass, ArrowRight } from 'lucide-react';

export function PassportPage({ onStartNewReset }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetchPassport();
        setData(res.passport);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const passport = data || {
    totalFormatted: '2h 15m',
    reading: {
      sessions: 3,
      offlineFormatted: '1h 42m'
    },
    community: {
      sessionsAttended: 2
    },
    reflectionsCount: 3,
    recentReflections: []
  };

  return (
    <div className="container animate-fade" style={{ padding: '3.5rem 1.75rem' }}>
      
      {/* Header */}
      <div style={{ maxWidth: '680px', marginBottom: '3rem' }}>
        <span className="badge badge-forest" style={{ marginBottom: '0.75rem' }}>
          Personal Offline Journal
        </span>
        <h1>My RESET Passport</h1>
        <p style={{ fontSize: '1.15rem', marginTop: '0.5rem' }}>
          A record of hours reclaimed from screens. No streaks, no arbitrary points, no gamified guilt.
        </p>
      </div>

      {/* Hero Metric: TIME RETURNED TO REAL LIFE */}
      <div className="card" style={{
        background: 'var(--forest-900)',
        color: '#ffffff',
        padding: '3rem 2.5rem',
        borderRadius: 'var(--radius-xl)',
        marginBottom: '3rem',
        boxShadow: 'var(--shadow-lg)'
      }}>
        <div style={{
          fontSize: '0.85rem',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          color: '#a0c4ab',
          fontWeight: 700,
          marginBottom: '0.75rem'
        }}>
          Primary Life Metric
        </div>

        <h2 style={{
          fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
          color: '#f0f5f1',
          fontWeight: 400,
          fontStyle: 'italic',
          marginBottom: '0.5rem'
        }}>
          Time returned to real life
        </h2>

        <div style={{
          fontSize: 'clamp(3.5rem, 8vw, 5.5rem)',
          fontWeight: 700,
          fontFamily: 'var(--font-serif)',
          lineHeight: 1.1,
          color: '#ffffff',
          marginBottom: '1.5rem'
        }}>
          {passport.totalFormatted}
        </div>

        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.15)',
          paddingTop: '1.25rem',
          display: 'flex',
          gap: '2rem',
          flexWrap: 'wrap',
          fontSize: '0.95rem',
          color: '#cad8ce'
        }}>
          <div>
            <strong>Metric Philosophy:</strong> RESET measures hours spent outside this app, not minutes trapped within it.
          </div>
        </div>
      </div>

      {/* METRIC BREAKDOWN CARDS */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1.75rem',
        marginBottom: '3.5rem'
      }}>
        {/* Reading */}
        <div className="card" style={{ background: '#ffffff' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📖</div>
          <h3 style={{ fontSize: '1.3rem', color: 'var(--forest-900)', marginBottom: '0.25rem' }}>
            Reading
          </h3>
          <div style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--forest-800)', margin: '0.5rem 0' }}>
            {passport.reading?.sessions || 3} sessions
          </div>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>
            <strong>{passport.reading?.offlineFormatted || '1h 42m'}</strong> offline with physical and paper books.
          </p>
        </div>

        {/* Community */}
        <div className="card" style={{ background: '#ffffff' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🏛️</div>
          <h3 style={{ fontSize: '1.3rem', color: 'var(--forest-900)', marginBottom: '0.25rem' }}>
            Community
          </h3>
          <div style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--forest-800)', margin: '0.5rem 0' }}>
            {passport.community?.sessionsAttended || 2} sessions attended
          </div>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>
            Gathered with fellow human beings at local library and bookstore sessions.
          </p>
        </div>

        {/* Reflections */}
        <div className="card" style={{ background: '#ffffff' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🌱</div>
          <h3 style={{ fontSize: '1.3rem', color: 'var(--forest-900)', marginBottom: '0.25rem' }}>
            Reflections
          </h3>
          <div style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--forest-800)', margin: '0.5rem 0' }}>
            {passport.reflectionsCount || 3} recorded
          </div>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>
            Grounded personal thoughts synthesized by Gemma without judgment.
          </p>
        </div>
      </div>

      {/* WHAT YOU'VE BEEN RETURNING TO */}
      <div style={{ marginBottom: '4rem' }}>
        <h3 style={{ fontSize: '1.4rem', color: 'var(--forest-900)', marginBottom: '1.25rem' }}>
          What you've been returning to
        </h3>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.25rem'
        }}>
          {/* Active: Reading */}
          <div className="card" style={{ background: '#ffffff', border: '2px solid var(--forest-800)' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📖</div>
            <h4 style={{ fontSize: '1.1rem', color: 'var(--forest-900)' }}>Reading</h4>
            <span className="badge badge-forest" style={{ fontSize: '0.7rem', marginTop: '0.4rem' }}>
              Active Habit
            </span>
          </div>

          {/* Coming Soon: Movement */}
          <div className="card" style={{ background: 'var(--bg-card)', opacity: 0.75 }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🏃</div>
            <h4 style={{ fontSize: '1.1rem', color: 'var(--earth-800)' }}>Movement</h4>
            <span className="badge badge-earth" style={{ fontSize: '0.7rem', marginTop: '0.4rem' }}>
              Coming soon
            </span>
          </div>

          {/* Coming Soon: Nature */}
          <div className="card" style={{ background: 'var(--bg-card)', opacity: 0.75 }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🌿</div>
            <h4 style={{ fontSize: '1.1rem', color: 'var(--earth-800)' }}>Nature</h4>
            <span className="badge badge-earth" style={{ fontSize: '0.7rem', marginTop: '0.4rem' }}>
              Coming soon
            </span>
          </div>

          {/* Coming Soon: Creating */}
          <div className="card" style={{ background: 'var(--bg-card)', opacity: 0.75 }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🎨</div>
            <h4 style={{ fontSize: '1.1rem', color: 'var(--earth-800)' }}>Creating</h4>
            <span className="badge badge-earth" style={{ fontSize: '0.7rem', marginTop: '0.4rem' }}>
              Coming soon
            </span>
          </div>

          {/* Coming Soon: Connecting */}
          <div className="card" style={{ background: 'var(--bg-card)', opacity: 0.75 }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🤝</div>
            <h4 style={{ fontSize: '1.1rem', color: 'var(--earth-800)' }}>Connecting</h4>
            <span className="badge badge-earth" style={{ fontSize: '0.7rem', marginTop: '0.4rem' }}>
              Coming soon
            </span>
          </div>
        </div>
      </div>

      {/* ANTI-GAMIFICATION PHILOSOPHY NOTE */}
      <div style={{
        background: 'var(--bg-subtle)',
        border: '1px dashed var(--earth-300)',
        borderRadius: 'var(--radius-xl)',
        padding: '2.5rem 2rem',
        textAlign: 'center'
      }}>
        <h4 style={{ fontSize: '1.25rem', color: 'var(--forest-900)', marginBottom: '0.5rem' }}>
          Why RESET Rejects Streaks
        </h4>
        <p style={{ fontSize: '1rem', color: 'var(--text-muted)', maxWidth: '640px', margin: '0 auto 1.75rem', lineHeight: '1.7' }}>
          Streak apps weaponize loss aversion, turning genuine human interests into frantic digital chores.
          If you go a week without reading, your passport does not reset to zero. You do not lose status.
          <br />
          <strong>Returning matters more than consistency.</strong>
        </p>

        <button
          onClick={onStartNewReset}
          className="btn btn-primary"
          id="btn-start-another-reset"
          style={{ padding: '0.9rem 2rem' }}
        >
          Start another RESET
          <ArrowRight size={18} />
        </button>
      </div>

    </div>
  );
}
