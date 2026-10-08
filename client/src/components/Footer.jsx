import React from 'react';
import { ShieldCheck, Cpu, Database, Activity, HeartHandshake } from 'lucide-react';

export function Footer({ onNavigate }) {
  return (
    <footer style={{
      background: 'var(--bg-subtle)',
      borderTop: '1px solid var(--earth-200)',
      padding: '4rem 0 2.5rem',
      marginTop: '5rem',
      color: 'var(--text-muted)'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '3rem',
          marginBottom: '3rem'
        }}>
          {/* Mission */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <span style={{ fontSize: '1.4rem' }}>🌿</span>
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: 600, color: 'var(--forest-900)' }}>
                Re:Set
              </span>
            </div>
            <p style={{ fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1rem' }}>
              <strong>Return to what matters.</strong> An AI that helps you use your phone less.
              Built for Hacktoberfest 2026 Open-Source AI Challenge — Week 1: <em>Touch Grass</em>.
            </p>
            <p style={{
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              color: 'var(--forest-800)',
              fontSize: '1rem',
              borderLeft: '2px solid var(--forest-600)',
              paddingLeft: '0.75rem'
            }}>
              "The better Re:Set works, the less time you spend inside Re:Set."
            </p>
          </div>

          {/* Ethical Verification Principle */}
          <div>
            <h4 style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.85rem',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'var(--forest-900)',
              marginBottom: '1rem',
              fontWeight: 700
            }}>
              Zero Surveillance Philosophy
            </h4>
            <p style={{ fontSize: '0.925rem', marginBottom: '1rem' }}>
              We reject phone screen monitoring, accelerometer tracking, and continuous GPS surveillance.
            </p>
            <div style={{
              background: '#ffffff',
              padding: '1rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--earth-200)',
              fontSize: '0.9rem',
              color: 'var(--forest-900)'
            }}>
              <ShieldCheck size={18} style={{ color: 'var(--forest-700)', marginBottom: '0.3rem' }} />
              <p style={{ margin: 0, fontWeight: 500 }}>
                "We don't verify that someone read every page. We verify that they showed up."
              </p>
            </div>
          </div>

          {/* Technology & Open Innovation */}
          <div>
            <h4 style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.85rem',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'var(--forest-900)',
              marginBottom: '1rem',
              fontWeight: 700
            }}>
              Open-Weight AI Architecture
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.9rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Cpu size={16} style={{ color: 'var(--forest-700)' }} />
                <span><strong>Gemma 2</strong> (Open-weight Google model)</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Database size={16} style={{ color: 'var(--forest-700)' }} />
                <span><strong>MongoDB Atlas</strong> (Offline community sessions)</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Activity size={16} style={{ color: 'var(--forest-700)' }} />
                <span><strong>Sentry</strong> (Agent workflow tracing)</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <HeartHandshake size={16} style={{ color: 'var(--forest-700)' }} />
                <span><strong>Self-Trust & QR</strong> (Human agency over algorithms)</span>
              </li>
            </ul>

            <div style={{ marginTop: '1.25rem' }}>
              <button
                onClick={() => onNavigate('privacy')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--forest-800)',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }}
              >
                Read our Privacy Manifesto →
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid var(--earth-200)',
          paddingTop: '1.75rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.85rem'
        }}>
          <div>
            © 2026 Re:Set • Open Source under Apache 2.0 • Touch Grass Edition
          </div>
          <div style={{ display: 'flex', gap: '1.25rem' }}>
            <span style={{ cursor: 'pointer' }} onClick={() => onNavigate('landing')}>Home</span>
            <span style={{ cursor: 'pointer' }} onClick={() => onNavigate('start')}>Start Re:Set</span>
            <span style={{ cursor: 'pointer' }} onClick={() => onNavigate('community')}>Community</span>
            <span style={{ cursor: 'pointer' }} onClick={() => onNavigate('organizer')}>Organizer</span>
            <span style={{ cursor: 'pointer' }} onClick={() => onNavigate('passport')}>Passport</span>
            <span style={{ cursor: 'pointer' }} onClick={() => onNavigate('demo')}>Demo Walkthrough</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
