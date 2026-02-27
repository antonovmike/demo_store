import React, { useState, useContext } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import {
  Button,
  Divider,
  InputAdornment,
  IconButton,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import api from "../api/axios";
import { FormBox } from "./StyledBox";
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

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((prev) => !prev);

  return (
    <>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Login
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <FormBox onSubmit={handleLogin}>
        <TextField
          label="Email"
          type="email"
          value={useremail}
          onChange={(e) => setUserEmail(e.target.value)}
          variant="outlined"
          fullWidth
        />
        <FormControl variant="outlined">
          <InputLabel htmlFor="password">Password</InputLabel>
          <OutlinedInput
            id="password"
            type={showPassword ? "text" : "password"}
            label="Password"
            required
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={handleClickShowPassword} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
          />
        </FormControl>
        <Button type="submit">Login</Button>
      </FormBox>

      <FormBox>
        {message && <Typography>{message}</Typography>}
        <Divider></Divider>
        <Button component={RouterLink} to="/forgot-password" variant="text">
          Forgot password?
        </Button>
      </FormBox>
    </>
  );
}
