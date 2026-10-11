import React, { useState, useEffect } from 'react';
import { fetchCommunitySessions, createCommunitySession } from '../api.js';
import { Users, QrCode, Plus, Calendar, MapPin, Clock, ArrowRight, BookOpen, ShieldCheck } from 'lucide-react';
import { QRModal } from '../components/QRModal.jsx';

export function CommunityPage({ onNavigate, onOpenQR }) {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  
  // New session form
  const [newTitle, setNewTitle] = useState('');
  const [newVenue, setNewVenue] = useState('');
  const [newDuration, setNewDuration] = useState(30);
  const [creating, setCreating] = useState(false);

  const loadSessions = async () => {
    try {
      const data = await fetchCommunitySessions();
      setSessions(data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSessions();
  }, []);

  const handleCreateSession = async (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newVenue.trim()) return;

    setCreating(true);
    try {
      await createCommunitySession({
        title: newTitle,
        venue: newVenue,
        durationMinutes: newDuration,
        activity: 'reading'
      });
      setShowCreateModal(false);
      setNewTitle('');
      setNewVenue('');
      await loadSessions();
    } catch (err) {
      console.error(err);
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="container animate-fade" style={{ padding: '3.5rem 1.75rem' }}>
      
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        gap: '1.5rem',
        marginBottom: '3rem',
        borderBottom: '1px solid var(--earth-200)',
        paddingBottom: '2rem'
      }}>
        <div style={{ maxWidth: '640px' }}>
          <span className="badge badge-forest" style={{ marginBottom: '0.75rem' }}>
            Real-World Gatherings
          </span>
          <h1>Community RESETs</h1>
          <p style={{ fontSize: '1.15rem', marginTop: '0.5rem' }}>
            Local bookstores, university libraries, cafés, and park benches hosting shared offline reading hours.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="btn btn-primary"
          id="btn-create-community"
        >
          <Plus size={18} />
          Host a Community RESET
        </button>
      </div>

      {/* Philosophy Banner */}
      <div style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--earth-200)',
        borderRadius: 'var(--radius-lg)',
        padding: '2rem 2.25rem',
        marginBottom: '3rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1.5rem',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{
            width: '50px',
            height: '50px',
            borderRadius: '14px',
            background: 'var(--forest-100)',
            color: 'var(--forest-800)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem'
          }}>
            📍
          </div>
          <div>
            <h3 style={{ fontSize: '1.2rem', color: 'var(--forest-900)', marginBottom: '0.25rem' }}>
              "We don't verify that you read every page. We verify that you showed up."
            </h3>
            <p style={{ fontSize: '0.925rem', color: 'var(--earth-600)', margin: 0 }}>
              Physical QR codes allow organizers to verify community attendance with zero device surveillance.
            </p>
          </div>
        </div>

        <button
          onClick={() => onNavigate('organizer')}
          className="btn btn-secondary"
          style={{ fontSize: '0.9rem', padding: '0.65rem 1.25rem' }}
        >
          Open Organizer View →
        </button>
      </div>

      {/* Sessions Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '2rem'
      }}>
        {sessions.map((s) => (
          <div key={s._id} className="card" style={{ background: '#ffffff', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <span className="badge badge-forest" style={{ fontSize: '0.75rem' }}>
                📖 {s.activity || 'reading'}
              </span>
              <span style={{ fontSize: '0.85rem', color: 'var(--earth-600)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Clock size={14} />
                {s.durationMinutes} mins
              </span>
            </div>

            <h3 style={{ fontSize: '1.35rem', marginBottom: '0.75rem', color: 'var(--forest-900)' }}>
              {s.title}
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.75rem', fontSize: '0.925rem', color: 'var(--text-muted)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MapPin size={16} style={{ color: 'var(--forest-700)' }} />
                <span>{s.venue}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Calendar size={16} style={{ color: 'var(--forest-700)' }} />
                <span>{s.date || 'Weekly Saturday Morning'}</span>
              </div>
            </div>

            <div style={{ marginTop: 'auto', borderTop: '1px solid var(--earth-200)', paddingTop: '1.25rem', display: 'flex', gap: '0.75rem' }}>
              <button
                onClick={() => onOpenQR(s)}
                className="btn btn-primary"
                style={{ flex: 1, padding: '0.65rem 1rem', fontSize: '0.9rem' }}
              >
                <QrCode size={16} />
                Show QR Codes
              </button>

              <button
                onClick={() => onNavigate('organizer')}
                className="btn btn-secondary"
                style={{ padding: '0.65rem 1rem', fontSize: '0.9rem' }}
              >
                Dashboard
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* CREATE SESSION MODAL */}
      {showCreateModal && (
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
          <div className="card" style={{ maxWidth: '480px', width: '100%', background: '#ffffff', padding: '2.25rem' }}>
            <h3 style={{ fontSize: '1.45rem', marginBottom: '0.5rem', color: 'var(--forest-900)' }}>
              Host a Community RESET
            </h3>
            <p style={{ fontSize: '0.925rem', marginBottom: '1.5rem' }}>
              Create a venue session for your local bookstore, café, library, or meetup.
            </p>

            <form onSubmit={handleCreateSession}>
              <div className="form-group">
                <label className="form-label">Session Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Sunday Morning Silent Reading"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Venue / Location</label>
                <input
                  type="text"
                  className="form-input"
                  value={newVenue}
                  onChange={(e) => setNewVenue(e.target.value)}
                  placeholder="e.g. City Lights Bookstore, Room 2"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Duration</label>
                <select
                  className="form-input"
                  value={newDuration}
                  onChange={(e) => setNewDuration(Number(e.target.value))}
                >
                  <option value={30}>30 minutes</option>
                  <option value={45}>45 minutes</option>
                  <option value={60}>60 minutes</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '2rem' }}>
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="btn btn-quiet"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creating}
                  className="btn btn-primary"
                >
                  {creating ? 'Creating...' : 'Create & Generate QRs'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
