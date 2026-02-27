import type { AxiosError } from "axios";
import { useContext, useEffect, useState } from "react";
import { Divider, Button, Typography, Skeleton } from "@mui/material";

import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import type { User } from "../store/userSlice";

export default function ProfilePage() {
  const auth = useContext(AuthContext);
  if (!auth) throw new Error("AuthContext not provided");
  const { token, logout } = auth;
  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        console.log("🔑 Using token:", token);
        const res = await api.get("/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Check if the 'loading' works and "Loading profile..."
        // appears after login before profile is loaded
        // await new Promise((r) => setTimeout(r, 1000));

        setProfile(res.data);
      } catch (err) {
        const error = err as AxiosError<{ error: string }>;
        console.error(
          "❌ Failed to fetch profile:",
          error.response?.status,
          error.response?.data,
        );
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [token]);

  return (
    <>
      <Typography
        textAlign="center"
        variant="h5"
        fontWeight="bold"
        gutterBottom
      >
        My Profile
      </Typography>
      {loading ? (
        <Divider sx={{ p: 2 }}>
          {" "}
          <Typography variant="body1">Loading profile...</Typography>{" "}
          <Skeleton variant="text" width={200} />{" "}
          <Skeleton variant="text" width={150} />{" "}
          <Skeleton variant="rectangular" width={300} height={40} />{" "}
        </Divider>
      ) : profile ? (
        <Divider>
          <Typography>
            <strong>ID:</strong> {profile.id}
          </Typography>
          <Typography>
            <strong>Username:</strong> {profile.username}
          </Typography>
          <Typography>
            <strong>Email:</strong> {profile.email}
          </Typography>
          <Button onClick={logout}>Logout</Button>
        </Divider>
      ) : (
        <Typography>No profile data</Typography>
      )}
    </>
  );
}
