import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://talent-iq-backend-kflz.onrender.com/api";

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
});

console.log("API URL:", API_URL);

export default axiosInstance;