import React, { useState, useEffect } from "react";
import API from "../api";

export default function Transfer() {
  const [recipientAccount, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [transactions, setTransactions] = useState([]);

 
  const fetchTransactions = async () => {
    try {
      const res = await API.get("/history");
      setTransactions(res.data);
    } catch (err) {
      console.error("Error fetching transactions:", err);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleTransfer = async (e) => {
    e.preventDefault();
    try {
      await API.post("/transfer", { recipientAccount, amount });
      alert("Transfer successful!");
      setRecipient("");
      setAmount("");
      fetchTransactions();
    } catch (err) {
      alert(err.response?.data?.msg || "Transfer failed");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      {/* <h3>Transfer Funds</h3>
      <form onSubmit={handleTransfer}>
        <input
          className="form-control mb-2"
          placeholder="Recipient Account Number"
          value={recipientAccount}
          onChange={(e) => setRecipient(e.target.value)}
        />
        <input
          className="form-control mb-2"
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button className="btn btn-primary w-100">Transfer</button>
      </form> */}

      <hr />
      <h5>Transaction History</h5>
      {transactions.length === 0 ? (
        <p>No transactions yet.</p>
      ) : (
        <ul className="list-group">
          {transactions.map((tx) => (
            <li key={tx._id} className="list-group-item">
              <div className="d-flex justify-content-between">
                <span>{tx.description}</span>
                <span>₦{tx.amount}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
