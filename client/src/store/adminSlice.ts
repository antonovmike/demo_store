import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api/axios";

import type { ManagedUser } from "../types";

export const fetchUsers = createAsyncThunk<ManagedUser[]>(
  "admin/fetchUsers",
  async () => {
    const res = await api.get("/admin/users"); // get list of users from backend
    return res.data;
  },
);

const adminSlice = createSlice({
  name: "admin",
  initialState: { users: [] as ManagedUser[], status: "idle" },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      state.status = "succeeded";
    });
  },
});

export default adminSlice.reducer;
