import React, { useState, useEffect, useRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';
import './Navbar.css';
import { Button } from './Button';

function Navbar() {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);
    const canvasRef = useRef(null);
    const animationRef = useRef(null);
    const constellationsRef = useRef([]);

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

    // Constellation animation for mobile menu
    useEffect(() => {
        if (!click || window.innerWidth > 960) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const constellationTypes = [
            { color: { r: 255, g: 200, b: 100 }, stars: [[0, 0], [0.5, -0.8], [1, -1.3], [1.5, -1]] },
            { color: { r: 200, g: 150, b: 255 }, stars: [[0, 0], [0.7, 0.3], [1.3, 0], [2, -0.5]] },
            { color: { r: 100, g: 200, b: 255 }, stars: [[0, 0], [0.8, 0.5], [1.6, 0]] },
            { color: { r: 255, g: 150, b: 200 }, stars: [[0, 0], [0.7, 0.8], [1.3, 0.3], [2, 1]] }
        ];

        constellationsRef.current = [];
        for (let i = 0; i < 6; i++) {
            const typeData = constellationTypes[Math.floor(Math.random() * constellationTypes.length)];
            constellationsRef.current.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                color: typeData.color,
                stars: typeData.stars,
                scale: 30 + Math.random() * 20,
                opacity: 0.4 + Math.random() * 0.3,
                rotation: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.002
            });
        }

        const drawConstellation = (constellation) => {
            ctx.save();
            ctx.globalAlpha = constellation.opacity;
            ctx.translate(constellation.x, constellation.y);
            ctx.rotate(constellation.rotation);

            const { stars, scale, color } = constellation;

            stars.forEach((star, index) => {
                const x = star[0] * scale;
                const y = star[1] * scale;
                const time = Date.now() * 0.001;
                const pulse = 1 + Math.sin(time * 2 + index) * 0.1;

                ctx.beginPath();
                ctx.arc(x, y, 3 * pulse, 0, 2 * Math.PI);
                ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${constellation.opacity * 0.5})`;
                ctx.fill();

                ctx.beginPath();
                ctx.arc(x, y, 1.5 * pulse, 0, 2 * Math.PI);
                ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${constellation.opacity})`;
                ctx.fill();
            });

            ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${constellation.opacity * 0.4})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            for (let i = 0; i < stars.length - 1; i++) {
                const x1 = stars[i][0] * scale;
                const y1 = stars[i][1] * scale;
                const x2 = stars[i + 1][0] * scale;
                const y2 = stars[i + 1][1] * scale;
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
            }
            ctx.stroke();

            ctx.restore();
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            constellationsRef.current.forEach(constellation => {
                constellation.x += constellation.vx;
                constellation.y += constellation.vy;
                constellation.rotation += constellation.rotationSpeed;

                if (constellation.x < -100) constellation.x = canvas.width + 100;
                if (constellation.x > canvas.width + 100) constellation.x = -100;
                if (constellation.y < -100) constellation.y = canvas.height + 100;
                if (constellation.y > canvas.height + 100) constellation.y = -100;

                drawConstellation(constellation);
            });

            animationRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [click]);

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
                        {click && <canvas ref={canvasRef} className="nav-menu-canvas" />}
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
