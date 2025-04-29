import prisma from "../libs/db.js";
import { getJudge0LanguageId, submitBatch } from "../libs/judge0.lib.js";
export const createProblem = async (req, res) => {
  const {
    title,
    description,
    difficulty,
    tags,
    examples,
    constraints,
    hints,
    editorial,
    testCases,
    codeSnippets,
    referenceSolutions,
  } = req.body;
  try {
    for (const [language, code] of Object.entries(referenceSolutions)) {
      const languageId = getJudge0LanguageId(language);
      if (!languageId) {
        return res.status(400).json({
          success: false,
          message: "Invalid language",
        });
      }

      const submissions = testCases.map(({ input, output }) => {
        return {
          languageId,
          code,
          stdin: input,
          expectedOutput: output,
        };
      });

      const submissionsResponse = await submitBatch(submissions);

      const tokens = submissionsResponse.map((res) => res.token);

      const results = await pollBatchResults(tokens);

      for (let i = 0; i < results.length; i++) {
        const result = results[i];

        if (result.status.id !== 3) {
          return res.status(400).json({
            success: false,
            message: `Test case ${i + 1} failed for ${language}`,
          });
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
          hints,
          editorial,
          testCases,
          codeSnippets,
          userId: req.user.id,
        },
      });
      
      return res.status(201).json({
        success: true,
        message: "Problem created successfully",
        problem: newProblem,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating problem",
      error: error.message,
    });
  }
};
