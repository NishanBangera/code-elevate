import axios from "axios";
import {
  LanguageMap,
  Judge0Submission,
  Judge0Result,
  Judge0BatchResponse
} from "../types/index.js";

export const getJudge0LanguageId = (language: string): number | undefined => {
  const languageMap: LanguageMap = {
    JAVA: 62,
    PYTHON: 71,
    JAVASCRIPT: 63,
  };
  return languageMap[language.toUpperCase()];
};

export const pollBatchResults = async (tokens: string[]): Promise<Judge0Result[] | null> => {
  while (true) {
    try {
      const { data } = await axios.get<Judge0BatchResponse>(
        `${process.env.JUDGE0_API_URL}/submissions/batch`,
        {
          params: {
            tokens: tokens.join(","),
            base64_encoded: false,
          },
        }
      );
      const results = data.submissions;

      const completed = results.every((result) => result.status.id > 2);

      if (completed) {
        return results;
      }

      await new Promise((resolve) => setTimeout(resolve, 2000));
    } catch (error) {
      console.error(error);
      return null;
    }
  }
};

export const submitBatch = async (submissions: Judge0Submission[]): Promise<any | null> => {
  try {
    const { data } = await axios.post(
      `${process.env.JUDGE0_API_URL}/submissions/batch?base64_encoded=false`,
      {
        submissions,
      }
    );
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export function getLanguageName(languageId: number): string {
  const languageMap: { [key: number]: string } = {
    62: "JAVA",
    71: "PYTHON",
    63: "JAVASCRIPT",
  };
  return languageMap[languageId] || "Unknown";
}
