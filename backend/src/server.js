import express from "express";
import path from "path";
import cors from "cors";
import { serve } from "inngest/express";
import { clerkMiddleware } from "@clerk/express";

import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";
import { inngest, functions } from "./lib/inngest.js";

import chatRoutes from "./routes/chatRoutes.js";
import sessionRoutes from "./routes/sessionRoute.js";
import videoRoutes from "./routes/videoRoutes.js";
import {
  createSession,
  getActiveSessions,
  getMyRecentSessions,
} from "./controllers/sessionController.js";

const app = express();

const __dirname = path.resolve();

// middleware
app.use(express.json());

// CORS (allow localhost dev)
// Frontend might run on different ports (5173 vs 5174). Allow both.
app.use(
  cors({
    origin: "https://talent-iq-master-bay.vercel.app",
    credentials: true,
  })
);

/* Request logging (useful to debug 404s / wrong base URLs)
   Logs: method, url, status, duration(ms)
*/
app.use((req, res, next) => {
  const start = Date.now();

  const originalJson = res.json.bind(res);
  const originalSend = res.send.bind(res);

  const log = () => {
    const ms = Date.now() - start;
    // eslint-disable-next-line no-console
    console.log(`[REQ] ${req.method} ${req.originalUrl} -> ${res.statusCode} (${ms}ms)`);
  };

  // Patch res.json/res.send so we can log after controller sets status + body
  // eslint-disable-next-line no-param-reassign
  res.json = (body) => {
    try {
      log();
    } finally {
      return originalJson(body);
    }
  };

  // eslint-disable-next-line no-param-reassign
  res.send = (body) => {
    try {
      log();
    } finally {
      return originalSend(body);
    }
  };

  next();
});

// Clerk auth middleware (adds req.auth() / authentication context)
app.use(clerkMiddleware());

/*
  Mount API routes BEFORE 404 handler
  NOTE: Also add explicit fallback handlers for session endpoints to guarantee
  they never 404 even if router import/mount is misbehaving at runtime.
*/
app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/chat", chatRoutes);
app.use("/api/video", videoRoutes);
app.use("/api/sessions", sessionRoutes);

// ---- SESSION FALLBACK ROUTES (to prevent 404 for known endpoints) ----
import { protectRoute } from "./middleware/protectRoute.js";

// ensure /api/sessions/active and /api/sessions/my-recent never 404
app.get("/api/sessions/active", protectRoute, getActiveSessions);
app.get("/api/sessions/my-recent", protectRoute, getMyRecentSessions);
app.post("/api/sessions/create", protectRoute, createSession);


app.get("/health", (req, res) => {
  res.status(200).json({ msg: "api is up and running" });
});

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend Running 🚀",
  });
});

// Debug helper to confirm server is alive and core route prefixes exist.
app.get("/debug/routes", (req, res) => {
  res.json({
    ok: true,
    prefixes: {
      inngest: "/api/inngest",
      chat: "/api/chat",
      sessions: "/api/sessions",
      video: "/api/video",
    },
    sample: {
      sessionsActive: "/api/sessions/active",
      sessionsMyRecent: "/api/sessions/my-recent",
      sessionsCreate: "/api/sessions/create",
      sessionsVideoToken: "/api/video/token?callId=test",
    },
    requested: req.originalUrl,
  });
});

// 404 handler (unknown routes) - MUST be LAST
app.use((req, res) => {
  res.status(404).json({
    message: "Not Found",
    path: req.originalUrl,
  });
});

// Centralized error handler - MUST be LAST
app.use((err, _req, res, _next) => {
  // eslint-disable-next-line no-console
  console.error("[api][error]", err);

  const status = err?.statusCode || err?.status || 500;
  res.status(status).json({
    message: err?.message || "Internal Server Error",
  });
});


// make our app ready for deployment
if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});
}

app.get("/debug/ping", (req, res) => {
  res.status(200).json({
    success: true,
    message: "pong",
  });
});

process.on("uncaughtException", (err) => {
  // eslint-disable-next-line no-console
  console.error("[UNCAUGHT EXCEPTION]", err);
});

process.on("unhandledRejection", (reason) => {
  // eslint-disable-next-line no-console
  console.error("[UNHANDLED REJECTION]", reason);
});

const startServer = async () => {
  try {
    // eslint-disable-next-line no-console
    console.log("[SERVER CONFIG]", {
      PORT: ENV.PORT,
      HOST: "0.0.0.0",
      NODE_ENV: ENV.NODE_ENV,
      CLIENT_URL: ENV.CLIENT_URL,
    });

    await connectDB();

    const host = "0.0.0.0";

    const server = app.listen(ENV.PORT, host);

    server.on("listening", () => {
      // eslint-disable-next-line no-console
      console.log("[SERVER LISTENING]", `http://${host}:${ENV.PORT}`);
      // eslint-disable-next-line no-console
      console.log("[DEBUG ENDPOINT] /debug/ping");
    });

    server.on("error", (err) => {
      // eslint-disable-next-line no-console
      console.error("[SERVER LISTEN ERROR]", err);
    });
  } catch (error) {
    console.error("💥 Error starting the server", error);
  }
};

startServer();
