import React from 'react';
import { Button } from '../Button';
import './Resume.css';

const Resume = () => {
  return (
    <div className="resume-container">
      <div className="resume-message">
        <p>For resume, contact <a href="mailto:jack@jacksunn.com">jack@jacksunn.com</a></p>
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