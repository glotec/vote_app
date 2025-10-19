import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { CreateUserRoleCredentials, UserRoleState } from "./types";
import { createUserRoleService, getAllUserRoleService } from "./userRoleService";
const initialState: UserRoleState = {
  roles: [],
  // token: null,
  token: localStorage.getItem("access_token") || null, // Get token from localStorage
  loading: "idle",
  error: null,
};

// Async thunk to handle login
export const CreateUserRole = createAsyncThunk(
  "userRole/createuserRoles",
  async (credentials: CreateUserRoleCredentials, { rejectWithValue }) => {
    try {
      const response = await createUserRoleService(credentials);
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
export const getuserRoles = createAsyncThunk(
  "userRoles/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllUserRoleService();
      // Remove headers from the response before returning data
      const userData = response.data;

    //   console.log("User Data without headers:", userData); // Debugging

      return userData; // Return only the user data, not headers
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

const userRolesSlice = createSlice({
  name: "userRole",
  initialState,
  reducers: {
    resetError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      //signin
      .addCase(CreateUserRole.pending, (state) => {
        state.loading = "loading";
        state.error = null;
      })
      .addCase(getuserRoles.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(getuserRoles.fulfilled, (state, action) => {
        // console.log("API Response Payload:", action.payload); // Debugging

        if (!action.payload) {
          state.loading = "failed";
          state.error = "No user data";
        } else {
          state.roles = action.payload.data.roles;
          state.loading = "succeeded";
        }
      })
      .addCase(getuserRoles.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload as string;
      })
      .addCase(CreateUserRole.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { resetError } = userRolesSlice.actions;
export default userRolesSlice.reducer;
