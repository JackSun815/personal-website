import React, { useEffect } from 'react';
import './About.css';
import { Button } from './Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import aboutImage from '../images/about-photo.png';

function About() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="about-container" id="about">
      <div className="container about-content" data-aos="fade-up">
        <h1 className="about-header">About</h1>
        <div className="row section-divider">
          <div className="col-md-6" data-aos="fade-left">
            <img src={aboutImage} alt="About" className="about-image img-fluid" />
          </div>
          <div className="col-md-6" data-aos="fade-right">
            <div className="about-text">
              <p>
                Growing up in an environment rich with linguistic diversity, I developed a love for languages at an early age. Seeking to study linguistics from an interdisciplinary perspective, I transferred to Carnegie Mellon University in my second year and pursued a dual degree in linguistics and information systems.
              </p>
              <p>
                While delving into theoretical linguistics, I have also mastered multiple coding languages and explored how data science and computer science can enhance traditional linguistic studies. My senior thesis focuses on building a language learning application and investigating the effectiveness of pronunciation visualization in second language acquisition.
              </p>
              <p>
                Beyond academics, I enjoy rowing, backpacking, and making music.
              </p>
              <Button className='btns btn--contact' buttonStyle='btn--outline' buttonSize='btn--large' to="/resume">
                Resume 
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
