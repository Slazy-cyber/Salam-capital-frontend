import React, { useState } from "react";
import API from "../api";
import { useNavigate, Link } from "react-router-dom";

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
      console.log("Sending signup request with data:", form);
      const response = await API.post("/signup", form);
      console.log("Signup response:", response.data);
      alert("Signup successful! Please login.");
      navigate("/");
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
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h3 className="mb-4 text-center">Sign Up</h3>
      {errors.submit && (
        <div className="alert alert-danger" role="alert">
          {errors.submit}
        </div>
      )}
      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">
            First Name
          </label>
          <input
            id="firstName"
            className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
            placeholder="First Name"
            value={form.firstName}
            onChange={handleInputChange("firstName")}
            disabled={isLoading}
          />
          {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">
            Last Name
          </label>
          <input
            id="lastName"
            className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
            placeholder="Last Name"
            value={form.lastName}
            onChange={handleInputChange("lastName")}
            disabled={isLoading}
          />
          {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
        </div>

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
              Signing up...
            </>
          ) : (
            "Sign Up"
          )}
        </button>
      </form>
      <p className="text-center mt-3">
        Already have an account? <Link to="/">Login</Link>
      </p>
    </div>
  );
}