import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { CandidentState, CreateCandidentCredentials } from "./types";
import {
  createCandidentService,
  getAllCandidentService,
} from "./candidentService";

const initialState: CandidentState = {
  cands: [],
  token: localStorage.getItem("access_token") || null, // Get token from localStorage
  loading: "idle",
  error: null,
};

// Async thunk to handle login
export const CreateCandident = createAsyncThunk(
  "year/createCandidents",
  async (credentials: CreateCandidentCredentials, { rejectWithValue }) => {
    try {
      const response = await createCandidentService(credentials);
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
export const getCandidents = createAsyncThunk(
  "years/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllCandidentService();
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

const candidentSlice = createSlice({
  name: "years",
  initialState,
  reducers: {
    resetError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      //signin
      .addCase(CreateCandident.pending, (state) => {
        state.loading = "loading";
        state.error = null;
      })
      .addCase(getCandidents.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(getCandidents.fulfilled, (state, action) => {
        // console.log("API Response Payload:", action.payload); // Debugging

        if (!action.payload) {
          state.loading = "failed";
          state.error = "No user data";
        } else {
          state.cands = action.payload.data.cands;
          state.loading = "succeeded";
        }
      })
      .addCase(getCandidents.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload as string;
      })
      .addCase(CreateCandident.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { resetError } = candidentSlice.actions;
export default candidentSlice.reducer;
