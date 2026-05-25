import { streamClient } from "../lib/stream.js";

export async function getStreamVideoToken(req, res) {
  try {
    console.log("[VIDEO TOKEN API HIT]", {
      query: req.query,
      hasReqUser: !!req?.user,
    });

    const clerkId = req?.user?.clerkId;
    const userId = clerkId; // Stream Video uses this as user_id in tokens

    const { callId, callType } = req.query;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    if (!callId) {
      return res.status(400).json({ message: "callId is required" });
    }

    const type = callType || "default";
    const callCid = `${type}:${callId}`;

    // Stream Video access token (WS auth) must include call cid(s)
    const token = streamClient.generateCallToken({
      user_id: userId,
      call_cids: [callCid],
    });

    console.log("[STREAM TOKEN GENERATED]", {
      callCid,
      callId,
      callType: type,
      userId,
    });

    return res.status(200).json({
      token,
      userId,
      callCid,
      callType: type,
      callId,
    });
  } catch (error) {
    console.error("[STREAM TOKEN GENERATED] video error:", error?.stack || error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
