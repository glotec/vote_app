import api from "../../services/api";

export const loginService = async (credentials: { username: string; password: string }) => {
  return await api.post("/auth/signin", credentials);
};

export const signupService = async (credentials: { fullname:string, username: string; password: string }) => {
  return await api.post("/auth/signup", credentials);
};

export const getAllUsers = async () => {
  return await api.get("/auth/users");
};

export const logoutService = async () => {
  return await api.post("/auth/logout");
};
