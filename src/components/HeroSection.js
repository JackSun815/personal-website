import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../App.css';
import { Button } from './Button';
import './HeroSection.css';
import ParticleAnimation from './ParticleAnimation';
// Use the profile image from the public/ folder. There's already a copy at public/images/profile.png.
const profilePublicPath = process.env.PUBLIC_URL + '/images/profile.png';

function HeroSection() {
  const greetings = [
    { lang: 'English', text: '· Hello!', fontColor: '#1ee8b6' },
    { lang: 'French', text: '· Bonjour!', fontColor: '#35e2e5' },
    { lang: 'Chinese', text: '· 你好!', fontColor: '#eccc68' },
    { lang: 'German', text: '· Guten Tag!', fontColor: '#b9eb0d' },
    { lang: 'Japanese', text: '· こんにちは!', fontColor: '#feca57' }
  ];

  const [currentGreetingIndex, setCurrentGreetingIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGreetingIndex((prevIndex) => (prevIndex + 1) % greetings.length);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className='hero-container'>
      <ParticleAnimation />

      <div className='hero-left' style={{ backgroundColor: greetings[currentGreetingIndex].color }}>
        <h1 
          className={`current-greeting hello-${greetings[currentGreetingIndex].lang}`} 
          style={{ color: greetings[currentGreetingIndex].fontColor }} 
          
        >
          {greetings[currentGreetingIndex].text}
        </h1>
        <h2 data-aos='fade-up' data-aos-delay="100">I'm Jack Sun:</h2>
        <h4 data-aos='fade-up' data-aos-delay="200">
          A Linguist, Developer and Student
          <br />
          @<span style={{ color: '#FF0000' }}>Carnegie Mellon University</span>
        </h4>
        <br /><br /><br />
        <p data-aos='fade-up' data-aos-delay="300">
          I'm passionate about the practical application of technology for social good. My love for languages and my hope to preserve endangered languages led me to explore various fields in information systems. As a full-stack developer with extensive experience in Python, SQL, Ruby, and C, I am dedicated to using technology to make a meaningful impact. 
        </p>
        <br />
        <div className='hero-btns' data-aos='fade-up' data-aos-delay="400">
          <Button className='btns' buttonStyle='btn--outline' buttonSize='btn--large' href="https://www.linkedin.com/in/jack-sun-5826a1279/">
            Linkedin <i className='fab fa-staylinked icon'></i>
          </Button>
          <Button className='btns' buttonStyle='btn--primary' buttonSize='btn--large' href="https://github.com/JackSun815">
            Github <i className='fab fa-github icon'></i>
          </Button>
        </div>
      </div>
      <div className='hero-right' data-aos='fade-left'>
        <img src={profilePublicPath} alt='Profile' /> {/* Use profile.png from public/images */}
      </div>
    </div>
  );
}

export default HeroSection;
