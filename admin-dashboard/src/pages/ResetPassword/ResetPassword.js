import React, { useState } from 'react';
import axios from 'axios';
import image1 from '../../img/forgot-password-cuate.png'
import image2 from '../../img/check0.svg'
import "./ResetPassword.css";
// import "./styleguide.css";
// import "./style.css";



const ResetPassword = () => {
  const [email, setEmail] = useState('');

  const sendResetLink = async () => {
    if (!email) {
      alert('Please enter your email address.');
      return;
    }

    try {
      const response = await axios.post('https://example.com/api/reset-password', {
        email: email,
      });

      if (response.status === 200) {
        alert('Password reset link has been sent to your email.');
      } else {
        alert('Failed to send reset link. Please try again later.');
      }
    } catch (error) {
      alert('An error occurred: ' + error.message);
    }
  };

  return (
    <div className="forgot-password">
           {/* Clickable ITSA Logo */}
      <a href="https://itservicedeskafrica.com/" target="_blank" aria-label="Visit ITSA website">
        <div className="ITSA-logo"></div>
      </a>
      <div className="sign-up">
        <div className="div">
          <div className="frame">
            <div className="div-wrapper">
              <div className="text-wrapper">Reset Your Password</div>
            </div>
            <div className="group">
              <p className="p">
                Please enter your registered email address to receive a password reset link
              </p>
            </div>
          </div>
          <div className="frame-2">
            <div className="frame-wrapper">
              <div className="frame-3">
                <label className="label" htmlFor="email-input">Email</label>
                <div className="input-text-wrapper">
                  <input
                    className="input-text"
                    placeholder="Enter your Email"
                    type="email"
                    id="email-input"
                    aria-label="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
            </div>
            {/* Send Reset Link Button */}
            <button className="button" onClick={sendResetLink} aria-label="Send Reset Link">
              <div className="primary-button">
                <div className="visit-ITSA-website">Send Reset Link</div>
              </div>
            </button>
          </div>
        </div>
      </div>
   
      {/* Image Displayed */}
      <img
        className="img"
        src={image1}
        alt="Illustration of resetting a forgotten password"
      />
    </div>
  );
};

export default ResetPassword;
