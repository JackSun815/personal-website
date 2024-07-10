import React, { useState, useEffect } from 'react';
import '../App.css';
import { Button } from './Button';
import './HeroSection.css';
import heroImage from '../images/hero-right.png'; 

function HeroSection() {
  // List of greetings in multiple languages with associated background colors
  const greetings = [
    { lang: 'English', text: 'Hello!', fontColor: '#23c6c8' },
    { lang: 'French', text: 'Bonjour!', fontColor: '#df5295' },
    { lang: 'Chinese', text: '你好!', fontColor: '#eccc68' },
    { lang: 'German', text: 'Guten Tag!', fontColor: '#feca57' },
    { lang: 'Japanese', text: 'こんにちは!', fontColor: '#feca57' }
  ];

  const [currentGreetingIndex, setCurrentGreetingIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGreetingIndex((prevIndex) => (prevIndex + 1) % greetings.length);
    }, 1500); // 1.5 seconds interval for transition

    return () => clearInterval(interval); // Clear the interval on component unmount
  }, []);

  return (
    <div className='hero-container'>
        <div className='hero-left' style={{ backgroundColor: greetings[currentGreetingIndex].color }}>
            <h1 className={currentGreetingIndex !== 0 ? 'fade' : ''}>{greetings[currentGreetingIndex].text}</h1> 
            <br></br>          
            <h2>I'm Jack </h2>
            <h5>A Linguist, Developer and Student at Carnegie Mellon University</h5>
            <div className='hero-btns'>
                <Button className='btns' buttonStyle='btn--outline' buttonSize='btn--large'>Linkedin <i className='fab fa-staylinked icon'></i>
                </Button>
                <Button className='btns' buttonStyle='btn--primary' buttonSize='btn--large'>
                Github <i className='fab fa-github icon'></i>
                </Button>
            </div>
        </div>
        <div className='hero-right'>
            <img src={heroImage} alt='Hero' /> {/* Use the imported image variable */}
        </div>
    </div>
  );
}

export default HeroSection;