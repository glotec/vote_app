import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { CreateVoteCredentials, VoteState } from "./types";
import {
  createVoteService,
  getAllVoteService,
  getCountVoteService,
} from "./voteService";

const initialState: VoteState = {
  votes: [],
  voteCand: [],
  grouped: [],
  count: 0, // ✅ Add this line
  token: localStorage.getItem("access_token") || null, // Get token from localStorage
  loading: "idle",
  error: null,
};

// Async thunk to handle login
export const CreateVote = createAsyncThunk(
  "year/createVotes",
  async (credentials: CreateVoteCredentials, { rejectWithValue }) => {
    try {
      const response = await createVoteService(credentials);
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
export const getVotes = createAsyncThunk(
  "years/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllVoteService();
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

// export const getVoteStats = createAsyncThunk(
//   "votes/getVoteStats",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await getCountVoteService();
//       // Remove headers from the response before returning data
//       const userData = response.data;

//       //   console.log("User Data without headers:", userData); // Debugging

//       return userData; // Return only the user data, not headers
//     } catch (error: unknown) {
//       if (error instanceof Error) {
//         return rejectWithValue(error.message);
//       }
//       return rejectWithValue("An unexpected error occurred");
//     }
//   }
// );

export const getVoteStats = createAsyncThunk("votes/getVoteStats", async () => {
  const response = await getCountVoteService();
  return response.data; // or response.grouped depending on your structure
});

const voteSlice = createSlice({
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
      .addCase(CreateVote.pending, (state) => {
        state.loading = "loading";
        state.error = null;
      })
      .addCase(getVotes.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(getVotes.fulfilled, (state, action) => {
        const payload = action.payload;

        if (!payload || !payload.data || !Array.isArray(payload.data.votes)) {
          state.loading = "failed";
          state.error = "Invalid or missing vote data.";
          return;
        }

        state.votes = payload.data.votes;
        state.count = payload.count ?? payload.data.votes.length; // fallback to array length
        state.loading = "succeeded";
        state.error = null;
      })
      .addCase(getVoteStats.pending, (state) => {
        state.loading = "loading";
        state.error = null;
      })
      .addCase(getVoteStats.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.grouped = action.payload; // ✅ store grouped result
      })
      .addCase(getVoteStats.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message || "Failed to load vote stats";
      })
      // .addCase(getVoteStats.pending, (state) => {
      //   state.loading = "loading";
      // })
      // .addCase(getVoteStats.fulfilled, (state, action) => {
      //   state.loading = "succeeded";
      //   state.votes = action.payload.totalVotes;
      //   state.grouped = action.payload.data.data;
      //   state.count = action.payload.totalVotes.length;
      // })
      // .addCase(getVoteStats.rejected, (state, action) => {
      //   state.loading = "failed";
      //   state.error = action.error.message || "Failed to fetch vote stats.";
      // })
      .addCase(getVotes.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload as string;
      })
      .addCase(CreateVote.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { resetError } = voteSlice.actions;
export default voteSlice.reducer;
