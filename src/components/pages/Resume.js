import React from 'react';
import { Button } from '../Button';
import './Resume.css'; // Ensure you have this CSS file

const Resume = () => {
  const resumePdf = "/files/Jack-SWE-Resume.pdf"; // Public folder path

  return (
    <div className="resume-container">
      <div className="button-group">
        <Button buttonStyle='btn--outline' buttonSize='btn--large' to='/about'>
          Back
        </Button>
        <Button buttonStyle='btn--primary' buttonSize='btn--large' href={resumePdf} download>
          Download PDF
        </Button>
      </div>
      <iframe
        src={resumePdf}
        className="resume-pdf"
        title="Resume"
      ></iframe>
    </div>
  );
};

export default Resume;