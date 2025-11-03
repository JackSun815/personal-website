import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';
import './Navbar.css';
import { Button } from './Button';

function Navbar() {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);

    const handleClick = () => {
        setClick(!click);
    };

    const closeMobileMenu = () => setClick(false);

    const showButton = () => {
        if (window.innerWidth <= 960) {
            setButton(false);
        } else {
            setButton(true);
        }
    };

    useEffect(() => {
        showButton();
    }, []);

    // Register resize listener once and clean up on unmount to avoid duplicate listeners
    useEffect(() => {
        window.addEventListener('resize', showButton);
        return () => window.removeEventListener('resize', showButton);
    }, []);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (click) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        
        // Cleanup on unmount
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [click]);

    // Close menu when clicking outside (on the overlay)
    const handleOverlayClick = (e) => {
        if (e.target.classList.contains('nav-menu') && click) {
            closeMobileMenu();
        }
    };

    return (
        <>
            <nav className="navbar">
                <div className='navbar-container'>
                    <RouterLink to='/' className='navbar-logo' onClick={() => { closeMobileMenu(); scroll.scrollToTop(); }}>
                        Jack Sun <i className="far fa-sun"></i>
                    </RouterLink>
                    <div className='menu-icon' onClick={handleClick}>
                        <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                    </div>
                        
                    <ul className={click ? 'nav-menu active' : 'nav-menu'} onClick={handleOverlayClick}>
                        <li className='nav-item'>
                            <RouterLink to='/about' className='nav-links' onClick={closeMobileMenu}>
                                About
                            </RouterLink>
                        </li>
                        <li className='nav-item'>
                            <RouterLink to='/projects' className='nav-links' onClick={closeMobileMenu}>
                            Projects
                            </RouterLink>
                        </li>
                        <li className='nav-item'>
                            <RouterLink 
                                to='/resume' 
                                className='nav-links' 
                                onClick={closeMobileMenu}
                            >
                                Resume
                            </RouterLink>
                        </li>
                        <li className='nav-item'>
                            <RouterLink 
                                to='/arts' 
                                className='nav-links' 
                                onClick={closeMobileMenu}
                            >
                                Arts
                            </RouterLink>
                        </li>

                    </ul>
                    
                </div>
            </nav>
        </>
    );
}

export default Navbar;
