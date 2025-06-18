import express from "express";
import { createBookmark, getBookmarks, getBookmarkById, addProblemsToBookmark, deleteProblemsFromBookmark, deleteBookmark } from "../controllers/bookmark.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
const bookmarkRoutes = express.Router();
bookmarkRoutes.post("/", authMiddleware, createBookmark);
bookmarkRoutes.get("/", authMiddleware, getBookmarks);
bookmarkRoutes.get("/:bookmarkId", authMiddleware, getBookmarkById);
bookmarkRoutes.post("/:bookmarkId/add-problems", authMiddleware, addProblemsToBookmark);
bookmarkRoutes.delete("/:bookmarkId/delete-problems", authMiddleware, deleteProblemsFromBookmark);
bookmarkRoutes.delete("/:bookmarkId", authMiddleware, deleteBookmark);
export default bookmarkRoutes;
//# sourceMappingURL=bookmark.routes.js.map