// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Signup from "./pages/Signup";
// import Login from "./pages/Login";
// import Dashboard from "./pages/Dashboard";
// import Transfer from "./pages/Transfer";
// import Airtime from "./pages/Airtime";
// import History from "./pages/History";
// import Profile from "./pages/Profile";
// import Navbar from "./components/Navbar";

// function App() {
//   const isAuth = localStorage.getItem("token");

//   return (
//     <Router>
//       {isAuth && <Navbar />}
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/dashboard" element={isAuth ? <Dashboard /> : <Navigate to="/signup" />} />
//         <Route path="/transfer" element={isAuth ? <Transfer /> : <Navigate to="/signup" />} />
//         <Route path="/airtime" element={isAuth ? <Airtime /> : <Navigate to="/signup" />} />
//         <Route path="/history" element={isAuth ? <History /> : <Navigate to="/signup" />} />
//         <Route path="/profile" element={isAuth ? <Profile /> : <Navigate to="/signup" />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;



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

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/" />;
};

function App() {
  const isAuth = localStorage.getItem("token");

  return (
    <Router>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/transfer" element={<ProtectedRoute><Transfer /></ProtectedRoute>} />
        <Route path="/airtime" element={<ProtectedRoute><Airtime /></ProtectedRoute>} />
        <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      </Routes>

    </Router>
  );
}

export default App;

