import React from 'react';
import { Button } from '../Button';
import './Resume.css';

const Resume = () => {
  return (
    <div className="resume-container">
      <div className="resume-message">
        <p>Error 418 - I'm a teapot. Brewing in progress.</p>
      </div>
      <div className="button-group">
        <Button buttonStyle='btn--outline' buttonSize='btn--large' to='/about'>
          Back
        </Button>
      </div>
    </div>
  );
};

export default Resume;