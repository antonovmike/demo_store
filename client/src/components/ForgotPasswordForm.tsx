import { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { Box, Button, TextField, Typography } from "@mui/material";

import theme from "../theme";
import { requestPasswordReset } from "../api/reset_user_password";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await requestPasswordReset(email);
      setStatus("success");
      setMessage(
        res.data.message || "Check your email for reset instructions.",
      );
    } catch (err: any) {
      if (err.response?.status === 404) {
        setStatus("error");
        setMessage("Email not found");
      } else {
        setStatus("error");
        setMessage("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <Box
          sx={{
            minHeight: "10vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography>Forgot Password</Typography>
        </Box>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button type="submit" disabled={status === "loading"}>
            {status === "loading" ? "Sending..." : "Reset Password"}
          </Button>
        </Box>
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
      </CssBaseline>
    </ThemeProvider>
  );
}
