import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import problemRoutes from "./routes/problem.routes.js";
import executeCodeRoutes from "./routes/executeCode.routes.js";
import submissionRoutes from "./routes/submission.routes.js";
import bookmarkRoutes from "./routes/bookmark.routes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get("/", (_req: Request, res: Response) => {
  res.send("Welcome to the CodeElevate");
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/problems", problemRoutes);
app.use("/api/v1/execute-code", executeCodeRoutes);
app.use("/api/v1/submissions", submissionRoutes);
app.use("/api/v1/bookmarks", bookmarkRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
