import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/authSlice";
import { Link } from "react-router-dom";

export default function Login() {
  const dispatch = useDispatch();
  const { loading, error, token } = useSelector((state) => state.auth);
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(form));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white/10 backdrop-blur-sm text-white p-8 rounded-lg shadow-xl space-y-5 border border-white/20"
      >
        <h2 className="text-3xl font-bold text-center mb-2">Welcome Back</h2>

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
          {loading ? "Logging in..." : "Login"}
        </button>

        {token && (
          <p className="text-green-400 text-sm text-center">Login successful!</p>
        )}
        {error && (
          <p className="text-red-400 text-sm text-center">{error}</p>
        )}

        <p className="text-center text-sm text-white/80 mt-4">
          Don’t have an account?{" "}
          <Link to="/register" className="text-red-400 hover:underline">
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
}
