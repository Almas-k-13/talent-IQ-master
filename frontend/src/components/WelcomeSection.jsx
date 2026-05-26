import { motion } from "framer-motion";
import { Sparkles, Video, Code2, ArrowRight} from "lucide-react";
import { Link } from "react-router-dom";

function WelcomeSection({ onCreateSession }) {
  return (
    <section className="relative px-4 md:px-6 pt-10 pb-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl"
        >
          {/* Glow */}
          <div className="absolute top-0 left-0 w-72 h-72 bg-green-500/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-cyan-500/10 blur-[120px] rounded-full" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center p-8 md:p-12">
            {/* LEFT */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green-500/20 bg-green-500/10 text-green-400 text-sm mb-6">
                <Sparkles size={16} />
                Realtime MERN Interview Platform
              </div>

              <h1 className="text-3xl md:text-5xl lg:text-6xl font-black leading-tight">
                Practice{" "}
                <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                  Coding Interviews
                </span>{" "}
                Live.
              </h1>

              <p className="text-gray-400 text-base md:text-lg mt-6 leading-relaxed max-w-xl">
                Collaborate in realtime with video calling, live code editing,
                and interactive interview rooms built for developers.
              </p>

              {/* Buttons */}
              <div className="flex flex-wrap gap-4 mt-8">
                <button
                  onClick={onCreateSession}
                  className="group px-7 py-4 rounded-2xl bg-gradient-to-r from-green-400 to-emerald-500 text-black font-bold flex items-center gap-2 hover:scale-105 transition-all duration-200 shadow-lg shadow-green-500/20"
                >
                  Create Session
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>

                <Link
                  to="/problems"
                  className="px-7 py-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-200 text-white font-semibold inline-flex items-center justify-center"
                >
                  Explore Problems
                </Link>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-8 mt-10">
                <div>
                  <h3 className="text-3xl font-black text-green-400">100+</h3>
                  <p className="text-gray-400 text-sm mt-1">
                    Coding Problems
                  </p>
                </div>

                <div>
                  <h3 className="text-3xl font-black text-cyan-400">Live</h3>
                  <p className="text-gray-400 text-sm mt-1">
                    Video Interviews
                  </p>
                </div>

                <div>
                  <h3 className="text-3xl font-black text-yellow-400">MERN</h3>
                  <p className="text-gray-400 text-sm mt-1">
                    Fullstack Powered
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="relative">
              <div className="rounded-[28px] border border-white/10 bg-[#0f172a]/80 p-6 backdrop-blur-xl shadow-2xl">
                {/* Top Bar */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="font-bold text-xl">
                      Live Interview Room
                    </h3>
                    <p className="text-gray-400 text-sm mt-1">
                      Collaborate with developers in realtime
                    </p>
                  </div>

                  <div className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 border border-green-500/20 text-sm">
                    Live
                  </div>
                </div>

                {/* Cards */}
                <div className="space-y-4">
                  <div className="flex items-center gap-4 rounded-2xl bg-white/5 border border-white/10 p-4">
                    <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center text-green-400">
                      <Code2 />
                    </div>

                    <div>
                      <h4 className="font-semibold">
                        Realtime Code Editor
                      </h4>
                      <p className="text-sm text-gray-400">
                        Practice coding interviews together.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 rounded-2xl bg-white/5 border border-white/10 p-4">
                    <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                      <Video />
                    </div>

                    <div>
                      <h4 className="font-semibold">
                        HD Video Calling
                      </h4>
                      <p className="text-sm text-gray-400">
                        Communicate seamlessly during interviews.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Fake Code */}
                <div className="mt-6 rounded-2xl bg-black/40 border border-white/10 p-4 font-mono text-sm overflow-hidden">
                  <p className="text-green-400">
                    function twoSum(nums, target) {"{"}
                  </p>
                  <p className="text-white/80 pl-4">
                    // Write your solution here
                  </p>
                  <p className="text-cyan-400 pl-4">
                    return [0, 1];
                  </p>
                  <p className="text-green-400">{"}"}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default WelcomeSection;