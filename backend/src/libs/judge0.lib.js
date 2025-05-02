import axios from "axios";

export const getJudge0LanguageId = (language) => {
  const languageMap = {
    "JAVA": 62,
    "PYTHON": 71,
    "JAVASCRIPT": 63,
  }
  return languageMap[language.toUpperCase()];
};

export const pollBatchResults = async (tokens) => {
    while (true) {
        try {
            const {data} = await axios.get(`${process.env.JUDGE0_API_URL}/submissions/batch`, {
                params: {
                    tokens: tokens.join(","),
                    base64_encoded: false,
                }
            })
            const results = data.submissions

            const completed = results.every((result) => result.status.id > 2)

            if (completed) {
                return results;
            }

            await new Promise((resolve) => setTimeout(resolve, 2000));

            return data;
    } catch (error) {
        console.error(error);
        return null;
        }
    }
}

export const submitBatch = async (submissions) => {
  try { 
    const {data} = await axios.post(`${process.env.JUDGE0_API_URL}/submissions/batch?base64_encoded=false`, {
      submissions,
    })
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
