import React, { useState, useEffect } from 'react';
import './Analytics.css';
import { fetchAnalyticsSummary } from '../services/analyticsApi';

const Analytics = () => {
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
    recentVisitors: [],
    topRegions: []
  });
  const [realTimeData, setRealTimeData] = useState([]);
  const [loadingError, setLoadingError] = useState('');

  // Load analytics from backend with a 7-day window.
  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        const summary = await fetchAnalyticsSummary(7);
        if (!mounted) return;

        const recentVisitors = (summary.recentVisitors || []).map((visitor) => ({
          ...visitor,
          timeAgo: getTimeAgo(visitor.timestamp),
          location: `${visitor.city || 'Unknown City'}, ${visitor.region || 'Unknown Region'}, ${visitor.country || 'Unknown Country'}`,
          coordinates:
            visitor.latitude && visitor.longitude
              ? `${visitor.latitude}, ${visitor.longitude}`
              : 'Unknown'
        }));

        const visitorLocations = (summary.visitorLocations || []).map((loc) => ({
          ...loc,
          timeAgo: getTimeAgo(loc.timestamp)
        }));

        setAnalytics({
          pageViews: summary.pageViews || 0,
          uniqueVisitors: summary.uniqueVisitors || 0,
          sessions: summary.sessions || 0,
          bounceRate: summary.bounceRate || '0.0',
          avgSessionDuration: summary.avgSessionDuration || '0:00',
          topPages: summary.topPages || [],
          topCountries: summary.topCountries || [],
          topDevices: summary.topDevices || [],
          realtimeUsers: summary.realtimeUsers || 0,
          clickHeatmap: summary.clickHeatmap || [],
          userJourneys: summary.userJourneys || [],
          liveActivity: summary.liveActivity || [],
          referralSources: summary.referralSources || [],
          searchTerms: summary.searchTerms || [],
          visitorLocations,
          recentVisitors
        });
        setRealTimeData(summary.liveActivity || []);
        setLoadingError('');
      } catch (error) {
        if (!mounted) return;
        setLoadingError('Could not load backend analytics. Check API server and credentials.');
      }
    };

    load();
    const interval = setInterval(load, 15000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

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

  return (
    <div className="analytics-dashboard">
      {loadingError && (
        <div className="analytics-section">
          <p className="no-data">{loadingError}</p>
        </div>
      )}
      <div className="analytics-header">
        <h1>📊 Real-Time Analytics Dashboard</h1>
        <div className="header-actions">
          <span className="realtime-indicator">
            🟢 {analytics.realtimeUsers} active users
          </span>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="analytics-overview">
        <div className="stat-card">
          <h3>Page Views</h3>
          <div className="stat-number">{analytics.pageViews.toLocaleString()}</div>
          <div className="stat-label">Last 7 days</div>
        </div>
        <div className="stat-card">
          <h3>Unique Visitors</h3>
          <div className="stat-number">{analytics.uniqueVisitors.toLocaleString()}</div>
          <div className="stat-label">Last 7 days</div>
        </div>
        <div className="stat-card">
          <h3>Sessions</h3>
          <div className="stat-number">{analytics.sessions.toLocaleString()}</div>
          <div className="stat-label">Last 7 days</div>
        </div>
        <div className="stat-card">
          <h3>Bounce Rate</h3>
          <div className="stat-number">{analytics.bounceRate}%</div>
          <div className="stat-label">Last 7 days</div>
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
        <h3>👥 Recent Visitors & IP Tracking (Last 7 Days)</h3>
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
        <h3>🎯 Click Heatmap (Last 7 Days)</h3>
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
          <h3>📍 Top Areas (City/Region)</h3>
          <div className="data-table">
            {analytics.topRegions.length > 0 ? (
              analytics.topRegions.map((region, index) => (
                <div key={index} className="data-row">
                  <span className="data-label">{region.area}</span>
                  <span className="data-value">{region.visitors} visitors</span>
                </div>
              ))
            ) : (
              <p className="no-data">No area data yet</p>
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