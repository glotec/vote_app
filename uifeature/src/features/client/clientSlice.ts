import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { ClientState, CreateClientCredentials } from "./types";
import { createClientService, getAllClientService } from "./clientService";

const initialState: ClientState = {
  clients: [],
  token: localStorage.getItem("access_token") || null, // Get token from localStorage
  loading: "idle",
  error: null,
};

// Async thunk to handle login
export const CreateClient = createAsyncThunk(
  "client/createClients",
  async (credentials: CreateClientCredentials, { rejectWithValue }) => {
    try {
      const response = await createClientService(credentials);
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
export const getClients = createAsyncThunk(
  "clients/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllClientService();
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

const clientsSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {
    resetError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      //signin
      .addCase(CreateClient.pending, (state) => {
        state.loading = "loading";
        state.error = null;
      })
      .addCase(getClients.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(getClients.fulfilled, (state, action) => {
        // console.log("API Response Payload:", action.payload); // Debugging

        if (!action.payload) {
          state.loading = "failed";
          state.error = "No user data";
        } else {
          state.clients = action.payload.data.clients;
          state.loading = "succeeded";
        }
      })
      .addCase(getClients.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload as string;
      })
      .addCase(CreateClient.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { resetError } = clientsSlice.actions;
export default clientsSlice.reducer;
