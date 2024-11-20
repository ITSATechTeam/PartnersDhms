import React, { useState } from 'react';
import './Setting.css';

const AccountSettings = () => {
  const [profile, setProfile] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    location: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmit = () => {
    console.log('Profile updated:', profile);
  };

  return (
    <div className="account-settings-container">
      <div className="tabs">
      <div className="nav-links">
      <a href="#">Account Setting</a>
          <a href="#">Security</a>
          <a href="#">Notifications</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Legal</a>
        </div>
      </div>
      <div className="profile-picture-section">
        <div className="profile-picture">
          <label htmlFor="fileUpload" className="upload-photo">
            <span>Upload your photo</span>
            <input type="file" id="fileUpload" className="file-input" />
          </label>
        </div>
      </div>
      <div className="form-container">
        <div className="input-group">
          <label>Full name</label>
          <input
            type="text"
            name="fullName"
            value={profile.fullName}
            placeholder="Please enter your full name"
            onChange={handleInputChange}
          />
        </div>
        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={profile.email}
            placeholder="Update your email address"
            onChange={handleInputChange}
          />
        </div>
        <div className="input-group">
          <label>Phone number</label>
          <input
            type="text"
            name="phoneNumber"
            value={profile.phoneNumber}
            placeholder="Enter your phone number"
            onChange={handleInputChange}
          />
        </div>
        <div className="input-group">
          <label>Location</label>
          <input
            type="text"
            name="location"
            value={profile.location}
            placeholder="Please enter location"
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="form-actions">
        <button className="cancel-btn" onClick={() => setProfile({ fullName: '', email: '', phoneNumber: '', location: '' })}>Cancel</button>
        <button className="save-btn" onClick={handleSubmit}>Save Changes</button>
      </div>
    </div>
  );
};

export default AccountSettings;
