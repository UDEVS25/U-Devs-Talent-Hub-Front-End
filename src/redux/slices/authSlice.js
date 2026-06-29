import { createSlice } from '@reduxjs/toolkit';

const stored = JSON.parse(localStorage.getItem('udevs_user') || 'null');

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: stored,
    isAuthenticated: !!stored,
    loading: false,
    error: null,
  },
  reducers: {
    loginSuccess(state, action) {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
      localStorage.setItem('udevs_user', JSON.stringify(action.payload));
      localStorage.setItem('udevs_token', action.payload.token || 'mock-token');
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('udevs_user');
      localStorage.removeItem('udevs_token');
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const { loginSuccess, logout, setError, setLoading } = authSlice.actions;
export default authSlice.reducer;