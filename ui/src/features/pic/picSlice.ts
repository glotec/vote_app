import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { CreatePicCredentials, PicState } from "./types";
import { createPicService, getAllPicService } from "./picService";

const initialState: PicState = {
  pics: [],
  token: localStorage.getItem("access_token") || null, // Get token from localStorage
  loading: "idle",
  error: null,
};

// Async thunk to handle login
export const CreatePic = createAsyncThunk(
  "year/createPics",
  async (credentials: CreatePicCredentials, { rejectWithValue }) => {
    try {
      const response = await createPicService(credentials);
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
export const getPics = createAsyncThunk(
  "years/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllPicService();
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

const picSlice = createSlice({
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
      .addCase(CreatePic.pending, (state) => {
        state.loading = "loading";
        state.error = null;
      })
      .addCase(getPics.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(getPics.fulfilled, (state, action) => {
        // console.log("API Response Payload:", action.payload); // Debugging

        if (!action.payload) {
          state.loading = "failed";
          state.error = "No user data";
        } else {
          // console.log(action.payload.data.pictures)
          state.pics = action.payload.data.pictures;
          state.loading = "succeeded";
        }
      })
      .addCase(getPics.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload as string;
      })
      .addCase(CreatePic.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { resetError } = picSlice.actions;
export default picSlice.reducer;
