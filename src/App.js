import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/pages/Home';
import Cards from './components/Cards';
import About from './components/About';
import ProjectDetails from './components/ProjectDetails';
import Resume from './components/pages/Resume'; // Import the Resume component

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Cards />} />
          <Route path="/project/:id" element={<ProjectDetails />} />
          <Route path="/resume" element={<Resume />} /> 
        </Routes>
      </Router>
    </>
  );
}

export default App;
