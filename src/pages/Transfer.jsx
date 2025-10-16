import React, { useState } from "react";
import API from "../api";

export default function Transfer() {
  const [recipientAccount, setRecipient] = useState("");
  const [amount, setAmount] = useState("");

  const handleTransfer = async (e) => {
    e.preventDefault();
    await API.post("/transfer", { recipientAccount, amount });
    alert("Transfer successful!");
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h3>Transfer Funds</h3>
      <form onSubmit={handleTransfer}>
        <input className="form-control mb-2" placeholder="Recipient Account Number" value={recipientAccount} onChange={(e) => setRecipient(e.target.value)} />
        <input className="form-control mb-2" type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
        <button className="btn btn-primary w-100">Transfer</button>
      </form>
    </div>
  );
}
