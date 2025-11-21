import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/axios';

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const res = await api.post('/users/register', { username, password });
      // if API returns token: const { user, token } = res.data;
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const initialState = {
  user: null,
  status: 'idle',
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      try { localStorage.removeItem('token'); } 
      catch { /* ignore */ }
    },
    setUser(state, action) {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        // if token present: try { localStorage.setItem('token', action.payload.token); api.defaults.headers.common.Authorization = `Bearer ${action.payload.token}` } catch {}
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      });
  },
});

export const { logout, setUser } = userSlice.actions;
export const selectCurrentUser = (state) => state.user.user;
export const selectUserStatus = (state) => state.user.status;
export const selectUserError = (state) => state.user.error;

export default userSlice.reducer;