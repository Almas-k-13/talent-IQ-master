// src/lib/axios.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://talent-iq-master-fhoy.onrender.com/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// REQUEST LOGGER
axiosInstance.interceptors.request.use(
  (config) => {
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

/**
 * Helper function to attach Clerk token manually.
 * Call this inside your React components.
 */
export const attachAuthToken = async (axiosInstance, getToken) => {
  const token = await getToken({ template: "default" });
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
};
