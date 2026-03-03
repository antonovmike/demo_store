import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Avatar,
  Box,
  Divider,
  Button,
  Typography,
  Skeleton,
} from "@mui/material";

import { AuthContext } from "../context/AuthContext";
import {
  fetchProfile,
  selectProfile,
  selectProfileLoading,
  selectProfileError,
} from "../store/profileSlice";
import type { AppDispatch } from "../store/store";

export default function ProfilePage() {
  const auth = useContext(AuthContext);
  if (!auth) throw new Error("AuthContext not provided");
  const { token, logout } = auth;

  const dispatch: AppDispatch = useDispatch();
  const profile = useSelector(selectProfile);
  const loading = useSelector(selectProfileLoading);

  selectProfileError;
  useEffect(() => {
    try {
      if (token) {
        dispatch(fetchProfile(token));
      }
    } catch (err) {
      const error = useSelector(selectProfileError);
      console.error("❌ Failed to fetch profile:", error);
    }
  }, [dispatch, token]);

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
          <Box
            component="img"
            sx={{
              height: 350,
              width: 350,
              maxHeight: { xs: 233, md: 167 },
              maxWidth: { xs: 350, md: 250 },
            }}
            alt={profile.username}
            src={`http://localhost:3000${profile.avatarPath}`}
          />
          <Avatar
            alt={profile.username}
            src={`http://localhost:3000${profile.avatarPath}`}
          />
          <Button onClick={logout}>Logout</Button>
        </Divider>
      ) : (
        <Typography>No profile data</Typography>
      )}
    </>
  );
}
