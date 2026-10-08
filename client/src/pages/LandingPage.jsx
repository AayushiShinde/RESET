import React from 'react';
import { ArrowRight, BookOpen, Users, Compass, ShieldCheck, Cpu, Smartphone, Heart, Sparkles } from 'lucide-react';

export function LandingPage({ onNavigate }) {
  return (
    <div className="animate-fade">
      {/* HERO SECTION */}
      <section style={{
        padding: '5rem 0 4rem',
        textAlign: 'center',
        background: 'radial-gradient(ellipse at 50% 20%, rgba(36, 76, 54, 0.06) 0%, transparent 70%)'
      }}>
        <div className="container-narrow">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <span className="badge badge-forest">
              🌿 Hacktoberfest 2026 • Week 1: Touch Grass
            </span>
          </div>

          <h1 style={{ marginBottom: '1rem' }}>
            Re:Set
          </h1>

          <h2 style={{
            fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
            color: 'var(--forest-800)',
            fontStyle: 'italic',
            marginBottom: '1rem',
            fontWeight: 400
          }}>
            Return to what matters.
          </h2>

          <p style={{
            fontSize: '1.35rem',
            fontWeight: 600,
            color: 'var(--forest-900)',
            marginBottom: '2rem'
          }}>
            An AI that helps you use your phone less.
          </p>

          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--earth-200)',
            borderRadius: 'var(--radius-lg)',
            padding: '2rem',
            marginBottom: '2.5rem',
            boxShadow: 'var(--shadow-sm)',
            textAlign: 'left'
          }}>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-main)', lineHeight: '1.7', marginBottom: '1rem' }}>
              We have built AI that can write, code, search, summarize, and talk to us all day.
            </p>
            <p style={{
              fontSize: '1.2rem',
              fontFamily: 'var(--font-serif)',
              color: 'var(--forest-900)',
              fontWeight: 500,
              lineHeight: '1.5'
            }}>
              Re:Set asks a different question:
              <br />
              <strong style={{ color: 'var(--forest-800)' }}>
                What if AI’s job was to help you stop using it?
              </strong>
            </p>
          </div>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => onNavigate('start')}
              className="btn btn-primary btn-large"
              id="cta-start-reset"
            >
              Start a Re:Set
              <ArrowRight size={18} />
            </button>

            <button
              onClick={() => onNavigate('community')}
              className="btn btn-secondary btn-large"
              id="cta-community"
            >
              <Users size={18} />
              Join a Community Session
            </button>
          </div>
        </div>
      </section>

      {/* SECONDARY MESSAGE / CORE PHILOSOPHY */}
      <section style={{ padding: '3.5rem 0', borderTop: '1px solid var(--earth-200)' }}>
        <div className="container-narrow" style={{ textAlign: 'center' }}>
          <span className="badge badge-earth" style={{ marginBottom: '1rem' }}>
            Product Principle
          </span>
          <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.25rem)', marginBottom: '1.5rem' }}>
            The best AI interaction might be the one that ends with you closing the app.
          </h2>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-muted)' }}>
            Most modern software measures success in daily active minutes, retention streaks, and infinite scroll loops.
            Re:Set flips this entirely: <strong>the better Re:Set works, the less time you spend inside Re:Set.</strong>
            Open-weight AI generates a tailored offline starting point, and then gets completely out of your way.
          </p>
        </div>
      </section>

      {/* HOW IT WORKS / 3-STEP FLOW */}
      <section style={{ padding: '4rem 0', background: 'var(--bg-subtle)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="badge badge-forest" style={{ marginBottom: '0.75rem' }}>
              The Minimal Loop
            </span>
            <h2>How Re:Set works</h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem'
          }}>
            {/* Step 1 */}
            <div className="card" style={{ background: '#ffffff' }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                background: 'var(--forest-100)',
                color: 'var(--forest-800)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '1.1rem',
                marginBottom: '1.25rem'
              }}>
                1
              </div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '0.75rem' }}>Open-Weight AI Challenge</h3>
              <p style={{ fontSize: '0.98rem' }}>
                Tell Gemma what you’ve been replacing with screen scrolling and how much time you have. It designs a small, friction-free offline challenge.
              </p>
            </div>

            {/* Step 2 */}
            <div className="card" style={{ background: '#ffffff', border: '2px solid var(--forest-700)' }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                background: 'var(--forest-800)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '1.1rem',
                marginBottom: '1.25rem'
              }}>
                2
              </div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '0.75rem' }}>App Shuts Down Mentally</h3>
              <p style={{ fontSize: '0.98rem' }}>
                Click <em>Begin Re:Set</em>. The UI empties into a quiet screen: <em>"You don't need this app anymore. Put your phone away."</em> No timers ticking, no badges.
              </p>
            </div>

            {/* Step 3 */}
            <div className="card" style={{ background: '#ffffff' }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                background: 'var(--forest-100)',
                color: 'var(--forest-800)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '1.1rem',
                marginBottom: '1.25rem'
              }}>
                3
              </div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '0.75rem' }}>Non-Judgmental Reflection</h3>
              <p style={{ fontSize: '0.98rem' }}>
                Return when you finish. Record one feeling or phrase that stayed with you. Gemma synthesizes your reflection without streaks, guilt, or XP.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* COMMUNITY SECTION */}
      <section style={{ padding: '5rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3.5rem' }}>
            <span className="badge badge-forest" style={{ marginBottom: '0.75rem' }}>
              Real-World Gatherings
            </span>
            <h2 style={{ marginBottom: '1rem' }}>Don't reset alone.</h2>
            <p style={{ fontSize: '1.1rem' }}>
              Re:Set powers offline gatherings at local independent bookstores, university libraries, cafés, and parks.
              Simple QR check-ins verify that people gathered — without invading their privacy.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.5rem',
            marginBottom: '3rem'
          }}>
            <div className="card" style={{ textAlign: 'center', cursor: 'pointer' }} onClick={() => onNavigate('community')}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>📖</div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Reading Together</h3>
              <span className="badge badge-forest" style={{ fontSize: '0.75rem' }}>Active MVP</span>
              <p style={{ fontSize: '0.88rem', marginTop: '0.75rem' }}>
                Quiet community reading circles. 30–60 minutes of uninterrupted books.
              </p>
            </div>

            <div className="card" style={{ textAlign: 'center', opacity: 0.85 }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🌿</div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Nature Walks</h3>
              <span className="badge badge-earth" style={{ fontSize: '0.75rem' }}>Coming Soon</span>
              <p style={{ fontSize: '0.88rem', marginTop: '0.75rem' }}>
                Unplugged forest trails, park meetups, and bird-watching without notification dings.
              </p>
            </div>

            <div className="card" style={{ textAlign: 'center', opacity: 0.85 }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🏃</div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Movement & Run</h3>
              <span className="badge badge-earth" style={{ fontSize: '0.75rem' }}>Coming Soon</span>
              <p style={{ fontSize: '0.88rem', marginTop: '0.75rem' }}>
                Group movement sessions focused on breath, rhythm, and neighborhood connection.
              </p>
            </div>

            <div className="card" style={{ textAlign: 'center', opacity: 0.85 }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🎨</div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Creative Sessions</h3>
              <span className="badge badge-earth" style={{ fontSize: '0.75rem' }}>Coming Soon</span>
              <p style={{ fontSize: '0.88rem', marginTop: '0.75rem' }}>
                Sketching, analog journaling, tactile painting, and crafts in shared studio spaces.
              </p>
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <button
              onClick={() => onNavigate('community')}
              className="btn btn-primary"
              style={{ padding: '0.9rem 2rem' }}
            >
              Explore Community Re:Sets
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* OPEN-WEIGHT AI & ETHICS SECTION */}
      <section style={{ padding: '4.5rem 0', background: 'var(--bg-card)', borderTop: '1px solid var(--earth-200)' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3rem',
            alignItems: 'center'
          }}>
            <div>
              <span className="badge badge-forest" style={{ marginBottom: '0.75rem' }}>
                Open-Weight Innovation
              </span>
              <h2 style={{ marginBottom: '1.25rem' }}>Why Gemma? Why Open Weights?</h2>
              <p style={{ fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '1.25rem' }}>
                Re:Set deals with deeply personal reflections: your relationship with attention, what you felt while reading, and how you choose to live your finite life.
              </p>
              <p style={{ fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
                Closed proprietary cloud models force you to surrender your personal journal entries to corporate training pipelines.
                With <strong>Gemma 2</strong>, weights can run on user hardware or swappable open infrastructure:
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.95rem' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <Cpu size={18} style={{ color: 'var(--forest-700)' }} />
                  <span><strong>Inspectable & Swappable:</strong> Replace Gemma with any open model via <code>AIService</code>.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <ShieldCheck size={18} style={{ color: 'var(--forest-700)' }} />
                  <span><strong>Zero Surveillance:</strong> Self-trust for solo sessions; QR codes only verify showing up.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <Smartphone size={18} style={{ color: 'var(--forest-700)' }} />
                  <span><strong>Local Offline Capability:</strong> Deterministic engine guarantees function without wifi.</span>
                </li>
              </ul>
            </div>

            <div style={{
              background: 'var(--forest-900)',
              color: '#ffffff',
              padding: '2.5rem',
              borderRadius: 'var(--radius-lg)',
              boxShadow: 'var(--shadow-lg)'
            }}>
              <div style={{ fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#a0c4ab', marginBottom: '0.75rem', fontWeight: 700 }}>
                The Re:Set Contract
              </div>
              <blockquote style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.4rem',
                lineHeight: '1.5',
                fontStyle: 'italic',
                marginBottom: '1.5rem',
                color: '#f0f5f1'
              }}>
                "We don't verify that you read every page. We verify that you showed up."
              </blockquote>
              <p style={{ fontSize: '0.95rem', color: '#cad8ce', lineHeight: '1.6' }}>
                A phone being locked does not prove reading. Screen inactivity does not prove reading. Accelerometer data does not prove reading.
                Re:Set restores human agency.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
