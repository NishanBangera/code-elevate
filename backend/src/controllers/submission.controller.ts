import { Request, Response } from "express";
import prisma from "../libs/db.js";

export const getAllSubmissions = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.user!.id;
        const submissions = await prisma.submission.findMany({
            where: {
                userId,
            },
        });
        if (!submissions || submissions.length === 0) {
            res.status(404).json({
                success: false,
                message: "No submissions found",
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: "Submissions fetched successfully",
            submissions,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Error fetching submissions",
            error: error.message,
        });
    }
}

export const getSubmissionByProblemId = async (
    req: Request<{ problemId: string }>,
    res: Response
): Promise<void> => {
    try {
        const { problemId } = req.params;
        const userId = req.user!.id;
        const submissions = await prisma.submission.findMany({
            where: {
                userId,
                problemId,
            },
        });
        if (!submissions || submissions.length === 0) {
            res.status(404).json({
                success: false,
                message: "No submissions found",
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: "Submissions fetched successfully",
            submissions,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Error fetching submissions",
            error: error.message,
        });
    }
}

export const getSubmissionCountByProblemId = async (
    req: Request<{ problemId: string }>,
    res: Response
): Promise<void> => {
    try {
        const { problemId } = req.params;
        const userId = req.user!.id;
        const submissionsCount = await prisma.submission.count({
            where: {
                userId,
                problemId,
            },
        });
        if (submissionsCount === 0) {
            res.status(404).json({
                success: false,
                message: "No submissions found",
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: "Submissions count fetched successfully",
            submissionsCount,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Error fetching submissions count",
            error: error.message,
        });
    }
}

