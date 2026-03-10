import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Avatar,
  Box,
  Divider,
  Button,
  Typography,
  Skeleton,
  Slider,
} from "@mui/material";
import Cropper, { type Point, type Area } from "react-easy-crop";

import { AuthContext } from "../context/AuthContext";
import {
  fetchProfile,
  selectProfile,
  selectProfileLoading,
  selectProfileError,
} from "../store/profileSlice";
import { useAvatarUpload } from "../hooks/useAvatarUpload";
import { updateUserAvatar } from "../store/userSlice";

import type { AppDispatch } from "../store/store";
import { FormBox } from "./StyledBox";
import { getCroppedImg } from "../utils/getCroppedImg";

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

  const { avatar, preview, handleAvatarChange, clearPreview } =
    useAvatarUpload();

  const handleSaveAvatar = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (preview && croppedAreaPixels && avatar) {
      let avatarFile: File | undefined;
      if (preview && croppedAreaPixels && avatar) {
        const croppedBlob = await getCroppedImg(
          preview,
          croppedAreaPixels,
          avatar.type,
        );
        avatarFile = new File([croppedBlob], avatar.name, {
          type: avatar.type,
        });
        await dispatch(updateUserAvatar({ avatar: avatarFile }));
        if (token) {
          dispatch(fetchProfile(token));
        }
      }

      clearPreview();
    }
  };

  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const onCropComplete = (_croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

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
          {profile.avatarPath ? (
            <Box
              component="img"
              sx={{ height: 250, width: 250 }}
              alt={profile.username}
              src={`http://localhost:3000${profile.avatarPath}`}
            />
          ) : (
            <Avatar sx={{ width: 250, height: 250 }}>
              {profile.username[0]}
            </Avatar>
          )}
          <Avatar
            alt={profile.username}
            src={`http://localhost:3000${profile.avatarPath}`}
          />
          <FormBox onSubmit={handleSaveAvatar}>
            <Button variant="outlined" component="label">
              Change Avatar
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                hidden
              />
            </Button>
            {preview && (
              <Box
                sx={{ position: "relative", width: 250, height: 250 }}
                data-testid="avatar-cropper"
              >
                <Cropper
                  image={preview}
                  crop={crop}
                  zoom={zoom}
                  aspect={1}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={onCropComplete}
                />
              </Box>
            )}
            <Slider
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              aria-labelledby="Zoom"
              onChange={(_, value) => setZoom(Number(value))}
            />
            <Button type="submit">Save Avatar</Button>
          </FormBox>
          <Button onClick={logout}>Logout</Button>
        </Divider>
      ) : (
        <Typography>No profile data</Typography>
      )}
    </>
  );
}
