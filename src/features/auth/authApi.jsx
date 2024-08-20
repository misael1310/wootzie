import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logOut, setCredentials } from "./authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: `${import.meta.env.VITE_APP_API_HOST}`,
  credentials: "include",
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

  if (result?.error?.status === 401) {
    // Try to Refresh the Token
    const refreshResult = await baseQuery(
      {
        url: "/auth/refreshToken",
        method: "POST",
      },
      api,
      extraOptions
    );

    if (refreshResult?.error?.status) {
      return result;
    }

    const { token, user } = refreshResult.data;
    if (token && user) {
      api.dispatch(setCredentials({ token, user }));
      // Retry the original query with new token
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
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
    logOut: builder.query({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
        body: {},
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useVerifyTokenQuery,
  useLazyLogOutQuery,
} = authApi;
