import React from 'react';
import { ShieldCheck, Cpu, Database, Activity, HeartHandshake, ArrowRight } from 'lucide-react';

export function Footer({ onNavigate }) {
  return (
    <footer style={{
      background: 'var(--bg-subtle)',
      borderTop: '1px solid var(--earth-200)',
      padding: '4.5rem 0 2.5rem',
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
              <span style={{ fontSize: '1.4rem' }}>🌿</span>
              <span style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '1.35rem',
                fontWeight: 800,
                letterSpacing: '0.08em',
                color: 'var(--forest-900)',
                textTransform: 'uppercase'
              }}>
                RESET
              </span>
            </div>
            <p style={{ fontSize: '0.95rem', lineHeight: '1.65', marginBottom: '1.25rem' }}>
              <strong>Return to what matters.</strong> An open-weight AI experience designed to help you spend less time on screens and return to real-world offline living.
            </p>
            <p style={{
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              color: 'var(--forest-800)',
              fontSize: '1rem',
              borderLeft: '2.5px solid var(--forest-600)',
              paddingLeft: '0.85rem'
            }}>
              "The better RESET works, the less time you spend inside RESET."
            </p>
          </div>

          {/* Zero Surveillance Philosophy */}
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
            <p style={{ fontSize: '0.925rem', marginBottom: '1rem', lineHeight: '1.6' }}>
              We reject phone screen monitoring, accelerometer tracking, and continuous GPS surveillance.
            </p>
            <div style={{
              background: '#ffffff',
              padding: '1.1rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--earth-200)',
              fontSize: '0.9rem',
              color: 'var(--forest-900)',
              boxShadow: 'var(--shadow-xs)'
            }}>
              <ShieldCheck size={18} style={{ color: 'var(--forest-700)', marginBottom: '0.35rem' }} />
              <p style={{ margin: 0, fontWeight: 500, color: 'var(--forest-900)' }}>
                "We don't verify that someone read every page. We verify that they showed up."
              </p>
            </div>
          </div>

          {/* Technology & Architecture */}
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
              Open-Weight Architecture
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.9rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                <Cpu size={16} style={{ color: 'var(--forest-700)' }} />
                <span><strong>Gemma 2</strong> (Open-weight Google model)</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                <Database size={16} style={{ color: 'var(--forest-700)' }} />
                <span><strong>MongoDB Atlas</strong> (Community sessions & check-ins)</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                <Activity size={16} style={{ color: 'var(--forest-700)' }} />
                <span><strong>Sentry</strong> (Agent workflow tracing)</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
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
                  textDecoration: 'underline',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.3rem'
                }}
              >
                Read our Privacy Manifesto <ArrowRight size={14} />
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
          fontSize: '0.875rem'
        }}>
          <div>
            © 2026 RESET • Open Source • Built for Intentional Living
          </div>
          <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
            <span style={{ cursor: 'pointer', fontWeight: 500 }} onClick={() => onNavigate('landing')}>Home</span>
            <span style={{ cursor: 'pointer', fontWeight: 500 }} onClick={() => onNavigate('start')}>Start RESET</span>
            <span style={{ cursor: 'pointer', fontWeight: 500 }} onClick={() => onNavigate('community')}>Community</span>
            <span style={{ cursor: 'pointer', fontWeight: 500 }} onClick={() => onNavigate('organizer')}>Organizer</span>
            <span style={{ cursor: 'pointer', fontWeight: 500 }} onClick={() => onNavigate('passport')}>Passport</span>
            <span style={{ cursor: 'pointer', fontWeight: 500 }} onClick={() => onNavigate('demo')}>Guided Tour</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
