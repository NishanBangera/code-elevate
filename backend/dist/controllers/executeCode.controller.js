import prisma from "../libs/db.js";
import { submitBatch, pollBatchResults, getLanguageName } from "../libs/judge0.lib.js";
export const executeCode = async (req, res) => {
    const { source_code, language_id, stdin, expected_outputs, problemId } = req.body;
    try {
        if (!Array.isArray(stdin) ||
            stdin.length === 0 ||
            !Array.isArray(expected_outputs) ||
            expected_outputs.length === 0) {
            res.status(400).json({
                success: false,
                message: "Invalid test cases",
            });
            return;
        }
        const submissions = stdin.map((input) => ({
            source_code: source_code,
            language_id,
            stdin: input,
        }));
        const submitResponse = await submitBatch(submissions);
        if (!submitResponse) {
            res.status(500).json({
                success: false,
                message: "Failed to submit code for execution",
            });
            return;
        }
        const tokens = submitResponse.map((res) => res.token);
        const results = await pollBatchResults(tokens);
        console.log("Result--", results);
        if (!results) {
            res.status(500).json({
                success: false,
                message: "Failed to get execution results",
            });
            return;
        }
        for (let i = 0; i < results.length; i++) {
            const result = results[i];
            if (result && result.status.id !== 3) {
                res.status(400).json({
                    success: false,
                    message: `Test case ${i + 1} failed`,
                });
                return;
            }
        }
        let allPassed = true;
        const detailedResults = results.map((result, i) => {
            const stdOut = result.stdout?.trim() || "";
            const expectedOut = expected_outputs[i]?.trim() || "";
            if (stdOut !== expectedOut) {
                allPassed = false;
            }
            return {
                testCase: i + 1,
                passed: stdOut === expectedOut,
                stdout: stdOut,
                expected: expectedOut,
                stderr: result.stderr || null,
                compileOutput: result.compile_output || null,
                status: result.status.description,
                time: result.time ? `${result.time} s` : undefined,
                memory: result.memory ? `${result.memory} KB` : undefined,
            };
        });
        const submission = await prisma.submission.create({
            data: {
                problemId,
                userId: req.user.id,
                sourceCode: source_code,
                language: getLanguageName(language_id),
                stdin: stdin.join("\n"),
                stdout: detailedResults.map((r) => r.stdout).join("\n") || null,
                stderr: detailedResults.map((r) => r.stderr).join("\n") || null,
                compileOutput: detailedResults.map((r) => r.compileOutput).join("\n") || null,
                status: allPassed ? "Accepted" : "Failed",
                memory: detailedResults.map((r) => r.memory).join("\n") || null,
                time: detailedResults.map((r) => r.time).join("\n") || null,
            },
        });
        if (allPassed) {
            await prisma.problemSolved.upsert({
                where: {
                    problemId_userId: {
                        problemId,
                        userId: req.user.id,
                    },
                },
                create: {
                    problemId,
                    userId: req.user.id,
                },
                update: {},
            });
        }
        const testCaseResults = detailedResults.map((result, i) => ({
            submissionId: submission.id,
            testCase: i + 1,
            passed: result.passed,
            stdout: result.stdout || null,
            expected: result.expected,
            stderr: result.stderr,
            compileOutput: result.compileOutput,
            status: result.status,
            memory: result.memory || null,
            time: result.time || null,
        }));
        await prisma.testcaseResult.createMany({
            data: testCaseResults,
        });
        const submissionWithTestCaseResults = await prisma.submission.findUnique({
            where: {
                id: submission.id,
            },
            include: {
                testCaseResults: true,
            },
        });
        res.status(200).json({
            success: true,
            message: "Code executed successfully",
            results: submissionWithTestCaseResults,
            allPassed,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error executing code",
            error: error.message,
        });
    }
};
//# sourceMappingURL=executeCode.controller.js.map