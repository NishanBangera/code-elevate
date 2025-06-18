import express, { Router } from "express";
import { authMiddleware, isAdmin } from "../middleware/auth.middleware.js";
import { createProblem, getAllProblems, getProblemById, updateProblem, deleteProblem, getSolvedProblemsByUserId } from "../controllers/problem.controller.js";

const problemRoutes: Router = express.Router();

problemRoutes.post("/create", authMiddleware, isAdmin, createProblem);
problemRoutes.get("/", getAllProblems);
problemRoutes.get("/:id", getProblemById);
problemRoutes.put("/:id", authMiddleware, isAdmin, updateProblem);
problemRoutes.delete("/:id", authMiddleware, isAdmin, deleteProblem);
problemRoutes.get("/get-solved-problems", authMiddleware, getSolvedProblemsByUserId);

export default problemRoutes;
