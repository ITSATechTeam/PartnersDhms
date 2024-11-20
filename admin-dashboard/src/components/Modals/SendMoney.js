import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SendMoney.css';
import PinConfirmationModal from './PinConfirmation'; // Import PinConfirmationModal component

const SendMoneyModal = ({ isOpen, onClose }) => {
  const [banks, setBanks] = useState([]);
  const [selectedBank, setSelectedBank] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isPinModalOpen, setPinModalOpen] = useState(false); // State for PIN modal visibility
  const [formData, setFormData] = useState({
    account: '',
    amount: '',
    description: ''
  });

  const paystackSecretKey = 'YOUR_PAYSTACK_SECRET_KEY'; // Replace this with your actual Paystack secret key

  useEffect(() => {
    if (isOpen) {
      const fetchBanks = async () => {
        try {
          setIsLoading(true);
          const response = await axios.get('https://api.paystack.co/bank', {
            headers: { Authorization: `Bearer ${paystackSecretKey}` }
          });
          setBanks(response.data.data);
          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching banks:", error);
          setIsLoading(false);
        }
      };
      fetchBanks();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSendMoney = (e) => {
    e.preventDefault();
    setPinModalOpen(true); // Open PIN confirmation modal when Send Money button is clicked
  };

  return (
    <div className="modal-backdrop1">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>&times;</button>
        <h2>Send Money</h2>
        <p>Transfer funds easily</p>
        <form onSubmit={handleSendMoney}>
          <div className="form-group">
            <label>Account</label>
            <input
              type="text"
              name="account"
              value={formData.account}
              onChange={handleInputChange}
              placeholder="Enter the account"
              required
            />
          </div>
          <div className="form-group">
            <label>Select Bank</label>
            {isLoading ? (
              <p>Loading banks...</p>
            ) : (
              <select
                name="bank"
                value={selectedBank}
                onChange={(e) => setSelectedBank(e.target.value)}
                required
              >
                <option value="">Select the bank</option>
                {banks.map((bank) => (
                  <option key={bank.id} value={bank.code}>
                    {bank.name}
                  </option>
                ))}
              </select>
            )}
          </div>
          <div className="form-group">
            <label>Amount (₦)</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleInputChange}
              placeholder="Enter amount"
              required
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter a description for this transaction"
              required
            />
          </div>
          <button className="send-button" type="submit">Send Money</button>
        </form>

        {/* PIN Confirmation Modal */}
        <PinConfirmationModal
          isOpen={isPinModalOpen}
          onClose={() => setPinModalOpen(false)}
        />
      </div>
    </div>
  );
};

export default SendMoneyModal;
