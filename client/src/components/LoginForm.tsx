import type { AxiosError } from "axios";
import React, { useState, useContext } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { loginSuccess } from "../store/authSlice";

export default function LoginForm() {
  const [useremail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const auth = useContext(AuthContext);
  if (!auth) throw new Error("AuthContext not provided");
  const { setUser, setToken } = auth;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await api.post("/users/login", {
        email: useremail,
        password,
      });
      setToken(res.data.token);
      setUser({ email: useremail });
      setUserEmail(useremail);
      dispatch(
        loginSuccess({
          user: { email: useremail },
          token: res.data.token,
        }),
      );
      setMessage("✅ Logged in successfully!");
      navigate("/profile");
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      setMessage(`❌ ${error.response?.data?.error || "Login failed"}`);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded-lg">
      <h2 className="text-xl font-semibold mb-2">Login</h2>
      <form onSubmit={handleLogin} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Useremail"
          value={useremail}
          onChange={(e) => setUserEmail(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-green-600 text-white p-2 rounded hover:bg-green-700"
        >
          Login
        </button>
      </form>
      {message && <p className="mt-3 text-sm">{message}</p>}
      <div className="mt-4 text-center">
        <Link
          to="/forgot-password"
          className="text-gray-600 hover:underline text-sm"
        >
          <button>Forgot password?</button>
        </Link>
      </div>
    </div>
  );
}
