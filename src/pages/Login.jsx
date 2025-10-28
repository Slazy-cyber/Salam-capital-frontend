import React, { useState } from "react";
import API from "../api";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Invalid email format";
    if (!form.password) newErrors.password = "Password is required";
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
      console.log("Sending login request with data:", form);
      const response = await API.post("/login", form);
      console.log("Login response:", response.data);
      localStorage.setItem("token", response.data.token);
      alert("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error, {
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
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #008000 55%, #ffffff 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem'
    }}>
      <style>{`
        .login-form-large {
          background: #fff;
          border-radius: 1.25rem;
          box-shadow: 0 12px 30px rgba(0,128,0,0.14);
          padding: 2rem 1.5rem;
          max-width: 520px;
          width: 100%;
          margin: 1rem;
        }
        .login-title {
          color: #006400;
          font-size: 1.75rem;
          font-weight: 700;
          margin-bottom: 1rem;
          text-align: center;
        }
        .login-input {
          font-size: 1rem;
          padding: 0.65rem 0.85rem;
          border-radius: 0.6rem;
          box-shadow: inset 0 1px 3px rgba(0,0,0,0.05), 0 6px 18px rgba(0,128,0,0.06);
          border: 1px solid rgba(0,0,0,0.08);
        }
        .login-input.is-invalid { box-shadow: 0 0 0 0.2rem rgba(220,53,69,0.12); }
        .login-btn {
          font-size: 1.05rem;
          padding: 0.6rem 0;
          border-radius: 0.6rem;
        }
        .login-footer { text-align: center; margin-top: 1rem; }

        @media (max-width: 576px) {
          .login-form-large { padding: 1rem 0.85rem; border-radius: 1rem; margin: 0.5rem; }
          .login-title { font-size: 1.25rem; }
          .login-input { font-size: 0.95rem; padding: 0.55rem 0.65rem; }
          .login-btn { font-size: 1rem; }
        }

        @media (min-width: 577px) and (max-width: 992px) {
          .login-form-large { padding: 1.5rem 1rem; }
          .login-title { font-size: 1.5rem; }
        }
      `}</style>

      <form className="login-form-large" onSubmit={handleSubmit} noValidate>
        <div className="login-title">Login</div>

        {errors.submit && (
          <div className="alert alert-danger" role="alert">
            {errors.submit}
          </div>
        )}

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            id="email"
            type="email"
            className={`form-control login-input ${errors.email ? "is-invalid" : ""}`}
            placeholder="Email"
            value={form.email}
            onChange={handleInputChange("email")}
            disabled={isLoading}
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            id="password"
            type="password"
            className={`form-control login-input ${errors.password ? "is-invalid" : ""}`}
            placeholder="Password"
            value={form.password}
            onChange={handleInputChange("password")}
            disabled={isLoading}
          />
          {errors.password && <div className="invalid-feedback">{errors.password}</div>}
        </div>

        <button className="btn btn-success w-100 login-btn" type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Logging in...
            </>
          ) : (
            "Login"
          )}
        </button>

        <div className="login-footer">
          <p className="mt-3 mb-0">Don't have an account? <Link to="/signup">Sign Up</Link></p>
        </div>
      </form>
    </div>
  );
}