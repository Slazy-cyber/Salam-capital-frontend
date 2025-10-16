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
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h3 className="mb-4 text-center">Login</h3>
      {errors.submit && (
        <div className="alert alert-danger" role="alert">
          {errors.submit}
        </div>
      )}
      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            id="email"
            type="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            placeholder="Email"
            value={form.email}
            onChange={handleInputChange("email")}
            disabled={isLoading}
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            id="password"
            type="password"
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
            placeholder="Password"
            value={form.password}
            onChange={handleInputChange("password")}
            disabled={isLoading}
          />
          {errors.password && <div className="invalid-feedback">{errors.password}</div>}
        </div>

        <button className="btn btn-primary w-100" type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Logging in...
            </>
          ) : (
            "Login"
          )}
        </button>
      </form>
      <p className="text-center mt-3">
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
}