import axiosInstance from "../lib/axios";

export const sessionApi = {
  
  createSession: async (data) => {
    console.log("SESSION API FILE LOADED");
    // backend supports /api/sessions/create (and keeps /api/sessions/ for backwards compatibility)
    const response = await axiosInstance.post("/sessions/create", data);
    return response.data;
  },


  getActiveSessions: async () => {
    console.log("CALLING => /sessions/active");
    const response = await axiosInstance.get("/sessions/active");
    return response.data;
  },
  getMyRecentSessions: async () => {
    const response = await axiosInstance.get("/sessions/my-recent");
    return response.data;
  },

  getSessionById: async (id) => {
    const response = await axiosInstance.get(`/sessions/${id}`);
    return response.data;
  },

  joinSession: async (id) => {
    const response = await axiosInstance.post(`/sessions/${id}/join`);
    return response.data;
  },
  endSession: async (id) => {
    const response = await axiosInstance.post(`/sessions/${id}/end`);
    return response.data;
  },
  getChatStreamToken: async () => {
    const response = await axiosInstance.get(`/chat/token`);
    return response.data;
  },

  getVideoStreamToken: async (callId) => {
    // callId is stream "call id" (the session.callId)
    // backend builds call cid as default:{callId}
    const response = await axiosInstance.get(`/video/token`, {
      params: { callId },
    });
    return response.data;
  },
};
