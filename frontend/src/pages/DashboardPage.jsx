import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Video,
  Clock3,
  Activity,
  Sparkles,
} from "lucide-react";

import {
  useActiveSessions,
  useCreateSession,
  useMyRecentSessions,
} from "../hooks/useSessions";
import toast from "react-hot-toast";

import Navbar from "../components/Navbar";
import WelcomeSection from "../components/WelcomeSection";
import ActiveSessions from "../components/ActiveSessions";
import RecentSessions from "../components/RecentSessions";
import CreateSessionModal from "../components/CreateSessionModal";

function DashboardPage() {
  const navigate = useNavigate();
  const { user } = useUser();

  const [showCreateModal, setShowCreateModal] = useState(false);

  const [roomConfig, setRoomConfig] = useState({
    problem: "",
    difficulty: "",
  });

  const createSessionMutation = useCreateSession();

  const {
    data: activeSessionsData,
    isLoading: loadingActiveSessions,
  } = useActiveSessions();

  const {
    data: recentSessionsData,
    isLoading: loadingRecentSessions,
  } = useMyRecentSessions();

  const handleCreateRoom = () => {
    if (!roomConfig.problem || !roomConfig.difficulty) return;

    createSessionMutation.mutate(
      {
        problem: roomConfig.problem,
        difficulty: roomConfig.difficulty.toLowerCase(),
      },
      {
        onSuccess: (data) => {
          console.log("SESSION RESPONSE", data);

          const sessionId =
            data?._id ||
            data?.session?._id;

          if (!sessionId) {
            toast.error("Session ID missing");
            return;
          }

          navigate(`/session/${sessionId}`);
        }
      }
    );
  };

  const activeSessions = activeSessionsData?.sessions || [];
  const recentSessions = recentSessionsData?.sessions || [];

  const isUserInSession = (session) => {
    if (!user?.id) return false;

    return (
      session.host?.clerkId === user.id ||
      session.participant?.clerkId === user.id
    );
  };

  return (
    <>
      <div className="min-h-screen bg-[#0b1120] text-white overflow-x-hidden">
        {/* Background Glow */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-green-500/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-500/10 blur-[120px] rounded-full" />
        </div>

        <Navbar />

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <WelcomeSection
            onCreateSession={() => setShowCreateModal(true)}
          />
        </motion.div>

        {/* Main */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 pb-20">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            {/* Active */}
            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 shadow-xl">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-green-500/20 flex items-center justify-center text-green-400">
                  <Activity />
                </div>

                <span className="text-green-400 text-sm">
                  Live
                </span>
              </div>

              <h2 className="text-4xl font-black mt-5">
                {activeSessions.length}
              </h2>

              <p className="text-gray-400 mt-2">
                Active Sessions
              </p>
            </div>

            {/* Recent */}
            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 shadow-xl">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                  <Clock3 />
                </div>

                <span className="text-cyan-400 text-sm">
                  History
                </span>
              </div>

              <h2 className="text-4xl font-black mt-5">
                {recentSessions.length}
              </h2>

              <p className="text-gray-400 mt-2">
                Past Sessions
              </p>
            </div>

            {/* Video */}
            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 shadow-xl">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-pink-500/20 flex items-center justify-center text-pink-400">
                  <Video />
                </div>

                <span className="text-pink-400 text-sm">
                  Stream
                </span>
              </div>

              <h2 className="text-4xl font-black mt-5">
                HD
              </h2>

              <p className="text-gray-400 mt-2">
                Video Calling
              </p>
            </div>

            {/* Platform */}
            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 shadow-xl">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-yellow-500/20 flex items-center justify-center text-yellow-400">
                  <Sparkles />
                </div>

                <span className="text-yellow-400 text-sm">
                  MERN
                </span>
              </div>

              <h2 className="text-4xl font-black mt-5">
                Pro
              </h2>

              <p className="text-gray-400 mt-2">
                Interview Platform
              </p>
            </div>
          </div>

          {/* Sessions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            {/* Active Sessions */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2"
            >
              <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold">
                      Active Sessions
                    </h2>

                    <p className="text-gray-400 text-sm mt-1">
                      Join live interview rooms and collaborate
                      in realtime.
                    </p>
                  </div>

                  <div className="px-4 py-1 rounded-full bg-green-500/20 text-green-400 border border-green-500/20 text-sm">
                    Live
                  </div>
                </div>

                <ActiveSessions
                  sessions={activeSessions}
                  isLoading={loadingActiveSessions}
                  isUserInSession={isUserInSession}
                />

                {!loadingActiveSessions &&
                  activeSessions.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                      <div className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mb-5">
                        <span className="text-3xl">🚀</span>
                      </div>

                      <h3 className="text-2xl font-bold mb-2">
                        No Active Sessions
                      </h3>

                      <p className="text-gray-400 max-w-md">
                        Start your first coding interview room
                        and invite developers to collaborate
                        together.
                      </p>

                      <button
                        onClick={() =>
                          setShowCreateModal(true)
                        }
                        className="mt-6 px-6 py-3 rounded-2xl bg-gradient-to-r from-green-400 to-emerald-500 text-black font-bold hover:scale-105 transition-all duration-200"
                      >
                        Create Session
                      </button>
                    </div>
                  )}
              </div>
            </motion.div>

            {/* Recent */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 }}
            >
              <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 shadow-2xl">
                <RecentSessions
                  sessions={recentSessions}
                  isLoading={loadingRecentSessions}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <CreateSessionModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        roomConfig={roomConfig}
        setRoomConfig={setRoomConfig}
        onCreateRoom={handleCreateRoom}
        isCreating={createSessionMutation.isPending}
      />
    </>
  );
}

export default DashboardPage;