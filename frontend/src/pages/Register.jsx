import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      await axios.post("http://localhost:8000/api/auth/register", form);
      // optional: navigate to login
    } catch (err) {
        
      setError(err?.response?.data?.message[0]?.message|| "Registration failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white/10 backdrop-blur-sm text-white p-8 rounded-lg shadow-xl space-y-5 border border-white/20"
      >
        <h2 className="text-3xl font-bold text-center mb-2">Create Account</h2>

        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-3 rounded bg-white/20 text-white placeholder-white/70 outline-none focus:ring-2 focus:ring-red-500"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 rounded bg-white/20 text-white placeholder-white/70 outline-none focus:ring-2 focus:ring-red-500"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 rounded bg-white/20 text-white placeholder-white/70 outline-none focus:ring-2 focus:ring-red-500"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 transition-colors p-3 rounded text-white font-semibold"
        >
          Register
        </button>

        {error && (
          <p className="text-red-400 text-sm text-center -mt-2">{error}</p>
        )}

        <p className="text-center text-sm text-white/80 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-red-400 hover:underline">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
}
