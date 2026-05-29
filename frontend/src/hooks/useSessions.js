import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { sessionApi } from "../api/sessions";
import { useAuth } from "@clerk/clerk-react";

export const useCreateSession = () => {
  const { getToken } = useAuth();

  return useMutation({
    mutationKey: ["createSession"],
    mutationFn: (data) => sessionApi.createSession(data, getToken),
    onSuccess: () => toast.success("Session created successfully!"),
    onError: (error) =>
      toast.error(error.response?.data?.message || "Failed to create room"),
  });
};

export const useActiveSessions = () => {
  const { getToken } = useAuth();

  return useQuery({
    queryKey: ["activeSessions"],
    queryFn: () => sessionApi.getActiveSessions(getToken),
  });
};

export const useMyRecentSessions = () => {
  const { getToken } = useAuth();

  return useQuery({
    queryKey: ["myRecentSessions"],
    queryFn: () => sessionApi.getMyRecentSessions(getToken),
  });
};

export const useSessionById = (id) => {
  const { getToken } = useAuth();

  return useQuery({
    queryKey: ["session", id],
    queryFn: () => sessionApi.getSessionById(id, getToken),
    enabled: !!id,
    refetchInterval: 5000,
  });
};

export const useJoinSession = () => {
  const { getToken } = useAuth();

  return useMutation({
    mutationKey: ["joinSession"],
    mutationFn: (id) => sessionApi.joinSession(id, getToken),
    onSuccess: () => toast.success("Joined session successfully!"),
    onError: (error) =>
      toast.error(error.response?.data?.message || "Failed to join session"),
  });
};

export const useEndSession = () => {
  const { getToken } = useAuth();

  return useMutation({
    mutationKey: ["endSession"],
    mutationFn: (id) => sessionApi.endSession(id, getToken),
    onSuccess: () => toast.success("Session ended successfully!"),
    onError: (error) =>
      toast.error(error.response?.data?.message || "Failed to end session"),
  });
};
