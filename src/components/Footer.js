import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
    return (
        <div id="footer" className='footer-container'>
            <div className='footer-content'>
                <div className='footer-section'>
                    <h3>Contact</h3>
                    <p className='footer-contact'>
                        <a href="mailto:jack@jacksunn.com">jack@jacksunn.com</a>
                    </p>
                    <div className='social-links'>
                        <a href="https://linkedin.com/in/jacksun815" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                        <a href="https://github.com/JackSun815" target="_blank" rel="noopener noreferrer">GitHub</a>
                    </div>
                </div>

                <div className='footer-section'>
                    <h3>Quick Links</h3>
                    <div className='footer-links'>
                        <Link to="/">Home</Link>
                        <Link to="/about">About</Link>
                        <Link to="/projects">Projects</Link>
                        <Link to="/resume">Resume</Link>
                        <Link to="/arts">Photography</Link>
                    </div>
                </div>

                <div className='footer-section'>
                    <h3>Projects</h3>
                    <div className='footer-links'>
                        <Link to="/project/pypeflow">PypeFlow ⭐</Link>
                        <Link to="/project/ribbit">Ribbit ⭐</Link>
                        <Link to="/arts#macbeth">Sand Painting</Link>
                    </div>
                </div>

                <div className='footer-section admin-section'>
                    <Link
                        to="/analytics"
                        className='admin-trigger'
                        title="Analytics Dashboard"
                        aria-label="Open analytics dashboard"
                    >
                        ⚙️
                    </Link>
                </div>
            </div>

            <div className='footer-bottom'>
                <p className='footer-copyright'>
                    © 2025 Jack Sun. Created with React.
                </p>
            </div>
        </div>
    );
}

export default Footer;
