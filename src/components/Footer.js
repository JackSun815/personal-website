import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
    const [showAnalyticsAccess, setShowAnalyticsAccess] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const ANALYTICS_PASSWORD = 'jacksun2024!';

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        if (password === ANALYTICS_PASSWORD) {
            setError('');
            window.location.href = '/analytics';
        } else {
            setError('Invalid password');
            setPassword('');
        }
    };

    const toggleAnalyticsAccess = () => {
        setShowAnalyticsAccess(!showAnalyticsAccess);
        setPassword('');
        setError('');
    };

    return (
        <div id="footer" className='footer-container'>
            <div className='footer-content'>
                <div className='footer-section'>
                    <h3>Contact</h3>
                    <p className='footer-contact'>
                        <a href="mailto:jack.sun121601@gmail.com">jack.sun121601@gmail.com</a>
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
                    <div 
                        className='admin-trigger'
                        onClick={toggleAnalyticsAccess}
                        title="Admin Access"
                    >
                        ⚙️
                    </div>
                    
                    {showAnalyticsAccess && (
                        <div className='analytics-access'>
                            <h4>Analytics Access</h4>
                            <form onSubmit={handlePasswordSubmit}>
                                <input
                                    type="password"
                                    placeholder="Enter password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className='password-input'
                                />
                                <button type="submit" className='access-btn'>Access</button>
                            </form>
                            {error && <p className='error-message'>{error}</p>}
                        </div>
                    )}
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
