import { createSlice } from '@reduxjs/toolkit';

const applicationSlice = createSlice({
  name: 'applications',
  initialState: { list: [], loading: false },
  reducers: {
    addApplication(state, action) {
      state.list.push({ ...action.payload, id: Date.now(), current_stage: 'applied', applied_at: new Date().toISOString() });
    },
    updateStage(state, action) {
      const app = state.list.find(a => a.id === action.payload.id);
      if (app) app.current_stage = action.payload.stage;
    },
    setApplications(state, action) {
      state.list = action.payload;
    },
  },
});

export const { addApplication, updateStage, setApplications } = applicationSlice.actions;
export default applicationSlice.reducer;