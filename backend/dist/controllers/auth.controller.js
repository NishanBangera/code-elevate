import bcrypt from "bcryptjs";
import prisma from "../libs/db.js";
import { UserRole } from "@prisma/client";
import jwt from "jsonwebtoken";
export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = await prisma.user.findUnique({
            where: { email },
        });
        if (user) {
            res.status(400).json({
                success: false,
                message: "User already exists",
            });
            return;
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await prisma.user.create({
            data: { name, email, password: hashedPassword, role: UserRole.USER },
        });
        const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });
        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV !== "development",
            maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
        });
        res.status(201).json({
            success: true,
            message: "User created successfully",
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
                image: newUser.image,
                createdAt: newUser.createdAt,
                updatedAt: newUser.updatedAt,
            },
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error Creating User",
        });
    }
};
export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            res.status(401).json({
                success: false,
                message: "Invalid credentials",
            });
            return;
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({
                success: false,
                message: "Invalid credentials",
            });
            return;
        }
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });
        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV !== "development",
            maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
        });
        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                image: user.image,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            },
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error logging in",
        });
    }
};
export const logoutUser = async (_req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV !== "development",
        });
        res.status(200).json({
            success: true,
            message: "User logged out successfully",
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error logging out",
        });
    }
};
export const checkAuth = async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            message: "User is authenticated",
            user: req.user
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error checking auth",
        });
    }
};
//# sourceMappingURL=auth.controller.js.map