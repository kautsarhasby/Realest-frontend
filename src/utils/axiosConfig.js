import axios from "axios";
import Cookies from "js-cookie";

// Buat instance Axios dengan pengaturan default
const axiosInstance = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
  headers: {
    "X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN"),
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("XSRF-TOKEN");
    if (token) {
      config.headers["X-XSRF-TOKEN"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
