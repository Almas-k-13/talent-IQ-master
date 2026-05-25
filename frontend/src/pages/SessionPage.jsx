import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import {
  useEndSession,
  useJoinSession,
  useSessionById,
} from "../hooks/useSessions";

import { PROBLEMS } from "../data/problems";
import { executeCode } from "../lib/piston";

import Navbar from "../components/Navbar";

import {
  Panel,
  PanelGroup,
  PanelResizeHandle,
} from "react-resizable-panels";

import { getDifficultyBadgeClass } from "../lib/utils";

import {
  Loader2Icon,
  LogOutIcon,
  PhoneOffIcon,
  SparklesIcon,
} from "lucide-react";

import CodeEditorPanel from "../components/CodeEditorPanel";
import OutputPanel from "../components/OutputPanel";

import useStreamClient from "../hooks/useStreamClient";

import {
  StreamCall,
  StreamVideo,
} from "@stream-io/video-react-sdk";

import VideoCallUI from "../components/VideoCallUI";

function SessionPage() {
  const navigate = useNavigate();

  const { id } = useParams();

  const { user } = useUser();

  const [output, setOutput] = useState(null);

  const [isRunning, setIsRunning] = useState(false);

  const {
    data: sessionData,
    isLoading: loadingSession,
    refetch,
  } = useSessionById(id);

  const joinSessionMutation = useJoinSession();

  const endSessionMutation = useEndSession();

  const session = sessionData?.session;

  const isHost =
    session?.host?.clerkId === user?.id;

  const isParticipant =
    session?.participant?.clerkId === user?.id;

  const {
    call,
    channel,
    chatClient,
    isInitializingCall,
    streamClient,
  } = useStreamClient(
    session,
    loadingSession,
    isHost,
    isParticipant
  );

  const problemData = session?.problem
    ? Object.values(PROBLEMS).find(
        (p) => p.title === session.problem
      )
    : null;

  const [selectedLanguage, setSelectedLanguage] =
    useState("javascript");

  const [code, setCode] = useState(
    problemData?.starterCode?.[
      selectedLanguage
    ] || ""
  );

  useEffect(() => {
    if (!session || !user || loadingSession)
      return;

    if (isHost || isParticipant) return;

    joinSessionMutation.mutate(id, {
      onSuccess: refetch,
    });
  }, [
    session,
    user,
    loadingSession,
    isHost,
    isParticipant,
    id,
  ]);

  useEffect(() => {
    if (!session || loadingSession) return;

    if (session.status === "completed")
      navigate("/dashboard");
  }, [session, loadingSession, navigate]);

  useEffect(() => {
    if (
      problemData?.starterCode?.[
        selectedLanguage
      ]
    ) {
      setCode(
        problemData.starterCode[
          selectedLanguage
        ]
      );
    }
  }, [problemData, selectedLanguage]);

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;

    setSelectedLanguage(newLang);

    const starterCode =
      problemData?.starterCode?.[newLang] ||
      "";

    setCode(starterCode);

    setOutput(null);
  };

  const handleRunCode = async () => {
    setIsRunning(true);

    setOutput(null);

    const result = await executeCode(
      selectedLanguage,
      code
    );

    setOutput(result);

    setIsRunning(false);
  };

  const handleEndSession = () => {
    if (
      confirm(
        "Are you sure you want to end this session?"
      )
    ) {
      endSessionMutation.mutate(id, {
        onSuccess: () =>
          navigate("/dashboard"),
      });
    }
  };

  return (
    <div className="h-screen bg-[#0b1120] text-white flex flex-col overflow-hidden">
      <Navbar />

      <div className="flex-1 overflow-hidden">
        <PanelGroup direction="horizontal">
          {/* LEFT PANEL */}
          <Panel defaultSize={50} minSize={30}>
            <PanelGroup direction="vertical">
              {/* PROBLEM PANEL */}
              <Panel defaultSize={50} minSize={20}>
                <div className="h-full overflow-y-auto bg-[#111827] border-r border-white/10">
                  {/* HEADER */}
                  <div className="p-6 bg-[#0f172a] border-b border-white/10 backdrop-blur-xl sticky top-0 z-10">
                    <div className="flex items-start justify-between gap-5 flex-wrap">
                      {/* LEFT */}
                      <div>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green-500/20 bg-green-500/10 text-green-400 text-sm mb-4">
                          <SparklesIcon className="w-4 h-4" />
                          Live Interview Session
                        </div>

                        <h1 className="text-4xl font-black">
                          {session?.problem ||
                            "Loading..."}
                        </h1>

                        {problemData?.category && (
                          <p className="text-gray-400 mt-2">
                            {
                              problemData.category
                            }
                          </p>
                        )}

                        <p className="text-gray-500 mt-3">
                          Host:{" "}
                          {
                            session?.host?.name
                          }{" "}
                          •{" "}
                          {session?.participant
                            ? 2
                            : 1}
                          /2 participants
                        </p>
                      </div>

                      {/* RIGHT */}
                      <div className="flex items-center gap-3 flex-wrap">
                        <span
                          className={`px-4 py-2 rounded-full text-sm font-bold border ${getDifficultyBadgeClass(
                            session?.difficulty
                          )}`}
                        >
                          {session?.difficulty}
                        </span>

                        {isHost &&
                          session?.status ===
                            "active" && (
                            <button
                              onClick={
                                handleEndSession
                              }
                              disabled={
                                endSessionMutation.isPending
                              }
                              className="h-12 px-5 rounded-2xl bg-red-500 text-white font-semibold flex items-center gap-2 hover:bg-red-600 transition-all"
                            >
                              {endSessionMutation.isPending ? (
                                <Loader2Icon className="w-4 h-4 animate-spin" />
                              ) : (
                                <LogOutIcon className="w-4 h-4" />
                              )}

                              End Session
                            </button>
                          )}
                      </div>
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div className="p-6 space-y-6">
                    {/* DESCRIPTION */}
                    {problemData?.description && (
                      <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 shadow-xl">
                        <h2 className="text-2xl font-bold mb-5">
                          Description
                        </h2>

                        <div className="space-y-4 text-gray-300 leading-relaxed">
                          <p>
                            {
                              problemData
                                .description
                                .text
                            }
                          </p>

                          {problemData.description.notes?.map(
                            (
                              note,
                              idx
                            ) => (
                              <p
                                key={idx}
                              >
                                {note}
                              </p>
                            )
                          )}
                        </div>
                      </div>
                    )}

                    {/* EXAMPLES */}
                    {problemData?.examples &&
                      problemData.examples
                        .length > 0 && (
                        <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 shadow-xl">
                          <h2 className="text-2xl font-bold mb-5">
                            Examples
                          </h2>

                          <div className="space-y-5">
                            {problemData.examples.map(
                              (
                                example,
                                idx
                              ) => (
                                <div
                                  key={
                                    idx
                                  }
                                  className="rounded-2xl bg-black/30 border border-white/10 p-5"
                                >
                                  <div className="flex items-center gap-2 mb-4">
                                    <span className="w-8 h-8 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center text-sm font-bold">
                                      {idx +
                                        1}
                                    </span>

                                    <h3 className="font-bold">
                                      Example{" "}
                                      {idx +
                                        1}
                                    </h3>
                                  </div>

                                  <div className="space-y-3 font-mono text-sm">
                                    <div>
                                      <span className="text-green-400">
                                        Input:
                                      </span>{" "}
                                      {
                                        example.input
                                      }
                                    </div>

                                    <div>
                                      <span className="text-cyan-400">
                                        Output:
                                      </span>{" "}
                                      {
                                        example.output
                                      }
                                    </div>

                                    {example.explanation && (
                                      <div className="pt-3 border-t border-white/10 text-gray-400">
                                        <span className="font-semibold text-white">
                                          Explanation:
                                        </span>{" "}
                                        {
                                          example.explanation
                                        }
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      )}

                    {/* CONSTRAINTS */}
                    {problemData?.constraints &&
                      problemData.constraints
                        .length > 0 && (
                        <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 shadow-xl">
                          <h2 className="text-2xl font-bold mb-5">
                            Constraints
                          </h2>

                          <ul className="space-y-3 text-gray-300">
                            {problemData.constraints.map(
                              (
                                constraint,
                                idx
                              ) => (
                                <li
                                  key={
                                    idx
                                  }
                                  className="flex gap-3"
                                >
                                  <span className="text-green-400">
                                    •
                                  </span>

                                  <code>
                                    {
                                      constraint
                                    }
                                  </code>
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      )}
                  </div>
                </div>
              </Panel>

              <PanelResizeHandle className="h-2 bg-white/10 hover:bg-green-400/40 transition-colors cursor-row-resize" />

              {/* CODE + OUTPUT */}
              <Panel defaultSize={50} minSize={20}>
                <PanelGroup direction="vertical">
                  <Panel defaultSize={70} minSize={30}>
                    <CodeEditorPanel
                      selectedLanguage={
                        selectedLanguage
                      }
                      code={code}
                      isRunning={isRunning}
                      onLanguageChange={
                        handleLanguageChange
                      }
                      onCodeChange={(
                        value
                      ) =>
                        setCode(value)
                      }
                      onRunCode={
                        handleRunCode
                      }
                    />
                  </Panel>

                  <PanelResizeHandle className="h-2 bg-white/10 hover:bg-green-400/40 transition-colors cursor-row-resize" />

                  <Panel defaultSize={30} minSize={15}>
                    <OutputPanel
                      output={output}
                    />
                  </Panel>
                </PanelGroup>
              </Panel>
            </PanelGroup>
          </Panel>

          <PanelResizeHandle className="w-2 bg-white/10 hover:bg-green-400/40 transition-colors cursor-col-resize" />

          {/* RIGHT PANEL */}
          <Panel defaultSize={50} minSize={30}>
            <div className="h-full bg-[#0f172a] p-4 overflow-auto">
              {isInitializingCall ? (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center">
                    <Loader2Icon className="w-12 h-12 mx-auto animate-spin text-green-400 mb-4" />

                    <p className="text-lg text-gray-300">
                      Connecting to video
                      call...
                    </p>
                  </div>
                </div>
              ) : !streamClient ||
                !call ? (
                <div className="h-full flex items-center justify-center">
                  <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 max-w-md text-center shadow-2xl">
                    <div className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <PhoneOffIcon className="w-12 h-12 text-red-400" />
                    </div>

                    <h2 className="text-3xl font-black mb-3">
                      Connection Failed
                    </h2>

                    <p className="text-gray-400">
                      Unable to connect to
                      the interview room.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="h-full rounded-3xl overflow-hidden border border-white/10">
                  <StreamVideo
                    client={
                      streamClient
                    }
                  >
                    <StreamCall
                      call={call}
                    >
                      <VideoCallUI
                        chatClient={
                          chatClient
                        }
                        channel={
                          channel
                        }
                      />
                    </StreamCall>
                  </StreamVideo>
                </div>
              )}
            </div>
          </Panel>
        </PanelGroup>
      </div>
    </div>
  );
}

export default SessionPage;