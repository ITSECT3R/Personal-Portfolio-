import { createSlice } from '@reduxjs/toolkit';
import { personalProjects, freeCodeCampProjects } from '../data/data-js/projects-data';

const initialState = {
  personalCount: 2,
  fccCount: window.innerWidth < 1368 ? 2 : 3,
  personalTotal: personalProjects.length,
  fccTotal: freeCodeCampProjects.length,
};

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    loadMorePersonal: (state) => {
      const increment = window.innerWidth < 1368 ? 2 : 3;
      state.personalCount = Math.min(state.personalCount + increment, state.personalTotal);
    },
    loadMoreFCC: (state) => {
      const increment = window.innerWidth < 1368 ? 2 : 3;
      state.fccCount = Math.min(state.fccCount + increment, state.fccTotal);
    },
    resetFCCCount: (state, action) => {
      state.fccCount = action.payload;
    },
    resetPersonalCount: (state, action) => {
      state.personalCount = action.payload;
    }
  }
});

export const { loadMorePersonal, loadMoreFCC, resetFCCCount, resetPersonalCount } = projectsSlice.actions;
export default projectsSlice.reducer;
