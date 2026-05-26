import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

import { PROBLEMS } from "../data/problems";
import {
  ArrowRightIcon,
  BrainCircuitIcon,
  Code2Icon,
  FlameIcon,
  SparklesIcon,
  TrophyIcon,
} from "lucide-react";

import { getDifficultyBadgeClass } from "../lib/utils";

function ProblemsPage() {
  const problems = Object.values(PROBLEMS);

  const easyProblemsCount = problems.filter(
    (p) => p.difficulty === "Easy"
  ).length;

  const mediumProblemsCount = problems.filter(
    (p) => p.difficulty === "Medium"
  ).length;

  const hardProblemsCount = problems.filter(
    (p) => p.difficulty === "Hard"
  ).length;

  return (
    <div className="min-h-screen bg-[#0b1120] text-white overflow-hidden relative">
      {/* BACKGROUND EFFECTS */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-green-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        <Navbar />

        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* HERO */}
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green-500/20 bg-green-500/10 text-green-400 text-sm font-semibold mb-5">
              <SparklesIcon className="size-4" />
              Curated DSA Practice Collection
            </div>

            <h1 className="text-5xl md:text-6xl font-black leading-tight mb-5">
              Master Coding <br />
              <span className="bg-gradient-to-r from-green-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                Interview Problems
              </span>
            </h1>

            <p className="text-lg text-white/60 max-w-3xl leading-8">
              Practice real interview questions with interactive coding,
              realtime collaboration, and premium coding experience.
            </p>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-10">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl">
              <div className="flex items-center justify-between mb-5">
                <div className="size-14 rounded-2xl bg-green-500/10 flex items-center justify-center">
                  <Code2Icon className="size-7 text-green-400" />
                </div>

                <span className="text-4xl font-black text-green-400">
                  {problems.length}
                </span>
              </div>

              <h3 className="font-bold text-lg">Total Problems</h3>
              <p className="text-sm text-white/50 mt-1">
                Hand-picked coding challenges
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl">
              <div className="flex items-center justify-between mb-5">
                <div className="size-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
                  <TrophyIcon className="size-7 text-emerald-400" />
                </div>

                <span className="text-4xl font-black text-emerald-400">
                  {easyProblemsCount}
                </span>
              </div>

              <h3 className="font-bold text-lg">Easy</h3>
              <p className="text-sm text-white/50 mt-1">
                Beginner friendly questions
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl">
              <div className="flex items-center justify-between mb-5">
                <div className="size-14 rounded-2xl bg-yellow-500/10 flex items-center justify-center">
                  <BrainCircuitIcon className="size-7 text-yellow-400" />
                </div>

                <span className="text-4xl font-black text-yellow-400">
                  {mediumProblemsCount}
                </span>
              </div>

              <h3 className="font-bold text-lg">Medium</h3>
              <p className="text-sm text-white/50 mt-1">
                Logic building challenges
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl">
              <div className="flex items-center justify-between mb-5">
                <div className="size-14 rounded-2xl bg-red-500/10 flex items-center justify-center">
                  <FlameIcon className="size-7 text-red-400" />
                </div>

                <span className="text-4xl font-black text-red-400">
                  {hardProblemsCount}
                </span>
              </div>

              <h3 className="font-bold text-lg">Hard</h3>
              <p className="text-sm text-white/50 mt-1">
                Advanced interview level
              </p>
            </div>
          </div>

          {/* PROBLEMS GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {problems.map((problem) => (
              <Link
                key={problem.id}
                to={`/problem/${problem.id}`}
                className="group rounded-3xl border border-white/10 bg-gradient-to-br from-[#111827] to-[#0f172a] hover:border-green-500/30 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                <div className="p-7">
                  <div className="flex items-start justify-between gap-5 mb-5">
                    <div className="flex items-start gap-4">
                      <div className="size-14 rounded-2xl bg-gradient-to-br from-green-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-green-500/20">
                        <Code2Icon className="size-7 text-white" />
                      </div>

                      <div>
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                          <h2 className="text-2xl font-bold group-hover:text-green-400 transition-colors">
                            {problem.title}
                          </h2>

                          <span
                            className={`badge border-0 font-semibold ${getDifficultyBadgeClass(
                              problem.difficulty
                            )}`}
                          >
                            {problem.difficulty}
                          </span>
                        </div>

                        <p className="text-sm text-white/50 font-medium">
                          {problem.category}
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className="text-white/65 leading-7 mb-6 line-clamp-3">
                    {problem.description.text}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-green-400 font-semibold">
                      Start Solving
                    </div>

                    <div className="size-11 rounded-2xl bg-white/5 group-hover:bg-green-500 transition-all duration-300 flex items-center justify-center">
                      <ArrowRightIcon className="size-5 group-hover:text-white transition-colors" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* FOOTER */}
          <div className="mt-16 rounded-3xl border border-white/10 bg-gradient-to-r from-green-500/10 to-cyan-500/10 p-8 text-center">
            <h2 className="text-3xl font-black mb-3">
              Ready to Crack Interviews?
            </h2>

            <p className="text-white/60 max-w-2xl mx-auto leading-7">
              Practice consistently, improve your problem-solving skills,
              and become interview ready with realtime collaborative coding.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProblemsPage;