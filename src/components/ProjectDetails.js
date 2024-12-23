import React from 'react';
import { useParams } from 'react-router-dom';
import './ProjectDetails.css';




const projectData = {
  ribbit: {
    heading: "Ribbit: A Language Visualization App",
    label: 'IOS App',
    github: 'https://github.com/jessxec/Ribbit-443',
    demo: 'https://youtu.be/h1LJRxqDjfE',
    text: 'Ribbit is an iOS app I developed as part of my senior thesis to help users learn Mandarin tones through interactive pitch visualization and gamified feedback. The app leverages Swift and integrates linguistic insights, such as formants and pitch contours, to offer users real-time feedback on their pronunciation.',
    details: 'This project required extensive work in Swift, audio processing, and UI/UX design. I built a custom API that performs voice analysis, processing and returning pitch data. The app is  engaging and scalable as it includes themes, customizable sprites, and a reward system. It teaches Chinese from the basics, and lessons are cumulative. Currently, Ribbit features 5 modules, including Foundation Islands, Airport, Cafe, Beach, and Camping with each module offering unique vocabulary and practice scenarios.',
    screenshots: [
      `${process.env.PUBLIC_URL}/images/ribbit-1.png`,
      `${process.env.PUBLIC_URL}/images/ribbit-2.png`,
      `${process.env.PUBLIC_URL}/images/ribbit-3.png`,
      `${process.env.PUBLIC_URL}/images/ribbit-4.png`,
      `${process.env.PUBLIC_URL}/images/ribbit-5.png`,
      `${process.env.PUBLIC_URL}/images/ribbit-6.png`
    ]
  },
  chalfant: {
    heading: "Chalfant Run / Thompson Run Watershed Association",
    label: 'Static Website',
    github: 'https://github.com/JackSun815/jacksun815.github.io',
    demo: 'http://chalfantrun.org',
    text: 'This project took several months to complete. I designed and developed the entire site using HTML, CSS, and JavaScript. My involvement spanned the entire process, from capturing event footage for the website to creating posters and community surveys, as well as setting up a "Join Us" and donation page. It was incredibly rewarding to see our hard work reaching more people, with over 100 attendees at our recent firefly hike this summer.',
    details: 'Working with a small, growing organization like the Chalfant Run Thompson Run Watershed Association (CRTRWA) required me to wear multiple hats, acting as a designer, front-end developer, and photographer. The primary goal of the website was to increase our visibility and raise awareness about local environmental issues, such as abandoned-mine drainage. I even conducted my own research to create a timeline in the “Meet Our Streams” section, detailing the rise and fall of the coal mining industry in Pittsburgh from 1760 to the present.',
    screenshots: [
      `${process.env.PUBLIC_URL}/images/chalfant-screenshot1.png`,
      `${process.env.PUBLIC_URL}/images/chalfant-screenshot2.png`,
      `${process.env.PUBLIC_URL}/images/chalfant-screenshot3.png`
    ]
  },
  gcpd: {
    heading: 'Gotham City Police Department',
    label: 'A Rails Web-Application',
    demo: 'https://youtu.be/LSea0B4fMcA?si=ZmDS2_e8pcSsaf55',
    text: 'There are many phases to the project, starting with building models to represent key entities like crimes and officers. For a reference for the full ERD, please refer to the first image. Factories and tests were created using FactoryBot and RSpec to ensure model functionality. Subsequently, controllers were developed to manage CRUD operations, with each Controller handling actions like creating, updating, and displaying records, incorporating authentication and authorization with Devise and CanCanCan.',
    details: 'Once the user logged in, investigations, officers, and units information will be displayed. The user can create, update, and delete records, as well as search for specific records. The frontend was built using React, with Redux for state management and Material-UI for styling. The frontend communicates with the backend through RESTful APIs.',
    screenshots: [
      `${process.env.PUBLIC_URL}/images/gcpd-erd.png`,
      `${process.env.PUBLIC_URL}/images/gcpd-screenshot1.png`,
      `${process.env.PUBLIC_URL}/images/gcpd-screenshot2.png`,
      `${process.env.PUBLIC_URL}/images/gcpd-screenshot3.png`,
      `${process.env.PUBLIC_URL}/images/gcpd-screenshot4.png`,
      `${process.env.PUBLIC_URL}/images/gcpd-screenshot5.png`
    ]
  },
  threekingdom: {
    heading: "Romance of the Three Kingdoms",
    label: 'Python Game',
    demo: 'https://youtu.be/mujMOqb_aog?si=Ajk9KglBb4jA0Ulz', 
    text: 'This project is a 2D open world game developed in Python using object-oriented programming. If you would like to view the code, please contact me for repository access.',
    details: 'In this game, the player can travel along a path and interact with various characters and items. The game features a simple inventory system that includes a sword, bow, and AK-47 for attacking, as well as fish for hunger and rice wine for health. The enemy uses a backtracking algorithm to find and attack the player.',
    screenshots: [
      `${process.env.PUBLIC_URL}/images/threekingdom-screenshot1.png`,
      `${process.env.PUBLIC_URL}/images/threekingdom-screenshot2.png`,
      `${process.env.PUBLIC_URL}/images/threekingdom-screenshot3.png`
    ]
  },
  wals: {
    heading: "World Atlas of Language Structures",
    label: 'Language Data Visualization in Jupyter Notebook',
    demo: 'https://jacksun815.github.io/wals',
    text: 'The project uses the World Atlas of Language Structures (WALS) dataset to explore global linguistic diversity using data processing and visualization techniques. Utilizing Pandas for data manipulation, cleaning, and transformation, the project efficiently handles the comprehensive dataset of 2679 instances and 202 columns. Key visualizations are generated with libraries such as Matplotlib and Seaborn for static charts, while Geopandas and Folium create interactive maps, enabling an insightful exploration of linguistic attributes across different regions and language families.',
    details: 'The analysis covers various linguistic features, including tonal and gender systems, mapped onto a global scale to reveal patterns and correlations. For instance, the project examines the distribution of tonal languages and the complexity of gender systems across different macroareas. The investigation extends to the linguistic diversity within the United States, highlighting regional variations in syntactic structures. By integrating geospatial data visualization and statistical analysis, the project offers a detailed and interactive representation of the worlds linguistic landscape.',
    screenshots: [
      `${process.env.PUBLIC_URL}/images/wals-screenshot1.png`,
      `${process.env.PUBLIC_URL}/images/wals-screenshot2.png`,
      `${process.env.PUBLIC_URL}/images/wals-screenshot3.png`,
    ]
  },
  tutorial: {
    heading: "Ruby on Rails Tutorial",
    label: 'Educational Website',
    github: 'https://github.com/JackSun815/272_help',
    demo: 'https://jacksun815.github.io/272_help/',
    text: 'The website is created using Docusaurus, in collaboration with another student, to assist our future classmates in the App Development class, one of the most challenging core courses in the CMU Information Systems major.',
    details: 'This tutorial offers a comprehensive, step-by-step guide to building a simple web application using Ruby on Rails, following the course structure of the semester. It introduces students to the Model-View-Controller (MVC) architecture, guiding them through creating a database schema, implementing CRUD operations, and integrating Ruby Gems for additional functionalities. The tutorial also covers the essentials of RESTful routing, form handling, and user authentication, enabling students to build a fully functional web application from scratch.',    
    screenshots: [
      `${process.env.PUBLIC_URL}/images/tutorial-screenshot1.png`,
      `${process.env.PUBLIC_URL}/images/tutorial-screenshot2.png`,
      `${process.env.PUBLIC_URL}/images/tutorial-screenshot3.png`,
    ],
  },
  news: {
    heading: "Fake News Classification",
    label: 'Python, NLP',
    github: 'https://github.com/JackSun815/news-classification/blob/main/ml_project_final.ipynb',
    demo: 'https://nbviewer.org/github/JackSun815/news-classification/blob/main/ml_project_final.ipynb',
    text: 'An NLP model that classifies fake vs. accurate news.',
    details: '',
    screenshots: [
      // require('../images/news-screenshot1.png'),
      // require('../images/news-screenshot2.png'),
      // require('../images/news-screenshot3.png')
    ]
  },
  beatbox: {
    heading: "Live from the Larynx: the Art and Science of Beatboxing",
    label: 'Acoustics Analysis of Beatboxing in Jupyter Notebook',
    demo: 'https://nbviewer.org/github/JackSun815/live-from-the-larynx/blob/main/Live%20from%20the%20Larynx%20final%20draft.ipynb',
    text: 'This is an investigative project that delves into the acoustics and phonetics of beatboxing. The study explores how beatboxers use their vocal tract to produce a variety of percussive and melodic sounds, focusing on three foundational elements: the drum, the hi-hat, and the snare. Recordings were processed and analyzed using Praat, examining parameters like intensity and frequency.',
    details: '',
    screenshots: [
      `${process.env.PUBLIC_URL}/images/beatbox-screenshot1.png`,
      `${process.env.PUBLIC_URL}/images/beatbox-screenshot2.png`,
    ]
  }
};

function ProjectDetails() {
  const { id } = useParams();
  const project = projectData[id];

  if (!project) {
    return <h2>In development...</h2>;
  }

  return (
    <div className='project-details'>
      <h1>{project.heading}</h1>
      <h2>{project.label}</h2>
      <div className='button-section'>
        {project.github && (
          <a href={project.github} className='btn' target='_blank' rel='noopener noreferrer'>GitHub</a>
        )}
        <a href={project.demo} className='btn' target='_blank' rel='noopener noreferrer'>Live Demo</a>
      </div>
      <br />
      <p>{project.text}</p>
      <p>{project.details}</p>
      <div className={`screenshots ${id === 'ribbit' ? 'ribbit-images' : ''}`}>
          {project.screenshots.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Screenshot ${index + 1}`}
              className="screenshot"
            />
          ))}
        </div>
    </div>
  );
}

export default ProjectDetails;
