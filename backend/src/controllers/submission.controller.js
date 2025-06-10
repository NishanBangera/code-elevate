import prisma from "../libs/db.js";

export const getAllSubmissions = async (req, res) => {
    try {
        const userId = req.user.id;
        const submissions = await prisma.submission.findMany({
            where: {
                userId,
            },
        });
        if (!submissions) {
            return res.status(404).json({
                success: false,
                message: "No submissions found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Submissions fetched successfully",
            submissions,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching submissions",
            error: error.message,
        });
    }
}
    
export const getSubmissionByProblemId = async (req, res) => {
    try {
        const { problemId } = req.params;
        const userId = req.user.id;
        const submissions = await prisma.submission.findMany({
            where: {
                userId,
                problemId,
            },
        });
        if (!submissions) {
            return res.status(404).json({
                success: false,
                message: "No submissions found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Submissions fetched successfully",
            submissions,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching submissions",
            error: error.message,
        });
    }
}

export const getSubmissionCountByProblemId = async (req, res) => {
    try {
        const { problemId } = req.params;
        const userId = req.user.id;
        const submissionsCount = await prisma.submission.count({
            where: {
                userId,
                problemId,
            },
        });
        if (!submissionsCount) {
            return res.status(404).json({
                success: false,
                message: "No submissions found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Submissions count fetched successfully",
            submissionsCount,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching submissions count",
            error: error.message,
        });
    }
}

