import React, { useState } from 'react';
import './PinConfirmation.css';
import RequestAccepted from './RequestAccepted';

const PinConfirmationModal = ({ isOpen, onClose }) => {
  const [pin, setPin] = useState(['', '', '', '']);
  const [isRequestAcceptedOpen, setIsRequestAcceptedOpen] = useState(false);

  const handlePinChange = (index, value) => {
    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);
  };

  const handleConfirm = () => {
    if (pin.every((digit) => digit !== '')) {
      setIsRequestAcceptedOpen(true);
      onClose();
    }
  };

  const closeRequestAcceptedModal = () => {
    setIsRequestAcceptedOpen(false);
  };

  return (
    <>
      {/* Pin Confirmation Modal */}
      {isOpen && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <button className="close-button" onClick={onClose}>
              &times;
            </button>
            <h2>Enter Wallet PIN to Confirm Transaction</h2>
            <p>For security reasons, please enter your Wallet PIN to proceed with this transaction.</p>
            <div className="pin-inputs">
              {pin.map((digit, index) => (
                <input
                  key={index}
                  type="password"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handlePinChange(index, e.target.value)}
                />
              ))}
            </div>
            <button className="confirm-button" onClick={handleConfirm}>
              Confirm
            </button>
          </div>
        </div>
      )}

      {/* Request Accepted Modal */}
      {isRequestAcceptedOpen && (
        <RequestAccepted
          isOpen={isRequestAcceptedOpen}
          onClose={closeRequestAcceptedModal}
        />
      )}
    </>
  );
};

export default PinConfirmationModal;