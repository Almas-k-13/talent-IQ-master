import Editor from "@monaco-editor/react";

import {
  Loader2,
  Play,
  Code2,
  Terminal,
} from "lucide-react";

import { LANGUAGE_CONFIG } from "../data/problems";

function CodeEditorPanel({
  selectedLanguage,
  code,
  isRunning,
  onLanguageChange,
  onCodeChange,
  onRunCode,
}) {
  return (
    <div className="h-full bg-[#0f172a] flex flex-col overflow-hidden">
      {/* TOPBAR */}
      <div className="h-20 px-5 border-b border-white/10 bg-[#111827]/80 backdrop-blur-xl flex items-center justify-between">
        {/* LEFT */}
        <div className="flex items-center gap-4">
          {/* Icon */}
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-lg shadow-green-500/20">
            <Code2 className="text-black w-6 h-6" />
          </div>

          {/* Language */}
          <div>
            <p className="text-xs text-gray-500 mb-1">
              Programming Language
            </p>

            <div className="flex items-center gap-3">
              <img
                src={
                  LANGUAGE_CONFIG[
                    selectedLanguage
                  ].icon
                }
                alt={
                  LANGUAGE_CONFIG[
                    selectedLanguage
                  ].name
                }
                className="w-6 h-6 rounded-full"
              />

              <select
                value={selectedLanguage}
                onChange={onLanguageChange}
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white outline-none focus:border-green-500/40 focus:ring-2 focus:ring-green-500/10 transition-all"
              >
                {Object.entries(
                  LANGUAGE_CONFIG
                ).map(([key, lang]) => (
                  <option
                    key={key}
                    value={key}
                    className="bg-[#111827]"
                  >
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4">
          {/* Status */}
          <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300">
            <Terminal className="w-4 h-4 text-cyan-400" />

            Monaco Editor
          </div>

          {/* Run Button */}
          <button
            disabled={isRunning}
            onClick={onRunCode}
            className="h-12 px-6 rounded-2xl bg-gradient-to-r from-green-400 to-emerald-500 text-black font-bold flex items-center gap-3 hover:scale-105 transition-all duration-200 shadow-lg shadow-green-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isRunning ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Running...
              </>
            ) : (
              <>
                <Play className="w-5 h-5" />
                Run Code
              </>
            )}
          </button>
        </div>
      </div>

      {/* EDITOR */}
      <div className="flex-1 overflow-hidden">
        <Editor
          height="100%"
          language={
            LANGUAGE_CONFIG[
              selectedLanguage
            ].monacoLang
          }
          value={code}
          onChange={onCodeChange}
          theme="vs-dark"
          options={{
            fontSize: 16,
            fontFamily: "Fira Code, monospace",
            lineNumbers: "on",
            automaticLayout: true,
            minimap: {
              enabled: false,
            },
            scrollBeyondLastLine: false,
            padding: {
              top: 20,
            },
            smoothScrolling: true,
            cursorBlinking: "smooth",
            cursorSmoothCaretAnimation: "on",
            roundedSelection: true,
            renderLineHighlight: "all",
            wordWrap: "on",
            tabSize: 2,
          }}
        />
      </div>
    </div>
  );
}

export default CodeEditorPanel;