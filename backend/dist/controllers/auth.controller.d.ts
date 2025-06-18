import { Request, Response } from "express";
import { RegisterRequest, LoginRequest, ApiResponse, UserResponse } from "../types/index.js";
export declare const registerUser: (req: Request<{}, ApiResponse<{
    user: UserResponse;
}>, RegisterRequest>, res: Response) => Promise<void>;
export declare const loginUser: (req: Request<{}, ApiResponse<{
    user: UserResponse;
}>, LoginRequest>, res: Response) => Promise<void>;
export declare const logoutUser: (_req: Request, res: Response) => Promise<void>;
export declare const checkAuth: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=auth.controller.d.ts.map