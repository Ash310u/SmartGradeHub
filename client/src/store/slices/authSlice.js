import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userId: localStorage.getItem('userId'),
    token: localStorage.getItem('token'), // Retrieve token from localStorage if it exists
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem('token', action.payload); // Save token to localStorage
    },
    clearToken: (state) => {
      state.token = null;
      localStorage.removeItem('token'); // Remove token from localStorage
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
      localStorage.setItem('userId', action.payload); // Save userId to localStorage
    },
    clearUserId: (state) => {
      state.userId = null;
      localStorage.removeItem('userId'); // Remove userId from localStorage
    },
  }
});

export const { setToken, clearToken, setUserId, clearUserId } = authSlice.actions;
export const authReducers = authSlice.reducer;