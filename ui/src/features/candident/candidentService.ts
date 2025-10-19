import api from "../../services/api";
import type { CreateCandidentCredentials } from "./types";

export const createCandidentService = async (credentials: CreateCandidentCredentials) => {
  return await api.post("/candident/create", credentials);
};

export const getAllCandidentService = async () => {
  return await api.get("/candident/all");
};

export const getOneCandidentService = async (id: string) => {
  return await api.get(`/candident/${id}`);
};

export const updateCandidentService = async (id: string, data: CreateCandidentCredentials) => {
  return await api.patch(`/candident/${id}`, data);
};
