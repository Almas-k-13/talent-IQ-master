import {
  Terminal,
  CheckCircle2,
  XCircle,
  Sparkles,
} from "lucide-react";

function OutputPanel({ output }) {
  return (
    <div className="h-full bg-[#0f172a] flex flex-col overflow-hidden">
      {/* HEADER */}
      <div className="h-16 px-5 border-b border-white/10 bg-[#111827]/80 backdrop-blur-xl flex items-center justify-between">
        {/* Left */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <Terminal className="w-5 h-5 text-white" />
          </div>

          <div>
            <h3 className="font-bold text-white">
              Console Output
            </h3>

            <p className="text-xs text-gray-500">
              Execution results & logs
            </p>
          </div>
        </div>

        {/* Status */}
        {output && (
          <div
            className={`px-4 py-2 rounded-full text-sm font-semibold border flex items-center gap-2 ${
              output.success
                ? "bg-green-500/10 text-green-400 border-green-500/20"
                : "bg-red-500/10 text-red-400 border-red-500/20"
            }`}
          >
            {output.success ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                Success
              </>
            ) : (
              <>
                <XCircle className="w-4 h-4" />
                Error
              </>
            )}
          </div>
        )}
      </div>

      {/* BODY */}
      <div className="flex-1 overflow-auto p-5 font-mono text-sm">
        {/* EMPTY */}
        {output === null ? (
          <div className="h-full flex flex-col items-center justify-center text-center">
            <div className="w-24 h-24 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-6">
              <Sparkles className="w-10 h-10 text-cyan-400" />
            </div>

            <h3 className="text-2xl font-black text-white mb-3">
              Ready to Execute
            </h3>

            <p className="text-gray-400 max-w-md">
              Click{" "}
              <span className="text-green-400 font-semibold">
                Run Code
              </span>{" "}
              to compile and execute your solution.
            </p>
          </div>
        ) : output.success ? (
          /* SUCCESS */
          <div className="rounded-3xl border border-green-500/20 bg-green-500/5 p-5">
            <div className="flex items-center gap-2 mb-4 text-green-400 font-bold">
              <CheckCircle2 className="w-5 h-5" />
              Execution Successful
            </div>

            <pre className="whitespace-pre-wrap text-green-300 leading-relaxed overflow-x-auto">
              {output.output}
            </pre>
          </div>
        ) : (
          /* ERROR */
          <div className="space-y-4">
            {output.output && (
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <div className="text-gray-300 font-semibold mb-3">
                  Console Output
                </div>

                <pre className="whitespace-pre-wrap text-gray-300 overflow-x-auto">
                  {output.output}
                </pre>
              </div>
            )}

            <div className="rounded-3xl border border-red-500/20 bg-red-500/5 p-5">
              <div className="flex items-center gap-2 mb-4 text-red-400 font-bold">
                <XCircle className="w-5 h-5" />
                Execution Failed
              </div>

              <pre className="whitespace-pre-wrap text-red-300 leading-relaxed overflow-x-auto">
                {output.error}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default OutputPanel;