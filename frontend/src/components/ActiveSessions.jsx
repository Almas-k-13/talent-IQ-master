import {
  ArrowRight,
  Code2,
  Crown,
  Users,
  Sparkles,
  Loader2,
  Video,
} from "lucide-react";

import { Link } from "react-router";
import { motion } from "framer-motion";

function ActiveSessions({
  sessions,
  isLoading,
  isUserInSession,
}) {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black">
            Live Sessions
          </h2>

          <p className="text-gray-400 mt-1">
            Join live interview rooms and collaborate in
            realtime.
          </p>
        </div>

        <div className="px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-semibold flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          {sessions.length} Active
        </div>
      </div>

      {/* Loading */}
      {isLoading ? (
        <div className="flex items-center justify-center py-24">
          <Loader2 className="w-10 h-10 animate-spin text-green-400" />
        </div>
      ) : sessions.length > 0 ? (
        <div className="space-y-5">
          {sessions.map((session, index) => {
            const isFull =
              session.participant &&
              !isUserInSession(session);

            return (
              <motion.div
                key={session._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 hover:border-green-500/30 hover:bg-white/[0.07] transition-all duration-300"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  {/* LEFT */}
                  <div className="flex items-start gap-4 flex-1">
                    {/* Icon */}
                    <div className="relative min-w-[64px] h-16 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-lg shadow-green-500/20">
                      <Code2 className="text-black w-8 h-8" />

                      <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-green-400 border-2 border-[#0b1120]" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      {/* Problem */}
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <h3 className="text-2xl font-bold truncate">
                          {session.problem}
                        </h3>

                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                            session.difficulty === "easy"
                              ? "bg-green-500/20 text-green-400 border border-green-500/20"
                              : session.difficulty === "medium"
                              ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/20"
                              : "bg-red-500/20 text-red-400 border border-red-500/20"
                          }`}
                        >
                          {session.difficulty}
                        </span>
                      </div>

                      {/* Meta */}
                      <div className="flex flex-wrap items-center gap-5 text-gray-300">
                        {/* Host */}
                        <div className="flex items-center gap-2">
                          <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
                            <Crown className="w-4 h-4 text-yellow-400" />
                          </div>

                          <div>
                            <p className="text-xs text-gray-500">
                              Host
                            </p>

                            <p className="font-medium">
                              {session.host?.name}
                            </p>
                          </div>
                        </div>

                        {/* Participants */}
                        <div className="flex items-center gap-2">
                          <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
                            <Users className="w-4 h-4 text-cyan-400" />
                          </div>

                          <div>
                            <p className="text-xs text-gray-500">
                              Participants
                            </p>

                            <p className="font-medium">
                              {session.participant
                                ? "2 / 2"
                                : "1 / 2"}
                            </p>
                          </div>
                        </div>

                        {/* Video */}
                        <div className="flex items-center gap-2">
                          <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
                            <Video className="w-4 h-4 text-pink-400" />
                          </div>

                          <div>
                            <p className="text-xs text-gray-500">
                              Call
                            </p>

                            <p className="font-medium">
                              HD Stream
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* RIGHT */}
                  <div className="flex flex-col items-end gap-4">
                    {/* Status */}
                    {isFull ? (
                      <div className="px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-semibold">
                        Room Full
                      </div>
                    ) : (
                      <div className="px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-semibold flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                        Open
                      </div>
                    )}

                    {/* Button */}
                    {isFull ? (
                      <button className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-gray-500 cursor-not-allowed">
                        Session Full
                      </button>
                    ) : (
                      <Link
                        to={`/session/${session._id}`}
                        className="group px-6 py-3 rounded-2xl bg-gradient-to-r from-green-400 to-emerald-500 text-black font-bold flex items-center gap-2 hover:scale-105 transition-all duration-200 shadow-lg shadow-green-500/20"
                      >
                        {isUserInSession(session)
                          ? "Rejoin Session"
                          : "Join Session"}

                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        /* Empty */
        <div className="flex flex-col items-center justify-center py-24 text-center rounded-3xl border border-dashed border-white/10 bg-white/[0.03]">
          <div className="w-24 h-24 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mb-6">
            <Sparkles className="w-10 h-10 text-green-400" />
          </div>

          <h3 className="text-3xl font-black mb-3">
            No Active Sessions
          </h3>

          <p className="text-gray-400 max-w-md">
            Start your first interview room and invite
            developers to collaborate in realtime coding
            interviews.
          </p>
        </div>
      )}
    </div>
  );
}

export default ActiveSessions;