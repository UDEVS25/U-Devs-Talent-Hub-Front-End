import { createSlice } from '@reduxjs/toolkit';

const jobSlice = createSlice({
  name: 'jobs',
  initialState: {
    list: [
      { id: 1, title: 'Full Stack Developer', description: 'Build and maintain web apps.', job_type: 'Full-time', skills_required: ['React', 'Node.js'], status: 'active', posted_at: new Date().toISOString() },
    ],
    loading: false,
    error: null,
  },
  reducers: {
    addJob(state, action) {
      state.list.unshift({ ...action.payload, id: Date.now(), status: 'active', posted_at: new Date().toISOString() });
    },
    archiveJob(state, action) {
      const job = state.list.find(j => j.id === action.payload);
      if (job) job.status = 'archived';
    },
    deleteJob(state, action) {
      state.list = state.list.filter(j => j.id !== action.payload);
    },
    setJobs(state, action) {
      state.list = action.payload;
    },
  },
});

export const { addJob, archiveJob, deleteJob, setJobs } = jobSlice.actions;
export default jobSlice.reducer;