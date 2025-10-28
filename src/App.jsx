import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Transfer from "./pages/Transfer";
import Airtime from "./pages/Airtime";
import History from "./pages/History";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import Withdraw from "./pages/Withdraw";
import CardPage from "./pages/Cardpage";
import FundPage from "./pages/Fund";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/" />;
};

function App() {
  const isAuth = localStorage.getItem("token");

  return (
    <Router>

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/transfer" element={<ProtectedRoute><Transfer /></ProtectedRoute>} />
        <Route path="/withdraw" element={<ProtectedRoute><Withdraw /></ProtectedRoute>} />
        <Route path="/fund" element={<ProtectedRoute><FundPage /></ProtectedRoute>} />
        <Route path="/airtime" element={<ProtectedRoute><Airtime /></ProtectedRoute>} />
        <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/cardpage" element={<ProtectedRoute><CardPage /></ProtectedRoute>} />
      </Routes>

    </Router>
  );
}

export default App;

