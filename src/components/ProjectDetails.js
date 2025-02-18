import React from 'react';
import { useParams } from 'react-router-dom';
import './ProjectDetails.css';




const projectData = {
  ribbit: {
    heading: "Ribbit: A Language Visualization App",
    label: 'IOS App',
    github: 'https://github.com/jessxec/Ribbit-443',
    demo: 'https://youtu.be/h1LJRxqDjfE',
    text: `<b>Ribbit</b> is an iOS app I developed as part of my senior thesis to help second-language learners acquire Mandarin tones through interactive pitch visualization and gamified feedback. The app is built in Swift and integrates advanced audio processing techniques, leveraging pitch contours and formant analysis to provide real-time pronunciation feedback. Users can see a visual representation of their pitch alongside an idealized native speaker model, allowing them to adjust and refine their pronunciation dynamically.`,

    details: `<b>Technical Highlights:</b><br />
    <b>1. Custom Voice Analysis API:</b> Developed a cloud-based API that processes and returns pitch data, analyzing users' speech in real-time.<br />
    <b>2. Adaptive Pitch Calibration:</b> Detects and calibrates each user’s vocal range, dynamically adjusting the app’s scoring algorithm to enhance accuracy. This personalized adjustment allows the app to provide more reliable tone recognition, automatically scoring and delivering real-time feedback based on the user’s unique pitch profile.<br />
    <b>3. Gamified Learning:</b> Integrated themes, customizable sprites, and a dynamic reward system to enhance engagement and retention.<br />
    <b>4. Scalable Modular Design:</b> Ribbit teaches Chinese progressively, starting from fundamental phonetics and advancing through vocabulary-rich modules that are useful in real life scenarios. <br /><br />
    
    <b>Current Features & Learning Modules:</b><br />
    At this stage, Ribbit includes 5 interactive modules, each set in a unique environment:<br />
    1. 🌱 <b>Foundation Islands:</b> Master the basics of Pinyin and Mandarin tones.<br />
    2. ✈️ <b>Airport:</b> Learn travel-related phrases and tone combinations.<br />
    3. ☕ <b>Café:</b> Practice ordering food.<br />
    4. 🏖️ <b>Beach:</b> Reinforce pronunciation with conversational scenarios.<br />
    5. ⛺ <b>Camping:</b> Introduction to advanced tone concepts.<br /><br />
    
    <b>Research & Linguistic Study:</b><br />
    Beyond its technical implementation, Ribbit was also the subject of a linguistic study examining the effectiveness of visual feedback in Mandarin tone acquisition. I conducted an experiment with three groups:<br />
    1️. A control group with no visual feedback, only schematics are provided.<br />
    2️. A group with static visual feedback.<br />
    3️. A group using Ribbit’s interactive pitch visualization, with animated feedback.<br /><br />
    
    Findings from the study will be presented at <b>Carnegie Mellon's Meeting of the Minds</b> and at the <b>National Conference on Undergraduate Research</b>, which will be held in April, 2025. <br /><br />
    
    <b>Future Plans:</b> Ribbit is designed to be scalable, with potential expansions including more themes, additional tone challenges, celebrity audio and AI-driven feedback for even greater accuracy.`,    
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
    text: `<b>Romance of the Three Kingdoms</b> is a 2D open-world game I developed in Python, utilizing object-oriented programming (OOP) to create an interactive experience set in the Three Kingdoms period of ancient China. The game allows players to explore a vast environment, interact with NPCs, collect items, and engage in combat using strategic gameplay mechanics.<br /><br />

    The game features an adaptive enemy AI system that leverages a <b>backtracking algorithm</b> to intelligently navigate the world and pursue the player. Additionally, players must manage a dynamic inventory that includes both weapons and consumables to survive and progress in the game.<br /><br />`,     
    details: `<b>Technical Highlights:</b><br />
    <b>1. Object-Oriented Design:</b> Built using OOP principles, with modular classes for players, NPCs, enemies, and items, allowing scalable development.<br />
    <b>2. Intelligent Enemy AI:</b> Implemented a <b>backtracking algorithm</b> for enemy movement and attack strategies, creating a more engaging combat system.<br />
    <b>3. Dynamic Inventory System:</b> Players can collect and utilize:<br />
      - ⚔️ <b>Weapons:</b> Sword, bow, and AK-47, each with unique attack mechanics.<br />
      - 🐟 <b>Consumables:</b> Fish (hunger management) and rice wine (health restoration).<br />
    <b>4. Interactive World Exploration:</b> Players can travel across a mapped-out world, encountering different characters, obstacles, and quests.<br /><br />

    If you're interested in viewing the source code or contributing, please contact me for repository access.`,
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
      <div dangerouslySetInnerHTML={{ __html: project.text }} />
      <div dangerouslySetInnerHTML={{ __html: project.details }} />
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
