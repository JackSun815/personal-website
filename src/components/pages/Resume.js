import React from 'react';
import { Button } from '../Button';
import './Resume.css'; // Ensure you have this CSS file

const Resume = () => {
  return (
    <div className="resume-container">
      <div className="button-group">
        <Button buttonStyle='btn--outline' buttonSize='btn--large' to='/about'>
          Back
        </Button>
        <Button buttonStyle='btn--primary' buttonSize='btn--large' href={require('../../files/Jack-Sun-Resume.pdf')}>
          Download PDF
        </Button>
      </div>
      <iframe
        src={require('../../files/Jack-Sun-Resume.pdf')}
        className="resume-pdf"
        frameBorder="0"
        title="Resume"
      ></iframe>
    </div>
  );
};

export default Resume;
