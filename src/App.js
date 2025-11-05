import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/pages/Home';
import Cards from './components/Cards';
import About from './components/About';
import ProjectDetails from './components/ProjectDetails';
import Resume from './components/pages/Resume';
import Arts from './components/pages/Arts';
import Footer from './components/Footer';
import Analytics from './components/Analytics';

function App() {
  const location = useLocation();

  // Global analytics tracking
  useEffect(() => {
    // Only track if not on analytics page to avoid recursive tracking
    if (location.pathname !== '/analytics') {
      initializeGlobalTracking();
    }
  }, [location.pathname]);

  const initializeGlobalTracking = () => {
    // Track page views
    trackPageView();
    
    // Track clicks
    const handleClick = (event) => {
      trackClick(event);
    };
    
    // Track scroll behavior
    let scrollDepth = 0;
    const handleScroll = () => {
      const currentScroll = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
      if (currentScroll > scrollDepth && currentScroll <= 100) {
        scrollDepth = currentScroll;
        trackScrollDepth(scrollDepth);
      }
    };

    // Add event listeners
    document.addEventListener('click', handleClick);
    window.addEventListener('scroll', handleScroll);

    // Track time on page
    const startTime = Date.now();
    const handleBeforeUnload = () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      trackTimeOnPage(timeSpent);
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Get user location (IP-based)
    getUserLocation();

    // Cleanup function
    return () => {
      document.removeEventListener('click', handleClick);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  };

  const trackPageView = () => {
    const pageData = {
      page: location.pathname,
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
      page: location.pathname,
      timestamp: new Date().toISOString(),
      sessionId: getSessionId()
    };

    saveAnalyticsData('clicks', clickData);
  };

  const trackScrollDepth = (depth) => {
    const scrollData = {
      depth: depth,
      page: location.pathname,
      timestamp: new Date().toISOString(),
      sessionId: getSessionId()
    };

    saveAnalyticsData('scrollDepth', scrollData);
  };

  const trackTimeOnPage = (timeSpent) => {
    const timeData = {
      timeSpent: timeSpent,
      page: location.pathname,
      timestamp: new Date().toISOString(),
      sessionId: getSessionId()
    };

    saveAnalyticsData('timeOnPage', timeData);
  };

  const getUserLocation = async () => {
    try {
      // Check if we already have location data for this session
      const existingLocations = JSON.parse(localStorage.getItem('analytics_locations') || '[]');
      const currentSessionId = getSessionId();
      const hasLocationForSession = existingLocations.some(loc => loc.sessionId === currentSessionId);
      
      if (!hasLocationForSession) {
        // Try multiple geolocation services for better accuracy
        let locationData = null;
        
        // First, try ipapi.co (most accurate)
        try {
          const response1 = await fetch('https://ipapi.co/json/');
          const data1 = await response1.json();
          if (data1.latitude && data1.longitude && data1.latitude !== 0 && data1.longitude !== 0) {
            locationData = data1;
          }
        } catch (error) {
          console.log('ipapi.co failed, trying backup service');
        }
        
        // Backup: try ip-api.com if first service fails
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
            }
          } catch (error) {
            console.log('ip-api.com also failed');
          }
        }
        
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
            sessionId: currentSessionId,
            userAgent: navigator.userAgent,
            language: navigator.language,
            accuracy: 'ip-based'
          };

          saveAnalyticsData('locations', geoData);
        }
      }
    } catch (error) {
      console.log('Could not get location data');
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

  return (
    <>
      {location.pathname !== '/arts' && location.pathname !== '/analytics' && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Cards />} />
        <Route path="/project/:id" element={<ProjectDetails />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/arts" element={<Arts />} />
  {/* Sandpainting moved into the Arts page as a section (anchor #macbeth) */}
        <Route path="/footer" element={<Footer />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
    </>
  );
}

export default App;