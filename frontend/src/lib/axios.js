import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://talent-iq-backend-kflz.onrender.com/api",
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
});

// DEBUG
axiosInstance.interceptors.request.use((config) => {
  console.log("🚀 FINAL API URL =>", {
    method: config.method,
    url: config.url,
    fullURL: `${config.baseURL}${config.url}`,
  });

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    console.log("✅ API RESPONSE =>", response.config.url, response.data);
    return response;
  },
  (error) => {
    console.log("❌ API ERROR =>", {
      url: error.config?.url,
      fullURL: `${error.config?.baseURL}${error.config?.url}`,
      response: error.response?.data,
    });

    return Promise.reject(error);
  }
);

export default axiosInstance;