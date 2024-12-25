import express from "express";
import dotenv from "dotenv";
import { clerkMiddleware } from "@clerk/express";

import userRoutes from "../routes/user.route.js";
import adminRoutes from "../routes/admin.route.js";
import albumRouts from "../routes/album.route.js";
import authRoutes from "../routes/auth.route.js";
import songRoutes from "../routes/song.route.js";
import statRoutes from "../routes/stat.route.js";
import { connectDB } from "../lib/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4001;

app.use(express.json());
app.use(clerkMiddleware()); // this will add auth to req obj => req.auth.userId

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/albums", albumRouts);
app.use("/api/stats", statRoutes);

app.listen(PORT, () => {
  console.log(`app is listening on port: ${PORT}`);
  connectDB();
});
