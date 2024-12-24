import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import '../components/pages/Arts.css'; // Corrected the import path
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const Sandpainting = () => {
  return (
    <div className="container-fluid arts-container">
      <div className="row flex-nowrap">
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-light left-container">
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
              
              {/* Photography Section */}
              <li className="nav-item">
                <Link to="/arts#steel-city" className="nav-link align-middle px-0 title">
                  <span className="ms-1 d-none d-sm-inline">Photography</span>
                </Link>
                <ul className="nav flex-column ms-3 subtitle-list">
                  <li className="nav-item subtitle">
                    <Link to="/arts#steel-city" className="nav-link px-0"> <span className="d-none d-sm-inline">Steel City</span></Link>
                  </li>
                  <li className="nav-item subtitle">
                    <Link to="/arts#shadowed-valley" className="nav-link px-0"> <span className="d-none d-sm-inline">Shadowed Valleys</span></Link>
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
                    <Link to="/sandpainting#macbeth" className="nav-link px-0"> <span className="d-none d-sm-inline">Macbeth</span></Link>
                  </li>
                </ul>
              </li>
              
            </ul>
          </div>
        </div>

        <div className="col py-3 photography-container">
          <h3>Macbeth</h3>
          <div className="row image-row second-row">
            <div className="col-12 mb-4">
                <iframe width="960" height="640" src="https://www.youtube.com/embed/yci6vpEMu1c?si=sWH-VmYQoy8awIFQ&amp;start=12" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sandpainting;
