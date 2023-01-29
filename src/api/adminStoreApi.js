import axiosClient from "./axiosClient";

const adminStoreApi = {
  create: () => axiosClient.post("/adminstore/adminstore"),
  getAll: () => axiosClient.get("/adminstore/adminstore"),
  getOne: (id) => axiosClient.get(`/adminstore/${id}`),
  update: (id, params) => axiosClient.put(`/adminstore/${id}`, params),
  delete: (id) => axiosClient.delete(`/adminstore/${id}`),
};


export default adminStoreApi;
