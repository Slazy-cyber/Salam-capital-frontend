import React from "react";
import { Link } from "react-router-dom";

export default function Withdraw() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Withdraw Feature Coming Soon 🚧
      </h1>
      <p className="text-gray-600 mb-6">
        We’re working hard to bring this feature to you. Stay tuned!
      </p>
      <Link
        to="/dashboard"
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Back to Dashboard
      </Link>
    </div>
  );
}
