import express, { Router } from "express";
import { executeCode } from "../controllers/executeCode.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const executeCodeRoutes: Router = express.Router();

executeCodeRoutes.post("/", authMiddleware, executeCode);

export default executeCodeRoutes;
