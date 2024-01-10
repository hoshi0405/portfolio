
import axiosClient from "./axiosClient";


const storeApi = {
  create: () => axiosClient.post("store"),
  getAll: () => axiosClient.get("store"),
  getOne: (id) => axiosClient.get(`store/${id}`),
  update: (id, params) => axiosClient.put(`store/${id}`, params),
  getSearchStores: () => axiosClient.get("store"),
  getFavorites: () => axiosClient.get("store/favorites"),
  favorite: (id) => axiosClient.put(`/store/${id}/favorite`),
  delete: (id) => axiosClient.delete(`store/${id}`),
};


export default storeApi;
