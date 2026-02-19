import type { AxiosError } from "axios";
import { useContext, useEffect, useState } from "react";
import { Typography } from "@mui/material";

import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import type { User } from "../store/userSlice";

export default function ProfilePage() {
  const auth = useContext(AuthContext);
  if (!auth) throw new Error("AuthContext not provided");
  const { token, logout } = auth;
  const [profile, setProfile] = useState<User | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        console.log("🔑 Using token:", token);
        const res = await api.get("/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("✅ Profile data:", res.data);
        setProfile(res.data);
      } catch (err) {
        const error = err as AxiosError<{ error: string }>;
        console.error(
          "❌ Failed to fetch profile:",
          error.response?.status,
          error.response?.data,
        );
        setProfile(null);
      }
    };
    fetchProfile();
  }, [token]);

  return (
    <div className="max-w-md mx-auto p-4 border rounded-lg">
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        My Profile
      </Typography>
      {profile ? (
        <div>
          <Typography>
            <strong>ID:</strong> {profile.id}
          </Typography>
          <Typography>
            <strong>Username:</strong> {profile.username}
          </Typography>
          <Typography>
            <strong>Email:</strong> {profile.email}
          </Typography>
          <button
            onClick={logout}
            className="mt-4 bg-red-500 text-white p-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      ) : (
        <p>No profile data</p>
      )}
    </div>
  );
}
