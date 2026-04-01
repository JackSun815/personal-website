const express = require('express');
const cors = require('cors');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const geoip = require('geoip-lite');

const app = express();
const PORT = Number(process.env.ANALYTICS_API_PORT || 4000);
const DB_PATH = process.env.ANALYTICS_DB_PATH || path.join(__dirname, 'analytics.db');
const DASHBOARD_KEY = process.env.ANALYTICS_DASHBOARD_KEY || '';

const db = new sqlite3.Database(DB_PATH);
const geoCache = new Map();

app.use(express.json());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : true,
    credentials: false
  })
);

const run = (sql, params = []) =>
  new Promise((resolve, reject) => {
    db.run(sql, params, function onRun(err) {
      if (err) reject(err);
      else resolve(this);
    });
  });

const all = (sql, params = []) =>
  new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });

const get = (sql, params = []) =>
  new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });

const isPrivateIp = (ip) => {
  if (!ip) return true;
  return (
    ip === '::1' ||
    ip === '127.0.0.1' ||
    ip.startsWith('10.') ||
    ip.startsWith('192.168.') ||
    ip.startsWith('172.16.') ||
    ip.startsWith('172.17.') ||
    ip.startsWith('172.18.') ||
    ip.startsWith('172.19.') ||
    ip.startsWith('172.2') ||
    ip.startsWith('fe80:') ||
    ip.startsWith('fc00:')
  );
};

const getClientIp = (req) => {
  const forwarded = req.headers['x-forwarded-for'];
  const ip = Array.isArray(forwarded)
    ? forwarded[0]
    : (forwarded || '').split(',')[0].trim() || req.socket.remoteAddress || '';
  return ip.replace('::ffff:', '');
};

const getGeoData = async (ip) => {
  if (!ip || isPrivateIp(ip)) {
    return {
      country: 'Local',
      countryCode: 'LC',
      region: 'Local',
      city: 'Local',
      latitude: null,
      longitude: null,
      timezone: 'Local',
      isp: 'Local Network',
      asn: null
    };
  }

  if (geoCache.has(ip)) return geoCache.get(ip);

  try {
    const response = await fetch(
      `http://ip-api.com/json/${ip}?fields=status,country,countryCode,regionName,city,lat,lon,timezone,isp,as,query`
    );
    const data = await response.json();
    if (data && data.status === 'success') {
      const result = {
        country: data.country || 'Unknown',
        countryCode: data.countryCode || '??',
        region: data.regionName || 'Unknown',
        city: data.city || 'Unknown',
        latitude: Number.isFinite(data.lat) ? data.lat : null,
        longitude: Number.isFinite(data.lon) ? data.lon : null,
        timezone: data.timezone || 'Unknown',
        isp: data.isp || 'Unknown',
        asn: data.as || null
      };
      geoCache.set(ip, result);
      return result;
    }
  } catch (err) {
    // Ignore and fall through to geoip-lite.
  }

  const fallback = geoip.lookup(ip);
  const result = {
    country: (fallback && fallback.country) || 'Unknown',
    countryCode: (fallback && fallback.country) || '??',
    region: (fallback && fallback.region) || 'Unknown',
    city: 'Unknown',
    latitude: fallback && fallback.ll ? fallback.ll[0] : null,
    longitude: fallback && fallback.ll ? fallback.ll[1] : null,
    timezone: (fallback && fallback.timezone) || 'Unknown',
    isp: 'Unknown',
    asn: null
  };
  geoCache.set(ip, result);
  return result;
};

const formatDuration = (seconds) => {
  const safe = Math.max(0, Math.round(seconds || 0));
  const minutes = Math.floor(safe / 60);
  const secs = safe % 60;
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
};

const classifyDevice = (ua = '') => {
  if (/Mobile|Android|iPhone/i.test(ua)) return 'Mobile';
  if (/iPad|Tablet/i.test(ua)) return 'Tablet';
  return 'Desktop';
};

const requireDashboardKey = (req, res, next) => {
  if (!DASHBOARD_KEY) return next();
  const incoming = req.headers['x-analytics-key'];
  if (incoming !== DASHBOARD_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  return next();
};

const initDb = async () => {
  await run(`
    CREATE TABLE IF NOT EXISTS page_views (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      page TEXT NOT NULL,
      referrer TEXT,
      session_id TEXT,
      user_agent TEXT,
      ip TEXT,
      country TEXT,
      country_code TEXT,
      region TEXT,
      city TEXT,
      latitude REAL,
      longitude REAL,
      timezone TEXT,
      isp TEXT,
      asn TEXT,
      created_at TEXT NOT NULL
    )
  `);

  await run('CREATE INDEX IF NOT EXISTS idx_page_views_created_at ON page_views(created_at)');
  await run('CREATE INDEX IF NOT EXISTS idx_page_views_session_id ON page_views(session_id)');
};

app.get('/api/health', (req, res) => {
  res.json({ ok: true });
});

app.post('/api/track/pageview', async (req, res) => {
  try {
    const page = req.body.page || '/';
    const referrer = req.body.referrer || 'direct';
    const sessionId = req.body.sessionId || null;
    const userAgent = req.body.userAgent || req.headers['user-agent'] || '';
    const ip = getClientIp(req);
    const now = new Date().toISOString();

    const geo = await getGeoData(ip);

    await run(
      `
      INSERT INTO page_views (
        page, referrer, session_id, user_agent, ip,
        country, country_code, region, city, latitude, longitude,
        timezone, isp, asn, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        page,
        referrer,
        sessionId,
        userAgent,
        ip,
        geo.country,
        geo.countryCode,
        geo.region,
        geo.city,
        geo.latitude,
        geo.longitude,
        geo.timezone,
        geo.isp,
        geo.asn,
        now
      ]
    );

    res.json({ ok: true });
  } catch (error) {
    console.error('track/pageview failed', error);
    res.status(500).json({ error: 'Failed to track page view' });
  }
});

app.get('/api/analytics/summary', requireDashboardKey, async (req, res) => {
  try {
    const days = Math.max(1, Math.min(30, Number(req.query.days || 7)));
    const sinceIso = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();

    const totals = await get(
      `
      SELECT
        COUNT(*) AS pageViews,
        COUNT(DISTINCT session_id) AS uniqueVisitors
      FROM page_views
      WHERE created_at >= ?
      `,
      [sinceIso]
    );

    const sessions = await all(
      `
      SELECT session_id, COUNT(*) AS viewCount,
             MIN(created_at) AS firstSeen,
             MAX(created_at) AS lastSeen
      FROM page_views
      WHERE created_at >= ? AND session_id IS NOT NULL
      GROUP BY session_id
      `,
      [sinceIso]
    );

    const avgSessionSeconds = sessions.length
      ? sessions.reduce((sum, s) => {
          const diff = (new Date(s.lastSeen) - new Date(s.firstSeen)) / 1000;
          return sum + Math.max(0, diff);
        }, 0) / sessions.length
      : 0;

    const bouncedSessions = sessions.filter((s) => Number(s.viewCount) <= 1).length;
    const bounceRate = sessions.length ? ((bouncedSessions / sessions.length) * 100).toFixed(1) : '0.0';

    const topPages = await all(
      `
      SELECT page, COUNT(*) AS views
      FROM page_views
      WHERE created_at >= ?
      GROUP BY page
      ORDER BY views DESC
      LIMIT 5
      `,
      [sinceIso]
    );

    const topCountries = await all(
      `
      SELECT country, COUNT(*) AS visitors
      FROM page_views
      WHERE created_at >= ?
      GROUP BY country
      ORDER BY visitors DESC
      LIMIT 5
      `,
      [sinceIso]
    );

    const uaRows = await all(
      'SELECT user_agent FROM page_views WHERE created_at >= ?',
      [sinceIso]
    );
    const deviceCount = { Desktop: 0, Mobile: 0, Tablet: 0 };
    uaRows.forEach((row) => {
      const key = classifyDevice(row.user_agent || '');
      deviceCount[key] += 1;
    });
    const deviceTotal = Object.values(deviceCount).reduce((a, b) => a + b, 0);
    const topDevices = Object.entries(deviceCount).map(([device, count]) => ({
      device,
      percentage: deviceTotal ? ((count / deviceTotal) * 100).toFixed(1) : '0.0'
    }));

    const recentVisitors = await all(
      `
      SELECT ip, city, region, country, country_code AS countryCode,
             latitude, longitude, timezone, isp, asn, user_agent AS userAgent,
             created_at AS timestamp
      FROM page_views
      WHERE created_at >= ?
      ORDER BY created_at DESC
      LIMIT 40
      `,
      [sinceIso]
    );

    const liveActivity = await all(
      `
      SELECT page, ip, created_at AS timestamp
      FROM page_views
      WHERE created_at >= ?
      ORDER BY created_at DESC
      LIMIT 12
      `,
      [sinceIso]
    );

    const payload = {
      pageViews: Number(totals.pageViews || 0),
      uniqueVisitors: Number(totals.uniqueVisitors || 0),
      sessions: sessions.length,
      bounceRate,
      avgSessionDuration: formatDuration(avgSessionSeconds),
      topPages: topPages.map((row) => ({ page: row.page, views: Number(row.views) })),
      topCountries: topCountries.map((row) => ({ country: row.country, visitors: Number(row.visitors) })),
      topDevices,
      realtimeUsers: Math.min(5, sessions.length),
      clickHeatmap: [],
      userJourneys: [],
      liveActivity: liveActivity.map((row) => ({
        type: 'pageview',
        page: row.page,
        ip: row.ip,
        timestamp: row.timestamp
      })),
      referralSources: [],
      searchTerms: [],
      visitorLocations: recentVisitors,
      recentVisitors
    };

    res.json(payload);
  } catch (error) {
    console.error('analytics/summary failed', error);
    res.status(500).json({ error: 'Failed to read analytics summary' });
  }
});

initDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Analytics API running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Failed to initialize DB', error);
    process.exit(1);
  });
