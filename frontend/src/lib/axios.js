// axios.js
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";

const axiosInstance = axios.create({
  baseURL: "https://talent-iq-master-fhoy.onrender.com/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor me Clerk token inject karo
axiosInstance.interceptors.request.use(async (config) => {
  try {
    const { getToken } = useAuth();   // Clerk hook
    const token = await getToken({ template: "default" });

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (err) {
    console.error("Token fetch error:", err);
  }
  return config;
});

export default axiosInstance;
