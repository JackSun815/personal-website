import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import './Navbar.css';
import { Button } from './Button';
import logoImage from '../images/logo.png';


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

    window.addEventListener('resize', showButton);

    return (
        <>
            <nav className="navbar">
                <div className='navbar-container'>
                    <RouterLink to='/' className='navbar-logo' onClick={closeMobileMenu}>
                        Jack Sun <i className="far fa-sun"></i>
                    </RouterLink>
                    <div className='menu-icon' onClick={handleClick}>
                        <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                    </div>
                        
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
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
                                to='/contact' 
                                className='nav-links-mobile' 
                                onClick={closeMobileMenu}
                            >
                                Contact
                            </RouterLink>
                        </li>
                    </ul>
                    {button && <Button buttonStyle='btn--outline' button>Contact</Button>}
                </div>
            </nav>
        </>
    );
}

export default Navbar;