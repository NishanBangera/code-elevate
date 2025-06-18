import express from "express";
import { registerUser, loginUser, logoutUser, checkAuth } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
const authRoutes = express.Router();
authRoutes.post("/register", registerUser);
authRoutes.post("/login", loginUser);
authRoutes.post("/logout", authMiddleware, logoutUser);
authRoutes.get("/check", authMiddleware, checkAuth);
export default authRoutes;
//# sourceMappingURL=auth.route.js.map