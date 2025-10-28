import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Landing.css';

const Landing = () => {
  return (
    <div className="gradient-background">
     
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow">
        <div className="container">
          <h1 className="navbar-brand fs-3  text-success mb-0 d-flex align-items-center">
            <img src="/favicon.png" alt="Salaam Capital" className="brand-logo me-2" />
            <span>SALAAM CAPITAL</span>
          </h1>
          <div className="d-flex">
            <Link to="/login" className="btn btn-link text-dark me-2">Login</Link>
            <Link to="/signup" className="btn btn-success">Sign Up</Link>
          </div>
        </div>
      </nav>

      <div className="bg-transparent">
        <div className="container">
          <div className="row min-vh-75 align-items-center py-5">
            <div className="col-lg-6 text-center text-lg-start">
              <h2 className="display-4 fw-bold mb-4">
                <span className="d-block">Modern Banking for a</span>
                <span className="d-block text-success">Better Future</span>
              </h2>
              <p className="lead text-muted mb-5">
                Experience seamless banking with Saalam Capital. Send money, pay bills, and manage your finances all in one place.
              </p>
              <div className="d-grid gap-3 d-sm-flex">
                <Link to="/signup" className="btn btn-success btn-lg px-4">Get Started</Link>
                <Link to="/login" className="btn btn-outline-success btn-lg px-4">Login</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

    
      <div className="py-5 bg-transparent">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold">Why Choose Salaam Capital?</h2>
            <p className="lead text-muted">Experience banking that puts you first</p>
          </div>

          <div className="row g-4">
           
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body p-4">
                  <h3 className="h5 fw-bold">Secure Transactions</h3>
                  <p className="text-muted mb-0">
                    State-of-the-art security measures to protect your financial data and transactions.
                  </p>
                </div>
              </div>
            </div>

            
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body p-4">
                  <h3 className="h5 fw-bold">Easy Transfers</h3>
                  <p className="text-muted mb-0">
                    Send money instantly to anyone, anywhere, at any time with zero fees.
                  </p>
                </div>
              </div>
            </div>

            
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body p-4">
                  <h3 className="h5 fw-bold">24/7 Support</h3>
                  <p className="text-muted mb-0">
                    Our dedicated support team is always here to help you with any questions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

   
      <div className="bg-success py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8 text-white">
              <h2 className="display-5 fw-bold mb-3">Ready to get started?</h2>
              <p className="lead mb-0">Join thousands of satisfied customers today.</p>
            </div>
            <div className="col-lg-4 text-lg-end mt-4 mt-lg-0">
              <Link to="/signup" className="btn btn-light btn-lg">Create Account</Link>
            </div>
          </div>
        </div>
      </div>

   
      <footer className="bg-white py-4">
        <div className="container">
          <div className="border-top pt-4">
            <p className="text-muted text-center mb-0">© 2025 Salaam Capital. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;