import dotenv from "dotenv";

dotenv.config({ quiet: true });

export const ENV = {
  PORT: process.env.PORT,
  DB_URL: process.env.DB_URL,
  NODE_ENV: process.env.NODE_ENV,
  CLIENT_URL: process.env.CLIENT_URL,

  // Clerk (used for on-demand Mongo user sync)
  CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
  // optional; sometimes useful for better debugging
  CLERK_PUBLISHABLE_KEY: process.env.CLERK_PUBLISHABLE_KEY,

  INNGEST_EVENT_KEY: process.env.INNGEST_EVENT_KEY,
  INNGEST_SIGNING_KEY: process.env.INNGEST_SIGNING_KEY,

  STREAM_API_KEY: process.env.STREAM_API_KEY,
  STREAM_API_SECRET: process.env.STREAM_API_SECRET,
};
