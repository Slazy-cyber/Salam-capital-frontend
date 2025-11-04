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

      const res = await API.post("/airtime", {
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
    <div 
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 25%, #1db954 75%, #0ea56a 100%)",
        padding: "40px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <div 
        className="container" 
        style={{ 
          maxWidth: "450px",
          background: "rgba(255, 255, 255, 0.98)",
          borderRadius: "20px",
          padding: "40px 30px",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
          backdropFilter: "blur(10px)"
        }}
      >
        <h3 style={{ 
          textAlign: "center", 
          marginBottom: "30px",
          background: "linear-gradient(135deg, #667eea 0%, #1db954 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontWeight: "700",
          fontSize: "2rem"
        }}>
          Buy Airtime
        </h3>
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
    </div>
  );
}
