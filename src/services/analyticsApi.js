const API_BASE = process.env.REACT_APP_ANALYTICS_API_URL || 'http://localhost:4000';
const DASHBOARD_KEY = process.env.REACT_APP_ANALYTICS_DASHBOARD_KEY || '';

const sessionStorageKey = 'analyticsSessionId';

export const getSessionId = () => {
  let sessionId = localStorage.getItem(sessionStorageKey);
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
    localStorage.setItem(sessionStorageKey, sessionId);
  }
  return sessionId;
};

export const trackServerPageView = async ({ page, referrer, userAgent }) => {
  try {
    await fetch(`${API_BASE}/api/track/pageview`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        page,
        referrer,
        userAgent,
        sessionId: getSessionId()
      })
    });
  } catch (error) {
    // Keep tracking best-effort; avoid blocking navigation.
    console.log('Server analytics tracking failed');
  }
};

export const fetchAnalyticsSummary = async (days = 7) => {
  const headers = {};
  if (DASHBOARD_KEY) headers['x-analytics-key'] = DASHBOARD_KEY;

  const response = await fetch(`${API_BASE}/api/analytics/summary?days=${days}`, { headers });
  if (!response.ok) {
    throw new Error(`Analytics request failed: ${response.status}`);
  }

  return response.json();
};
