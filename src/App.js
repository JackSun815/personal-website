import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/pages/Home';
import Cards from './components/Cards';
import About from './components/About';
import ProjectDetails from './components/ProjectDetails';
import Resume from './components/pages/Resume';
import Arts from './components/pages/Arts';
import HeyJack from './components/pages/HeyJack';
import Footer from './components/Footer';
import Analytics from './components/Analytics';
import { getSessionId, trackServerPageView } from './services/analyticsApi';

function App() {
  const location = useLocation();

  // Track page views on the backend so data is shared across all visitors.
  useEffect(() => {
    trackPageView();
  }, [location.pathname]);

  const trackPageView = () => {
    const pageData = {
      page: location.pathname,
      userAgent: navigator.userAgent,
      referrer: document.referrer || 'direct'
    };

    trackServerPageView(pageData);
    
    // Track with Google Analytics too
    if (window.gtag) {
      const sessionId = getSessionId();
      window.gtag('event', 'page_view', {
        page_title: document.title,
        page_location: window.location.href,
        custom_parameter: sessionId
      });
    }
  };

  return (
    <>
      {location.pathname !== '/arts' && location.pathname !== '/analytics' && location.pathname !== '/heyjack' && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Cards />} />
        <Route path="/project/:id" element={<ProjectDetails />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/arts" element={<Arts />} />
  {/* Sandpainting moved into the Arts page as a section (anchor #macbeth) */}
        <Route path="/heyjack" element={<HeyJack />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
    </>
  );
}

export default App;