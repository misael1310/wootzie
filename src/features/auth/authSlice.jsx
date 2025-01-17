import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authApi } from "./authApi";

const initialState = {
  user: null,
  token: null,
  status: "idle",
  error: null,
};

// export const verifyToken = createAsyncThunk(
//   "auth/verifyToken",
//   async (_, { getState, rejectWithValue }) => {
//     const token = getState().auth.token;
//     if (!token) {
//       return rejectWithValue("No token found");
//     }
//     try {
//       const response = await authApi.endpoints.verifyToken.initiate();
//       if (response.error) {
//         throw new Error(response.error.data.message);
//       }
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;
