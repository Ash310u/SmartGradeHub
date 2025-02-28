import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { loginApi } from './apis/loginApi';
import { authReducers } from './slices/authSlice';
import { subjectApi } from './apis/SubjectApi';
import { userAccApi } from './apis/UserApi';
import { userReducers } from './slices/UserSlice';
import { subjectReducer } from './slices/subjectSlice';

const store = configureStore({
    reducer: {
        auth: authReducers,
        user: userReducers,
        subjects: subjectReducer,
        [loginApi.reducerPath]: loginApi.reducer,
        [subjectApi.reducerPath]: subjectApi.reducer,
        [userAccApi.reducerPath]: userAccApi.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
            serializableCheck: {
                // Ignore these action types
                ignoredActions: [
                    'login/executeQuery/fulfilled',
                    'login/executeMutation/fulfilled',
                    'subjectApi/executeQuery/fulfilled',
                    'subjectApi/executeMutation/fulfilled',
                    'userAcc/executeQuery/fulfilled',
                    'userAcc/executeMutation/fulfilled',
                    'subjects/setSubjects',
                    'subjects/setSelectedSubject',
                    'subjects/clearSubjects',
                ],
                // Ignore these field paths in all actions
                ignoredActionPaths: ['payload.data', 'meta.baseQueryMeta.request'],
                // Ignore these paths in the state
                ignoredPaths: [
                    `${loginApi.reducerPath}.queries`,
                    `${subjectApi.reducerPath}.queries`,
                    `${userAccApi.reducerPath}.queries`,
                ],
            },
        })
        .concat(loginApi.middleware)
        .concat(subjectApi.middleware)
        .concat(userAccApi.middleware)
    },
});


setupListeners(store.dispatch);

export default store;

export { useLoginMutation } from "./apis/loginApi"
export { useGetUserSubjectsQuery } from "./apis/SubjectApi"
export { useGetUserQuery, useGetAvatarQuery, useUploadAvatarMutation, useDeleteAvatarMutation } from "./apis/UserApi"

export { setToken, clearToken, setUserId, clearUserId } from "./slices/authSlice"
export { setUserAvatar, setUserInfo, clearUserData } from "./slices/UserSlice"
export { setSubjects, setSelectedSubject, clearSubjects } from "./slices/subjectSlice"