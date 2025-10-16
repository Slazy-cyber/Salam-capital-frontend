import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
            <Link className="navbar-brand" to="/dashboard">BankApp</Link>
            <div className="navbar-nav">
                <Link className="nav-link" to="/profile">Profile</Link>
                <button className="btn btn-danger btn-sm ms-3" onClick={logout}>Logout</button>
            </div>
        </nav>
    );
}
