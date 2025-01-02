import React, { useState } from "react";
import "./Wallet.css";
import {
  MoreVert,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import Pagination from "../../components/Pagination/Pagination"; // Use Material UI's Pagination
import FilterBar from "../Wallet/Bar"; // Adjust import based on where Bar component is located
import SendMoneyModal from "../../components/Modals/SendMoney"; // Adjust path if needed
import TransactionDetailModal from "../../components/Modals/TransactionDetail"; // Adjust import if necessary
import Bar from "../Wallet/Bar"; // Make sure to import the Bar component if it's used
import FundWalletModal from "../../components/Modals/FundWallet"; // Import FundWalletModal component

const Wallet = () => {
  // State to toggle visibility of the wallet balance
  const [showBalance, setShowBalance] = useState(true);
  const [isSendMoneyModalOpen, setSendMoneyModalOpen] = useState(false);
  const [isTransactionModalOpen, setTransactionModalOpen] = useState(false);
  const [isFundWalletModalOpen, setFundWalletModalOpen] = useState(false); // State for Fund Wallet modal
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  // State for search and filter functionality
  const [searchText, setSearchText] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  // Function to toggle the wallet balance visibility
  const toggleBalanceVisibility = () => {
    setShowBalance((prevState) => !prevState);
  };

  const openSendMoneyModal = () => {
    setSendMoneyModalOpen(true);
  };

  const closeSendMoneyModal = () => {
    setSendMoneyModalOpen(false);
  };

  const openTransactionModal = (transaction) => {
    setSelectedTransaction(transaction);
    setTransactionModalOpen(true);
  };

  const closeTransactionModal = () => {
    setTransactionModalOpen(false);
    setSelectedTransaction(null);
  };

  const openFundWalletModal = () => {
    setFundWalletModalOpen(true);
  };

  const closeFundWalletModal = () => {
    setFundWalletModalOpen(false);
  };

  // Sample transactions (ensure this is defined)
  const transactions = [
    {
      id: "TXN123456789",
      description: "Payment from ITSA",
      amount: 5000,
      date: "April 22, 2024",
      status: "Successful",
    },
    {
      id: "TXN987654321",
      description: "Transfer to Augustine Solomon",
      amount: -12000,
      date: "April 22, 2024",
      status: "Failed",
    },
    {
      id: "TXN876543210",
      description: "Transfer to Augustine Tracy",
      amount: -8000,
      date: "April 22, 2024",
      status: "Failed",
    },
    {
      id: "TXN765432109",
      description: "Wallet funded",
      amount: 155000,
      date: "April 22, 2024",
      status: "Successful",
    },
  ];

  const transactionHistory = [
    {
      id: "TXN123456789",
      description: "Payment from ITSA",
      unitCost: 12000,
      date: "1 Feb, 2020",
      status: "Failed",
      amount: 12000,
      sender: "ITSA",
      accountNumber: "12345678",
    },
    {
      id: "TXN987654321",
      description: "Sent to John Doe",
      unitCost: 80000,
      date: "22 Oct, 2020",
      status: "Successful",
      amount: -80000,
      sender: "John Doe",
      accountNumber: "87654321",
    },
    {
      id: "TXN123456789",
      description: "Funded Wallet",
      unitCost: 10000,
      date: "24 May, 2020",
      status: "Reversed",
      amount: 10000,
      sender: "Bank Transfer",
      accountNumber: "12345678",
    },
    {
      id: "TXN987654321",
      description: "Payment from ITSA",
      unitCost: 12000,
      date: "8 Sep, 2020",
      status: "Successful",
      amount: 12000,
      sender: "ITSA",
      accountNumber: "12345678",
    },
  ];

  // Filter and search logic
  const filteredTransactions = transactionHistory.filter((transaction) => {
    // Filter by status
    if (filterStatus !== "All" && transaction.status !== filterStatus) {
      return false;
    }

    // Search by description or transaction ID
    const searchRegex = new RegExp(searchText, "i");
    return (
      searchRegex.test(transaction.description) ||
      searchRegex.test(transaction.id)
    );
  });

  return (
    <div className="wallet-wrapper">
      <h2>Wallet</h2>
      <p>Manage wallet transactions efficiently</p>

      <div className="wallet-section">
        <div className="wallet-balance">
          <div className="wallets">
            <h3>Wallet Balance</h3>
            <div className="balance-container">
              <h2>{showBalance ? "₦3,000.00" : "******"}</h2>
              {showBalance ? (
                <VisibilityOff
                  className="visibility-icon"
                  onClick={toggleBalanceVisibility}
                />
              ) : (
                <Visibility
                  className="visibility-icon"
                  onClick={toggleBalanceVisibility}
                />
              )}
            </div>
          </div>
          <div className="wallet-actions">
            <button className="wallet-button fund" onClick={openFundWalletModal}>
              Fund Wallet
            </button>
            <button className="wallet-button send" onClick={openSendMoneyModal}>
              Send Money
            </button>
            <button className="wallet-button request">Request Payment</button>
          </div>
        </div>

        {/* Send Money Modal */}
        <SendMoneyModal isOpen={isSendMoneyModalOpen} onClose={closeSendMoneyModal} />

        {/* Fund Wallet Modal */}
        <FundWalletModal isOpen={isFundWalletModalOpen} onClose={closeFundWalletModal} />

        {/* Search and Filter Section */}
       

        <div className="recent-transactions">
          <h3>Recent Transactions</h3>
          {transactions.map((transaction, index) => (
            <div
              key={index}
              className="transaction"
              onClick={() => openTransactionModal(transaction)}
            >
              <div>
                <span
                  className={`transaction-icon ${
                    transaction.amount > 0 ? "income" : "expense"
                  }`}
                >
                  {transaction.amount > 0 ? "↘" : "↗"}
                </span>
                <span>{transaction.description}</span>
                <p>{transaction.date}</p>
              </div>
              <span
                className={`amount ${
                  transaction.amount > 0 ? "income" : "expense"
                }`}
              >
                ₦{Math.abs(transaction.amount).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="transaction-history">
        <h3>Transaction History</h3>
        <div className="transaction-table">
        <Bar 
          searchText={searchText}
          setSearchText={setSearchText}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
        />

          <table className="table1">
            <thead>
              <tr>
                <th>
                  <input type="checkbox" />
                </th>
                <th>Transaction ID</th>
                <th>Description</th>
                <th>Unit cost (N)</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((transaction, index) => (
                <tr key={index} onClick={() => openTransactionModal(transaction)}>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>{transaction.id}</td>
                  <td>{transaction.description}</td>
                  <td>{transaction.unitCost.toLocaleString()}</td>
                  <td>{transaction.date}</td>
                  <td>
                    <span className={`status ${transaction.status.toLowerCase()}`}>
                      {transaction.status}
                    </span>
                  </td>
                  <td>
                    <MoreVert style={{ cursor: "pointer" }} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Pagination count={10} />
      </div>

      {/* Transaction Detail Modal */}
      <TransactionDetailModal
        isOpen={isTransactionModalOpen}
        onClose={closeTransactionModal}
        transaction={selectedTransaction}
      />
    </div>
  );
};

export default Wallet;

