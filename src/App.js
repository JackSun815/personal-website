import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/pages/Home';
import Cards from './components/Cards';
import About from './components/About';
import ProjectDetails from './components/ProjectDetails';
import Resume from './components/pages/Resume';
import Arts from './components/pages/Arts';
import Footer from './components/Footer';
import Sandpainting from './components/Sandpainting';

function App() {
  const location = useLocation();

  return (
    <>
      {location.pathname !== '/arts' && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Cards />} />
        <Route path="/project/:id" element={<ProjectDetails />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/arts" element={<Arts />} />
        <Route path="/sandpainting" element={<Sandpainting />} />
        <Route path="/footer" element={<Footer />} />
      </Routes>
    </>
  );
}

export default App;
