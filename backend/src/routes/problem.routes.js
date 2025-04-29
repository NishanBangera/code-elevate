import express from "express";
import { authMiddleware, isAdmin } from "../middleware/auth.middleware.js";
import { createProblem } from "../controllers/problem.controller.js";

const problemRoutes = express.Router();

problemRoutes.post("/create", authMiddleware, isAdmin, createProblem);
problemRoutes.get("/", authMiddleware, getAllProblems);
problemRoutes.get("/:id", authMiddleware, getProblemById);
problemRoutes.put("/:id", authMiddleware, isAdmin, updateProblem);
problemRoutes.delete("/:id", authMiddleware, isAdmin, deleteProblem);
problemRoutes.get("/get-solved-problems", authMiddleware, getSolvedProblems);


export default problemRoutes;
