import express from "express";
import verifyTokenMiddleware from "../middleware/authMiddleware.js";

import {
  comment,
  getcomment,
  commentlike,
  commentdelete,
  commentunlike,
} from "../controller/youtubecontroller.js";

const commentrouter = express.Router();

commentrouter.post("/comment/:id", verifyTokenMiddleware, comment);
commentrouter.get("/getcomment/:id", verifyTokenMiddleware, getcomment);
commentrouter.get("/commentlike/:id", verifyTokenMiddleware, commentlike);
commentrouter.delete(
  "/commentdelete/:id",
  verifyTokenMiddleware,
  commentdelete,
);
commentrouter.get("/commentunlike/:id", verifyTokenMiddleware, commentunlike);

export default commentrouter;
