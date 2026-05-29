// src/api/sessions.js
import axiosInstance, { attachAuthToken } from "../lib/axios";
import { useAuth } from "@clerk/clerk-react";


export const sessionApi = {
  createSession: async (data, getToken) => {
    await attachAuthToken(axiosInstance, getToken);
    const response = await axiosInstance.post("/sessions/create", data);
    return response.data;
  },
  getActiveSessions: async (getToken) => {
    await attachAuthToken(axiosInstance, getToken);
    const response = await axiosInstance.get("/sessions/active");
    return response.data;
  },
  getMyRecentSessions: async (getToken) => {
    await attachAuthToken(axiosInstance, getToken);
    const response = await axiosInstance.get("/sessions/my-recent");
    return response.data;
  },
  getSessionById: async (id, getToken) => {
    await attachAuthToken(axiosInstance, getToken);
    const response = await axiosInstance.get(`/sessions/${id}`);
    return response.data;
  },
  joinSession: async (id, getToken) => {
    await attachAuthToken(axiosInstance, getToken);
    const response = await axiosInstance.post(`/sessions/${id}/join`);
    return response.data;
  },
  endSession: async (id, getToken) => {
    await attachAuthToken(axiosInstance, getToken);
    const response = await axiosInstance.post(`/sessions/${id}/end`);
    return response.data;
  },
  getChatStreamToken: async (getToken) => {
    await attachAuthToken(axiosInstance, getToken);
    const response = await axiosInstance.get(`/chat/token`);
    return response.data;
  },
  getVideoStreamToken: async (callId, getToken) => {
    await attachAuthToken(axiosInstance, getToken);
    const response = await axiosInstance.get(`/video/token`, {
      params: { callId },
    });
    return response.data;
  },
};

// Hook style (new)
export const useSessionApi = () => {
  const { getToken } = useAuth();
  return {
    createSession: (data) => sessionApi.createSession(data, getToken),
    getActiveSessions: () => sessionApi.getActiveSessions(getToken),
    getMyRecentSessions: () => sessionApi.getMyRecentSessions(getToken),
    getSessionById: (id) => sessionApi.getSessionById(id, getToken),
    joinSession: (id) => sessionApi.joinSession(id, getToken),
    endSession: (id) => sessionApi.endSession(id, getToken),
    getChatStreamToken: () => sessionApi.getChatStreamToken(getToken),
    getVideoStreamToken: (callId) => sessionApi.getVideoStreamToken(callId, getToken),
  };
};
