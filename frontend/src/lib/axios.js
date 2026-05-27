import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://talent-iq-backend-kflz.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

console.log("API URL:", axiosInstance.defaults.baseURL);

export default axiosInstance;