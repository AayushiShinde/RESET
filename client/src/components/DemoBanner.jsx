import { Compass, Sparkles, PhoneOff } from 'lucide-react';

export function DemoBanner({ onNavigate }) {
  return (
    <div style={{
      background: 'var(--forest-900)',
      color: '#ffffff',
      padding: '0.55rem 1rem',
      fontSize: '0.85rem',
      borderBottom: '1px solid rgba(255,255,255,0.1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: '0.75rem'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
        <span style={{
          background: 'rgba(255,255,255,0.15)',
          padding: '0.2rem 0.5rem',
          borderRadius: '4px',
          fontWeight: 700,
          fontSize: '0.75rem',
          letterSpacing: '0.04em'
        }}>
          TOUCH GRASS 🌿
        </span>
        <span style={{ color: '#e0ebd9' }}>
          Hacktoberfest 2026 Open-Source AI Challenge • <strong>Re:Set</strong>
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        <button
          onClick={() => onNavigate('demo')}
          style={{
            background: 'var(--forest-600)',
            color: '#fff',
            border: 'none',
            padding: '0.3rem 0.8rem',
            borderRadius: '999px',
            fontSize: '0.8rem',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem'
          }}
        >
          <Sparkles size={13} />
          1-Minute Judge Walkthrough
        </button>

        <button
          onClick={() => onNavigate('organizer')}
          style={{
            background: 'transparent',
            color: '#d4e5d6',
            border: '1px solid rgba(255,255,255,0.2)',
            padding: '0.25rem 0.7rem',
            borderRadius: '999px',
            fontSize: '0.78rem',
            cursor: 'pointer'
          }}
        >
          Organizer (27 checked in / 24 completed)
        </button>

        <button
          onClick={() => onNavigate('passport')}
          style={{
            background: 'transparent',
            color: '#d4e5d6',
            border: '1px solid rgba(255,255,255,0.2)',
            padding: '0.25rem 0.7rem',
            borderRadius: '999px',
            fontSize: '0.78rem',
            cursor: 'pointer'
          }}
        >
          My Passport (Offline Time)
        </button>
      </div>
    </div>
  );
}
