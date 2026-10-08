const API_BASE = '/api';

export async function fetchHealth() {
  const res = await fetch(`${API_BASE}/health`);
  return res.json();
}

export async function generateResetPlan({ activity, reason, durationMinutes, preference }) {
  const res = await fetch(`${API_BASE}/reset/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ activity, reason, durationMinutes, preference })
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to generate Re:Set');
  }
  return res.json();
}

export async function submitReflection({ bookTitle, reflection, feeling, sessionId }) {
  const res = await fetch(`${API_BASE}/reset/reflect`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ bookTitle, reflection, feeling, sessionId })
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to submit reflection');
  }
  return res.json();
}

export async function fetchCommunitySessions() {
  const res = await fetch(`${API_BASE}/community/sessions`);
  return res.json();
}

export async function createCommunitySession(data) {
  const res = await fetch(`${API_BASE}/community/sessions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Failed to create session');
  return res.json();
}

export async function fetchSessionDetails(sessionId) {
  const res = await fetch(`${API_BASE}/community/sessions/${sessionId}`);
  if (!res.ok) throw new Error('Session not found');
  return res.json();
}

export async function recordSessionStart(sessionId, isSimulated = false) {
  const res = await fetch(`${API_BASE}/community/sessions/${sessionId}/start`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ isSimulated })
  });
  if (!res.ok) throw new Error('Check-in failed');
  return res.json();
}

export async function recordSessionComplete(sessionId, didComplete = true, isSimulated = false) {
  const res = await fetch(`${API_BASE}/community/sessions/${sessionId}/complete`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ didComplete, isSimulated })
  });
  if (!res.ok) throw new Error('Check-out failed');
  return res.json();
}

export async function fetchSessionReflections(sessionId) {
  const res = await fetch(`${API_BASE}/community/sessions/${sessionId}/reflections`);
  return res.json();
}

export async function fetchPassport() {
  const res = await fetch(`${API_BASE}/passport`);
  return res.json();
}
