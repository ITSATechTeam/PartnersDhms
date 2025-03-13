import React, { useState } from "react";
import "./Setting.css";

const AccountSettings = () => {
  const [profilePic, setProfilePic] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <h1 className="set">Settings</h1>
      <div className="account-settings">
        <div className="tabs">
          <a href="/settings" className="active">
            Account Setting
          </a>
          <a href="/security">Security</a>
          <a href="/notifications">Notifications</a>
          <a href="/privacy-policy">Privacy Policy</a>
          <a href="/legal">Legal</a>
        </div>

        <div className="profile-section">
          <div className="profile-picture">
            <label htmlFor="upload-photo">
              {profilePic ? (
                <img src={profilePic} alt="Profile" />
              ) : (
                <>
                  <div className="upload-icon">📸+</div>
                  <p>Upload your photo</p>
                </>
              )}
            </label>
            <input
              type="file"
              id="upload-photo"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
          </div>
        </div>

        <div className="form-section">
          <div className="form-group">
            <label>Full name</label>
            <input type="text" placeholder="Please enter your full name" />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="Update your email address" />
          </div>
          <div className="form-group">
            <label>Phone number</label>
            <input type="text" placeholder="Enter your phone number" />
          </div>
          <div className="form-group">
            <label>Location</label>
            <input type="text" placeholder="Please enter location" />
          </div>
        </div>

        <div className="button-group">
          <button className="cancel-btn">Cancel</button>
          <button className="save-btn">Save Changes</button>
        </div>
      </div>
    </>
  );
};

export default AccountSettings;
