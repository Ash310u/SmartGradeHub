import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const userAccApi = createApi({
    reducerPath: "userAcc",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8000/api/user",
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.token;
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        }
    }),
    endpoints: (builder) => {
        return {
            getUser: builder.query({
                query: () => {
                    return {
                        url: '/me',
                        method: "GET",
                    }
                }
            }),
            getAvatar: builder.query({
                query: (userId) => {
                    return {
                        url: `/${userId}/avatar`,
                        method: "GET",
                        responseHandler: (response) => response.blob(),
                    }
                }
            }),
            uploadAvatar: builder.mutation({
                query: (formData) => {
                    return {
                        url: `/me/avatar`,
                        method: "POST",
                        body: formData
                    }
                }
            }),
            deleteAvatar: builder.mutation({
                query: () => {
                    return {
                        url: `/me/avatar`,
                        method: "DELETE",
                    }
                }
            })
        }
    }
})

export { userAccApi };
export const { useGetUserQuery, useGetAvatarQuery, useUploadAvatarMutation, useDeleteAvatarMutation } = userAccApi;