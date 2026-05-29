// src/lib/axios.js
import axios from "axios";
import { getToken } from "@clerk/clerk-react"; // Clerk token fetcher

const axiosInstance = axios.create({
  baseURL: "https://talent-iq-master-fhoy.onrender.com/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// REQUEST LOGGER
axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      const token = await getToken({ template: "default" });
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (err) {
      console.error("Token fetch error:", err);
    }

    console.log("🚀 REQUEST =>", {
      method: config.method,
      url: config.url,
      baseURL: config.baseURL,
      fullURL: `${config.baseURL}${config.url}`,
    });

    return config;
  },
  (error) => {
    console.log("❌ REQUEST ERROR", error);
    return Promise.reject(error);
  }
);

// RESPONSE LOGGER
axiosInstance.interceptors.response.use(
  (response) => {
    console.log("✅ RESPONSE =>", {
      url: response.config.url,
      data: response.data,
    });

    return response;
  },
  (error) => {
    console.log("❌ API ERROR =>", {
      url: error.config?.url,
      response: error.response?.data,
    });

    return Promise.reject(error);
  }
);

export default axiosInstance;
