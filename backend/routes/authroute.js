import express from "express";

import registermiddleware from "../middleware/registerEmailMiddleware.js";
import verifyTokenMiddleware from "../middleware/authMiddleware.js";

import {
  register,
  login,
  logout,
  getacount,
} from "../controller/authcontroller.js";

const authrouter = express.Router();

authrouter.post("/register", registermiddleware, register);
authrouter.post("/login", login);
authrouter.get("/logout", logout);
authrouter.get("/acount", verifyTokenMiddleware, getacount);

export default authrouter;
