import React, { useState } from 'react';
import { Play, CheckCircle2, ArrowRight, Sparkles, BookOpen, Users, Compass, QrCode } from 'lucide-react';

export function DemoScriptPage({ onNavigate, onStartDemoChallenge, onOpenQR }) {
  const [currentStep, setCurrentStep] = useState(1);

  const demoSteps = [
    {
      step: 1,
      title: 'Open RESET & Frame the Problem',
      script: '“We have built AI that can write, code, search and talk to us. We wanted to build one that helps us stop using AI.”',
      actionLabel: 'Go to Landing Page',
      action: () => onNavigate('landing')
    },
    {
      step: 2,
      title: 'Enter Friction & Duration',
      script: '“I used to read a lot, but now I spend most of my free time scrolling.” — Select 30 minutes.',
      actionLabel: 'Launch Challenge Creator',
      action: () => onNavigate('start')
    },
    {
      step: 3,
      title: 'Gemma Open-Weight Generation',
      script: 'Gemma 2 crafts “Your first RESET”: specific reading spot, phone rule, and tactile reflection anchor.',
      actionLabel: 'Preview Challenge with Gemma',
      action: () => {
        onStartDemoChallenge({
          title: 'Your first RESET',
          duration_minutes: 30,
          activity: 'reading',
          location_suggestion: 'Choose somewhere different from your usual room.',
          phone_rule: 'Put your phone away while reading.',
          reflection_prompt: 'When you finish, remember one idea, sentence, or feeling that stayed with you.',
          next_step: 'Try another 30-minute reading session later this week.',
          _aiMetadata: {
            isFallback: false,
            provider: 'Gemma 2 (Open-Weight)',
            model: 'google/gemma-2-9b-it',
            inferenceType: 'Open-Weight Verified'
          }
        });
        onNavigate('offline');
      }
    },
    {
      step: 4,
      title: 'Begin RESET & Close App',
      script: 'Click “Begin RESET”. Screen says: “You don’t need this app anymore. Put your phone away. 🌿”',
      actionLabel: 'View Minimal Offline Screen',
      action: () => onNavigate('offline')
    },
    {
      step: 5,
      title: 'Community Session at Venue',
      script: 'Show Saturday RESET — Reading Together at Community Library. Display START QR code.',
      actionLabel: 'Display Venue QR Codes',
      action: () => onOpenQR({
        _id: 'session_demo_saturday',
        title: 'Saturday RESET — Reading Together',
        venue: 'Community Library',
        durationMinutes: 30
      })
    },
    {
      step: 6,
      title: 'Live Check-In Attendance',
      script: 'Show organizer dashboard: “27 checked in”.',
      actionLabel: 'View Organizer Dashboard',
      action: () => onNavigate('organizer')
    },
    {
      step: 7,
      title: 'Ethical Verification Complete',
      script: 'Show “24 completed”. Explain: “We aren’t claiming these people read every page. We are verifying that they showed up.”',
      actionLabel: 'Inspect Ethical Numbers',
      action: () => onNavigate('organizer')
    },
    {
      step: 8,
      title: 'Submit Reflection to Gemma',
      script: 'Submit: “I realized I don’t actually need an hour to read. I just need to start.” Gemma analyzes without guilt.',
      actionLabel: 'Open Reflection Flow',
      action: () => onNavigate('complete')
    },
    {
      step: 9,
      title: 'Inspect RESET Passport',
      script: 'Show: “2h 15m returned to real life”. Reading: 3 sessions, 1h 42m offline. Zero streaks.',
      actionLabel: 'Open User Passport',
      action: () => onNavigate('passport')
    },
    {
      step: 10,
      title: 'Closing Philosophy',
      script: '“The best AI interaction might be the one that ends with you closing the app.”',
      actionLabel: 'Return Home',
      action: () => onNavigate('landing')
    }
  ];

  return (
    <div className="container animate-fade" style={{ padding: '3.5rem 1.75rem' }}>
      
      <div style={{ maxWidth: '720px', marginBottom: '2.5rem' }}>
        <span className="badge badge-forest" style={{ marginBottom: '0.75rem' }}>
          Interactive Guided Tour
        </span>
        <h1>10-Step Guided Walkthrough</h1>
        <p style={{ fontSize: '1.1rem', marginTop: '0.5rem' }}>
          Explore the full RESET ecosystem step-by-step: personal AI rituals, distraction-free screen, venue QR check-ins, and zero-streak passport.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {demoSteps.map((s) => (
          <div
            key={s.step}
            className="card"
            style={{
              background: '#ffffff',
              border: currentStep === s.step ? '2px solid var(--forest-800)' : '1px solid var(--earth-200)',
              boxShadow: currentStep === s.step ? 'var(--shadow-md)' : 'var(--shadow-sm)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1.25rem',
              padding: '1.5rem 2rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem', maxWidth: '650px' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: currentStep === s.step ? 'var(--forest-800)' : 'var(--forest-100)',
                color: currentStep === s.step ? '#ffffff' : 'var(--forest-800)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '1rem',
                flexShrink: 0
              }}>
                {s.step}
              </div>

              <div>
                <h3 style={{ fontSize: '1.2rem', color: 'var(--forest-900)', marginBottom: '0.35rem' }}>
                  {s.title}
                </h3>
                <p style={{
                  fontSize: '1rem',
                  fontFamily: 'var(--font-serif)',
                  fontStyle: 'italic',
                  color: 'var(--forest-800)',
                  margin: 0
                }}>
                  {s.script}
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                setCurrentStep(s.step);
                s.action();
              }}
              className="btn btn-secondary"
              style={{
                fontSize: '0.9rem',
                padding: '0.65rem 1.25rem',
                border: '1.5px solid var(--forest-700)',
                color: 'var(--forest-800)'
              }}
            >
              <Play size={14} />
              {s.actionLabel}
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}
