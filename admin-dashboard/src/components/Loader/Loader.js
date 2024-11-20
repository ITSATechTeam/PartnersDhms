import React from 'react';
import './Loader.css';
import logo from '../../img/itsda-logo-1-1.png';

function Loader() {
  return (
    <div className="loaderOverlay">
      <img src={logo} alt="Loading..." className="loaderImage" />
    </div>
  );
}

export default Loader;
