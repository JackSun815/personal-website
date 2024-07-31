import React from 'react';
import './Footer.css';

function Footer() {
    return (
        <div id="footer" className='footer-container'>
            <section className='footer-subscription'>
                <p className='footer-contact'>
                    Contact: <a href="mailto:jack.sun121601@gmail.com">jack.sun121601@gmail.com</a>
                </p>
              
                <p className='footer-subscription-heading'>
                    Created by Jack Sun using React
                </p>

            </section>
        </div>
    );
}

export default Footer;
