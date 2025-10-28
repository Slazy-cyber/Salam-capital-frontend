import React, { useState } from "react";
import API from "../api";

export default function Airtime() {
  const [network, setNetwork] = useState("MTN");
  const [amount, setAmount] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleAirtime = async (e) => {
    e.preventDefault();

    if (!phone || !amount) {
      return setMessage("Please enter phone number and amount.");
    }

    try {
      setLoading(true);
      setMessage("");

      const res =await API.post("/airtime", {
        network,
        amount,
        phone,
      });

      if (res.status === 200) {
        setMessage(`Airtime of ₦${amount} to ${phone} purchased successfully!`);
        setAmount("");
        setPhone("");
      }
    } catch (error) {
      console.error("Airtime purchase error:", error);
      setMessage(error.response?.data?.msg || "Failed to buy airtime.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h3>Buy Airtime</h3>
      <form onSubmit={handleAirtime}>
        <select
          className="form-control mb-2"
          value={network}
          onChange={(e) => setNetwork(e.target.value)}
        >
          <option>MTN</option>
          <option>GLO</option>
          <option>AIRTEL</option>
          <option>9MOBILE</option>
        </select>

        <input
          className="form-control mb-2"
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          className="form-control mb-2"
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <button className="btn btn-success w-100" disabled={loading}>
          {loading ? "Processing..." : "Buy Airtime"}
        </button>
      </form>

      {message && (
        <div className="alert alert-info text-center mt-3">{message}</div>
      )}
    </div>
  );
}
