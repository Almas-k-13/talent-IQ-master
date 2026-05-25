import { requireAuth } from "@clerk/express";
import User from "../models/User.js";
import { ENV } from "../lib/env.js";

const fetchClerkUser = async (clerkId) => {
  if (!ENV.CLERK_SECRET_KEY) {
    throw new Error("CLERK_SECRET_KEY is missing in backend env");
  }

  // Clerk V1 Users API
  const url = `https://api.clerk.com/v1/users/${encodeURIComponent(clerkId)}`;

  const resp = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${ENV.CLERK_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
  });

  if (!resp.ok) {
    const text = await resp.text().catch(() => "");
    throw new Error(`Clerk user fetch failed (${resp.status}): ${text}`);
  }

  return resp.json();
};

const mapClerkToMongoUser = (clerkUser) => {
  const email = clerkUser?.email_addresses?.[0]?.email_address || "";
  const firstName = clerkUser?.first_name || "";
  const lastName = clerkUser?.last_name || "";
  const name = `${firstName} ${lastName}`.trim() || clerkUser?.full_name || "User";
  const profileImage = clerkUser?.image_url || "";

  return {
    clerkId: clerkUser.id,
    email,
    name,
    profileImage,
  };
};

export const protectRoute = [
  requireAuth(),
  async (req, res, next) => {
    try {
      const clerk = typeof req.auth === "function" ? req.auth() : null;
      const clerkId = clerk?.userId;

      console.log("[AUTH] protectRoute", {
        path: req.originalUrl,
        clerkId: clerkId ? String(clerkId) : null,
      });

      if (!clerkId) {
        console.warn("[AUTH] protectRoute failed: missing clerkId");
        return res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
      }

      // find user in db by clerk ID
      let user;
      try {
        user = await User.findOne({ clerkId });
      } catch (dbErr) {
        console.error("[PROTECT ROUTE ERROR] DB lookup failed", dbErr);
        return res.status(500).json({
          success: false,
          message: "Internal server error",
        });
      }

      if (!user) {
        console.warn("[AUTH] protectRoute user not found in MongoDB; syncing from Clerk", {
          clerkId: String(clerkId),
        });

        // automatic MongoDB user sync
        let clerkUser;
        try {
          clerkUser = await fetchClerkUser(clerkId);
        } catch (clerkErr) {
          console.error("[PROTECT ROUTE ERROR] Clerk user fetch failed", clerkErr);
          return res.status(401).json({
            success: false,
            message: "Unauthorized",
          });
        }

        const newUser = mapClerkToMongoUser(clerkUser);

        try {
          user = await User.create(newUser);
        } catch (createErr) {
          console.error("[PROTECT ROUTE ERROR] Mongo user create failed", createErr);
          return res.status(500).json({
            success: false,
            message: "Internal server error",
          });
        }

        console.log("[AUTH] protectRoute Mongo user synced", {
          clerkId: String(clerkId),
          mongoUserId: String(user._id),
        });
      }

      // attach user to req
      req.user = user;
      return next();
    } catch (error) {
      console.error("[PROTECT ROUTE ERROR]", error?.stack || error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },
];
