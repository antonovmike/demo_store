import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

import api from "../api/axios";

export default function ResetPasswordForm() {
  const [searchParams] = useSearchParams();
  const [tokenValid, setTokenValid] = useState<boolean | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) {
      setTokenValid(false);
      return;
    }
    // Check token validity with the server
    api
      .post("/users/verify-reset-token", { token })
      .then(() => setTokenValid(true))
      .catch(() => setTokenValid(false));
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
    } catch {
      alert("Error resetting password");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        placeholder="Enter new password"
      />
      <button type="submit">Reset password</button>
    </form>
  );
}
