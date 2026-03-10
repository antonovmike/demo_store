import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  registerUser,
  selectUserStatus,
  selectUserError,
  selectCurrentUser,
} from "../store/userSlice";
import { Box, Button, Slider, TextField, Typography } from "@mui/material";
import Cropper, { type Point, type Area } from "react-easy-crop";

import { FormBox } from "./StyledBox";
import { useAvatarUpload } from "../hooks/useAvatarUpload";
import { getCroppedImg } from "../utils/getCroppedImg";

import type { AppDispatch } from "../store/store";

export default function RegisterForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch: AppDispatch = useDispatch();
  const status = useSelector(selectUserStatus);
  const error = useSelector(selectUserError);
  const user = useSelector(selectCurrentUser);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let avatarFile: File | undefined;
    if (preview && croppedAreaPixels && avatar) {
      const croppedBlob = await getCroppedImg(
        preview,
        croppedAreaPixels,
        avatar.type,
      );
      avatarFile = new File([croppedBlob], avatar.name, { type: avatar.type });
    }
    dispatch(registerUser({ username, email, password, avatar: avatarFile }));
  };

  const { avatar, preview, handleAvatarChange } = useAvatarUpload();

  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const onCropComplete = (_croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Register
      </Typography>
      <FormBox onSubmit={handleRegister}>
        <TextField
          label="User name"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          variant="outlined"
          fullWidth
        />
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variant="outlined"
          fullWidth
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          variant="outlined"
          fullWidth
        />
        <Button variant="outlined" component="label">
          Upload File
          <input
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            hidden
          />
        </Button>
        {preview && (
          <Box sx={{ position: "relative", width: 250, height: 250 }}>
            {" "}
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

        <Button type="submit">Register</Button>
      </FormBox>
      {status === "succeeded" && user && (
        <Typography variant="body2" sx={{ mt: 3 }}>
          ✅ Registered as {user.username} ({user.email})
        </Typography>
      )}
      {status === "failed" && (
        <Typography variant="body2" sx={{ mt: 3, color: "error.main" }}>
          ❌ Registration failed {error ? `: ${error}` : ""}
        </Typography>
      )}
    </Box>
  );
}
