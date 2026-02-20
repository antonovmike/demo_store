import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  registerUser,
  selectUserStatus,
  selectUserError,
  selectCurrentUser,
} from "../store/userSlice";
import { Box, Button, TextField, Typography } from "@mui/material";

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
    <Box>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Register
      </Typography>
      <Box
        component="form"
        onSubmit={handleRegister}
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
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 rounded"
        />
        <TextField
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Register
        </Button>
      </Box>
      {status === "succeeded" && user && (
        <Typography variant="body2" sx={{ mt: 3 }}>
          ✅ Registered as {user.username} ({user.email})
        </Typography>
      )}
      {status === "failed" && (
        <Typography variant="body2" sx={{ mt: 3, color: "error.main" }}>
          ❌ Registration failed {error ? `: ${error}` : ""}
        </Typography>
      )}
    </Box>
  );
}
