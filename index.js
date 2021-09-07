import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import authenticate from "./middlewares/authenticate.js";
import path from "path";

import authRoutes from "./routes/auth.js";
import ideaRoutes from "./routes/idea.js";

const app = express();

// config
dotenv.config();

// middlewares
app.use(cors());
app.use(express.json({ extended: false }));

// connect to db
mongoose.connect(process.env.DB);

// routes
app.use(express.static(path.resolve("./client/build")));
app.use("/api", authRoutes);
app.use("/api", authenticate, ideaRoutes);
app.get("/api/user", authenticate, (req, res) => {
  res.json(req.user.id);
});

// start server
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`backend running at http://localhost:${port}`);
});
