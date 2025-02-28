import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const subjectApi = createApi({
    reducerPath: 'subjectApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8000/api/subject',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getUserSubjects: builder.query({
            query: () => ({
                url: '/user-subjects',
                method: 'GET',
            })
        })
    })
});

export const { useGetUserSubjectsQuery } = subjectApi;
