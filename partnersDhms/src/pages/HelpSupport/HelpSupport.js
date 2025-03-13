// Help.js
import React from "react";
import "./HelpSupport.css";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import FeedbackIcon from '@mui/icons-material/Feedback';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from "react-router-dom";

const Help = () => {
  const navigate = useNavigate(); // Allows navigation programmatically

  return (
    <div className='help-container'>
      <div className='help-text'>
        <h2>Help and Support</h2>
        <p>How can we help you?</p>
        <div className='help-bar'>
          <div className='search-container1'>
            <SearchIcon className='search-icon1' />
            <input
              type='text'
              className='help-search'
              placeholder='Search for devices'
            />
          </div>
        </div>
      </div>
      <div className='cards-container'>
        <div 
          className='card faqs-card' 
          onClick={() => navigate("/faqs")}
          style={{ cursor: 'pointer' }}
        >
          <div className='card-icon faqs-icon'>
            <HelpOutlineIcon />
          </div>
          <h3>FAQs</h3>
          <p>Frequently asked questions for technicians</p>
        </div>
        <div className='card contact-card'>
          <div className='card-icon contact-icon'>
            <ContactMailIcon />
          </div>
          <h3>Contact Admin</h3>
          <p>Get in touch for assistance and support</p>
        </div>
        <div className='card feedback-card'>
          <div className='card-icon feedback-icon'>
            <FeedbackIcon />
          </div>
          <h3>Leave a Feedback</h3>
          <p>Share Your Thoughts and Help Us Improve Our Services!</p>
        </div>
      </div>
    </div>
  );
};

export default Help;
