import axiosClient from "./axiosClient";

const adminAuthApi = {
  register: (params) => axiosClient.post("/adminauth/adminregister", params),
  login: (params) => axiosClient.post("/adminauth/adminlogin", params),
  verifyToken: () => axiosClient.post("/adminauth/verifytoken"),
};


export default adminAuthApi;
