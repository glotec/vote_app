import api from "../../services/api";
import type { CreateVoteCredentials } from "./types";

export const createVoteService = async (credentials: CreateVoteCredentials) => {
  return await api.post("/vote/create", credentials);
};

export const getAllVoteService = async () => {
  return await api.get("/vote/all");
};

// export const getCountVoteService = async () => {
//   return await api.get("/vote/count");
// };

export const getCountVoteService = async () => {
  return await api.get("/vote/vcount");
};

export const getOneVoteService = async (id: string) => {
  return await api.get(`/vote/${id}`);
};

export const updateVoteService = async (id: string, data: CreateVoteCredentials) => {
  return await api.patch(`/vote/${id}`, data);
};
