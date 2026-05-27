import express from "express";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import { serve } from "inngest/express";
import { clerkMiddleware } from "@clerk/express";

import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";
import { inngest, functions } from "./lib/inngest.js";

import chatRoutes from "./routes/chatRoutes.js";
import sessionRoutes from "./routes/sessionRoutes.js";
import videoRoutes from "./routes/videoRoutes.js";

dotenv.config();

const app = express();
const __dirname = path.resolve();

// CORS
app.use(
  cors({
    origin: "https://talent-iq-master-bay.vercel.app",
    credentials: true,
  })
);

// BODY PARSER
app.use(express.json());

// CLERK
app.use(clerkMiddleware());

// REQUEST LOGGER
app.use((req, res, next) => {
  console.log(`[REQ] ${req.method} ${req.originalUrl}`);
  next();
});



// HEALTH
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API Running",
  });
});

// API ROUTES
app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/chat", chatRoutes);
app.use("/api/video", videoRoutes);
app.use("/api/sessions", sessionRoutes);

// FRONTEND SERVE
if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

// 404
app.use((req, res) => {
  console.log("404 ROUTE HIT =>", req.originalUrl);

  res.status(404).json({
    success: false,
    message: "Not Found",
    path: req.originalUrl,
  });
});

// ERROR HANDLER
app.use((err, req, res, next) => {
  console.error("[SERVER ERROR]", err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

const PORT = ENV.PORT || 3000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`✅ SERVER RUNNING ON PORT ${PORT}`);
    });
  } catch (error) {
    console.log("❌ SERVER ERROR", error);
  }
};

startServer();