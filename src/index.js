import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App'; // Ensure App is imported

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter basename="/personal-website">
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
