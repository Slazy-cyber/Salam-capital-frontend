import React, { useEffect, useState } from "react";
import API from "../api";

export default function History() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    API.get("/transactions/history").then((res) => setTransactions(res.data));
  }, []);

  return (
    <div className="container mt-5">
      <h3>Transaction History</h3>
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>Type</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <tr key={t._id}>
              <td>{t.type}</td>
              <td>{t.description}</td>
              <td>₦{t.amount}</td>
              <td>{new Date(t.date).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
