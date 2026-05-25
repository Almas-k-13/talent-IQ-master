import axios from "axios";

// Hard-fail early in dev to avoid confusing 404s caused by missing env.
const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
  // eslint-disable-next-line no-console
  console.error(
    "[axios] VITE_API_URL is missing. Set it to something like http://localhost:3000/api"
  );
}

const axiosInstance = axios.create({
  // VITE_API_URL should already include /api, e.g. http://localhost:3000/api
  baseURL: API_URL || "http://localhost:3000/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;

