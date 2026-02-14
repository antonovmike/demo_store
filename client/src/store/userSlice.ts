import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";

import api from "../api/axios";

interface RegisterPayload {
  username: string;
  password: string;
}

interface User {
  id?: string;
  username: string;
  email?: string;
  token?: string;
}

interface UserState {
  user: User | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: UserState = {
  user: null,
  status: "idle",
  error: null,
};

export const registerUser = createAsyncThunk<
  User,
  RegisterPayload,
  { rejectValue: string }
>("user/registerUser", async ({ username, password }, { rejectWithValue }) => {
  try {
    const res = await api.post("/users/register", { username, password });
    // if API returns token: const { user, token } = res.data;
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data || err.message);
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      try {
        localStorage.removeItem("token");
      } catch (err: any) {
        console.error("Failed to remove token from localStorage:", err);
        state.error = "Failed to clear local session data";
      }
    },
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          (action.payload as string) || action.error.message || null;
      });
  },
});

export const { logout, setUser } = userSlice.actions;
export const selectCurrentUser = (state: { user: UserState }) =>
  state.user.user;
export const selectUserStatus = (state: { user: UserState }) =>
  state.user.status;
export const selectUserError = (state: { user: UserState }) => state.user.error;

export default userSlice.reducer;
