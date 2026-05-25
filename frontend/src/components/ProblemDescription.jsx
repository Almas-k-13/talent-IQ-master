import {
  BookOpenIcon,
  ChevronDownIcon,
  Code2Icon,
  SparklesIcon,
} from "lucide-react";
import { getDifficultyBadgeClass } from "../lib/utils";

function ProblemDescription({
  problem,
  currentProblemId,
  onProblemChange,
  allProblems,
}) {
  return (
    <div className="h-full overflow-y-auto bg-[#0b1120] text-white custom-scrollbar">
      {/* HEADER */}
      <div className="sticky top-0 z-20 backdrop-blur-xl bg-[#0b1120]/90 border-b border-white/10">
        <div className="p-6">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-500/20 bg-green-500/10 text-green-400 text-xs font-semibold mb-4">
                <SparklesIcon className="size-3.5" />
                Realtime Coding Interview
              </div>

              <h1 className="text-4xl font-black tracking-tight mb-2">
                {problem.title}
              </h1>

              <div className="flex items-center gap-3 flex-wrap">
                <p className="text-white/60 font-medium">
                  {problem.category}
                </p>

                <span
                  className={`badge border-0 font-semibold ${getDifficultyBadgeClass(
                    problem.difficulty
                  )}`}
                >
                  {problem.difficulty}
                </span>
              </div>
            </div>
          </div>

          {/* SELECT */}
          <div className="mt-6 relative">
            <select
              className="w-full bg-[#111827] border border-white/10 hover:border-green-500/40 focus:border-green-400 rounded-2xl px-5 py-4 text-white outline-none transition-all appearance-none font-medium"
              value={currentProblemId}
              onChange={(e) => onProblemChange(e.target.value)}
            >
              {allProblems.map((p) => (
                <option
                  key={p.id}
                  value={p.id}
                  className="bg-[#111827] text-white"
                >
                  {p.title} - {p.difficulty}
                </option>
              ))}
            </select>

            <ChevronDownIcon className="size-5 absolute right-5 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* BODY */}
      <div className="p-6 space-y-6">
        {/* DESCRIPTION */}
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#111827] to-[#0f172a] overflow-hidden">
          <div className="flex items-center gap-3 px-6 py-5 border-b border-white/10">
            <div className="size-10 rounded-2xl bg-green-500/10 flex items-center justify-center">
              <BookOpenIcon className="size-5 text-green-400" />
            </div>

            <div>
              <h2 className="text-xl font-bold">Problem Description</h2>
              <p className="text-sm text-white/50">
                Understand the coding challenge carefully
              </p>
            </div>
          </div>

          <div className="p-6 space-y-5 leading-8 text-white/80">
            <p className="text-lg">{problem.description.text}</p>

            {problem.description.notes.map((note, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-white/[0.03] border border-white/5"
              >
                {note}
              </div>
            ))}
          </div>
        </div>

        {/* EXAMPLES */}
        <div className="rounded-3xl border border-white/10 bg-[#111827] overflow-hidden">
          <div className="flex items-center gap-3 px-6 py-5 border-b border-white/10">
            <div className="size-10 rounded-2xl bg-cyan-500/10 flex items-center justify-center">
              <Code2Icon className="size-5 text-cyan-400" />
            </div>

            <div>
              <h2 className="text-xl font-bold">Examples</h2>
              <p className="text-sm text-white/50">
                Sample test cases and outputs
              </p>
            </div>
          </div>

          <div className="p-6 space-y-5">
            {problem.examples.map((example, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-white/10 overflow-hidden bg-[#0f172a]"
              >
                <div className="px-5 py-3 border-b border-white/10 flex items-center gap-3">
                  <div className="size-7 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center text-sm font-bold">
                    {idx + 1}
                  </div>

                  <h3 className="font-semibold">
                    Example {idx + 1}
                  </h3>
                </div>

                <div className="p-5 space-y-4 font-mono text-sm">
                  <div>
                    <span className="text-cyan-400 font-bold">
                      Input:
                    </span>
                    <pre className="mt-2 whitespace-pre-wrap text-white/80">
                      {example.input}
                    </pre>
                  </div>

                  <div>
                    <span className="text-green-400 font-bold">
                      Output:
                    </span>
                    <pre className="mt-2 whitespace-pre-wrap text-white/80">
                      {example.output}
                    </pre>
                  </div>

                  {example.explanation && (
                    <div className="pt-4 border-t border-white/10">
                      <span className="text-pink-400 font-bold">
                        Explanation:
                      </span>

                      <p className="mt-2 text-white/70 leading-7 font-sans">
                        {example.explanation}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CONSTRAINTS */}
        <div className="rounded-3xl border border-white/10 bg-[#111827] overflow-hidden mb-10">
          <div className="px-6 py-5 border-b border-white/10">
            <h2 className="text-xl font-bold">Constraints</h2>
            <p className="text-sm text-white/50 mt-1">
              Important limits for the solution
            </p>
          </div>

          <div className="p-6 space-y-3">
            {problem.constraints.map((constraint, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-4 rounded-2xl bg-[#0f172a] border border-white/5"
              >
                <div className="size-2 rounded-full bg-green-400 mt-2" />

                <code className="text-white/80 text-sm break-all">
                  {constraint}
                </code>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProblemDescription;