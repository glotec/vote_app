import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userService } from "./userService";
import type { UserState } from "./user";

const initialState: UserState = {
  user: null,
  token: localStorage.getItem("access_token") || null, // Get token from localStorage
  loading: "idle",
  error: null,
};

// Async thunk to handle signup
// export const getMe = createAsyncThunk(
//   "users/getMe",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await userService();
//       console.log(response);
//       return response.data; // { user, token }
//     } catch (error: unknown) {
//       if (error instanceof Error) {
//         // console.error("Error fetching user:", error.message);
//         return rejectWithValue(error.message);
//       }
//       // console.error("Unexpected error:", error);
//       return rejectWithValue("An unexpected error occurred");
//     }
//   }
// );
export const getMe = createAsyncThunk(
  "users/getMe",
  async (_, { rejectWithValue }) => {
    try {
      const response = await userService();
      // Remove headers from the response before returning data
      const userData = response.data;

      // console.log("User Data without headers:", userData); // Debugging

      return userData; // Return only the user data, not headers
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);
// export const getMe = createAsyncThunk(
//   "users/getMe",
//   async (_, { rejectWithValue }) => {
//     try {
//       const userData = await userService();
//       return userData;
//     } catch (error: unknown) {
//       if (error instanceof Error) {
//         return rejectWithValue(error.message);
//       }
//       return rejectWithValue("An unexpected error occurred");
//     }
//   }
// );


const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    resetError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMe.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(getMe.fulfilled, (state, action) => {
        // console.log("Fulfilled Action:", action); // Check entire action object
        // console.log("Fulfilled Payload:", action.payload); // Check payload

        if (!action.payload) {
          state.loading = "failed";
          state.error = "No user data";
        } else {
          state.user = {
            fullname: action.payload.data.fullname,
            username: action.payload.data.username,
            activated: action.payload.data.activated,
            is_connected: action.payload.data.is_connected,
          };
          state.loading = "succeeded";
        }
      })
      .addCase(getMe.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { resetError } = userSlice.actions;
export default userSlice.reducer;

// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { RootState } from "../../app/store";
// export interface User {
//   id: string;
//   name: string;
//   email: string;
// }
// const initialState: Array<User> = [
//     {
//         id: '1',
//         name: 'John Doe',
//         email: 'john@test.com',
//     }
// ]
// export const userSlice = createSlice({
//   name: "users",
//   initialState,
//   reducers: {
//     addUser: (state, action: PayloadAction<User>) => {
//       state.push(action.payload);
//     },
//   },
// });
// export const { addUser } =
//   userSlice.actions;
// export const userSelector = (state: RootState) => state.userReducer;
// export default userSlice.reducer;
