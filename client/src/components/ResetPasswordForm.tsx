import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box, Button, TextField } from "@mui/material";

import api from "../api/axios";

export default function ResetPasswordForm() {
  const [message, setMessage] = useState("");
  const [searchParams] = useSearchParams();
  const [tokenValid, setTokenValid] = useState<boolean | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const token = searchParams.get("token");

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
    try {
      await api.post("/users/confirm-reset-password", { token, newPassword });
      setMessage("Password reset successfully! You can now log in.");
    } catch {
      alert("Error resetting password");
    }
  };

  return (
    <>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Enter new password"
          fullWidth
        />
        <Button type="submit" variant="contained" className="mt-2">
          Reset password
        </Button>
      </Box>
      {message && <p className="mt-3 text-sm text-green-600">{message}</p>}
    </>
  );
}
