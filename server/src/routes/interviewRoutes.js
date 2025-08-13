import express from 'express';
import { interviewController } from '../controllers/interviewController.js';

const router = express.Router();

// POST /api/interviews - Start new interview
router.post('/', interviewController.startInterview);

// GET /api/interviews/:interviewId/questions - Get interview questions
router.get('/:interviewId/questions', interviewController.getQuestions);

// POST /api/interviews/:interviewId/questions/:questionId/answer - Submit answer
router.post('/:interviewId/questions/:questionId/answer', interviewController.submitAnswer);

// GET /api/interviews/:interviewId/results - Get interview results
router.get('/:interviewId/results', interviewController.getResults);

// GET /api/interviews/history/:userId - Get user interview history
router.get('/history/:userId', interviewController.getHistory);

export default router;