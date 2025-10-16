import React, { useState } from "react";
import API from "../api";

export default function Airtime() {
  const [network, setNetwork] = useState("MTN");
  const [amount, setAmount] = useState("");

  const handleAirtime = async (e) => {
    e.preventDefault();
    await API.post("/transactions/airtime", { network, amount });
    alert("Airtime purchased successfully!");
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h3>Buy Airtime</h3>
      <form onSubmit={handleAirtime}>
        <select className="form-control mb-2" value={network} onChange={(e) => setNetwork(e.target.value)}>
          <option>MTN</option>
          <option>GLO</option>
          <option>AIRTEL</option>
          <option>9MOBILE</option>
        </select>
        <input className="form-control mb-2" type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
        <button className="btn btn-success w-100">Buy Airtime</button>
      </form>
    </div>
  );
}
