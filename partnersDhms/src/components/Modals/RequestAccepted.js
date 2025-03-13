import React from 'react';
import './RequestAccepted.css';

const RequestAcceptedModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <div className="accepted-icon">
          <img src="path_to_checkmark_icon.png" alt="Accepted" /> {/* Add path to the checkmark icon */}
        </div>
        <h2>Request Accepted</h2>
        <p>
          Great! You've accepted the request. The student will be notified. You
          can now begin the repair process.
        </p>
      </div>
    </div>
  );
};

export default RequestAcceptedModal;
