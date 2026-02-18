import { useState } from "react";

import StyledHeader_2 from "./StyledHeader_1";
import StyledPage from "./StyledPage";
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
    <StyledPage>
      <StyledHeader_2>Forgot Password</StyledHeader_2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          required
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {status === "loading" ? "Sending..." : "Reset Password"}
        </button>
      </form>
      {message && (
        <p
          className={`mt-4 text-sm ${
            status === "success" ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
    </StyledPage>
  );
}
