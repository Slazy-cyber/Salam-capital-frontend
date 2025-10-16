import React, { useEffect, useState } from "react";
import API from "../api";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      try {
        console.log("Fetching user data from /me");
        const response = await API.get("/me");
        console.log("User data response:", response.data);
        setUser(response.data);
      } catch (err) {
        console.error("Dashboard error:", err, {
          code: err.code,
          message: err.message,
          response: err.response?.data,
        });
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/");
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

      <div className="container mt-5 text-center">
        <h2>
          Welcome {user.firstName} {user.lastName}
        </h2>
        <h4>Account Number: {user.accountNumber}</h4>
        <h3 className="mt-3">
          Balance: ₦
          {typeof user.balance === "number"
            ? user.balance.toLocaleString("en-NG")
            : "N/A"}
        </h3>
                        <Link className="nav-link" to="/transfer">Transfer</Link>
                <Link className="nav-link" to="/airtime">Airtime</Link>
                <Link className="nav-link" to="/history">History</Link>
      </div>
    </>
  );
}
