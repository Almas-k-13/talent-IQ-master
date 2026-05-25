import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { getStreamVideoToken } from "../controllers/videoController.js";

const router = express.Router();

router.get("/token", protectRoute, getStreamVideoToken);

export default router;
