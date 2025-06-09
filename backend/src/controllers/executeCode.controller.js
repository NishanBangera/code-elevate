import { submitBatch, pollBatchResults } from "../libs/judge0.lib.js";

export const executeCode = async (req, res) => {
  const { source_code, language_id, stdin, expected_outputs, problemId } = req.body;
  try {
    if (
      !Array.isArray(stdin) ||
      stdin.length === 0 ||
      !Array.isArray(expected_outputs) ||
      expected_outputs.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid test cases",
      });
    }

    const submissions = stdin.map((input) => ({
      source_code: source_code,
      language_id,
      stdin: input,
    }));

    const submitResponse = await submitBatch(submissions);

    const tokens = submitResponse.map((res) => res.token);

    const results = await pollBatchResults(tokens);
    console.log("Result--",results)

    for (let i = 0; i < results.length; i++) {
      const result = results[i];

      if (result.status.id !== 3) {
        return res.status(400).json({
          success: false,
          message: `Test case ${i + 1} failed`,
        });
      }
    }

    res.status(200).json({
      success: true,
      message: "Code executed successfully",
      results,
    });

    // const submission = await prisma.submission.create({
    //   data: {
    //     code,
    //     language_id,
    //     stdin,
    //     expected_output,
    //     problemId,
    //     userId: req.user.id,
    //   },
    // });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error executing code",
      error: error.message,
    });
  }
};
