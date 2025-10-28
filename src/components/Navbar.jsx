import React from "react";
import { Link, useNavigate } from "react-router-dom";
import BankIcon from './icons/BankIcon';

export default function Navbar() {
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark px-3" style={{ backgroundColor: '#1db954' }}>
            <div className="container-fluid">
                <Link className="navbar-brand d-flex align-items-center" to="/dashboard">
                    <BankIcon size={20} className="me-2" aria-hidden="true" />
                    <span>Salaam Capital</span>
                </Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNavbar" aria-controls="mainNavbar" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="mainNavbar">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center">
                        <li className="nav-item">
                            <Link className="nav-link text-light" to="/profile">Profile</Link>
                        </li>
                        <li className="nav-item d-lg-flex d-block">
                            <button className="btn btn-danger btn-sm ms-lg-3 mt-2 mt-lg-0" onClick={logout}>Logout</button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
