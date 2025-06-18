import { Request } from 'express';
import { UserRole, Difficulty } from '@prisma/client';
export interface User {
    id: string;
    name: string | null;
    email: string;
    password: string;
    image: string | null;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;
}
export interface UserResponse {
    id: string;
    name: string | null;
    email: string;
    role: UserRole;
    image: string | null;
    createdAt: Date;
    updatedAt: Date;
}
export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
}
export interface LoginRequest {
    email: string;
    password: string;
}
export interface JWTPayload {
    id: string;
}
export interface AuthenticatedRequest extends Request {
    user: UserResponse;
}
export interface TestCase {
    input: string;
    output: string;
}
export interface CodeSnippet {
    [language: string]: string;
}
export interface CreateProblemRequest {
    title: string;
    description: string;
    difficulty: Difficulty;
    tags: string[];
    examples: any;
    constraints: any;
    hints?: string;
    editorial?: string;
    testCases: TestCase[];
    codeSnippets: CodeSnippet;
    referenceSolutions: CodeSnippet;
}
export interface ExecuteCodeRequest {
    source_code: string;
    language_id: number;
    stdin: string[];
    expected_outputs: string[];
    problemId: string;
}
export interface Judge0Submission {
    language_id: number;
    source_code: string;
    stdin: string;
    expected_output?: string;
}
export interface Judge0Result {
    token: string;
    status: {
        id: number;
        description: string;
    };
    stdout: string | null;
    stderr: string | null;
    compile_output: string | null;
    memory: string | null;
    time: string | null;
}
export interface Judge0BatchResponse {
    submissions: Judge0Result[];
}
export interface CreateBookmarkRequest {
    name: string;
    description?: string;
}
export interface AddProblemsToBookmarkRequest {
    problemIds: string[];
}
export interface ApiResponse<T = any> {
    success: boolean;
    message: string;
    data?: T;
}
export interface ApiErrorResponse {
    success: false;
    message: string;
}
export interface ApiSuccessResponse<T = any> {
    success: true;
    message: string;
    data?: T;
}
export type SupportedLanguage = 'JAVA' | 'PYTHON' | 'JAVASCRIPT';
export interface LanguageMap {
    [key: string]: number;
}
export interface TestCaseResult {
    testCase: number;
    passed: boolean;
    stdout: string | null;
    expected: string;
    stderr: string | null;
    compileOutput: string | null;
    status: string;
    memory: string | null;
    time: string | null;
}
export interface SubmissionResult {
    allPassed: boolean;
    results: TestCaseResult[];
    detailedResults: Judge0Result[];
}
//# sourceMappingURL=index.d.ts.map