import React from 'react';
import { ArrowRight, BookOpen, Users, Compass, ShieldCheck, Cpu, Smartphone, Heart, Sparkles, CheckCircle2 } from 'lucide-react';

export function LandingPage({ onNavigate }) {
  return (
    <div className="animate-fade">
      {/* HERO SECTION */}
      <section style={{
        padding: '5.5rem 0 4.5rem',
        textAlign: 'center',
        background: 'radial-gradient(ellipse at 50% 25%, rgba(31, 75, 49, 0.08) 0%, rgba(251, 249, 245, 0) 70%)',
        position: 'relative'
      }}>
        <div className="container-narrow">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
            <span className="badge badge-forest" style={{ padding: '0.45rem 1.1rem', letterSpacing: '0.06em' }}>
              🌿 Digital Well-Being • Open-Weight AI
            </span>
          </div>

          <h1 style={{
            fontSize: 'clamp(3rem, 7vw, 5.25rem)',
            fontWeight: 800,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            color: 'var(--forest-900)',
            marginBottom: '0.5rem',
            lineHeight: 1
          }}>
            RESET
          </h1>

          <h2 style={{
            fontSize: 'clamp(1.6rem, 3.2vw, 2.4rem)',
            color: 'var(--forest-800)',
            fontStyle: 'italic',
            marginBottom: '1.25rem',
            fontWeight: 400
          }}>
            Return to what matters.
          </h2>

          <p style={{
            fontSize: '1.35rem',
            fontWeight: 600,
            color: 'var(--forest-900)',
            marginBottom: '2.5rem',
            letterSpacing: '-0.01em'
          }}>
            An AI experience designed to help you use your phone less.
          </p>

          <div style={{
            background: 'var(--bg-surface)',
            border: '1px solid rgba(23, 56, 36, 0.1)',
            borderRadius: 'var(--radius-xl)',
            padding: '2.5rem 2.25rem',
            marginBottom: '3rem',
            boxShadow: 'var(--shadow-md)',
            textAlign: 'left'
          }}>
            <p style={{ fontSize: '1.15rem', color: 'var(--text-main)', lineHeight: '1.7', marginBottom: '1rem' }}>
              We have built AI that can write, code, search, summarize, and talk to us all day long.
            </p>
            <p style={{
              fontSize: '1.25rem',
              fontFamily: 'var(--font-serif)',
              color: 'var(--forest-900)',
              fontWeight: 500,
              lineHeight: '1.55'
            }}>
              RESET asks a different question:
              <br />
              <strong style={{ color: 'var(--forest-800)', display: 'inline-block', marginTop: '0.25rem' }}>
                What if AI’s highest purpose was to help you stop using it?
              </strong>
            </p>
          </div>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => onNavigate('start')}
              className="btn btn-primary btn-large"
              id="cta-start-reset"
            >
              Start a RESET
              <ArrowRight size={19} />
            </button>

            <button
              onClick={() => onNavigate('community')}
              className="btn btn-secondary btn-large"
              id="cta-community"
            >
              <Users size={19} />
              Join Community Session
            </button>
          </div>
        </div>
      </section>

      {/* CORE PHILOSOPHY SECTION */}
      <section style={{ padding: '4rem 0', borderTop: '1px solid var(--earth-200)', background: '#ffffff' }}>
        <div className="container-narrow" style={{ textAlign: 'center' }}>
          <span className="badge badge-earth" style={{ marginBottom: '1rem' }}>
            Product Principle
          </span>
          <h2 style={{ fontSize: 'clamp(1.75rem, 3.2vw, 2.35rem)', marginBottom: '1.5rem' }}>
            The best AI interaction is the one that ends with you closing the screen.
          </h2>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-muted)' }}>
            Most modern platforms measure success in daily active screen time, retention streaks, and infinite scroll loops.
            RESET flips this paradigm entirely: <strong>the better RESET works, the less time you spend inside RESET.</strong>
            Open-weight Gemma generates a tailored offline starting ritual, and then gets completely out of your way.
          </p>
        </div>
      </section>

      {/* HOW IT WORKS / 3-STEP FLOW */}
      <section style={{ padding: '4.5rem 0', background: 'var(--bg-subtle)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="badge badge-forest" style={{ marginBottom: '0.75rem' }}>
              The Minimal Loop
            </span>
            <h2>How RESET works</h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem'
          }}>
            {/* Step 1 */}
            <div className="card">
              <div style={{
                width: '46px',
                height: '46px',
                borderRadius: '14px',
                background: 'var(--forest-100)',
                color: 'var(--forest-800)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '1.15rem',
                marginBottom: '1.25rem'
              }}>
                1
              </div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '0.75rem' }}>Open-Weight AI Invitation</h3>
              <p style={{ fontSize: '0.98rem' }}>
                Tell Gemma what offline activity you miss and how much time you have. It designs a small, tactile, low-friction offline challenge.
              </p>
            </div>

            {/* Step 2 */}
            <div className="card" style={{ border: '2px solid var(--forest-700)', position: 'relative' }}>
              <div style={{
                width: '46px',
                height: '46px',
                borderRadius: '14px',
                background: 'var(--forest-800)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '1.15rem',
                marginBottom: '1.25rem'
              }}>
                2
              </div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '0.75rem' }}>App Mentally Closes</h3>
              <p style={{ fontSize: '0.98rem' }}>
                Click <em>Begin RESET</em>. The screen enters a quiet, distraction-free view: <em>"You don't need this app anymore. Put your phone away."</em> No timers ticking, no badges.
              </p>
            </div>

            {/* Step 3 */}
            <div className="card">
              <div style={{
                width: '46px',
                height: '46px',
                borderRadius: '14px',
                background: 'var(--forest-100)',
                color: 'var(--forest-800)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '1.15rem',
                marginBottom: '1.25rem'
              }}>
                3
              </div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '0.75rem' }}>Non-Judgmental Reflection</h3>
              <p style={{ fontSize: '0.98rem' }}>
                Return when you finish. Record one feeling or phrase that stayed with you. Gemma synthesizes your reflection without streaks, shame, or guilt.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* COMMUNITY SECTION */}
      <section style={{ padding: '5rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3.5rem' }}>
            <span className="badge badge-forest" style={{ marginBottom: '0.75rem' }}>
              Real-World Gatherings
            </span>
            <h2 style={{ marginBottom: '1rem' }}>Don't reset alone.</h2>
            <p style={{ fontSize: '1.1rem' }}>
              RESET powers offline gatherings at local independent bookstores, university libraries, cafés, and parks.
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
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Reading Together</h3>
              <span className="badge badge-forest" style={{ fontSize: '0.75rem' }}>Active Live</span>
              <p style={{ fontSize: '0.9rem', marginTop: '0.75rem' }}>
                Quiet community reading circles. 30–60 minutes of uninterrupted books.
              </p>
            </div>

            <div className="card" style={{ textAlign: 'center', opacity: 0.85 }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🌿</div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Nature Walks</h3>
              <span className="badge badge-earth" style={{ fontSize: '0.75rem' }}>Coming Soon</span>
              <p style={{ fontSize: '0.9rem', marginTop: '0.75rem' }}>
                Unplugged forest trails, park meetups, and bird-watching without screen distractions.
              </p>
            </div>

            <div className="card" style={{ textAlign: 'center', opacity: 0.85 }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🏃</div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Movement & Breath</h3>
              <span className="badge badge-earth" style={{ fontSize: '0.75rem' }}>Coming Soon</span>
              <p style={{ fontSize: '0.9rem', marginTop: '0.75rem' }}>
                Group movement sessions focused on rhythm, posture, and neighborhood connection.
              </p>
            </div>

            <div className="card" style={{ textAlign: 'center', opacity: 0.85 }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🎨</div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Creative Sessions</h3>
              <span className="badge badge-earth" style={{ fontSize: '0.75rem' }}>Coming Soon</span>
              <p style={{ fontSize: '0.9rem', marginTop: '0.75rem' }}>
                Sketching, analog journaling, tactile painting, and crafts in shared studio spaces.
              </p>
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <button
              onClick={() => onNavigate('community')}
              className="btn btn-primary"
              id="btn-explore-community"
              style={{ padding: '0.95rem 2.25rem' }}
            >
              Explore Community RESETs
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* OPEN-WEIGHT AI & ETHICS SECTION */}
      <section style={{ padding: '5rem 0', background: 'var(--bg-card)', borderTop: '1px solid var(--earth-200)' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3.5rem',
            alignItems: 'center'
          }}>
            <div>
              <span className="badge badge-forest" style={{ marginBottom: '0.75rem' }}>
                Open-Weight Innovation
              </span>
              <h2 style={{ marginBottom: '1.25rem' }}>Why Gemma? Why Open Weights?</h2>
              <p style={{ fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '1.25rem' }}>
                RESET deals with deeply personal reflections: your relationship with attention, what you felt while reading, and how you choose to live your finite life.
              </p>
              <p style={{ fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
                Closed proprietary cloud models force you to surrender your personal thoughts to corporate training pipelines.
                With <strong>Gemma 2</strong>, weights can run on private hardware or swappable open infrastructure:
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.95rem' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <Cpu size={18} style={{ color: 'var(--forest-700)', flexShrink: 0 }} />
                  <span><strong>Inspectable & Swappable:</strong> Replace Gemma with any open model via <code>AIService</code>.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <ShieldCheck size={18} style={{ color: 'var(--forest-700)', flexShrink: 0 }} />
                  <span><strong>Zero Surveillance:</strong> Self-trust for solo sessions; QR codes only verify physical presence.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <Smartphone size={18} style={{ color: 'var(--forest-700)', flexShrink: 0 }} />
                  <span><strong>Local Offline Capability:</strong> Deterministic engine guarantees function without network access.</span>
                </li>
              </ul>
            </div>

            <div style={{
              background: 'var(--forest-900)',
              color: '#ffffff',
              padding: '2.75rem 2.25rem',
              borderRadius: 'var(--radius-xl)',
              boxShadow: 'var(--shadow-lg)'
            }}>
              <div style={{ fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#a0c4ab', marginBottom: '0.75rem', fontWeight: 700 }}>
                The RESET Contract
              </div>
              <blockquote style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.45rem',
                lineHeight: '1.5',
                fontStyle: 'italic',
                marginBottom: '1.5rem',
                color: '#f0f5f1'
              }}>
                "We don't verify that you read every page. We verify that you showed up."
              </blockquote>
              <p style={{ fontSize: '0.975rem', color: '#cad8ce', lineHeight: '1.65' }}>
                A phone being locked does not prove reading. Screen timers do not prove reading. Accelerometer data does not prove reading.
                RESET restores human agency.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
