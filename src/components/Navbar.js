import React,{useState, useEffect} from 'react'
import {Link} from 'react-router-dom';
import './Navbar.css';
import {Button} from './Button';
import logoImage from '../images/logo.png'; 


function Navbar() {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);
    const [isImage, setIsImage] = useState(false);


    const handleClick = () => {
        setClick(!click);
        setIsImage(!isImage);
      };
    const closeMobileMenu = () => setClick(false);

    const showButton = () => {
        if(window.innerWidth <= 960){
            setButton(false);
        } else{
            setButton(true);
        }
    };

    useEffect(() => {
        showButton();
    });

    window.addEventListener('resize', showButton);


  return (
   <>
    <nav className="navbar">
        <div className='navbar-container'>
            <Link to='/' className='navbar-logo'>
                {isImage ? (
                <img src={logoImage} alt="Logo" />
                ) : (
                <>Jack Sun <i className="far fa-sun"></i></>
                )}
            </Link>
            <div className='menu-icon' onClick={handleClick}>
                <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
            </div>
                
            <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                <li className='nav-item'>
                    <Link to='/about' className='nav-links' onClick={closeMobileMenu}> About
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link to='/projects' className='nav-links' onClick={closeMobileMenu}> Projects
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link to='/resume' className='nav-links' onClick={closeMobileMenu}> Resume
                    </Link>
                </li>
                <li className='nav-item'>
                    <Link to='/contact' className='nav-links-mobile' onClick={closeMobileMenu}> Contact
                    </Link>
                </li>
            </ul>
            {button && <Button buttonStyle='btn--outline'>Contact Me</Button>}
        </div>
    </nav>
   </>
  )
}

export default Navbar
