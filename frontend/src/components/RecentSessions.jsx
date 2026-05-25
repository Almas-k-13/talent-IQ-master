import {
  Code2,
  Clock3,
  Users,
  Trophy,
  Loader2,
  CheckCircle2,
  Video,
} from "lucide-react";

import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";

function RecentSessions({ sessions, isLoading }) {
  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black">
            Recent Sessions
          </h2>

          <p className="text-gray-400 mt-1">
            Track your interview history and completed
            sessions.
          </p>
        </div>

        <div className="px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-semibold">
          History
        </div>
      </div>

      {/* Loading */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-10 h-10 animate-spin text-cyan-400" />
        </div>
      ) : sessions.length > 0 ? (
        <div className="space-y-4">
          {sessions.map((session, index) => {
            const difficulty =
              session.difficulty?.toLowerCase();

            return (
              <motion.div
                key={session._id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 hover:border-cyan-500/30 hover:bg-white/[0.07] transition-all duration-300"
              >
                {/* Top */}
                <div className="flex items-start justify-between gap-4">
                  {/* Left */}
                  <div className="flex gap-4 flex-1 min-w-0">
                    {/* Icon */}
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                      <Code2 className="text-white w-7 h-7" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h3 className="text-xl font-bold truncate">
                          {session.problem}
                        </h3>

                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                            difficulty === "easy"
                              ? "bg-green-500/20 text-green-400 border border-green-500/20"
                              : difficulty === "medium"
                              ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/20"
                              : "bg-red-500/20 text-red-400 border border-red-500/20"
                          }`}
                        >
                          {session.difficulty}
                        </span>
                      </div>

                      {/* Meta */}
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                        {/* Time */}
                        <div className="flex items-center gap-2">
                          <Clock3 className="w-4 h-4 text-cyan-400" />

                          <span>
                            {formatDistanceToNow(
                              new Date(session.createdAt),
                              {
                                addSuffix: true,
                              }
                            )}
                          </span>
                        </div>

                        {/* Participants */}
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-green-400" />

                          <span>
                            {session.participant
                              ? "2 Participants"
                              : "1 Participant"}
                          </span>
                        </div>

                        {/* Stream */}
                        <div className="flex items-center gap-2">
                          <Video className="w-4 h-4 text-pink-400" />

                          <span>HD Call</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Status */}
                  <div>
                    {session.status === "active" ? (
                      <div className="px-3 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                        ACTIVE
                      </div>
                    ) : (
                      <div className="px-3 py-2 rounded-full bg-white/5 border border-white/10 text-gray-300 text-xs font-bold">
                        COMPLETED
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom */}
                <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
                  {/* Completion */}
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <CheckCircle2 className="w-4 h-4 text-green-400" />

                    <span>
                      {session.status === "active"
                        ? "Interview in progress"
                        : "Interview completed"}
                    </span>
                  </div>

                  {/* Date */}
                  <div className="text-xs text-gray-500">
                    {new Date(
                      session.updatedAt
                    ).toLocaleDateString()}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        /* Empty */
        <div className="flex flex-col items-center justify-center py-24 text-center rounded-3xl border border-dashed border-white/10 bg-white/[0.03]">
          <div className="w-24 h-24 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-6">
            <Trophy className="w-10 h-10 text-cyan-400" />
          </div>

          <h3 className="text-3xl font-black mb-3">
            No Sessions Yet
          </h3>

          <p className="text-gray-400 max-w-md">
            Start your coding journey and complete your
            first interview session today.
          </p>
        </div>
      )}
    </div>
  );
}

export default RecentSessions;