import express from "express";
import verifyTokenMiddleware from "../middleware/authMiddleware.js";

import {
  getdeta,
  getvedio,
  serachdeta,
} from "../controller/youtubecontroller.js";

const youtuberouter = express.Router();

youtuberouter.get("/getdeta", verifyTokenMiddleware, getdeta);
youtuberouter.get("/getvedio/:id", verifyTokenMiddleware, getvedio);

youtuberouter.get("/search", verifyTokenMiddleware, serachdeta);

export default youtuberouter;
