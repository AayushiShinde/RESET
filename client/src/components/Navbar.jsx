import React, { useState } from 'react';
import { BookOpen, Users, Compass, ShieldCheck, Menu, X, Leaf } from 'lucide-react';

export function Navbar({ currentPage, onNavigate }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { id: 'start', label: 'Start RESET', icon: Leaf },
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
      background: 'rgba(251, 249, 245, 0.88)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(23, 56, 36, 0.08)',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      transition: 'all 0.2s ease'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '74px'
      }}>
        {/* Brand */}
        <div
          onClick={() => handleNav('landing')}
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.75rem' }}
          role="button"
          tabIndex={0}
        >
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, var(--forest-800) 0%, var(--forest-950) 100%)',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.25rem',
            boxShadow: '0 4px 12px rgba(16, 38, 25, 0.25)',
            border: '1px solid rgba(255, 255, 255, 0.15)'
          }}>
            🌿
          </div>
          <div>
            <span style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '1.45rem',
              fontWeight: 800,
              color: 'var(--forest-900)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              display: 'block',
              lineHeight: 1.1
            }}>
              RESET
            </span>
            <span style={{
              fontSize: '0.725rem',
              color: 'var(--earth-600)',
              letterSpacing: '0.03em',
              fontWeight: 500,
              display: 'block'
            }}>
              Return to what matters.
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <div style={{ display: 'none', alignItems: 'center', gap: '0.35rem' }} className="desktop-nav">
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
                  padding: '0.55rem 1.05rem',
                  borderRadius: '999px',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '0.925rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  transition: 'all 0.18s ease'
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
            id="nav-start-reset"
            style={{ padding: '0.65rem 1.35rem', fontSize: '0.9rem', marginLeft: '0.6rem' }}
          >
            Start RESET
          </button>
        </div>

        {/* Mobile Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }} className="mobile-toggle">
          <button
            onClick={() => handleNav('start')}
            className="btn btn-primary"
            style={{ padding: '0.55rem 1.1rem', fontSize: '0.85rem' }}
          >
            Start RESET
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
          background: 'var(--bg-surface)',
          borderBottom: '1px solid var(--earth-200)',
          padding: '1rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          boxShadow: 'var(--shadow-md)'
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
    </nav>
  );
}
