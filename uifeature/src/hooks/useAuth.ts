import { useMemo } from "react";
import useAppSelector from "./useAppSelector";
import useAppDispatch from "./useAppDispatch";
import { logoutUser } from "../features/auth/authSlice";

const useAuth = () => {
  const { user, token } = useAppSelector((state) => state.authSlice);
  const dispatch = useAppDispatch();

  const isAuthenticated = useMemo(() => !!token, [token]);

  const logout = () => {
    dispatch(logoutUser());
    // Optionally remove the token from localStorage during logout
    localStorage.removeItem("access_token");
  };

  return { user, isAuthenticated, logout };
};

export default useAuth;
