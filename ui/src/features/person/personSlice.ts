import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { CreatePersonCredentials, PersonState } from "./types";
import { createPersonService, getAllPersonService } from "./personService";

const initialState: PersonState = {
  persons: [],
  token: localStorage.getItem("access_token") || null, // Get token from localStorage
  loading: "idle",
  error: null,
};

// Async thunk to handle login
export const createPerson = createAsyncThunk(
  "person/createPersons",
  async (credentials: CreatePersonCredentials, { rejectWithValue }) => {
    try {
      const response = await createPersonService(credentials);
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
export const getPersons = createAsyncThunk(
  "persons/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllPersonService();
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

const personSlice = createSlice({
  name: "persons",
  initialState,
  reducers: {
    resetError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      //signin
      .addCase(createPerson.pending, (state) => {
        state.loading = "loading";
        state.error = null;
      })
      .addCase(getPersons.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(getPersons.fulfilled, (state, action) => {
        // console.log("API Response Payload:", action.payload); // Debugging

        if (!action.payload) {
          state.loading = "failed";
          state.error = "No user data";
        } else {
          state.persons = action.payload.data.persons;
          state.loading = "succeeded";
        }
      })
      .addCase(getPersons.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload as string;
      })
      .addCase(createPerson.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { resetError } = personSlice.actions;
export default personSlice.reducer;
