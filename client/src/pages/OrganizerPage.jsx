import React, { useState, useEffect } from 'react';
import { fetchCommunitySessions, fetchSessionDetails, fetchSessionReflections } from '../api.js';
import { Users, CheckCircle2, XCircle, Clock, MapPin, QrCode, ShieldCheck, Sparkles, MessageSquare } from 'lucide-react';
import { QRModal } from '../components/QRModal.jsx';

export function OrganizerPage({ onOpenQR }) {
  const [sessions, setSessions] = useState([]);
  const [selectedSessionId, setSelectedSessionId] = useState('session_demo_saturday');
  const [sessionData, setSessionData] = useState(null);
  const [reflections, setReflections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [simulatedMode, setSimulatedMode] = useState(false);

  useEffect(() => {
    async function init() {
      try {
        const sessList = await fetchCommunitySessions();
        setSessions(sessList || []);
        const targetId = sessList[0]?._id || 'session_demo_saturday';
        setSelectedSessionId(targetId);
        await loadSessionStats(targetId);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    init();
  }, []);

  const loadSessionStats = async (id) => {
    try {
      const details = await fetchSessionDetails(id);
      setSessionData(details);
      const refls = await fetchSessionReflections(id);
      setReflections(refls.reflections || []);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSessionChange = async (id) => {
    setSelectedSessionId(id);
    await loadSessionStats(id);
  };

  const currentSession = sessionData?.session || {
    title: 'Saturday Re:Set — Reading Together',
    venue: 'Community Library',
    durationMinutes: 30
  };

  const stats = sessionData?.stats || {
    checkedInCount: 27,
    completedCount: 24,
    notCompletedCount: 3,
    inProgressCount: 3
  };

  return (
    <div className="container animate-fade" style={{ padding: '3.5rem 1.5rem' }}>
      
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        gap: '1.5rem',
        marginBottom: '2.5rem',
        borderBottom: '1px solid var(--earth-200)',
        paddingBottom: '2rem'
      }}>
        <div>
          <span className="badge badge-forest" style={{ marginBottom: '0.75rem' }}>
            Organizer View
          </span>
          <h1>Community Re:Set</h1>
          <h2 style={{ fontSize: '1.75rem', color: 'var(--forest-800)', marginTop: '0.25rem' }}>
            {currentSession.title}
          </h2>
          <div style={{ display: 'flex', gap: '1.25rem', marginTop: '0.6rem', color: 'var(--earth-600)', fontSize: '0.95rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <MapPin size={16} /> {currentSession.venue}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Clock size={16} /> {currentSession.durationMinutes} minutes
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => onOpenQR(currentSession)}
            className="btn btn-primary"
            id="btn-display-qr"
          >
            <QrCode size={18} />
            Display Venue QR Codes
          </button>
        </div>
      </div>

      {/* Critical Ethical Banner */}
      <div style={{
        background: '#ffffff',
        border: '1.5px solid var(--forest-800)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.75rem 2rem',
        marginBottom: '3rem',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <ShieldCheck size={22} style={{ color: 'var(--forest-700)' }} />
          <h3 style={{ fontSize: '1.2rem', color: 'var(--forest-900)' }}>
            Attendance Reporting Principle
          </h3>
        </div>
        <p style={{ fontSize: '1.05rem', color: 'var(--forest-800)', fontStyle: 'italic', marginBottom: '0.5rem' }}>
          "We do not claim that 24 people definitely read every page. Instead, 24 participants completed the Re:Set session."
        </p>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: 0 }}>
          Re:Set records physical arrival and departure check-ins. We treat adults with dignity rather than treating personal attention as corporate telemetry.
        </p>
      </div>

      {/* ATTENDANCE METRICS */}
      <div style={{ marginBottom: '3.5rem' }}>
        <h3 style={{ fontSize: '1.35rem', marginBottom: '1.25rem', color: 'var(--forest-900)' }}>
          Session Attendance
        </h3>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.5rem'
        }}>
          {/* Checked in */}
          <div className="card" style={{ background: '#ffffff', textAlign: 'center', borderTop: '4px solid var(--forest-600)' }}>
            <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--earth-600)', fontWeight: 700 }}>
              Checked In
            </span>
            <div style={{
              fontSize: '3.5rem',
              fontWeight: 700,
              fontFamily: 'var(--font-serif)',
              color: 'var(--forest-900)',
              margin: '0.5rem 0'
            }}>
              {stats.checkedInCount}
            </div>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
              Scanned START QR at venue entrance
            </p>
          </div>

          {/* Completed */}
          <div className="card" style={{ background: '#ffffff', textAlign: 'center', borderTop: '4px solid var(--forest-800)' }}>
            <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--forest-700)', fontWeight: 700 }}>
              Completed Session
            </span>
            <div style={{
              fontSize: '3.5rem',
              fontWeight: 700,
              fontFamily: 'var(--font-serif)',
              color: 'var(--forest-800)',
              margin: '0.5rem 0'
            }}>
              {stats.completedCount}
            </div>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
              Completed full offline time and checked out
            </p>
          </div>

          {/* Did not complete / In progress */}
          <div className="card" style={{ background: '#ffffff', textAlign: 'center', borderTop: '4px solid var(--earth-400)' }}>
            <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--earth-600)', fontWeight: 700 }}>
              Early Departure / Not Completed
            </span>
            <div style={{
              fontSize: '3.5rem',
              fontWeight: 700,
              fontFamily: 'var(--font-serif)',
              color: 'var(--earth-800)',
              margin: '0.5rem 0'
            }}>
              {stats.notCompletedCount}
            </div>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
              Recorded honest self-report; zero penalty
            </p>
          </div>
        </div>
      </div>

      {/* WHAT PEOPLE TOOK AWAY (AGGREGATE REFLECTIONS) */}
      <div>
        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.35rem', color: 'var(--forest-900)' }}>
            What people took away
          </h3>
          <p style={{ fontSize: '0.95rem' }}>
            Aggregate, anonymized participant reflections. Individual identities are never exposed to venue organizers.
          </p>
        </div>

        {/* Aggregated Themes */}
        <div style={{
          background: 'var(--bg-subtle)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.75rem',
          marginBottom: '2rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1.25rem'
        }}>
          <div style={{ background: '#ffffff', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--earth-200)' }}>
            <span className="badge badge-forest" style={{ fontSize: '0.725rem', marginBottom: '0.5rem' }}>
              Collective Observation
            </span>
            <p style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--forest-900)', margin: 0 }}>
              "Several participants mentioned feeling calmer after the first 5 minutes of digital quiet."
            </p>
          </div>

          <div style={{ background: '#ffffff', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--earth-200)' }}>
            <span className="badge badge-forest" style={{ fontSize: '0.725rem', marginBottom: '0.5rem' }}>
              Collective Observation
            </span>
            <p style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--forest-900)', margin: 0 }}>
              "Participants mentioned rediscovering why they enjoy reading paper books instead of doomscrolling."
            </p>
          </div>
        </div>

        {/* Anonymized Snippet Feed */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {reflections.map((r) => (
            <div
              key={r._id}
              className="card"
              style={{ background: '#ffffff', padding: '1.25rem 1.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}
            >
              <div style={{ maxWidth: '650px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.35rem' }}>
                  <span className="badge badge-earth" style={{ fontSize: '0.75rem' }}>
                    📖 {r.bookTitle || 'Reader'}
                  </span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--earth-600)' }}>
                    Felt {r.feeling || 'Good'}
                  </span>
                </div>
                <p style={{ fontSize: '1rem', color: 'var(--text-main)', margin: 0, fontStyle: 'italic' }}>
                  "{r.reflectionSnippet}"
                </p>
              </div>

              {r.aiSummary && (
                <div style={{
                  background: 'var(--forest-50)',
                  padding: '0.6rem 1rem',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.85rem',
                  color: 'var(--forest-800)',
                  maxWidth: '300px'
                }}>
                  <strong>Gemma Synthesis:</strong> {r.aiSummary}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
