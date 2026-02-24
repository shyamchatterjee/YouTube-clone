import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";

// routes
import authrouter from "./routes/authroute.js";
import youtuberouter from "./routes/youtuberoute.js";
import commentrouter from "./routes/commentroute.js";
import likerouter from "./routes/likerouter.js";

// db
import connectDB from "./config/connectDB.js";

// config dotenv
dotenv.config();

const app = express();

// middlewares
app.use(
  cors({
    origin: "http://localhost:5173", // ❌ removed extra space
    credentials: true,
  }),
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// database connection
connectDB();

// routes
app.use("/api/auth", authrouter);
app.use("/api/youtube", youtuberouter);
app.use("/api/youtube", commentrouter);
app.use("/api/youtube", likerouter);

// server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
