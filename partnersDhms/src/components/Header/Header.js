
import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <div className="header">
      <input type="text" className="search-bar" placeholder="Search devices" />
      <div className="user-profile">
        <img src="/path-to-profile-image.jpg" alt="Profile" className="profile-pic" />
        <span>John Doe</span>
      </div>
    </div>
  );
};

export default Header;
        