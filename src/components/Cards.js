import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import CardItem from './CardItem';
import './Cards.css';
import chalfant from '../images/project-chalfant.png';
import threeKingdoms from '../images/project-threekingdom.png';
import gcpd from '../images/gcpd.png';
import inprogress from '../images/in-progress.png';
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
      <h1>Projects</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              id="chalfant"
              data-aos='fade-right'
              src={chalfant}
              heading="Chalfant Run / Thompson Run Watershed Association"
              text='Website deployed at chalfantrun.org'
              label='Static Website'
              path='/services'
            />
            <CardItem
              id="gcpd"
              data-aos='fade-left'
              src={gcpd}
              heading='Gotham City Police Department'
              text='A web app built in multiple phases, starting with model creation, followed by testing, controller implementation, API development, and frontend construction.'
              label='Ruby on Rails, React'
              path='/services'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              id="threekingdom"
              data-aos='fade-right'
              src={threeKingdoms}
              heading='Romance of the Three Kingdoms'
              text='An old zelda-style game with fighting and drinking actions.'
              label='Python, Object-Oriented Programming'
              path='/products'
            />
            <CardItem
              id="inprogress"
              data-aos='fade-left'
              src={inprogress}
              heading='Language Visualization App'
              text='Investigating the effectiveness of pronunciation visualization in second language acquisition.'
              label='C++'
              path='/sign-up'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              id="tutorial"
              data-aos='fade-right'
              src={tutorial}
              heading="Ruby on Rails Tutorial"
              text='A tutorial for students in Web Development class, covering topics like MVC architecture, CRUD operations, Ruby on Rails framework, Ruby Gems, database operations, and APIs.'
              label='Ruby on Rails'
              path='/services'
            />
            <CardItem
              id="wals"
              data-aos='fade-left'
              src={wals}
              heading='World Atlas of Language Structures'
              text='A visualization of world languages, language families, and specific language features, including tone, gender, and word-order.'
              label='Python, Pandas, Matplotlib'
              path='/services'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              id="news"
              data-aos='fade-right'
              src={news}
              heading="Fake News Classification"
              text='A fake news classification project developed in Jupyter Notebook, featuring exploratory data analysis (EDA), data cleaning, and Naive Bayes model training.'
              label='Python, NLP'
              path='/services'
            />
            <CardItem
              id="beatbox"
              data-aos='fade-left'
              src={beatbox}
              heading='Live from the Larynx'
              text='A visualization of world languages, language families, and specific language features, including tone, gender, and word-order.'
              label='Acoustics Analysis, Linguistics, Matplotlib'
              path='/services'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
