import React, { useState, useEffect } from 'react';
import { DemoBanner } from './components/DemoBanner.jsx';
import { Navbar } from './components/Navbar.jsx';
import { Footer } from './components/Footer.jsx';
import { QRModal } from './components/QRModal.jsx';

import { LandingPage } from './pages/LandingPage.jsx';
import { CreateResetPage } from './pages/CreateResetPage.jsx';
import { OfflinePage } from './pages/OfflinePage.jsx';
import { CompleteResetPage } from './pages/CompleteResetPage.jsx';
import { CommunityPage } from './pages/CommunityPage.jsx';
import { OrganizerPage } from './pages/OrganizerPage.jsx';
import { PassportPage } from './pages/PassportPage.jsx';
import { PrivacyPage } from './pages/PrivacyPage.jsx';
import { DemoScriptPage } from './pages/DemoScriptPage.jsx';
import { SessionStartPage } from './pages/SessionStartPage.jsx';
import { SessionCompletePage } from './pages/SessionCompletePage.jsx';

export default function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [activeSessionId, setActiveSessionId] = useState('session_demo_saturday');
  const [activeChallenge, setActiveChallenge] = useState(null);
  const [completedMinutes, setCompletedMinutes] = useState(30);
  const [qrModalSession, setQrModalSession] = useState(null);

  // Sync route from URL on initial load and popstate
  useEffect(() => {
    const handleUrlRoute = () => {
      const path = window.location.pathname;
      if (path.startsWith('/session/')) {
        const parts = path.split('/');
        const id = parts[2] || 'session_demo_saturday';
        const action = parts[3]; // 'start' or 'complete'
        setActiveSessionId(id);
        if (action === 'start') {
          setCurrentPage('session_start');
        } else if (action === 'complete') {
          setCurrentPage('session_complete');
        }
      } else if (path === '/organizer') {
        setCurrentPage('organizer');
      } else if (path === '/passport') {
        setCurrentPage('passport');
      } else if (path === '/privacy') {
        setCurrentPage('privacy');
      } else if (path === '/demo') {
        setCurrentPage('demo');
      } else if (path === '/start') {
        setCurrentPage('start');
      } else if (path === '/community') {
        setCurrentPage('community');
      } else {
        setCurrentPage('landing');
      }
    };

    handleUrlRoute();
    window.addEventListener('popstate', handleUrlRoute);
    return () => window.removeEventListener('popstate', handleUrlRoute);
  }, []);

  const navigateTo = (page, url = null) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (url) {
      window.history.pushState({}, '', url);
    } else {
      const pathMap = {
        landing: '/',
        start: '/start',
        offline: '/offline',
        complete: '/complete',
        community: '/community',
        organizer: '/organizer',
        passport: '/passport',
        privacy: '/privacy',
        demo: '/demo'
      };
      if (pathMap[page]) {
        window.history.pushState({}, '', pathMap[page]);
      }
    }
  };

  const handleBeginReset = (challenge) => {
    setActiveChallenge(challenge);
    navigateTo('offline');
  };

  const handleFinishOffline = (minutes, isDemo = false) => {
    setCompletedMinutes(minutes);
    navigateTo('complete');
  };

  const handleSimulateScan = (sessionId, type) => {
    setQrModalSession(null);
    setActiveSessionId(sessionId);
    if (type === 'start') {
      navigateTo('session_start', `/session/${sessionId}/start`);
    } else {
      navigateTo('session_complete', `/session/${sessionId}/complete`);
    }
  };

  // If in minimal offline mode, render pure distraction-free screen without navbars
  if (currentPage === 'offline') {
    return (
      <OfflinePage
        challenge={activeChallenge}
        onFinish={handleFinishOffline}
      />
    );
  }

  // If in QR venue scan route: /session/:id/start
  if (currentPage === 'session_start') {
    return (
      <SessionStartPage
        sessionId={activeSessionId}
        onPutPhoneAway={(mins) => {
          setCompletedMinutes(mins);
          navigateTo('offline');
        }}
      />
    );
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Main Navigation */}
      <Navbar currentPage={currentPage} onNavigate={navigateTo} />

      {/* Main Content Area */}
      <main style={{ flex: 1 }}>
        {currentPage === 'landing' && (
          <LandingPage onNavigate={navigateTo} />
        )}

        {currentPage === 'start' && (
          <CreateResetPage onBeginReset={handleBeginReset} />
        )}

        {currentPage === 'complete' && (
          <CompleteResetPage
            minutesCompleted={completedMinutes}
            challenge={activeChallenge}
            onGoToPassport={() => navigateTo('passport')}
          />
        )}

        {currentPage === 'community' && (
          <CommunityPage
            onNavigate={navigateTo}
            onOpenQR={(session) => setQrModalSession(session)}
          />
        )}

        {currentPage === 'organizer' && (
          <OrganizerPage
            onOpenQR={(session) => setQrModalSession(session)}
          />
        )}

        {currentPage === 'passport' && (
          <PassportPage
            onStartNewReset={() => navigateTo('start')}
          />
        )}

        {currentPage === 'privacy' && (
          <PrivacyPage />
        )}

        {currentPage === 'demo' && (
          <DemoScriptPage
            onNavigate={navigateTo}
            onStartDemoChallenge={(challenge) => {
              setActiveChallenge(challenge);
            }}
            onOpenQR={(session) => setQrModalSession(session)}
          />
        )}

        {currentPage === 'session_complete' && (
          <SessionCompletePage
            sessionId={activeSessionId}
            onGoToPassport={() => navigateTo('passport')}
            onGoToOrganizer={() => navigateTo('organizer')}
          />
        )}
      </main>

      {/* QR Modal for Venue Start / Complete codes */}
      {qrModalSession && (
        <QRModal
          session={qrModalSession}
          onClose={() => setQrModalSession(null)}
          onSimulateScan={handleSimulateScan}
        />
      )}

      {/* Footer */}
      <Footer onNavigate={navigateTo} />
    </div>
  );
}
