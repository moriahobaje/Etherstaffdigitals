// src/features/user/userSliceselected.js
import { createSlice } from '@reduxjs/toolkit';

const userSliceselected = createSlice({
  name: 'userselected',
  initialState: {
    userselected: null,
  },
  reducers: {
    setUserselected: (state, action) => {
      state.userselected = action.payload;
    },
    clearUserselected: (state) => {
      state.userselected = null;
    },
  },
});

export const { setUserselected, clearUserselected } = userSliceselected.actions;
export default userSliceselected.reducer;
