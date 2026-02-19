import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  registerUser,
  selectUserStatus,
  selectUserError,
  selectCurrentUser,
} from "../store/userSlice";
import { Box, Divider, Button, TextField, Typography } from "@mui/material";

import type { AppDispatch } from "../store/store";

export default function RegisterForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch: AppDispatch = useDispatch();
  const status = useSelector(selectUserStatus);
  const error = useSelector(selectUserError);
  const user = useSelector(selectCurrentUser);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(registerUser({ username, email, password }));
  };

  return (
    <Box className="max-w-md mx-auto p-4 border rounded-lg">
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Register
      </Typography>
      <form onSubmit={handleRegister} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Register
        </button>
      </form>
      {status === "succeeded" && user && (
        <p className="mt-3 text-sm">
          ✅ Registered as {user.username || user.username}
        </p>
      )}
      {status === "failed" && (
        <p className="mt-3 text-sm text-red-600">
          ❌ {error || "Registration failed"}
        </p>
      )}
    </Box>
  );
}
