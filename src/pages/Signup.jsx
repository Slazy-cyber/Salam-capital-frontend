import React, { useState } from "react";
import API from "../api";
import { useNavigate, Link } from "react-router-dom";
import BankIcon from '../components/icons/BankIcon';

export default function Signup() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!form.firstName.trim()) newErrors.firstName = "First name is required";
    if (!form.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Invalid email format";
    if (!form.password) newErrors.password = "Password is required";
    else if (form.password.length < 8) newErrors.password = "Password must be at least 8 characters";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    try {

      const response = await API.post("/signup", form);

      alert("Signup successful! Please login.");
      navigate("/login");
    } catch (error) {
      console.error("Signup error:", error, {
        code: error.code,
        message: error.message,
        response: error.response?.data,
      });
      setErrors({
        submit: error.response?.data?.msg || "Network error: Could not reach the server",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: null });
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #008000 60%, #fff 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      padding: "1rem",
      margin: 0,
    }}>
      <style>{`
        .signup-form-large {
          background: #fff;
          border-radius: 1.25rem;
          box-shadow: 0 8px 32px 0 rgba(0,128,0,0.15);
          padding: 2.25rem 1.75rem;
          max-width: 520px;
          width: 100%;
          margin: 1.5rem auto;
        }
        .signup-title {
          color: #008000;
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 1.25rem;
          text-align: center;
        }
        .signup-input {
          font-size: 1rem;
          padding: 0.6rem 0.75rem;
        }
        .signup-btn {
          font-size: 1.05rem;
          padding: 0.6rem 0;
        }
        .signup-link {
          color: #008000;
          font-weight: 500;
        }

        /* Small screens */
        @media (max-width: 576px) {
          .signup-form-large {
            padding: 1.25rem 1rem;
            border-radius: 1rem;
            margin: 1rem 0.5rem;
          }
          .signup-title { font-size: 1.5rem; }
          .signup-input { font-size: 0.95rem; }
          .signup-btn { font-size: 1rem; }
        }

        /* Medium screens */
        @media (min-width: 577px) and (max-width: 992px) {
          .signup-form-large { padding: 1.75rem 1.25rem; }
          .signup-title { font-size: 1.75rem; }
        }
      `}</style>
      <form className="signup-form-large" onSubmit={handleSubmit} noValidate>
        <div className="signup-title mb-2 d-flex align-items-center justify-content-center">
          <BankIcon size={28} className="me-2" aria-hidden="true" />
          <span>Salaam Capital</span>
        </div>
        <div className="signup-title">Sign Up</div>
        {errors.submit && (
          <div className="alert alert-danger" role="alert">
            {errors.submit}
          </div>
        )}
        <div className="mb-4">
          <label htmlFor="firstName" className="form-label">
            First Name
          </label>
          <input
            id="firstName"
            className={`form-control signup-input ${errors.firstName ? "is-invalid" : ""}`}
            placeholder="First Name"
            value={form.firstName}
            onChange={handleInputChange("firstName")}
            disabled={isLoading}
          />
          {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
        </div>
        <div className="mb-4">
          <label htmlFor="lastName" className="form-label">
            Last Name
          </label>
          <input
            id="lastName"
            className={`form-control signup-input ${errors.lastName ? "is-invalid" : ""}`}
            placeholder="Last Name"
            value={form.lastName}
            onChange={handleInputChange("lastName")}
            disabled={isLoading}
          />
          {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            id="email"
            type="email"
            className={`form-control signup-input ${errors.email ? "is-invalid" : ""}`}
            placeholder="Email"
            value={form.email}
            onChange={handleInputChange("email")}
            disabled={isLoading}
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            id="password"
            type="password"
            className={`form-control signup-input ${errors.password ? "is-invalid" : ""}`}
            placeholder="Password"
            value={form.password}
            onChange={handleInputChange("password")}
            disabled={isLoading}
          />
          {errors.password && <div className="invalid-feedback">{errors.password}</div>}
        </div>
        <button className="btn btn-success w-100 signup-btn" type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Signing up...
            </>
          ) : (
            "Sign Up"
          )}
        </button>
        <p className="text-center mt-4">
          Already have an account? <Link className="signup-link" to="/Login">Login</Link>
        </p>
      </form>
    </div>
  );
}