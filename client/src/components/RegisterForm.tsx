import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  registerUser,
  selectUserStatus,
  selectUserError,
  selectCurrentUser,
} from "../store/userSlice";
import { Box, Button, TextField, Typography } from "@mui/material";

import { FormBox } from "./StyledBox";

import { useAvatarUpload } from "../hooks/useAvatarUpload";

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
    dispatch(registerUser({ username, email, password, avatar }));
  };

  const { avatar, preview, handleAvatarChange } = useAvatarUpload();

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Register
      </Typography>
      <FormBox onSubmit={handleRegister}>
        <TextField
          label="User name"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          variant="outlined"
          fullWidth
        />
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variant="outlined"
          fullWidth
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          variant="outlined"
          fullWidth
        />
        <Button variant="outlined" component="label">
          Upload File
          <input
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            hidden
          />
        </Button>
        {preview && (
          <Box
            component="img"
            sx={{
              height: 250,
              width: 250,
            }}
            src={preview}
            alt="Avatar preview"
          />
        )}

        <Button type="submit">Register</Button>
      </FormBox>
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
