import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    subjects: [],
    selectedSubject: null
};

const subjectSlice = createSlice({
    name: 'subjects',
    initialState,
    reducers: {
        setSubjects: (state, action) => {
            state.subjects = action.payload;
        },
        setSelectedSubject: (state, action) => {
            state.selectedSubject = action.payload;
        },
        clearSubjects: (state) => {
            state.subjects = [];
            state.selectedSubject = null;
        }
    }
});

export const { setSubjects, setSelectedSubject, clearSubjects } = subjectSlice.actions;
export const subjectReducer = subjectSlice.reducer;
