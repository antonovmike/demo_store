import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";

import api from "../api/axios";
import { FormBox } from "./StyledBox";

export default function ResetPasswordForm() {
  const [message, setMessage] = useState("");
  const [searchParams] = useSearchParams();
  const [tokenValid, setTokenValid] = useState<boolean | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const token = searchParams.get("token");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  useEffect(() => {
    const checkToken = async () => {
      if (!token) {
        setTokenValid(false);
        return;
      }
      try {
        await api.post("/users/verify-reset-token", { token });
        setTokenValid(true);
      } catch {
        setTokenValid(false);
      }
    };
    checkToken();
  }, [token]);

  if (tokenValid === false) {
    return <p>Invalid or expired link</p>;
  }

  if (tokenValid === null) {
    return <p>Checking link...</p>;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await api.post("/users/confirm-reset-password", { token, newPassword });
      setStatus("success");
      setMessage("Password reset successfully! You can now log in.");
    } catch {
      setStatus("error");
      alert("Error resetting password");
    }
  };

  return (
    <Box>
      <FormBox onSubmit={handleSubmit}>
        <TextField
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Enter new password"
          fullWidth
        />
        <Button type="submit" variant="text">
          Reset password
        </Button>
      </FormBox>
      {message && (
        <Typography
          align="center"
          variant="body2"
          sx={{
            mt: 2,
            color: status === "success" ? "success.main" : "error.main",
          }}
        >
          {message}
        </Typography>
      )}
    </Box>
  );
}
