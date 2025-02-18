import React, { useState } from 'react';
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

  const openImage = (img) => {
    setSelectedImage(img);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="container-fluid arts-container">
    <div className="row flex-nowrap">
      {/* Sidebar */}
      <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-light left-container">
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
                  <HashLink smooth to="#sunsculpted" className="nav-link px-0">Sunsculpted</HashLink>
                </li>
                <li className="nav-item subtitle">
                  <HashLink smooth to="#typology" className="nav-link px-0">Typology</HashLink>
                </li>
                <li className="nav-item subtitle">
                  <HashLink smooth to="#steel-city" className="nav-link px-0">Steel City</HashLink>
                </li>
                <li className="nav-item subtitle">
                  <HashLink smooth to="#shadowed-valleys" className="nav-link px-0">Shadowed Valleys</HashLink>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>

        <div className="col py-3 photography-container">
          <h3>Sunsculpted</h3>
          <div id='sunsculpted' className="row image-row first-row">
          <div className="col-12 col-md-6 mb-4" onClick={() => openImage(sunsculpted1)}>
              <img src={sunsculpted1} className="img-fluid" alt="Sunsculpted" />
            </div>
            <div className="col-12 col-md-6 mb-4" onClick={() => openImage(sunsculpted2)}>
              <img src={sunsculpted2} className="img-fluid" alt="Sunsculpted" />
            </div>
            <div className="col-12 col-md-6 mb-4" onClick={() => openImage(sunsculpted3)}>
              <img src={sunsculpted3} className="img-fluid" alt="Sunsculpted" />
            </div>
          </div>

          <div className="row image-row first-row">
          <div className="col-12 col-md-6 mb-4" onClick={() => openImage(sunsculpted4)}>
              <img src={sunsculpted4} className="img-fluid" alt="Sunsculpted" />
            </div>
            <div className="col-12 col-md-6 mb-4" onClick={() => openImage(sunsculpted5)}>
              <img src={sunsculpted5} className="img-fluid" alt="Sunsculpted" />
            </div>
            <div className="col-12 col-md-6 mb-4" onClick={() => openImage(sunsculpted6)}>
              <img src={sunsculpted6} className="img-fluid" alt="Sunsculpted" />
            </div>
          </div>

          <div className="row image-row first-row">
          <div className="col-12 col-md-6 mb-4" onClick={() => openImage(sunsculpted7)}>
              <img src={sunsculpted7} className="img-fluid" alt="Sunsculpted" />
            </div>
            <div className="col-12 col-md-6 mb-4" onClick={() => openImage(sunsculpted8)}>
              <img src={sunsculpted8} className="img-fluid" alt="Sunsculpted" />
            </div>
            <div className="col-12 col-md-6 mb-4" onClick={() => openImage(sunsculpted9)}>
              <img src={sunsculpted9} className="img-fluid" alt="Sunsculpted" />
            </div>
          </div>

          <div className="row image-row first-row">
          <div className="col-12 col-md-6 mb-4" onClick={() => openImage(sunsculpted10)}>
              <img src={sunsculpted10} className="img-fluid" alt="Sunsculpted" />
            </div>
            <div className="col-12 col-md-6 mb-4" onClick={() => openImage(sunsculpted11)}>
              <img src={sunsculpted11} className="img-fluid" alt="Sunsculpted" />
            </div>
            <div className="col-12 col-md-6 mb-4" onClick={() => openImage(sunsculpted12)}>
              <img src={sunsculpted12} className="img-fluid" alt="Sunsculpted" />
            </div>
          </div>

          <div className="row image-row first-row">
          <div className="col-12 col-md-6 mb-4" onClick={() => openImage(sunsculpted15)}>
              <img src={sunsculpted15} className="img-fluid" alt="Sunsculpted" />
            </div>
            <div className="col-12 col-md-6 mb-4" onClick={() => openImage(sunsculpted14)}>
              <img src={sunsculpted14} className="img-fluid" alt="Sunsculpted" />
            </div>
            <div className="col-12 col-md-6 mb-4" onClick={() => openImage(sunsculpted13)}>
              <img src={sunsculpted13} className="img-fluid" alt="Sunsculpted" />
            </div>
          </div>

      

          <h3>Typology</h3>
          <div id='typology' className="row image-row first-row">
            <div className="col-12 col-md-6 mb-4" onClick={() => openImage(typology1)}>
              <img src={typology1} className="img-fluid" alt="Typology 1" />
            </div>
            <div className="col-12 col-md-6 mb-4" onClick={() => openImage(typology2)}>
              <img src={typology2} className="img-fluid" alt="Typology 2" />
            </div>
          </div>

          <h3>Steel City & Shadowed Valleys</h3>
          <div id='steel-city' className="row image-row first-row">
            <div className="col-12 col-md-6 mb-4" onClick={() => openImage(steelCityImg5)}>
              <img src={steelCityImg5} className="img-fluid" alt="Steel City 5" />
            </div>
            <div className="col-12 col-md-6 mb-4" onClick={() => openImage(steelCityImg6)}>
              <img src={steelCityImg6} className="img-fluid" alt="Steel City 6" />
            </div>
          </div>

          <div className="row image-row second-row">
            <div className="col-12 mb-4" onClick={() => openImage(steelCityImg4)}>
              <img src={steelCityImg4} className="img-fluid" alt="Steel City 4" />
            </div>
          </div>

          <div className="row image-row third-row">
            <div className="col-12 col-md-4 mb-4" onClick={() => openImage(steelCityImg2)}>
              <img src={steelCityImg2} className="img-fluid" alt="Steel City 2" />
            </div>
            <div className="col-12 col-md-4 mb-4" onClick={() => openImage(steelCityImg)}>
              <img src={steelCityImg} className="img-fluid" alt="Steel City" />
            </div>
            <div className="col-12 col-md-4 mb-4" onClick={() => openImage(steelCityImg3)}>
              <img src={steelCityImg3} className="img-fluid" alt="Steel City 3" />
            </div>
          </div>
          <br></br><br></br>
          <div id="shadowed-valleys" className="row image-row first-row">
            <div className="col-12 col-md-6 mb-4" onClick={() => openImage(steelCityImg13)}>
              <img src={steelCityImg13} className="img-fluid" alt="Steel City 5" />
            </div>
            <div className="col-12 col-md-6 mb-4" onClick={() => openImage(steelCityImg14)}>
              <img src={steelCityImg14} className="img-fluid" alt="Steel City 6" />
            </div>
          </div>
          <div className="row image-row first-row">
            <div className="col-12 col-md-6 mb-4" onClick={() => openImage(steelCityImg7)}>
              <img src={steelCityImg7} className="img-fluid" alt="Steel City 5" />
            </div>
            <div className="col-12 col-md-6 mb-4" onClick={() => openImage(steelCityImg8)}>
              <img src={steelCityImg8} className="img-fluid" alt="Steel City 6" />
            </div>
            <div className="col-12 col-md-6 mb-4" onClick={() => openImage(steelCityImg12)}>
              <img src={steelCityImg12} className="img-fluid" alt="Steel City 6" />
            </div>
          </div>

          <div className="row image-row first-row">
            <div className="col-12 col-md-6 mb-4" onClick={() => openImage(steelCityImg15)}>
              <img src={steelCityImg15} className="img-fluid" alt="Steel City 5" />
            </div>
            <div className="col-12 col-md-6 mb-4" onClick={() => openImage(steelCityImg16)}>
              <img src={steelCityImg16} className="img-fluid" alt="Steel City 6" />
            </div>
          </div>

          <div className="row image-row fourth-row">
            <div className="col-12 col-md-6 mb-4" onClick={() => openImage(steelCityImg10)}>
              <img src={steelCityImg10} className="img-fluid" alt="Steel City 5" />
            </div>
            <div className="col-12 col-md-6 mb-4" onClick={() => openImage(steelCityImg11)}>
              <img src={steelCityImg11} className="img-fluid" alt="Steel City 6" />
            </div>
          </div>
          
        </div>
      </div>

      {selectedImage && (
        <div className="modal" onClick={closeModal}>
          <span className="close" onClick={closeModal}>&times;</span>
          <img className="modal-content" src={selectedImage} alt="Selected" />
        </div>
      )}
    </div>
  );
};

export default Arts;
