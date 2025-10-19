import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import userReducer from "../features/users/userSlice";
import userRoleSlice from "../features/user-role/userRoleSlice";
import clientsSlice from "../features/client/clientSlice";
import yearSlice from "../features/year/yearSlice";
import personSlice from "../features/person/personSlice";

export const store = configureStore({
  reducer: {
    authSlice,
    userReducer,
    userRoleSlice,
    clientsSlice,
    yearSlice,
    personSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Allow headers to be stored in the state
        ignoredPaths: ["payload.headers"],
      },
    }),
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
