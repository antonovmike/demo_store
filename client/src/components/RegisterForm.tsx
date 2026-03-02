import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  registerUser,
  selectUserStatus,
  selectUserError,
  selectCurrentUser,
} from "../store/userSlice";
import { Button, TextField, Typography } from "@mui/material";

import { FormBox } from "./StyledBox";

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

  const [avatar, setAvatar] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    // restrictions: size < 1MB, width/height will be verified later
    if (file) {
      if (file.size > 1 * 1024 * 1024) {
        alert("The file is too large (max. 1MB)");
        return;
      }
      setAvatar(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <>
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
        <input type="file" accept="image/*" onChange={handleAvatarChange} />
        {preview && (
          <img
            src={preview}
            alt="Avatar preview"
            style={{ width: 120, height: 120, objectFit: "cover" }}
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
    </>
  );
}
