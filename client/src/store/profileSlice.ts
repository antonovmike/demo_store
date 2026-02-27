import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import api from "../api/axios";

import type { User } from "./userSlice";

export const fetchProfile = createAsyncThunk<User, string>(
  "profile/fetchProfile",
  async (token, { rejectWithValue }) => {
    try {
      const res = await api.get("/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.error || "Failed to fetch profile",
      );
    }
  },
);

interface ProfileState {
  data: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProfileState = {
  data: null,
  loading: false,
  error: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    clearProfile: (state) => {
      state.data = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.data = null;
      });
  },
});

export const { clearProfile } = profileSlice.actions;
export const selectProfile = (state: any) => state.profile.data;
export const selectProfileLoading = (state: any) => state.profile.loading;
export const selectProfileError = (state: any) => state.profile.error;

export default profileSlice.reducer;
