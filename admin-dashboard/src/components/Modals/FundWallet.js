import React from "react";
import "./FundWallet.css";

const FundWalletModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className='modal-overlay'>
      <div className='modal-content'>
        <button className='close-button' onClick={onClose}>
          &times;
        </button>
        <h2>Fund Wallet</h2>
        <p>Add funds to your wallet to make transactions easy</p>

        <div className='account-details'>
          <div className='account-info'>
            <p>Account Name</p>
            <p className='account-value'>Augustine Solomon</p>
          </div>
          <div className='account-info'>
            <p>Account Number</p>
            <p className='account-value'>
              8073435003 <span className='copy-icon'>📋</span>
            </p>
          </div>
          <div className='account-info'>
            <p>Bank</p>
            <p className='account-value'>Wema Bank</p>
          </div>
        </div>

        <div className='instructions'>
          <div className='instructions-header'>
            <div className='info-icon'>ℹ️</div>
            <h4>Instructions</h4>
          </div>
          <p>
            Use this account to transfer funds. Confirmed funds will be added to
            your wallet.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FundWalletModal;
