import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import prisma from "../libs/db.js";
import { JWTPayload } from "../types/index.js";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.cookies.token as string;
  if (!token) {
    res.status(401).json({
      success: false,
      message: "Unauthorized - No token provided",
    });
    return;
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JWTPayload;
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        image: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    if (!user) {
      res.status(401).json({
        success: false,
        message: "Unauthorized - User not found",
      });
      return;
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Unauthorized - Invalid token",
    });
    return;
  }
};

export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (req.user?.role !== "ADMIN") {
    res.status(401).json({
      success: false,
      message: "Unauthorized - Admin required",
    });
    return;
  }
  next();
};
