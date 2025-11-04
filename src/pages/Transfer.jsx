import React, { useState } from "react";
import API from "../api";
import { Link } from "react-router-dom";
import "./Transfer.css";

export default function Transfer() {
  const [recipientAccount, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleTransfer = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await API.post("/transfer", { recipientAccount, amount });
      alert("Transfer successful!");
      setRecipient("");
      setAmount("");
    } catch (error) {
      alert(error.response?.data?.msg || "Transfer failed!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="transfer-container">
      <Link to="/dashboard" className="back-link">
        ← Back to Dashboard
      </Link>
      
      <div className="transfer-card">
        <h3 className="transfer-title">Transfer Funds</h3>
        <p className="transfer-subtitle">Send money to another account securely</p>
        
        <form onSubmit={handleTransfer} className="transfer-form">
          <div className="form-group">
            <label className="form-label">Recipient Account Number</label>
            <input 
              className="form-input" 
              placeholder="Enter account number" 
              value={recipientAccount} 
              onChange={(e) => setRecipient(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Amount (₦)</label>
            <input 
              className="form-input" 
              type="number" 
              placeholder="Enter amount" 
              value={amount} 
              onChange={(e) => setAmount(e.target.value)}
              required
              min="1"
            />
          </div>
          
          <button 
            className="btn-transfer" 
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Transfer Now"}
          </button>
        </form>
      </div>
    </div>
  );
}
