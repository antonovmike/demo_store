import React, { useState, useContext } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { Divider, Button, Link, TextField, Typography } from "@mui/material";

import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { loginSuccess } from "../store/authSlice";

import type { AxiosError } from "axios";

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
    <Divider className="max-w-md mx-auto p-4 border rounded-lg">
      <Typography className="text-xl font-semibold mb-2">Login</Typography>
      <form onSubmit={handleLogin} className="flex flex-col gap-3">
        <TextField
          type="text"
          placeholder="Useremail"
          value={useremail}
          onChange={(e) => setUserEmail(e.target.value)}
          className="border p-2 rounded"
        />
        <TextField
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded"
        />
        <Button
          type="submit"
          className="bg-green-600 text-white p-2 rounded hover:bg-green-700"
        >
          Login
        </Button>
      </form>
      {message && <p className="mt-3 text-sm">{message}</p>}
      <Divider className="mt-4 text-center">
        <Link
          component={RouterLink}
          to="/forgot-password"
          className="text-gray-600 hover:underline text-sm"
        >
          <Button>Forgot password?</Button>
        </Link>
      </Divider>
    </Divider>
  );
}
