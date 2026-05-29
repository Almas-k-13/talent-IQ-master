import axiosInstance, { attachAuthToken } from "../lib/axios";
import { useAuth } from "@clerk/clerk-react";

// Custom hook to use sessionApi with Clerk token
export const useSessionApi = () => {
  const { getToken } = useAuth();

  return {
    createSession: async (data) => {
      console.log("SESSION API FILE LOADED");
      await attachAuthToken(axiosInstance, getToken);
      const response = await axiosInstance.post("/sessions/create", data);
      return response.data;
    },

    getActiveSessions: async () => {
      console.log("CALLING => /sessions/active");
      await attachAuthToken(axiosInstance, getToken);
      const response = await axiosInstance.get("/sessions/active");
      return response.data;
    },

    getMyRecentSessions: async () => {
      await attachAuthToken(axiosInstance, getToken);
      const response = await axiosInstance.get("/sessions/my-recent");
      return response.data;
    },

    getSessionById: async (id) => {
      await attachAuthToken(axiosInstance, getToken);
      const response = await axiosInstance.get(`/sessions/${id}`);
      return response.data;
    },

    joinSession: async (id) => {
      await attachAuthToken(axiosInstance, getToken);
      const response = await axiosInstance.post(`/sessions/${id}/join`);
      return response.data;
    },

    endSession: async (id) => {
      await attachAuthToken(axiosInstance, getToken);
      const response = await axiosInstance.post(`/sessions/${id}/end`);
      return response.data;
    },

    getChatStreamToken: async () => {
      await attachAuthToken(axiosInstance, getToken);
      const response = await axiosInstance.get(`/chat/token`);
      return response.data;
    },

    getVideoStreamToken: async (callId) => {
      await attachAuthToken(axiosInstance, getToken);
      const response = await axiosInstance.get(`/video/token`, {
        params: { callId },
      });
      return response.data;
    },
  };
};
