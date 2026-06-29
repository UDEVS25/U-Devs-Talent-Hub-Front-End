import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const activatePremiumPlus = createAsyncThunk(
  'premium/activatePremiumPlus',
  async (paymentToken, thunkAPI) => {
    try {
      const config = { headers: { Authorization: `Bearer ${localStorage.getItem('udevs_token')}` } };
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/premium/checkout`,
        { token: paymentToken },
        config
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Payment processing failed.');
    }
  }
);

const premiumSlice = createSlice({
  name: 'premium',
  initialState: { isPremiumPlus: false, processing: false, error: null },
  reducers: {
    syncPremiumStatus(state, action) {
      state.isPremiumPlus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(activatePremiumPlus.pending, (state) => { state.processing = true; state.error = null; })
      .addCase(activatePremiumPlus.fulfilled, (state, action) => {
        state.processing = false;
        state.isPremiumPlus = action.payload.is_premium_plus;
      })
      .addCase(activatePremiumPlus.rejected, (state, action) => {
        state.processing = false;
        state.error = action.payload;
      });
  },
});

export const { syncPremiumStatus } = premiumSlice.actions;
export default premiumSlice.reducer;