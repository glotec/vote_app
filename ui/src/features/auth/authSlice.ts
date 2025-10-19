import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  getAllUsers,
  loginService,
  logoutService,
  signupService,
} from "./authService";
import type {
  AuthState,
  LoginCredentials,
  signupCredentials,
  User,
} from "./types";

const initialState: AuthState = {
  user: null,
  users: [],
  // token: null,
  token: localStorage.getItem("access_token") || null, // Get token from localStorage
  loading: false,
  loader: "idle",
  error: null,
};

// Async thunk to handle login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const response = await loginService(credentials);
      // console.log(response.data)
      return response.data; // { user, token }
    } catch (error: unknown) {
      return rejectWithValue(
        (error as unknown as { response?: { data?: string } })?.response
          ?.data || "Login failed"
      );
      const err = error as { response?: { data?: string } };
      return rejectWithValue(err.response?.data || "Connection impossible");
    }
  }
);

// Async thunk to handle signup
export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (credentials: signupCredentials, { rejectWithValue }) => {
    try {
      const response = await signupService(credentials);
      return response.data; // { user, token }
    } catch (error: unknown) {
      return rejectWithValue(
        (error as unknown as { response?: { data?: string } })?.response
          ?.data || "Login failed"
      );
      const err = error as { response?: { data?: string } };
      return rejectWithValue(
        err.response?.data || "Impossible de créer un utilisateur"
      );
    }
  }
);

// Async thunk to handle signup
export const getUsers = createAsyncThunk(
  "auth/getUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllUsers();
      // Remove headers from the response before returning data
      // console.log("User Data without headers:", response); // Debugging
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
// export const getUsers = createAsyncThunk(
//   "auth/getUsers",
//   async (_, { rejectWithValue }) => {
//     try {
//       const users = await getAllUsers(); // already Users[]
//       return users; // No `.data`
//     } catch (error: unknown) {
//       if (error instanceof Error) {
//         return rejectWithValue(error.message);
//       }
//       return rejectWithValue("An unexpected error occurred");
//     }
//   }
// );

// Async thunk to handle logout
export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  await logoutService();
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetError(state) {
      state.error = null;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      //signin
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loginUser.fulfilled,
        (
          state,
          action: PayloadAction<{ user: User; token: { access_token: string } }>
        ) => {
          state.loading = false;
          state.user = action.payload.user;

          // Extract the actual access_token string
          const accessToken = action.payload.token.access_token;

          if (accessToken) {
            state.token = accessToken; // Store the string token in Redux state
            localStorage.setItem("access_token", accessToken); // Save it in localStorage
          } else {
            console.error("Access token is missing in the response.");
          }
        }
      )
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      //signup
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        signupUser.fulfilled,
        (state, action: PayloadAction<{ user: User; token: string }>) => {
          state.loading = false;
          state.user = action.payload.user;
          state.token = action.payload.token;
          // Save token to localStorage
          localStorage.setItem("access_token", action.payload.token);
        }
      )
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        localStorage.removeItem("access_token");
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.users = action.payload; // 👈 Important!
      });
    // .addCase(getUsers.fulfilled, (state, action) => {
    //   // console.log("API Response Payload:", action.payload); // Debugging

    //   if (!action.payload) {
    //     state.loader = "failed";
    //     state.error = "No user data";
    //   } else {
    //     // state.user = action.payload.data.users;
    //     state.loader = "succeeded";
    //   }
    // });
  },
});

export const { resetError } = authSlice.actions;
export default authSlice.reducer;
