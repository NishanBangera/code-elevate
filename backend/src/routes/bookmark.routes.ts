import express, { Router } from "express";
import { createBookmark, getBookmarks, getBookmarkById, addProblemsToBookmark, deleteProblemsFromBookmark, deleteBookmark } from "../controllers/bookmark.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const bookmarkRoutes: Router = express.Router();

bookmarkRoutes.post("/", authMiddleware, createBookmark);
bookmarkRoutes.get("/", authMiddleware, getBookmarks);
bookmarkRoutes.get("/:bookmarkId", authMiddleware, getBookmarkById);
bookmarkRoutes.post("/:bookmarkId/add-problems", authMiddleware, addProblemsToBookmark);
bookmarkRoutes.delete("/:bookmarkId/delete-problems", authMiddleware, deleteProblemsFromBookmark);
bookmarkRoutes.delete("/:bookmarkId", authMiddleware, deleteBookmark);

export default bookmarkRoutes;