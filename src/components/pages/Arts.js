import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Arts.css'; // Ensure you have this CSS file for custom styling
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
  steelCityImg16
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
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-light left-container">
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            <a href="/" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
              <span className="fs-5 d-none d-sm-inline name">Jack Sun</span>
            </a>
            <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
              
              {/* Photography Section */}
              <li className="nav-item">
                <a href="#steel-city" className="nav-link align-middle px-0 title">
                  <span className="ms-1 d-none d-sm-inline">Photography</span>
                </a>
                <ul className="nav flex-column ms-3 subtitle-list">
                  <li className="nav-item subtitle">
                    <a href="#steel-city" className="nav-link px-0"> <span className="d-none d-sm-inline">Steel City</span></a>
                  </li>
                  <li className="nav-item subtitle">
                    <a href="#shadowed-valley" className="nav-link px-0"> <span className="d-none d-sm-inline">Shadowed Valleys</span></a>
                  </li>
                </ul>
              </li>

              {/* Sandpainting Section */}
              <li className="nav-item">
                <Link to="/sandpainting" className="nav-link align-middle px-0 title">
                  <span className="ms-1 d-none d-sm-inline">Sandpainting</span>
                </Link>
                <ul className="nav flex-column ms-3 subtitle-list">
                  <li className="nav-item subtitle">
                    <a href="/sandpainting" className="nav-link px-0"> <span className="d-none d-sm-inline">Macbeth</span></a>
                  </li>
                </ul>
              </li>
              
            </ul>
          </div>
        </div>

        <div className="col py-3 photography-container">
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
          <div id='shadowed-valley' className="row image-row first-row">
            <div className="col-12 col-md-6 mb-4" onClick={() => openImage(steelCityImg13)}>
              <img src={steelCityImg13} className="img-fluid" alt="Steel City 5" />
            </div>
            <div className="col-12 col-md-6 mb-4" onClick={() => openImage(steelCityImg14)}>
              <img src={steelCityImg14} className="img-fluid" alt="Steel City 6" />
            </div>
          </div>
          <div id='shadowed-valley' className="row image-row first-row">
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
