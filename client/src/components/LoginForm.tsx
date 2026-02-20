import React, { useState, useContext } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { Box, Divider, Button, TextField, Typography } from "@mui/material";

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
    <Divider>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Login
      </Typography>
      <Box
        component="form"
        onSubmit={handleLogin}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: "100%",
          maxWidth: 400,
        }}
      >
        <TextField
          type="text"
          placeholder="Useremail"
          value={useremail}
          onChange={(e) => setUserEmail(e.target.value)}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "100%",
            maxWidth: 400,
          }}
        />
        <TextField
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "100%",
            maxWidth: 400,
          }}
        />
        <Button type="submit">Login</Button>
      </Box>
      {message && <Typography>{message}</Typography>}
      <Divider>
        <Button component={RouterLink} to="/forgot-password" variant="text">
          Forgot password?
        </Button>
      </Divider>
    </Divider>
  );
}
