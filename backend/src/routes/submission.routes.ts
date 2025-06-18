import express, { Router } from "express";
import { getAllSubmissions, getSubmissionByProblemId, getSubmissionCountByProblemId } from "../controllers/submission.controller.js";

const submissionRoutes: Router = express.Router();

submissionRoutes.get("/get-all-submissions", getAllSubmissions);
submissionRoutes.get("/get-submission/:problemId", getSubmissionByProblemId);
submissionRoutes.get("/get-submissions-count/:problemId", getSubmissionCountByProblemId);

export default submissionRoutes;
