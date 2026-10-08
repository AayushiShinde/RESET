import React, { useState } from 'react';
import { BookOpen, Users, Compass, ShieldCheck, Menu, X, Leaf, Sparkles } from 'lucide-react';

export function Navbar({ currentPage, onNavigate }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { id: 'start', label: 'Start Re:Set', icon: Leaf },
    { id: 'community', label: 'Community', icon: Users },
    { id: 'organizer', label: 'Organizer', icon: Compass },
    { id: 'passport', label: 'Passport', icon: BookOpen },
    { id: 'privacy', label: 'Ethical Privacy', icon: ShieldCheck },
  ];

  const handleNav = (id) => {
    onNavigate(id);
    setMobileOpen(false);
  };

  return (
    <nav style={{
      background: 'rgba(251, 249, 245, 0.92)',
      backdropFilter: 'blur(8px)',
      borderBottom: '1px solid var(--earth-200)',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '72px'
      }}>
        {/* Brand */}
        <div
          onClick={() => handleNav('landing')}
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.6rem' }}
        >
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            background: 'var(--forest-800)',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.25rem',
            fontWeight: 'bold',
            boxShadow: 'var(--shadow-sm)'
          }}>
            🌿
          </div>
          <div>
            <span style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.5rem',
              fontWeight: 600,
              color: 'var(--forest-900)',
              letterSpacing: '-0.02em',
              display: 'block',
              lineHeight: 1.1
            }}>
              Re:Set
            </span>
            <span style={{
              fontSize: '0.75rem',
              color: 'var(--earth-600)',
              letterSpacing: '0.02em',
              fontWeight: 500
            }}>
              Return to what matters.
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <div style={{ display: 'none', mdDisplay: 'flex', alignItems: 'center', gap: '0.5rem' }} className="desktop-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                style={{
                  background: isActive ? 'var(--forest-100)' : 'transparent',
                  color: isActive ? 'var(--forest-900)' : 'var(--text-muted)',
                  border: 'none',
                  padding: '0.55rem 1rem',
                  borderRadius: '999px',
                  fontWeight: isActive ? 600 : 500,
                  fontSize: '0.925rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  transition: 'all 0.15s ease'
                }}
              >
                <Icon size={16} />
                {item.label}
              </button>
            );
          })}

          <button
            onClick={() => handleNav('start')}
            className="btn btn-primary"
            style={{ padding: '0.6rem 1.25rem', fontSize: '0.9rem', marginLeft: '0.5rem' }}
          >
            Start Re:Set
          </button>
        </div>

        {/* Mobile Hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }} className="mobile-toggle">
          <button
            onClick={() => handleNav('start')}
            className="btn btn-primary"
            style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
          >
            Start
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              background: 'transparent',
              border: 'none',
              padding: '0.4rem',
              cursor: 'pointer',
              color: 'var(--forest-900)'
            }}
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div style={{
          background: 'var(--bg-primary)',
          borderBottom: '1px solid var(--earth-200)',
          padding: '1rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem'
        }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                style={{
                  background: isActive ? 'var(--forest-100)' : 'transparent',
                  color: isActive ? 'var(--forest-900)' : 'var(--text-main)',
                  border: 'none',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-sm)',
                  fontWeight: 600,
                  fontSize: '1rem',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  cursor: 'pointer'
                }}
              >
                <Icon size={18} />
                {item.label}
              </button>
            );
          })}
        </div>
      )}

      <style>{`
        @media (min-width: 768px) {
          .desktop-nav { display: flex !important; }
          .mobile-toggle { display: none !important; }
        }
      `}</style>
    </nav>
  );
}
