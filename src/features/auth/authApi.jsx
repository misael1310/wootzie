import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logOut } from "./authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: `${import.meta.env.VITE_APP_API_HOST}`,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  console.group("authApi.jsx");
  console.log({ resultError: result?.error });
  console.log({ resultErrorStatus: result?.error?.status });
  console.groupEnd("authApi.jsx");

  if (result?.error?.status === 401) {
    api.dispatch(logOut());
  }

  return result;
};

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: "/auth/register",
        method: "POST",
        body: credentials,
      }),
    }),
    verifyToken: builder.query({
      query: () => ({
        url: "/auth/verifyToken",
        method: "POST",
        body: {},
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useVerifyTokenQuery } =
  authApi;
