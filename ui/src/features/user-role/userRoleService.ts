import api from "../../services/api";
import type { CreateUserRoleCredentials } from "./types";

export const createUserRoleService = async (credentials: CreateUserRoleCredentials) => {
  return await api.post("/user-role/create", credentials);
};

export const getAllUserRoleService = async () => {
  return await api.get("/user-role/all");
};

export const getOneUserRoleService = async (id: string) => {
  return await api.get(`/user-role/${id}`);
};

export const updateUserRoleService = async (id: string, data: CreateUserRoleCredentials) => {
  return await api.patch(`/user-role/${id}`, data);
};
