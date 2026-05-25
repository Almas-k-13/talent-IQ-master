import {
  Code2,
  Loader2,
  Plus,
  X,
  Sparkles,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";
import { PROBLEMS } from "../data/problems";

function CreateSessionModal({
  isOpen,
  onClose,
  roomConfig,
  setRoomConfig,
  onCreateRoom,
  isCreating,
}) {
  const problems = Object.values(PROBLEMS);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* BACKDROP */}
        <div
          className="absolute inset-0 bg-black/70 backdrop-blur-md"
          onClick={onClose}
        />

        {/* MODAL */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.95 }}
          transition={{ duration: 0.25 }}
          className="relative z-10 w-full max-w-2xl rounded-[32px] border border-white/10 bg-[#111827]/90 backdrop-blur-2xl shadow-2xl overflow-hidden"
        >
          {/* Glow */}
          <div className="absolute top-0 left-0 w-72 h-72 bg-green-500/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-cyan-500/10 blur-[120px] rounded-full" />

          {/* CONTENT */}
          <div className="relative z-10 p-8">
            {/* Header */}
            <div className="flex items-start justify-between mb-8">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green-500/20 bg-green-500/10 text-green-400 text-sm mb-4">
                  <Sparkles size={16} />
                  New Interview Room
                </div>

                <h2 className="text-4xl font-black">
                  Create Session
                </h2>

                <p className="text-gray-400 mt-2">
                  Start a realtime coding interview room
                  with video collaboration.
                </p>
              </div>

              {/* Close */}
              <button
                onClick={onClose}
                className="w-12 h-12 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all duration-200"
              >
                <X size={20} />
              </button>
            </div>

            {/* Form */}
            <div className="space-y-7">
              {/* Problem */}
              <div>
                <label className="block text-sm font-semibold mb-3 text-gray-300">
                  Select Coding Problem
                </label>

                <select
                  value={roomConfig.problem}
                  onChange={(e) => {
                    const selectedProblem = problems.find(
                      (p) => p.title === e.target.value
                    );

                    setRoomConfig({
                      difficulty:
                        selectedProblem?.difficulty || "",
                      problem: e.target.value,
                    });
                  }}
                  className="w-full h-14 px-5 rounded-2xl bg-white/5 border border-white/10 text-white outline-none focus:border-green-500/40 focus:ring-2 focus:ring-green-500/10 transition-all"
                >
                  <option
                    value=""
                    disabled
                    className="bg-[#111827]"
                  >
                    Choose a coding problem...
                  </option>

                  {problems.map((problem) => (
                    <option
                      key={problem.id}
                      value={problem.title}
                      className="bg-[#111827]"
                    >
                      {problem.title} (
                      {problem.difficulty})
                    </option>
                  ))}
                </select>
              </div>

              {/* Summary */}
              {roomConfig.problem && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-3xl border border-green-500/20 bg-green-500/10 p-5"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-lg shadow-green-500/20">
                      <Code2 className="text-black w-7 h-7" />
                    </div>

                    <div className="flex-1">
                      <h3 className="font-bold text-xl mb-3">
                        Room Summary
                      </h3>

                      <div className="space-y-2 text-gray-300">
                        <p>
                          <span className="text-white font-semibold">
                            Problem:
                          </span>{" "}
                          {roomConfig.problem}
                        </p>

                        <p>
                          <span className="text-white font-semibold">
                            Difficulty:
                          </span>{" "}
                          {roomConfig.difficulty}
                        </p>

                        <p>
                          <span className="text-white font-semibold">
                            Participants:
                          </span>{" "}
                          2 Developers
                        </p>

                        <p>
                          <span className="text-white font-semibold">
                            Features:
                          </span>{" "}
                          Video Call + Live Code Editor
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-end mt-10">
              <button
                onClick={onClose}
                className="h-14 px-7 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-200 font-semibold"
              >
                Cancel
              </button>

              <button
                onClick={onCreateRoom}
                disabled={
                  isCreating || !roomConfig.problem
                }
                className="h-14 px-8 rounded-2xl bg-gradient-to-r from-green-400 to-emerald-500 text-black font-black flex items-center justify-center gap-3 hover:scale-105 transition-all duration-200 shadow-lg shadow-green-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isCreating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Creating Session...
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5" />
                    Create Session
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default CreateSessionModal;