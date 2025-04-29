import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized - No token provided",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        image: true,
        email: true,
        name: true,
        role: true,
      },
    });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - User not found",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized - Invalid token",
    });
  }
};

export const isAdmin = async (req, res, next) => {
  if (req.user.role !== "ADMIN") {
    return res.status(401).json({
      success: false,
      message: "Unauthorized - Admin required",
    });
  }
  next();
};
