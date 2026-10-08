import React from 'react';
import { ShieldCheck, EyeOff, Lock, Cpu, Database, Check } from 'lucide-react';

export function PrivacyPage() {
  return (
    <div className="container-narrow animate-fade" style={{ padding: '4rem 1.5rem' }}>
      
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <span className="badge badge-forest" style={{ marginBottom: '0.75rem' }}>
          Zero-Surveillance Manifesto
        </span>
        <h1>Privacy & Ethical Verification</h1>
        <p style={{ fontSize: '1.15rem', marginTop: '0.5rem' }}>
          Why Re:Set refuses to spy on you to prove that you lived your life.
        </p>
      </div>

      {/* Primary Principle Card */}
      <div className="card" style={{
        background: '#ffffff',
        border: '2px solid var(--forest-800)',
        padding: '2.5rem 2rem',
        marginBottom: '3rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
          <ShieldCheck size={28} style={{ color: 'var(--forest-700)' }} />
          <h2 style={{ fontSize: '1.5rem', color: 'var(--forest-900)' }}>
            The Core Distinction
          </h2>
        </div>

        <blockquote style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '1.35rem',
          color: 'var(--forest-900)',
          fontStyle: 'italic',
          lineHeight: '1.5',
          borderLeft: '3px solid var(--forest-700)',
          paddingLeft: '1.25rem',
          margin: '0 0 1.5rem'
        }}>
          "We don't verify that someone read every page. We verify that they showed up."
        </blockquote>

        <p style={{ fontSize: '1rem', lineHeight: '1.7', color: 'var(--text-main)' }}>
          Many "digital wellness" and habit applications turn users into surveillance subjects:
          monitoring screen locks, recording accelerometers to guess posture, tracking GPS coordinates, or taking front-camera snapshots.
          Re:Set categorically rejects this premise.
        </p>
      </div>

      {/* What we DO NOT track */}
      <div style={{ marginBottom: '3rem' }}>
        <h3 style={{ fontSize: '1.35rem', color: 'var(--forest-900)', marginBottom: '1.25rem' }}>
          What Re:Set Refuses to Track
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="card" style={{ background: '#ffffff', padding: '1.25rem 1.5rem' }}>
            <h4 style={{ color: '#a33320', fontSize: '1.05rem', marginBottom: '0.25rem' }}>
              ✕ Continuous GPS or Geolocation
            </h4>
            <p style={{ fontSize: '0.925rem', margin: 0 }}>
              We do not track your location. When you attend a community session, scanning a physical QR poster at a bookstore or library entrance is the only location signal.
            </p>
          </div>

          <div className="card" style={{ background: '#ffffff', padding: '1.25rem 1.5rem' }}>
            <h4 style={{ color: '#a33320', fontSize: '1.05rem', marginBottom: '0.25rem' }}>
              ✕ Screen Inactivity or Lock State
            </h4>
            <p style={{ fontSize: '0.925rem', margin: 0 }}>
              A phone sitting locked on a table does not prove reading. We rely on your self-trust. If you read for 10 minutes instead of 30, that is completely okay.
            </p>
          </div>

          <div className="card" style={{ background: '#ffffff', padding: '1.25rem 1.5rem' }}>
            <h4 style={{ color: '#a33320', fontSize: '1.05rem', marginBottom: '0.25rem' }}>
              ✕ Biometrics, Accelerometers, or Camera Feeds
            </h4>
            <p style={{ fontSize: '0.925rem', margin: 0 }}>
              We never access gyroscopes or cameras to "verify eye movement". Technology should respect human maturity.
            </p>
          </div>
        </div>
      </div>

      {/* Data Transmission Disclosure */}
      <div style={{
        background: 'var(--bg-subtle)',
        borderRadius: 'var(--radius-lg)',
        padding: '2rem',
        marginBottom: '3rem',
        border: '1px solid var(--earth-200)'
      }}>
        <h3 style={{ fontSize: '1.35rem', color: 'var(--forest-900)', marginBottom: '1rem' }}>
          Transparency: What is sent to AI?
        </h3>
        <p style={{ fontSize: '0.95rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
          Honesty is more important than marketing. We do not claim perfect offline isolation unless you are actively running a local model. Here is the exact data breakdown:
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
          <div style={{ background: '#ffffff', padding: '1.25rem', borderRadius: 'var(--radius-md)' }}>
            <span className="badge badge-forest" style={{ marginBottom: '0.5rem' }}>Local Mode</span>
            <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Ollama / Local Gemma</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>
              When configured with <code>AI_PROVIDER=gemma-local</code>, inference executes directly on your hardware. Zero data leaves your machine.
            </p>
          </div>

          <div style={{ background: '#ffffff', padding: '1.25rem', borderRadius: 'var(--radius-md)' }}>
            <span className="badge badge-earth" style={{ marginBottom: '0.5rem' }}>Hosted Demo Mode</span>
            <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Open-Weight API Endpoint</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>
              Only the prompt snippet (e.g. reason for wanting to read, reflection snippet) is sent to the Gemma model endpoint for inference. No user telemetry is attached.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
