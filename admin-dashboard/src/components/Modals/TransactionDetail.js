import React from "react";
import "./TransactionDetail.css";
import { GetApp, Print } from "@mui/icons-material";

const TransactionDetailModal = ({ isOpen, onClose, transaction }) => {
  if (!isOpen || !transaction) return null;

  // Function to handle downloading the receipt
  const handleDownload = () => {
    const receiptContent = `
      Transaction ID: ${transaction.id}
      Date: ${transaction.date}
      Time: ${transaction.time || "N/A"}
      Amount: ₦${transaction.amount.toLocaleString()}
      Sender/Receiver: ${transaction.sender}
      Account Number: ${transaction.accountNumber}
      Description: ${transaction.description}
      Status: ${transaction.status}
    `;
    const blob = new Blob([receiptContent], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${transaction.id}_receipt.txt`;
    link.click();
  };

  // Function to handle printing the receipt
  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head><title>Transaction Receipt</title></head>
        <body>
          <h2>Transaction Receipt</h2>
          <p><strong>Date:</strong> ${transaction.date}</p>
          <p><strong>Time:</strong> ${transaction.time || "N/A"}</p>
          <p><strong>Transaction ID:</strong> ${transaction.id}</p>
          <p><strong>Amount:</strong> ₦${transaction.amount.toLocaleString()}</p>
          <p><strong>Sender/Receiver:</strong> ${transaction.sender}</p>
          <p><strong>Account Number:</strong> ${transaction.accountNumber}</p>
          <p><strong>Description:</strong> ${transaction.description}</p>
          <p><strong>Status:</strong> ${transaction.status}</p>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>X</button>
        <h2>Transaction Details</h2>
        <p><strong>Date:</strong> {transaction.date}</p>
        <p><strong>Time:</strong> {transaction.time || "N/A"}</p>
        <p><strong>Transaction ID:</strong> {transaction.id}</p>
        <p><strong>Amount:</strong> ₦{transaction.amount.toLocaleString()}</p>
        <p><strong>Sender/Receiver:</strong> {transaction.sender}</p>
        <p><strong>Account Number:</strong> {transaction.accountNumber}</p>
        <p><strong>Description:</strong> {transaction.description}</p>
        <p><strong>Status:</strong> {transaction.status}</p>
        <div className="modal-actions">
          <button className="download-button" onClick={handleDownload}>
            <GetApp style={{ marginRight: "5px" }} /> Download Receipt
          </button>
          <button className="print-button" onClick={handlePrint}>
            <Print style={{ marginRight: "5px" }} /> Print Receipt
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetailModal;
