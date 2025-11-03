import React, { useState, useEffect } from 'react';
import './Analytics.css';

const Analytics = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [analytics, setAnalytics] = useState({
    pageViews: 0,
    uniqueVisitors: 0,
    sessions: 0,
    bounceRate: 0,
    avgSessionDuration: '0:00',
    topPages: [],
    topCountries: [],
    topDevices: [],
    realtimeUsers: 0,
    clickHeatmap: [],
    userJourneys: [],
    liveActivity: [],
    referralSources: [],
    searchTerms: [],
    visitorLocations: [],
    recentVisitors: []
  });
  const [realTimeData, setRealTimeData] = useState([]);

  // Simple password protection
  const ANALYTICS_PASSWORD = 'jacksun2024!';

  // Initialize analytics tracking
  useEffect(() => {
    if (typeof window !== 'undefined') {
      initializeTracking();
      loadStoredAnalytics();
      
      // Set up real-time data refresh
      const interval = setInterval(() => {
        loadStoredAnalytics();
      }, 5000); // Refresh every 5 seconds

      return () => clearInterval(interval);
    }
  }, []);

  const initializeTracking = () => {
    // Track page views
    trackPageView();
    
    // Track clicks
    document.addEventListener('click', trackClick);
    
    // Track scroll behavior
    let scrollDepth = 0;
    window.addEventListener('scroll', () => {
      const currentScroll = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
      if (currentScroll > scrollDepth) {
        scrollDepth = currentScroll;
        trackScrollDepth(scrollDepth);
      }
    });

    // Track time on page
    const startTime = Date.now();
    window.addEventListener('beforeunload', () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      trackTimeOnPage(timeSpent);
    });

    // Get user location (IP-based)
    getUserLocation();
  };

  const trackPageView = () => {
    const pageData = {
      page: window.location.pathname,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      referrer: document.referrer || 'direct',
      screenResolution: `${window.screen.width}x${window.screen.height}`,
      viewportSize: `${window.innerWidth}x${window.innerHeight}`,
      sessionId: getSessionId()
    };

    saveAnalyticsData('pageViews', pageData);
    
    // Track with Google Analytics too
    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: document.title,
        page_location: window.location.href,
        custom_parameter: pageData.sessionId
      });
    }
  };

  const trackClick = (event) => {
    const clickData = {
      x: event.clientX,
      y: event.clientY,
      element: event.target.tagName,
      className: event.target.className,
      text: event.target.textContent?.substring(0, 50),
      page: window.location.pathname,
      timestamp: new Date().toISOString(),
      sessionId: getSessionId()
    };

    saveAnalyticsData('clicks', clickData);
  };

  const trackScrollDepth = (depth) => {
    const scrollData = {
      depth: depth,
      page: window.location.pathname,
      timestamp: new Date().toISOString(),
      sessionId: getSessionId()
    };

    saveAnalyticsData('scrollDepth', scrollData);
  };

  const trackTimeOnPage = (timeSpent) => {
    const timeData = {
      timeSpent: timeSpent,
      page: window.location.pathname,
      timestamp: new Date().toISOString(),
      sessionId: getSessionId()
    };

    saveAnalyticsData('timeOnPage', timeData);
  };

  const getUserLocation = async () => {
    try {
      // Try multiple geolocation services for better accuracy
      let locationData = null;
      
      // First, try ipapi.co (most accurate)
      try {
        const response1 = await fetch('https://ipapi.co/json/');
        const data1 = await response1.json();
        if (data1.latitude && data1.longitude && data1.latitude !== 0 && data1.longitude !== 0) {
          locationData = data1;
          console.log('Using ipapi.co location data:', data1);
        }
      } catch (error) {
        console.log('ipapi.co failed, trying backup service');
      }
      
      // Backup: try ip-api.com if first service fails or gives invalid coordinates
      if (!locationData) {
        try {
          const response2 = await fetch('http://ip-api.com/json/');
          const data2 = await response2.json();
          if (data2.lat && data2.lon && data2.lat !== 0 && data2.lon !== 0) {
            locationData = {
              country_name: data2.country,
              country_code: data2.countryCode,
              city: data2.city,
              region: data2.regionName,
              region_code: data2.region,
              postal: data2.zip,
              latitude: data2.lat,
              longitude: data2.lon,
              timezone: data2.timezone,
              ip: data2.query,
              org: data2.isp,
              asn: data2.as
            };
            console.log('Using ip-api.com location data:', locationData);
          }
        } catch (error) {
          console.log('ip-api.com also failed');
        }
      }
      
      // If we have valid location data
      if (locationData && locationData.latitude && locationData.longitude) {
        const geoData = {
          country: locationData.country_name,
          countryCode: locationData.country_code,
          city: locationData.city,
          region: locationData.region,
          regionCode: locationData.region_code,
          postalCode: locationData.postal,
          latitude: parseFloat(locationData.latitude),
          longitude: parseFloat(locationData.longitude),
          timezone: locationData.timezone,
          utcOffset: locationData.utc_offset,
          ip: locationData.ip,
          isp: locationData.org,
          asn: locationData.asn,
          timestamp: new Date().toISOString(),
          sessionId: getSessionId(),
          userAgent: navigator.userAgent,
          language: navigator.language,
          accuracy: 'ip-based' // Mark as IP-based for reference
        };

        console.log('Final geoData to be saved:', geoData);
        saveAnalyticsData('locations', geoData);
      } else {
        console.log('No valid location data received from any service');
        
        // Save a fallback entry with unknown location but other data
        const fallbackData = {
          country: 'Unknown',
          countryCode: 'XX',
          city: 'Unknown',
          region: 'Unknown',
          latitude: null,
          longitude: null,
          ip: 'Unknown',
          timestamp: new Date().toISOString(),
          sessionId: getSessionId(),
          userAgent: navigator.userAgent,
          language: navigator.language,
          accuracy: 'unavailable'
        };
        
        saveAnalyticsData('locations', fallbackData);
      }
    } catch (error) {
      console.error('Error getting location data:', error);
    }
  };

  const getSessionId = () => {
    let sessionId = localStorage.getItem('analyticsSessionId');
    if (!sessionId) {
      sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('analyticsSessionId', sessionId);
    }
    return sessionId;
  };

  const saveAnalyticsData = (type, data) => {
    const existingData = JSON.parse(localStorage.getItem(`analytics_${type}`) || '[]');
    existingData.push(data);
    
    // Keep only last 1000 entries to prevent storage overflow
    if (existingData.length > 1000) {
      existingData.splice(0, existingData.length - 1000);
    }
    
    localStorage.setItem(`analytics_${type}`, JSON.stringify(existingData));
  };

  const loadStoredAnalytics = () => {
    const pageViews = JSON.parse(localStorage.getItem('analytics_pageViews') || '[]');
    const clicks = JSON.parse(localStorage.getItem('analytics_clicks') || '[]');
    const locations = JSON.parse(localStorage.getItem('analytics_locations') || '[]');
    const timeOnPage = JSON.parse(localStorage.getItem('analytics_timeOnPage') || '[]');
    const scrollDepth = JSON.parse(localStorage.getItem('analytics_scrollDepth') || '[]');

    // Process data for analytics
    const now = new Date();
    const last24Hours = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    
    // Filter recent data
    const recentPageViews = pageViews.filter(pv => new Date(pv.timestamp) > last24Hours);
    const recentClicks = clicks.filter(c => new Date(c.timestamp) > last24Hours);
    const recentLocations = locations.filter(l => new Date(l.timestamp) > last24Hours);

    // Calculate unique visitors
    const uniqueVisitors = new Set(recentPageViews.map(pv => pv.sessionId)).size;

    // Calculate top pages
    const pageCount = {};
    recentPageViews.forEach(pv => {
      pageCount[pv.page] = (pageCount[pv.page] || 0) + 1;
    });
    const topPages = Object.entries(pageCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([page, views]) => ({ page, views }));

    // Calculate top countries
    const countryCount = {};
    recentLocations.forEach(loc => {
      if (loc.country) {
        countryCount[loc.country] = (countryCount[loc.country] || 0) + 1;
      }
    });
    const topCountries = Object.entries(countryCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([country, visitors]) => ({ country, visitors }));

    // Calculate device types
    const deviceCount = { Desktop: 0, Mobile: 0, Tablet: 0 };
    recentPageViews.forEach(pv => {
      if (pv.userAgent) {
        if (/Mobile|Android|iPhone/.test(pv.userAgent)) {
          deviceCount.Mobile++;
        } else if (/iPad/.test(pv.userAgent)) {
          deviceCount.Tablet++;
        } else {
          deviceCount.Desktop++;
        }
      }
    });
    const totalDevices = Object.values(deviceCount).reduce((a, b) => a + b, 0);
    const topDevices = Object.entries(deviceCount)
      .map(([device, count]) => ({ 
        device, 
        percentage: totalDevices > 0 ? ((count / totalDevices) * 100).toFixed(1) : '0.0'
      }));

    // Calculate average session duration
    const avgDuration = timeOnPage.length > 0 
      ? Math.round(timeOnPage.reduce((sum, t) => sum + t.timeSpent, 0) / timeOnPage.length)
      : 0;
    const avgSessionDuration = `${Math.floor(avgDuration / 60)}:${(avgDuration % 60).toString().padStart(2, '0')}`;

    // Get recent activity for live feed
    const allActivity = [
      ...recentPageViews.map(pv => ({ ...pv, type: 'pageview' })),
      ...recentClicks.map(c => ({ ...c, type: 'click' }))
    ].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).slice(0, 10);

    // Create click heatmap data
    const heatmapData = recentClicks.map(click => ({
      x: click.x,
      y: click.y,
      page: click.page,
      element: click.element,
      timestamp: click.timestamp
    }));

    // Process visitor locations for map
    const visitorLocations = recentLocations.map(loc => ({
      ...loc,
      timeAgo: getTimeAgo(loc.timestamp)
    }));

    // Get recent visitors with detailed info
    const recentVisitors = recentLocations
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, 20)
      .map(visitor => ({
        ...visitor,
        timeAgo: getTimeAgo(visitor.timestamp),
        location: `${visitor.city || 'Unknown City'}, ${visitor.region || 'Unknown Region'}, ${visitor.country || 'Unknown Country'}`,
        coordinates: visitor.latitude && visitor.longitude ? `${visitor.latitude}, ${visitor.longitude}` : 'Unknown'
      }));

    setAnalytics({
      pageViews: recentPageViews.length,
      uniqueVisitors: uniqueVisitors,
      sessions: uniqueVisitors, // Approximation
      bounceRate: uniqueVisitors > 0 ? ((uniqueVisitors - Math.min(uniqueVisitors, topPages.reduce((sum, p) => sum + p.views, 0))) / uniqueVisitors * 100).toFixed(1) : '0.0',
      avgSessionDuration: avgSessionDuration,
      topPages: topPages,
      topCountries: topCountries,
      topDevices: topDevices,
      realtimeUsers: Math.min(5, uniqueVisitors), // Active users approximation
      clickHeatmap: heatmapData,
      liveActivity: allActivity,
      referralSources: recentPageViews.map(pv => pv.referrer).filter(r => r !== 'direct').slice(0, 5),
      searchTerms: [], // Would need search tracking implementation
      visitorLocations: visitorLocations,
      recentVisitors: recentVisitors
    });

    setRealTimeData(allActivity);
  };

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const past = new Date(timestamp);
    const diffInSeconds = Math.floor((now - past) / 1000);
    
    if (diffInSeconds < 60) {
      return `${diffInSeconds} seconds ago`;
    } else if (diffInSeconds < 3600) {
      return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    } else if (diffInSeconds < 86400) {
      return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    } else {
      return `${Math.floor(diffInSeconds / 86400)} days ago`;
    }
  };

  const WorldMap = () => {
    const mapRef = React.useRef(null);
    const [map, setMap] = React.useState(null);

    React.useEffect(() => {
      if (mapRef.current && !map && window.L) {
        // Initialize the map
        const leafletMap = window.L.map(mapRef.current).setView([20, 0], 2);
        
        // Add tile layer (OpenStreetMap)
        window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
          maxZoom: 18,
        }).addTo(leafletMap);

        setMap(leafletMap);
      }
    }, [map]);

    React.useEffect(() => {
      if (map && analytics.visitorLocations) {
        // Clear existing markers
        map.eachLayer((layer) => {
          if (layer instanceof window.L.Marker) {
            map.removeLayer(layer);
          }
        });

        // Add markers for each visitor with valid coordinates
        let validLocations = 0;
        analytics.visitorLocations.forEach((visitor, index) => {
          // Validate coordinates
          const lat = parseFloat(visitor.latitude);
          const lng = parseFloat(visitor.longitude);
          
          console.log(`Visitor ${index}:`, {
            original: { lat: visitor.latitude, lng: visitor.longitude },
            parsed: { lat, lng },
            valid: !isNaN(lat) && !isNaN(lng) && lat !== 0 && lng !== 0,
            location: `${visitor.city}, ${visitor.country}`
          });

          if (!isNaN(lat) && !isNaN(lng) && lat !== 0 && lng !== 0 && lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
            validLocations++;
            
            const marker = window.L.marker([lat, lng])
              .addTo(map)
              .bindPopup(`
                <div style="font-family: Arial, sans-serif; min-width: 250px;">
                  <h4 style="margin: 0 0 10px 0; color: #2c3e50;">🌍 Visitor #${index + 1}</h4>
                  <p style="margin: 5px 0;"><strong>📍 Location:</strong> ${visitor.city || 'Unknown'}, ${visitor.country || 'Unknown'}</p>
                  <p style="margin: 5px 0;"><strong>� Coordinates:</strong> ${lat.toFixed(4)}, ${lng.toFixed(4)}</p>
                  <p style="margin: 5px 0;"><strong>�🌐 IP:</strong> ${visitor.ip || 'Unknown'}</p>
                  <p style="margin: 5px 0;"><strong>🏢 ISP:</strong> ${visitor.isp || 'Unknown'}</p>
                  <p style="margin: 5px 0;"><strong>⏰ Time:</strong> ${visitor.timeAgo || 'Unknown'}</p>
                  <p style="margin: 5px 0;"><strong>🕐 Timezone:</strong> ${visitor.timezone || 'Unknown'}</p>
                  <p style="margin: 5px 0; font-size: 11px; color: #666;"><strong>🔍 Accuracy:</strong> ${visitor.accuracy || 'IP-based'}</p>
                </div>
              `);

            // Custom red pulsing icon
            const pulsingIcon = window.L.divIcon({
              className: 'pulsing-marker',
              html: `<div style="
                width: 16px; 
                height: 16px; 
                background: #ff4757; 
                border: 3px solid white; 
                border-radius: 50%; 
                box-shadow: 0 0 15px rgba(255, 71, 87, 0.8);
              "></div>`,
              iconSize: [22, 22],
              iconAnchor: [11, 11]
            });

            marker.setIcon(pulsingIcon);
            
            // If this is the most recent visitor, auto-open popup and center map
            if (index === 0 && analytics.visitorLocations.length > 0) {
              map.setView([lat, lng], 8);
              marker.openPopup();
            }
          } else {
            console.warn(`Invalid coordinates for visitor ${index}:`, { lat, lng, visitor });
          }
        });

        console.log(`Added ${validLocations} valid markers out of ${analytics.visitorLocations.length} visitors`);
      }
    }, [map, analytics.visitorLocations]);

    return (
      <div style={{ position: 'relative' }}>
        <div 
          ref={mapRef} 
          style={{ 
            height: '450px', 
            width: '100%', 
            borderRadius: '10px',
            border: '1px solid rgba(115, 232, 238, 0.3)',
            overflow: 'hidden'
          }} 
        />
        <div style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          background: 'rgba(255, 255, 255, 0.95)',
          padding: '8px 12px',
          borderRadius: '6px',
          fontSize: '12px',
          fontWeight: 'bold',
          color: '#2c3e50',
          zIndex: 1000,
          border: '1px solid #dee2e6'
        }}>
          🌍 Visitors: {analytics.visitorLocations.filter(v => v.latitude && v.longitude && !isNaN(parseFloat(v.latitude)) && !isNaN(parseFloat(v.longitude))).length} mapped
          <br />
          📊 Total: {analytics.visitorLocations.length} tracked
          <br />
          <span style={{ fontSize: '10px', color: '#6c757d' }}>
            Click markers for details
          </span>
        </div>
        {analytics.visitorLocations.length === 0 && (
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'rgba(255, 255, 255, 0.95)',
            padding: '20px',
            borderRadius: '10px',
            textAlign: 'center',
            color: '#6c757d',
            zIndex: 1000,
            border: '2px dashed #dee2e6'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '10px' }}>🗺️</div>
            <p style={{ margin: 0, fontWeight: '500' }}>No visitor locations yet</p>
            <p style={{ margin: '5px 0 0 0', fontSize: '12px' }}>Visit pages to see live tracking!</p>
          </div>
        )}
      </div>
    );
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ANALYTICS_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
      localStorage.setItem('analytics_auth', 'true');
      loadStoredAnalytics();
    } else {
      setError('Invalid password');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('analytics_auth');
    setPassword('');
  };

  useEffect(() => {
    const isAuth = localStorage.getItem('analytics_auth');
    if (isAuth === 'true') {
      setIsAuthenticated(true);
      loadStoredAnalytics();
    }
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="analytics-login">
        <div className="login-container">
          <h2>🔒 Real-Time Analytics Dashboard</h2>
          <p>Enter password to access live user tracking</p>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="password-input"
            />
            <button type="submit" className="login-btn">Access Analytics</button>
          </form>
          {error && <p className="error">{error}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="analytics-dashboard">
      <div className="analytics-header">
        <h1>📊 Real-Time Analytics Dashboard</h1>
        <div className="header-actions">
          <span className="realtime-indicator">
            🟢 {analytics.realtimeUsers} active users
          </span>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="analytics-overview">
        <div className="stat-card">
          <h3>Page Views</h3>
          <div className="stat-number">{analytics.pageViews.toLocaleString()}</div>
          <div className="stat-label">Last 24 hours</div>
        </div>
        <div className="stat-card">
          <h3>Unique Visitors</h3>
          <div className="stat-number">{analytics.uniqueVisitors.toLocaleString()}</div>
          <div className="stat-label">Last 24 hours</div>
        </div>
        <div className="stat-card">
          <h3>Sessions</h3>
          <div className="stat-number">{analytics.sessions.toLocaleString()}</div>
          <div className="stat-label">Last 24 hours</div>
        </div>
        <div className="stat-card">
          <h3>Bounce Rate</h3>
          <div className="stat-number">{analytics.bounceRate}%</div>
          <div className="stat-label">Last 24 hours</div>
        </div>
        <div className="stat-card">
          <h3>Avg. Session</h3>
          <div className="stat-number">{analytics.avgSessionDuration}</div>
          <div className="stat-label">Duration</div>
        </div>
      </div>

      {/* Real-time World Map */}
      <div className="analytics-section">
        <h3>🌍 Real-Time Visitor Map</h3>
        <WorldMap />
      </div>

      {/* Recent Visitors with IP Details */}
      <div className="analytics-section">
        <h3>👥 Recent Visitors & IP Tracking</h3>
        <div className="visitor-list">
          {analytics.recentVisitors.length > 0 ? (
            <div className="visitor-table">
              <div className="visitor-header">
                <span>IP Address</span>
                <span>Location</span>
                <span>ISP/Organization</span>
                <span>Device</span>
                <span>Time</span>
              </div>
              {analytics.recentVisitors.map((visitor, index) => (
                <div key={index} className="visitor-row">
                  <span className="visitor-ip" title={visitor.coordinates}>
                    {visitor.ip || 'Unknown IP'}
                  </span>
                  <span className="visitor-location">
                    🏙️ {visitor.city || 'Unknown'}, {visitor.region || 'Unknown'}
                    <br />
                    🌍 {visitor.country || 'Unknown'} ({visitor.countryCode || '??'})
                    {visitor.postalCode && <><br />📮 {visitor.postalCode}</>}
                  </span>
                  <span className="visitor-isp">
                    🏢 {visitor.isp || 'Unknown ISP'}
                    {visitor.asn && <><br />🔗 ASN: {visitor.asn}</>}
                  </span>
                  <span className="visitor-device">
                    {visitor.userAgent && visitor.userAgent.includes('Mobile') ? '📱' : 
                     visitor.userAgent && visitor.userAgent.includes('iPad') ? '📊' : '💻'}
                    <br />
                    🌐 {visitor.language || 'Unknown'}
                  </span>
                  <span className="visitor-time">
                    ⏰ {visitor.timeAgo}
                    <br />
                    🕐 {visitor.timezone || 'Unknown TZ'}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-data">No visitor data yet. Visit different pages to see tracking!</p>
          )}
        </div>
      </div>

      {/* Real-time Activity Feed */}
      <div className="analytics-section">
        <h3>🔴 Live Activity Feed</h3>
        <div className="live-activity">
          {realTimeData.length > 0 ? (
            realTimeData.map((activity, index) => (
              <div key={index} className="activity-item">
                <span className="activity-time">
                  {new Date(activity.timestamp).toLocaleTimeString()}
                </span>
                <span className="activity-type">
                  {activity.type === 'pageview' ? '👁️' : '🖱️'}
                </span>
                <span className="activity-description">
                  {activity.type === 'pageview' 
                    ? `Page view: ${activity.page}` 
                    : `Click on ${activity.element}: "${activity.text?.substring(0, 30)}..."`
                  }
                </span>
              </div>
            ))
          ) : (
            <p className="no-data">No recent activity. Navigate around the site to see live tracking!</p>
          )}
        </div>
      </div>

      {/* Click Heatmap */}
      <div className="analytics-section">
        <h3>🎯 Click Heatmap (Last 24 Hours)</h3>
        <div className="heatmap-container">
          {analytics.clickHeatmap.length > 0 ? (
            <div className="heatmap-data">
              {analytics.clickHeatmap.map((click, index) => (
                <div key={index} className="click-point">
                  <strong>Page:</strong> {click.page} | 
                  <strong> Position:</strong> ({click.x}, {click.y}) | 
                  <strong> Element:</strong> {click.element} |
                  <strong> Time:</strong> {new Date(click.timestamp).toLocaleTimeString()}
                </div>
              ))}
            </div>
          ) : (
            <p className="no-data">No click data yet. Click around the site to see tracking!</p>
          )}
        </div>
      </div>

      {/* Detailed Analytics */}
      <div className="analytics-details">
        <div className="analytics-section">
          <h3>📄 Top Pages</h3>
          <div className="data-table">
            {analytics.topPages.length > 0 ? (
              analytics.topPages.map((page, index) => (
                <div key={index} className="data-row">
                  <span className="data-label">{page.page}</span>
                  <span className="data-value">{page.views} views</span>
                </div>
              ))
            ) : (
              <p className="no-data">No page data yet</p>
            )}
          </div>
        </div>

        <div className="analytics-section">
          <h3>🌍 Top Countries</h3>
          <div className="data-table">
            {analytics.topCountries.length > 0 ? (
              analytics.topCountries.map((country, index) => (
                <div key={index} className="data-row">
                  <span className="data-label">{country.country}</span>
                  <span className="data-value">{country.visitors} visitors</span>
                </div>
              ))
            ) : (
              <p className="no-data">No location data yet</p>
            )}
          </div>
        </div>

        <div className="analytics-section">
          <h3>📱 Device Types</h3>
          <div className="data-table">
            {analytics.topDevices.map((device, index) => (
              <div key={index} className="data-row">
                <span className="data-label">{device.device}</span>
                <span className="data-value">{device.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Status */}
      <div className="analytics-instructions">
        <h3>📊 Analytics Status</h3>
        <div className="instruction-box">
          <p><strong>✅ Real-Time Tracking Active!</strong></p>
          <ul>
            <li><strong>📊 Data Collection:</strong> Page views, clicks, scroll depth, time on page</li>
            <li><strong>🌍 Location Tracking:</strong> IP-based geolocation</li>
            <li><strong>📱 Device Detection:</strong> Mobile, tablet, desktop classification</li>
            <li><strong>🔄 Live Updates:</strong> Dashboard refreshes every 5 seconds</li>
            <li><strong>💾 Data Storage:</strong> Local browser storage (last 1000 events)</li>
          </ul>
          <p><strong>Note:</strong> This tracks real user behavior in real-time. Navigate around your site to see live data!</p>
        </div>
      </div>
    </div>
  );
};

export default Analytics;