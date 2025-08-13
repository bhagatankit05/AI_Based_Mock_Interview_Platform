import { interviewService } from '../services/interviewService.js';
import { validateInterviewData } from '../utils/validation.js';
import { ApiResponse } from '../utils/apiResponse.js';

export const interviewController = {
  // Start a new interview session
  async startInterview(req, res, next) {
    try {
      const { error, value } = validateInterviewData(req.body);
      if (error) {
        return res.status(400).json(
          ApiResponse.error('Validation failed', error.details)
        );
      }

      const interview = await interviewService.createInterview(value);
      res.status(201).json(
        ApiResponse.success('Interview started successfully', interview)
      );
    } catch (error) {
      next(error);
    }
  },

  // Get interview questions
  async getQuestions(req, res, next) {
    try {
      const { interviewId } = req.params;
      const questions = await interviewService.generateQuestions(interviewId);
      
      res.json(
        ApiResponse.success('Questions retrieved successfully', questions)
      );
    } catch (error) {
      next(error);
    }
  },

  // Submit answer and get feedback
  async submitAnswer(req, res, next) {
    try {
      const { interviewId, questionId } = req.params;
      const { answer } = req.body;

      const feedback = await interviewService.evaluateAnswer(
        interviewId,
        questionId,
        answer
      );

      res.json(
        ApiResponse.success('Answer submitted successfully', feedback)
      );
    } catch (error) {
      next(error);
    }
  },

  // Get interview results
  async getResults(req, res, next) {
    try {
      const { interviewId } = req.params;
      const results = await interviewService.getInterviewResults(interviewId);
      
      res.json(
        ApiResponse.success('Results retrieved successfully', results)
      );
    } catch (error) {
      next(error);
    }
  },

  // Get user's interview history
  async getHistory(req, res, next) {
    try {
      const { userId } = req.params;
      const history = await interviewService.getUserHistory(userId);
      
      res.json(
        ApiResponse.success('History retrieved successfully', history)
      );
    } catch (error) {
      next(error);
    }
  }
};