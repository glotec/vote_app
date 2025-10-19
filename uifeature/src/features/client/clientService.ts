import api from "../../services/api";
import type { CreateClientCredentials } from "./types";

export const createClientService = async (credentials: CreateClientCredentials) => {
  return await api.post("/client/create", credentials);
};

export const getAllClientService = async () => {
  return await api.get("/client/all");
};

export const getOneClientService = async (id: string) => {
  return await api.get(`/client/${id}`);
};

export const updateClientService = async (id: string, data: CreateClientCredentials) => {
  return await api.patch(`/client/${id}`, data);
};
