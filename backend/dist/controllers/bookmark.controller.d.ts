import { Request, Response } from "express";
import { CreateBookmarkRequest, AddProblemsToBookmarkRequest } from "../types/index.js";
export declare const createBookmark: (req: Request<{}, any, CreateBookmarkRequest>, res: Response) => Promise<void>;
export declare const getBookmarks: (req: Request, res: Response) => Promise<void>;
export declare const getBookmarkById: (req: Request<{
    bookmarkId: string;
}>, res: Response) => Promise<void>;
export declare const addProblemsToBookmark: (req: Request<{
    bookmarkId: string;
}, any, AddProblemsToBookmarkRequest>, res: Response) => Promise<void>;
export declare const deleteProblemsFromBookmark: (req: Request<{
    bookmarkId: string;
}, any, AddProblemsToBookmarkRequest>, res: Response) => Promise<void>;
export declare const deleteBookmark: (req: Request<{
    bookmarkId: string;
}>, res: Response) => Promise<void>;
//# sourceMappingURL=bookmark.controller.d.ts.map