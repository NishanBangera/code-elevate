import { Judge0Submission, Judge0Result } from "../types/index.js";
export declare const getJudge0LanguageId: (language: string) => number | undefined;
export declare const pollBatchResults: (tokens: string[]) => Promise<Judge0Result[] | null>;
export declare const submitBatch: (submissions: Judge0Submission[]) => Promise<any | null>;
export declare function getLanguageName(languageId: number): string;
//# sourceMappingURL=judge0.lib.d.ts.map