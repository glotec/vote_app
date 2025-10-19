import api from "../../services/api";
import type { CreatePersonCredentials } from "./types";

export const createPersonService = async (credentials: CreatePersonCredentials) => {
  return await api.post("/person/create", credentials);
};

export const getAllPersonService = async () => {
  return await api.get("/person/all");
};

export const getOnePersonService = async (id: string) => {
  return await api.get(`/person/${id}`);
};

export const updatePersonService = async (id: string, data: CreatePersonCredentials) => {
  return await api.patch(`/person/${id}`, data);
};
