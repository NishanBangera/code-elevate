import prisma from "../libs/db.js";
import { getJudge0LanguageId, submitBatch, pollBatchResults, } from "../libs/judge0.lib.js";
export const createProblem = async (req, res) => {
    const { title, description, difficulty, tags, examples, constraints, hints, editorial, testCases, codeSnippets, referenceSolutions, } = req.body;
    try {
        for (const [language, code] of Object.entries(referenceSolutions)) {
            const languageId = getJudge0LanguageId(language);
            if (!languageId) {
                res.status(400).json({
                    success: false,
                    message: "Invalid language",
                });
                return;
            }
            const submissions = testCases.map(({ input, output }) => {
                return {
                    language_id: languageId,
                    source_code: code,
                    stdin: input,
                    expected_output: output,
                };
            });
            const submissionsResponse = await submitBatch(submissions);
            if (!submissionsResponse) {
                res.status(500).json({
                    success: false,
                    message: "Failed to submit test cases for validation",
                });
                return;
            }
            const tokens = submissionsResponse.map((res) => res.token);
            const results = await pollBatchResults(tokens);
            if (!results) {
                res.status(500).json({
                    success: false,
                    message: "Failed to get validation results",
                });
                return;
            }
            for (let i = 0; i < results.length; i++) {
                const result = results[i];
                if (result && result.status.id !== 3) {
                    res.status(400).json({
                        success: false,
                        message: `Test case ${i + 1} failed for ${language}`,
                    });
                    return;
                }
            }
            const newProblem = await prisma.problem.create({
                data: {
                    title,
                    description,
                    difficulty,
                    tags,
                    examples,
                    constraints,
                    hints: hints || null,
                    editorial: editorial || null,
                    testCases: testCases,
                    codeSnippets,
                    referenceSolutions,
                    userId: req.user.id,
                },
            });
            res.status(201).json({
                success: true,
                message: "Problem created successfully",
                problem: newProblem,
            });
            return;
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error creating problem",
            error: error.message,
        });
    }
};
export const getAllProblems = async (_req, res) => {
    try {
        const problems = await prisma.problem.findMany();
        if (!problems || problems.length === 0) {
            res.status(404).json({
                success: false,
                message: "No problems found",
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: "Problems fetched successfully",
            problems,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching problems",
            error: error.message,
        });
    }
};
export const getProblemById = async (req, res) => {
    const { id } = req.params;
    try {
        const problem = await prisma.problem.findUnique({
            where: { id },
        });
        if (!problem) {
            res.status(404).json({
                success: false,
                message: "Problem not found",
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: "Problem fetched successfully",
            problem,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching problem",
            error: error.message,
        });
    }
};
export const updateProblem = async (req, res) => {
    const { id } = req.params;
    const { data } = req.body;
    try {
        const problem = await prisma.problem.findUnique({
            where: { id },
        });
        if (!problem) {
            res.status(404).json({
                success: false,
                message: "Problem not found",
            });
            return;
        }
        if (data.referenceSolutions && data.referenceSolutions !== problem.referenceSolutions) {
            for (const [language, code] of Object.entries(data.referenceSolutions)) {
                const languageId = getJudge0LanguageId(language);
                if (!languageId) {
                    res.status(400).json({
                        success: false,
                        message: "Invalid language",
                    });
                    return;
                }
                const submissions = data.testCases.map(({ input, output }) => {
                    return {
                        language_id: languageId,
                        source_code: code,
                        stdin: input,
                        expected_output: output,
                    };
                });
                const submissionsResponse = await submitBatch(submissions);
                if (!submissionsResponse) {
                    res.status(500).json({
                        success: false,
                        message: "Failed to submit test cases for validation",
                    });
                    return;
                }
                const tokens = submissionsResponse.map((res) => res.token);
                const results = await pollBatchResults(tokens);
                if (!results) {
                    res.status(500).json({
                        success: false,
                        message: "Failed to get validation results",
                    });
                    return;
                }
                for (let i = 0; i < results.length; i++) {
                    const result = results[i];
                    if (result && result.status.id !== 3) {
                        res.status(400).json({
                            success: false,
                            message: `Test case ${i + 1} failed for ${language}`,
                        });
                        return;
                    }
                }
            }
        }
        const updatedProblem = await prisma.problem.update({
            where: { id },
            data: data,
        });
        res.status(200).json({
            success: true,
            message: "Problem updated successfully",
            problem: updatedProblem,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating problem",
            error: error.message,
        });
    }
};
export const deleteProblem = async (req, res) => {
    const { id } = req.params;
    try {
        const problem = await prisma.problem.findUnique({
            where: { id },
        });
        if (!problem) {
            res.status(404).json({
                success: false,
                message: "Problem not found",
            });
            return;
        }
        const deletedProblem = await prisma.problem.delete({
            where: { id },
        });
        res.status(200).json({
            success: true,
            message: "Problem deleted successfully",
            deletedProblem,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting problem",
            error: error.message,
        });
    }
};
export const getSolvedProblemsByUserId = async (req, res) => {
    try {
        const userId = req.user.id;
        const problems = await prisma.problem.findMany({
            where: {
                problemSolved: {
                    some: {
                        userId,
                    },
                },
            },
            include: {
                problemSolved: {
                    select: {
                        userId: true,
                    },
                },
            }
        });
        if (!problems || problems.length === 0) {
            res.status(404).json({
                success: false,
                message: "No problems found",
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: "Solved problems fetched successfully",
            problems,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching solved problems",
            error: error.message,
        });
    }
};
//# sourceMappingURL=problem.controller.js.map