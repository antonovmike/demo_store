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
        <Box component="form" onSubmit={handleSubmit} className="space-y-4">
          <TextField
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            required
          />
          <Button
            type="submit"
            disabled={status === "loading"}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {status === "loading" ? "Sending..." : "Reset Password"}
          </Button>
        </Box>
        {message && (
          <Typography
            align="center"
            className={`mt-4 text-sm ${
              status === "success" ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </Typography>
        )}
      </CssBaseline>
    </ThemeProvider>
  );
}
