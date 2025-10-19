import api from "../../services/api";
import type { CreateAnneeCredentials } from "./types";

export const createAnneeService = async (credentials: CreateAnneeCredentials) => {
  return await api.post("/annee/create", credentials);
};

export const getAllAnneeService = async () => {
  return await api.get("/annee/all");
};

export const getOneAnneeService = async (id: string) => {
  return await api.get(`/annee/${id}`);
};

export const updateAnneeService = async (id: string, data: CreateAnneeCredentials) => {
  return await api.patch(`/annee/${id}`, data);
};
