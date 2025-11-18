import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import CardItem from './CardItem';
import './Cards.css';
import FloatingConstellations from './FloatingConstellations';
import chalfant from '../images/project-chalfant.png';
import threeKingdoms from '../images/project-threekingdom.png';
import gcpd from '../images/gcpd.png';
import tutorial from '../images/project-tutorial.png';
import wals from '../images/project-visualization.png';
import news from '../images/news.png';   
import beatbox from '../images/beatbox.jpg';

function Cards() {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Duration of animation
      once: true, 
    });
  }, []);

  return (
    <div className='cards'>
      <FloatingConstellations />
      <h1>Projects</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          {/* Featured Projects */}
          <div className='cards__featured-section'>
            <ul className='cards__items cards__featured'>
              <CardItem
                id="pypeflow"
                data-aos='fade-up'
                src={`${process.env.PUBLIC_URL}/images/pypeflow-placeholder.png`}
                heading='PypeFlow'
                text='Production level three-in-one dashboard for Managers, SDRs, and clients'
                label='Python, Flask, React'
                path='/sign-up'
                starred={true}
              />
              <CardItem
                id="ribbit"
                data-aos='fade-up'
                src={`${process.env.PUBLIC_URL}/images/ribbit-logo.png`}
                heading='Ribbit: A Language Visualization App'
                text='A language learning application that uses real-time visualization and automatic feedback to help users improve their pronunciation.'
                label='Swift, Python'
                path='/sign-up'
                starred={true}
              />
            </ul>
          </div>

          {/* Other Projects */}
          <div className='cards__other-section'>
            {/* Render remaining projects in a single grid so items flow naturally without gaps */}
            <ul className='cards__items'>
              <CardItem
                id="chalfant"
                data-aos='fade-up'
                src={chalfant}
                heading="Chalfant Run / Thompson Run Watershed Association"
                text='Website deployed at chalfantrun.org'
                label='Static Website'
                path='/services'
                starred={false}
              />
              <CardItem
                id="gcpd"
                data-aos='fade-up'
                src={gcpd}
                heading='Gotham City Police Department'
                text='A web app built in multiple phases, starting with model creation, followed by testing, controller implementation, API development, and frontend construction.'
                label='Ruby on Rails, React'
                path='/services'
                starred={false}
              />
              <CardItem
                id="threekingdom"
                data-aos='fade-up'
                src={threeKingdoms}
                heading='Romance of the Three Kingdoms'
                text='An old zelda-style game with fighting and drinking actions.'
                label='Python, Object-Oriented Programming'
                path='/products'
                starred={false}
              />
              <CardItem
                id="tutorial"
                data-aos='fade-up'
                src={tutorial}
                heading="Ruby on Rails Tutorial"
                text='A tutorial for students in Web Development class, covering topics like MVC architecture, CRUD operations, Ruby on Rails framework, Ruby Gems, database operations, and APIs.'
                label='Ruby on Rails'
                path='/services'
                starred={false}
              />
              <CardItem
                id="wals"
                data-aos='fade-up'
                src={wals}
                heading='World Atlas of Language Structures'
                text='A visualization of world languages, language families, and specific language features, including tone, gender, and word-order.'
                label='Python, Pandas, Matplotlib'
                path='/services'
                starred={false}
              />
              <CardItem
                id="news"
                data-aos='fade-up'
                src={news}
                heading="Fake News Classification"
                text='A fake news classification project developed in Jupyter Notebook, featuring exploratory data analysis (EDA), data cleaning, and Naive Bayes model training.'
                label='Python, NLP'
                path='/services'
                starred={false}
              />
              <CardItem
                id="beatbox"
                data-aos='fade-up'
                src={beatbox}
                heading='Live from the Larynx'
                text='A visualization of world languages, language families, and specific language features, including tone, gender, and word-order.'
                label='Acoustics Analysis, Linguistics, Matplotlib'
                path='/services'
                starred={false}
              />
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cards;
