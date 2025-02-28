import { createSlice } from '@reduxjs/toolkit';
import defaultAvatar from "../../assets/default_avatar.jpg";

const initialState = {
    name: null,
    age: null,
    email: null,
    avatarUrl: defaultAvatar,
    department: null,
    year: null,
    sem: null,
    rollNo: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserAvatar: (state, action) => {
      state.avatarUrl = action.payload;
    },
    setUserInfo: (state, action) => {
      const { name, email, age, department, year, sem, rollNo } = action.payload;
      state.name = name;
      state.email = email;
      state.age = age;
      state.department = department;
      state.year = year;
      state.sem = sem;
      state.rollNo = rollNo;
    },
    clearUserData: () => {
      return initialState;
    },
  },
});

export const { setUserAvatar, setUserInfo, clearUserData } = userSlice.actions;
export const userReducers = userSlice.reducer;