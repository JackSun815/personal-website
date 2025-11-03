import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import { HashLink } from 'react-router-hash-link';
import './Arts.css'; 
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
// Import images
import steelCityImg from '../../images/photography/Steel City.jpg';
import steelCityImg2 from '../../images/photography/Steel City-2.jpg';
import steelCityImg3 from '../../images/photography/Steel City-3.jpg';
import steelCityImg4 from '../../images/photography/Steel City-4.jpg';
import steelCityImg5 from '../../images/photography/Steel City-5.jpg';
import steelCityImg6 from '../../images/photography/Steel City-6.jpg';
import steelCityImg7 from '../../images/photography/Shadowed Valleys-8.jpg';
import steelCityImg8 from '../../images/photography/Shadowed Valleys-9.jpg';
import steelCityImg9 from '../../images/photography/Shadowed Valleys-10.jpg';
import steelCityImg10 from '../../images/photography/Shadowed Valleys-19.jpg';
import steelCityImg11 from '../../images/photography/Shadowed Valleys-20.jpg';
import steelCityImg12 from '../../images/photography/Shadowed Valleys-28.jpg';
import steelCityImg13 from '../../images/photography/Shadowed Valleys-18.jpg';
import steelCityImg14 from '../../images/photography/Shadowed Valleys-26.jpg';
import steelCityImg15 from '../../images/photography/Shadowed Valleys-21.jpg';
import steelCityImg16 from '../../images/photography/Shadowed Valleys-22.jpg';
import typology1 from '../../images/photography/Typology1.png';
import typology2 from '../../images/photography/Typology2.png';
import sunsculpted1 from '../../images/photography/sunsculpted1.jpg';
import sunsculpted2 from '../../images/photography/sunsculpted2.jpg';
import sunsculpted3 from '../../images/photography/sunsculpted3.jpg';
import sunsculpted4 from '../../images/photography/sunsculpted4.jpg';
import sunsculpted5 from '../../images/photography/sunsculpted5.jpg';
import sunsculpted6 from '../../images/photography/sunsculpted6.jpg';
import sunsculpted7 from '../../images/photography/sunsculpted7.jpg';
import sunsculpted8 from '../../images/photography/sunsculpted8.jpg';
import sunsculpted9 from '../../images/photography/sunsculpted9.jpg';
import sunsculpted10 from '../../images/photography/sunsculpted10.jpg';
import sunsculpted11 from '../../images/photography/sunsculpted11.jpg';
import sunsculpted12 from '../../images/photography/sunsculpted12.jpg';
import sunsculpted13 from '../../images/photography/sunsculpted13.jpg';
import sunsculpted14 from '../../images/photography/sunsculpted14.jpg';
import sunsculpted15 from '../../images/photography/sunsculpted15.jpg';

const images = [
  steelCityImg5,
  steelCityImg6,
  steelCityImg4,
  steelCityImg2,
  steelCityImg,
  steelCityImg3,
  steelCityImg7,
  steelCityImg8,
  steelCityImg9,
  steelCityImg10,
  steelCityImg11,
  steelCityImg12,
  steelCityImg13,
  steelCityImg14,
  steelCityImg15,
  steelCityImg16,
  typology1,
  typology2,
  sunsculpted1,
  sunsculpted2,
  sunsculpted3,
  sunsculpted4,
  sunsculpted5,
  sunsculpted6,
  sunsculpted7,
  sunsculpted8,
  sunsculpted9,
  sunsculpted10,
  sunsculpted11,
  sunsculpted12,
  sunsculpted13,
  sunsculpted14,
  sunsculpted15
];

const Arts = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentSection, setCurrentSection] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (mobile) {
        setIsNavCollapsed(true); // Auto-collapse on mobile
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Check initial size

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Define image sections for navigation
  const imageSections = {
    sunsculpted: [
      sunsculpted1, sunsculpted2, sunsculpted3, sunsculpted4, sunsculpted5,
      sunsculpted6, sunsculpted7, sunsculpted8, sunsculpted9, sunsculpted10,
      sunsculpted11, sunsculpted12, sunsculpted13, sunsculpted14, sunsculpted15
    ],
    typology: [typology1, typology2],
    steelCity: [steelCityImg5, steelCityImg6, steelCityImg4, steelCityImg2, steelCityImg, steelCityImg3],
    shadowedValleys: [
      steelCityImg13, steelCityImg14, steelCityImg7, steelCityImg8, steelCityImg12,
      steelCityImg15, steelCityImg16, steelCityImg10, steelCityImg11
    ]
  };

  const openImage = (img, section) => {
    const sectionImages = imageSections[section];
    const index = sectionImages.indexOf(img);
    setSelectedImage(img);
    setCurrentSection(section);
    setCurrentIndex(index);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setCurrentSection(null);
    setCurrentIndex(0);
  };

  const navigateImage = (direction) => {
    if (!currentSection) return;
    
    const sectionImages = imageSections[currentSection];
    let newIndex;
    
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : sectionImages.length - 1;
    } else {
      newIndex = currentIndex < sectionImages.length - 1 ? currentIndex + 1 : 0;
    }
    
    setCurrentIndex(newIndex);
    setSelectedImage(sectionImages[newIndex]);
  };

  const toggleNav = () => {
    setIsNavCollapsed(!isNavCollapsed);
  };

  return (
    <div className="container-fluid arts-container">
    <div className="row flex-nowrap">
      {/* Sidebar */}
      <div className={`sidebar-container ${isNavCollapsed ? 'collapsed' : 'expanded'} ${isMobile ? 'mobile' : ''}`}>
        <div className="hamburger-menu" onClick={toggleNav}>
          <span className={isNavCollapsed ? 'collapsed' : ''}></span>
          <span className={isNavCollapsed ? 'collapsed' : ''}></span>
          <span className={isNavCollapsed ? 'collapsed' : ''}></span>
        </div>
        
        <div className={`sidebar-content ${isNavCollapsed ? 'hidden' : 'visible'}`}>
          <div className="d-flex flex-column align-items-start px-3 pt-2 text-black min-vh-100">
            <a href="/" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-black text-decoration-none">
              <span className="fs-5 name">Jack Sun</span>
            </a>
            <ul className="nav nav-pills flex-column mb-sm-auto mb-0">
              <li className="nav-item">
                <span className="nav-link align-middle px-0 title">
                  <span className="ms-1">Photography</span>
                </span>
                <ul className="nav flex-column subtitle-list">
                  <li className="nav-item subtitle">
                    <HashLink smooth to="#sunsculpted" className="nav-link px-0" onClick={() => isMobile && setIsNavCollapsed(true)}>Sunsculpted</HashLink>
                  </li>
                  <li className="nav-item subtitle">
                    <HashLink smooth to="#typology" className="nav-link px-0" onClick={() => isMobile && setIsNavCollapsed(true)}>Typology</HashLink>
                  </li>
                  <li className="nav-item subtitle">
                    <HashLink smooth to="#steel-city" className="nav-link px-0" onClick={() => isMobile && setIsNavCollapsed(true)}>Steel City</HashLink>
                  </li>
                  <li className="nav-item subtitle">
                    <HashLink smooth to="#shadowed-valleys" className="nav-link px-0" onClick={() => isMobile && setIsNavCollapsed(true)}>Shadowed Valleys</HashLink>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>

        <div className="col py-3 photography-container">
          <h3>Sunsculpted</h3>
          <div id='sunsculpted' className="row image-row first-row">
          <div className="col-12 col-md-6 mb-4" onClick={() => openImage(sunsculpted1, 'sunsculpted')}>
              <img src={sunsculpted1} className="img-fluid" alt="Sunsculpted" />
            </div>
            <div className="col-12 col-md-6 mb-4" onClick={() => openImage(sunsculpted2, 'sunsculpted')}>
              <img src={sunsculpted2} className="img-fluid" alt="Sunsculpted" />
            </div>
            <div className="col-12 col-md-6 mb-4" onClick={() => openImage(sunsculpted3, 'sunsculpted')}>
              <img src={sunsculpted3} className="img-fluid" alt="Sunsculpted" />
            </div>
          </div>

          <div className="row image-row first-row">
          <div className="col-12 col-md-6 mb-4" onClick={() => openImage(sunsculpted4, 'sunsculpted')}>
              <img src={sunsculpted4} className="img-fluid" alt="Sunsculpted" />
            </div>
            <div className="col-12 col-md-6 mb-4" onClick={() => openImage(sunsculpted5, 'sunsculpted')}>
              <img src={sunsculpted5} className="img-fluid" alt="Sunsculpted" />
            </div>
            <div className="col-12 col-md-6 mb-4" onClick={() => openImage(sunsculpted6, 'sunsculpted')}>
              <img src={sunsculpted6} className="img-fluid" alt="Sunsculpted" />
            </div>
          </div>

          <div className="row image-row first-row">
          <div className="col-12 col-md-6 mb-4" onClick={() => openImage(sunsculpted7, 'sunsculpted')}>
              <img src={sunsculpted7} className="img-fluid" alt="Sunsculpted" />
            </div>
            <div className="col-12 col-md-6 mb-4" onClick={() => openImage(sunsculpted8, 'sunsculpted')}>
              <img src={sunsculpted8} className="img-fluid" alt="Sunsculpted" />
            </div>
            <div className="col-12 col-md-6 mb-4" onClick={() => openImage(sunsculpted9, 'sunsculpted')}>
              <img src={sunsculpted9} className="img-fluid" alt="Sunsculpted" />
            </div>
          </div>

          <div className="row image-row first-row">
          <div className="col-12 col-md-6 mb-4" onClick={() => openImage(sunsculpted10, 'sunsculpted')}>
              <img src={sunsculpted10} className="img-fluid" alt="Sunsculpted" />
            </div>
            <div className="col-12 col-md-6 mb-4" onClick={() => openImage(sunsculpted11, 'sunsculpted')}>
              <img src={sunsculpted11} className="img-fluid" alt="Sunsculpted" />
            </div>
            <div className="col-12 col-md-6 mb-4" onClick={() => openImage(sunsculpted12, 'sunsculpted')}>
              <img src={sunsculpted12} className="img-fluid" alt="Sunsculpted" />
            </div>
          </div>

          <div className="row image-row first-row">
          <div className="col-12 col-md-6 mb-4" onClick={() => openImage(sunsculpted15, 'sunsculpted')}>
              <img src={sunsculpted15} className="img-fluid" alt="Sunsculpted" />
            </div>
            <div className="col-12 col-md-6 mb-4" onClick={() => openImage(sunsculpted14, 'sunsculpted')}>
              <img src={sunsculpted14} className="img-fluid" alt="Sunsculpted" />
            </div>
            <div className="col-12 col-md-6 mb-4" onClick={() => openImage(sunsculpted13, 'sunsculpted')}>
              <img src={sunsculpted13} className="img-fluid" alt="Sunsculpted" />
            </div>
          </div>

      

          <h3>Typology</h3>
          <div id='typology' className="row image-row first-row">
            <div className="col-12 col-md-6 mb-4" onClick={() => openImage(typology1, 'typology')}>
              <img src={typology1} className="img-fluid" alt="Typology 1" />
            </div>
            <div className="col-12 col-md-6 mb-4" onClick={() => openImage(typology2, 'typology')}>
              <img src={typology2} className="img-fluid" alt="Typology 2" />
            </div>
          </div>

          <h3>Steel City & Shadowed Valleys</h3>
          <div id='steel-city' className="row image-row first-row">
            <div className="col-12 col-md-6 mb-4" onClick={() => openImage(steelCityImg5, 'steelCity')}>
              <img src={steelCityImg5} className="img-fluid" alt="Steel City 5" />
            </div>
            <div className="col-12 col-md-6 mb-4" onClick={() => openImage(steelCityImg6, 'steelCity')}>
              <img src={steelCityImg6} className="img-fluid" alt="Steel City 6" />
            </div>
          </div>

          <div className="row image-row second-row">
            <div className="col-12 mb-4" onClick={() => openImage(steelCityImg4, 'steelCity')}>
              <img src={steelCityImg4} className="img-fluid" alt="Steel City 4" />
            </div>
          </div>

          <div className="row image-row third-row">
            <div className="col-12 col-md-4 mb-4" onClick={() => openImage(steelCityImg2, 'steelCity')}>
              <img src={steelCityImg2} className="img-fluid" alt="Steel City 2" />
            </div>
            <div className="col-12 col-md-4 mb-4" onClick={() => openImage(steelCityImg, 'steelCity')}>
              <img src={steelCityImg} className="img-fluid" alt="Steel City" />
            </div>
            <div className="col-12 col-md-4 mb-4" onClick={() => openImage(steelCityImg3, 'steelCity')}>
              <img src={steelCityImg3} className="img-fluid" alt="Steel City 3" />
            </div>
          </div>
          <br></br><br></br>
          <div id="shadowed-valleys" className="row image-row first-row">
            <div className="col-12 col-md-6 mb-4" onClick={() => openImage(steelCityImg13, 'shadowedValleys')}>
              <img src={steelCityImg13} className="img-fluid" alt="Steel City 5" />
            </div>
            <div className="col-12 col-md-6 mb-4" onClick={() => openImage(steelCityImg14, 'shadowedValleys')}>
              <img src={steelCityImg14} className="img-fluid" alt="Steel City 6" />
            </div>
          </div>
          <div className="row image-row first-row">
            <div className="col-12 col-md-6 mb-4" onClick={() => openImage(steelCityImg7, 'shadowedValleys')}>
              <img src={steelCityImg7} className="img-fluid" alt="Steel City 5" />
            </div>
            <div className="col-12 col-md-6 mb-4" onClick={() => openImage(steelCityImg8, 'shadowedValleys')}>
              <img src={steelCityImg8} className="img-fluid" alt="Steel City 6" />
            </div>
            <div className="col-12 col-md-6 mb-4" onClick={() => openImage(steelCityImg12, 'shadowedValleys')}>
              <img src={steelCityImg12} className="img-fluid" alt="Steel City 6" />
            </div>
          </div>

          <div className="row image-row first-row">
            <div className="col-12 col-md-6 mb-4" onClick={() => openImage(steelCityImg15, 'shadowedValleys')}>
              <img src={steelCityImg15} className="img-fluid" alt="Steel City 5" />
            </div>
            <div className="col-12 col-md-6 mb-4" onClick={() => openImage(steelCityImg16, 'shadowedValleys')}>
              <img src={steelCityImg16} className="img-fluid" alt="Steel City 6" />
            </div>
          </div>

          <div className="row image-row fourth-row">
            <div className="col-12 col-md-6 mb-4" onClick={() => openImage(steelCityImg10, 'shadowedValleys')}>
              <img src={steelCityImg10} className="img-fluid" alt="Steel City 5" />
            </div>
            <div className="col-12 col-md-6 mb-4" onClick={() => openImage(steelCityImg11, 'shadowedValleys')}>
              <img src={steelCityImg11} className="img-fluid" alt="Steel City 6" />
            </div>
          </div>
          
        </div>
      </div>

      {selectedImage && (
        <div className="modal" onClick={closeModal}>
          <span className="close" onClick={closeModal}>&times;</span>
          
          {/* Navigation arrows */}
          {currentSection && imageSections[currentSection].length > 1 && (
            <>
              <button 
                className="modal-nav prev" 
                onClick={(e) => { e.stopPropagation(); navigateImage('prev'); }}
              >
                &#8249;
              </button>
              <button 
                className="modal-nav next" 
                onClick={(e) => { e.stopPropagation(); navigateImage('next'); }}
              >
                &#8250;
              </button>
            </>
          )}
          
          <div className="modal-image-container" onClick={(e) => e.stopPropagation()}>
            <img className="modal-content" src={selectedImage} alt="Selected" />
          </div>
          
          {/* Image counter */}
          {currentSection && imageSections[currentSection].length > 1 && (
            <div className="image-counter">
              {currentIndex + 1} / {imageSections[currentSection].length}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Arts;
