import { Request, Response } from "express";
import { CreateProblemRequest } from "../types/index.js";
export declare const createProblem: (req: Request<{}, any, CreateProblemRequest>, res: Response) => Promise<void>;
export declare const getAllProblems: (_req: Request, res: Response) => Promise<void>;
export declare const getProblemById: (req: Request<{
    id: string;
}>, res: Response) => Promise<void>;
export declare const updateProblem: (req: Request<{
    id: string;
}, any, {
    data: Partial<CreateProblemRequest>;
}>, res: Response) => Promise<void>;
export declare const deleteProblem: (req: Request<{
    id: string;
}>, res: Response) => Promise<void>;
export declare const getSolvedProblemsByUserId: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=problem.controller.d.ts.map