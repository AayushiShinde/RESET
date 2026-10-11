import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { X, ExternalLink, Play, CheckCircle2, QrCode } from 'lucide-react';

export function QRModal({ session, onClose, onSimulateScan }) {
  const [activeTab, setActiveTab] = useState('start'); // 'start' | 'complete'

  if (!session) return null;

  const origin = window.location.origin;
  const startUrl = `${origin}/session/${session._id}/start`;
  const completeUrl = `${origin}/session/${session._id}/complete`;
  const currentUrl = activeTab === 'start' ? startUrl : completeUrl;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(16, 38, 25, 0.75)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem',
      zIndex: 2000
    }}>
      <div className="card" style={{
        maxWidth: '460px',
        width: '100%',
        background: '#ffffff',
        padding: '2.25rem 2rem',
        position: 'relative',
        textAlign: 'center',
        border: '2px solid var(--forest-800)',
        boxShadow: 'var(--shadow-xl)'
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--text-muted)'
          }}
          aria-label="Close modal"
        >
          <X size={22} />
        </button>

        <span className="badge badge-forest" style={{ marginBottom: '0.75rem' }}>
          Physical Gathering Venue QR
        </span>

        <h3 style={{ fontSize: '1.35rem', marginBottom: '0.25rem' }}>
          {session.title}
        </h3>
        <p style={{ fontSize: '0.9rem', marginBottom: '1.25rem', color: 'var(--earth-600)' }}>
          📍 {session.venue} • ⏱ {session.durationMinutes} minutes
        </p>

        {/* Tab switch */}
        <div style={{
          display: 'flex',
          background: 'var(--bg-subtle)',
          padding: '0.35rem',
          borderRadius: 'var(--radius-full)',
          marginBottom: '1.5rem'
        }}>
          <button
            onClick={() => setActiveTab('start')}
            style={{
              flex: 1,
              padding: '0.6rem',
              borderRadius: 'var(--radius-full)',
              border: 'none',
              background: activeTab === 'start' ? '#ffffff' : 'transparent',
              color: activeTab === 'start' ? 'var(--forest-900)' : 'var(--text-muted)',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer',
              boxShadow: activeTab === 'start' ? 'var(--shadow-xs)' : 'none',
              transition: 'all 0.15s ease'
            }}
          >
            START RESET QR
          </button>
          <button
            onClick={() => setActiveTab('complete')}
            style={{
              flex: 1,
              padding: '0.6rem',
              borderRadius: 'var(--radius-full)',
              border: 'none',
              background: activeTab === 'complete' ? '#ffffff' : 'transparent',
              color: activeTab === 'complete' ? 'var(--forest-900)' : 'var(--text-muted)',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer',
              boxShadow: activeTab === 'complete' ? 'var(--shadow-xs)' : 'none',
              transition: 'all 0.15s ease'
            }}
          >
            COMPLETE RESET QR
          </button>
        </div>

        {/* Crisp QR Code Frame */}
        <div style={{
          padding: '1.5rem',
          background: '#ffffff',
          borderRadius: 'var(--radius-md)',
          border: '1.5px solid var(--earth-200)',
          display: 'inline-block',
          marginBottom: '1rem',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <QRCodeSVG
            value={currentUrl}
            size={210}
            level="H"
            includeMargin={true}
            fgColor="#102619"
          />
        </div>

        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1.25rem', wordBreak: 'break-all' }}>
          Encoded Route: <code>{activeTab === 'start' ? `/session/${session._id}/start` : `/session/${session._id}/complete`}</code>
        </div>

        {/* Action Button */}
        <div style={{
          background: 'var(--forest-50)',
          border: '1px solid var(--forest-100)',
          borderRadius: 'var(--radius-md)',
          padding: '1.1rem',
          marginBottom: '1rem'
        }}>
          <p style={{ fontSize: '0.85rem', color: 'var(--forest-900)', marginBottom: '0.75rem', fontWeight: 500 }}>
            Experience the participant check-in flow directly:
          </p>
          <button
            onClick={() => onSimulateScan(session._id, activeTab)}
            className="btn btn-primary"
            style={{ width: '100%', fontSize: '0.95rem', padding: '0.75rem' }}
          >
            <Play size={16} />
            Open {activeTab === 'start' ? 'Start' : 'Complete'} Check-in
          </button>
        </div>

        <div style={{ fontSize: '0.8rem', color: 'var(--earth-600)' }}>
          Print or display this at the venue entrance. Participants scan once on arrival, and once when leaving.
        </div>
      </div>
    </div>
  );
}
