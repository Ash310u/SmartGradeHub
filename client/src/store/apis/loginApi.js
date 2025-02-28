import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const loginApi = createApi({
    reducerPath: "login",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8000/api"
    }),
    endpoints: (builder) => {
        return {
            login: builder.mutation({
                query: (data) => {
                    return {
                        url: '/user/login',
                        method: "POST",
                        body: data,
                    }
                }
            })
        }
    }
})

export { loginApi };
export const { useLoginMutation } = loginApi;