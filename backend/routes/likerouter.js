import express from "express";
import verifyTokenMiddleware from "../middleware/authMiddleware.js";

import { like, unlike, getlike } from "../controller/youtubecontroller.js";

const likerouter = express.Router();

likerouter.get("/like/:id", verifyTokenMiddleware, like);
likerouter.get("/unlike/:id", verifyTokenMiddleware, unlike);
likerouter.get("/getlike/:id", verifyTokenMiddleware, getlike);

export default likerouter;
