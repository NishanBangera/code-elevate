import { Request, Response } from "express";
export declare const getAllSubmissions: (req: Request, res: Response) => Promise<void>;
export declare const getSubmissionByProblemId: (req: Request<{
    problemId: string;
}>, res: Response) => Promise<void>;
export declare const getSubmissionCountByProblemId: (req: Request<{
    problemId: string;
}>, res: Response) => Promise<void>;
//# sourceMappingURL=submission.controller.d.ts.map