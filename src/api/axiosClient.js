import axios from "axios";
const BASE_URL = "https://nodejs-ramenjiro-sercher.herokuapp.com/api/v1";
const getToken = () => localStorage.getItem("token");

const axiosClient = axios.create({
  baseURL: BASE_URL,
});

// APIを叩く前に前処理を行う
axiosClient.interceptors.request.use(async (config) => {
  return {
    ...config,
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${getToken()}`,
    },
  };
});

axiosClient.interceptors.response.use((response) => {
  return response.data;
},
  (err) => {
    throw err.response;
  }
);

export default axiosClient;
