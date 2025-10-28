import React, { useEffect, useState } from "react";
import API from "../api";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import TransferIcon from "../components/icons/TransferIcon";
import WithdrawIcon from "../components/icons/WithdrawIcon";
import AirtimeIcon from "../components/icons/AirtimeIcon";
import HistoryIcon from "../components/icons/HistoryIcon";
import CardIcon from "../components/icons/CardIcon";
import BankIcon from "../components/icons/BankIcon";
import "./Dashboard.css";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      try {

        const response = await API.get("/me");

        setUser(response.data);
      } catch (err) {
        console.error("Dashboard error:", err, {
          code: err.code,
          message: err.message,
          response: err.response?.data,
        });
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/dashboard");
        }
        setError(err.response?.data?.msg || "Failed to fetch user data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5 text-center">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mt-5 text-center">
        <div className="alert alert-warning" role="alert">
          No user data available
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <div className="dashboard-container">
        <div className="dashboard-row">
          <div className="summary-col">
            <div className="card summary-card">
              <div className="summary-title" style={{ fontWeight: 400, fontSize: '1.4rem' }}>Welcome</div>
              <h2 style={{ fontWeight: 800, fontSize: '1.8rem' }}>
                {user.firstName} {user.lastName}
              </h2>
              <div className="account-number" style={{ fontWeight: 600 }}>Account Number: {user.accountNumber}</div>
              <div className="balance mt-3">
                <div className="summary-title">Available Balance</div>
                <div className="balance-amount">
                  ₦{typeof user.balance === "number" ? user.balance.toLocaleString("en-NG") : "N/A"}
                </div>
              </div>
            </div>


            <div className="card actions-card" style={{ marginTop: 24, marginBottom: 24 }}>
              <div className="actions actions-outside">
                <Link to="/transfer" className="btn-action btn-primary btn-transfer">
                  <TransferIcon size={60} className="icon" />
                  <span>Transfer</span>
                </Link>

                <Link to="/withdraw" className="btn-action btn-outline btn-withdraw">
                  <WithdrawIcon size={60} className="icon" />
                  <span>Withdraw</span>
                </Link>


                <Link to="/fund" className="btn-action btn-outline btn-fund">
                  <BankIcon size={60} className="icon" />
                  <span>Add Fund</span>
                </Link>

                <Link to="/airtime" className="btn-action btn-outline btn-airtime">
                  <AirtimeIcon size={60} className="icon" />
                  <span>Airtime</span>
                </Link>

                <Link to="/history" className="btn-action btn-outline btn-history">
                  <HistoryIcon size={60} className="icon" />
                  <span>History</span>
                </Link>

                <Link to="/cardpage" className="btn-action btn-outline btn-history">
                  <CardIcon size={60} className="icon" />
                  <span>Card</span>
                </Link>


              </div>
            </div>


            <div className="card recent-card" style={{ marginTop: 24 }}>
              <div className="summary-title">Recent Transactions</div>
              <div className="recent-list">

                {(user.transactions && user.transactions.length > 0) ? (
                  user.transactions.slice(0, 5).map((t, idx) => (
                    <div className="recent-item" key={idx}>
                      <div className="recent-desc">{t.description || t.type || 'Transaction'}</div>
                      <div className="recent-amount">{t.amount ? `₦${Number(t.amount).toLocaleString('en-NG')}` : ''}</div>
                    </div>
                  ))
                ) : (
                  <div className="mt-2"> recent activity</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
