import api from "../../services/api";
import type { CreatePicCredentials } from "../pic/types";

// export const createPicService = async (credentials: CreatePicCredentials) => {
//   return await api.post("/pic/create", credentials);
// };
export const createPicService = async (credentials: CreatePicCredentials) => {
  const formData = new FormData();
  formData.append("pid", credentials.pid);
  formData.append("cand", credentials.cand);
  formData.append("file", credentials.file); // assuming 'name' is the File

  const token = localStorage.getItem("access_token");

  return await api.post("/pic/create", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
};

export const getAllPicService = async () => {
  return await api.get("/pic/all");
};

export const getOnePicService = async (id: string) => {
  return await api.get(`/pic/${id}`);
};

export const updatePicService = async (id: string, data: CreatePicCredentials) => {
  return await api.patch(`/pic/${id}`, data);
};
