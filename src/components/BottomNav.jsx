import React from "react";
import { Link } from "react-router-dom";

const containerStyle = {
  position: "fixed",
  left: 0,
  right: 0,
  bottom: 0,
  height: 60,
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  background: "#fff",
  borderTop: "1px solid rgba(0,0,0,0.08)",
  zIndex: 1000,
};

const itemStyle = {
  color: "#444",
  textDecoration: "none",
  fontSize: 14,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const activeStyle = {
  ...itemStyle,
  color: "#0d6efd",
  fontWeight: 600,
};

export default function BottomNav({ active = "home" }) {
  const items = [
    { key: "home", label: "Home", to: "/" },
    { key: "history", label: "History", to: "/history" },
    { key: "profile", label: "Profile", to: "/profile" },
  ];

  return (
    <nav style={containerStyle} aria-label="bottom navigation">
      {items.map((it) => (
        <Link
          key={it.key}
          to={it.to}
          style={it.key === active ? activeStyle : itemStyle}
        >
          {it.label}
        </Link>
      ))}
    </nav>
  );
}
