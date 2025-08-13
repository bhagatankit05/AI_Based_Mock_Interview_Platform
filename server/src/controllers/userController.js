import { userService } from '../services/userService.js';
import { validateUserData } from '../utils/validation.js';
import { ApiResponse } from '../utils/apiResponse.js';

export const userController = {
  // Create new user profile
  async createProfile(req, res, next) {
    try {
      const { error, value } = validateUserData(req.body);
      if (error) {
        return res.status(400).json(
          ApiResponse.error('Validation failed', error.details)
        );
      }

      const user = await userService.createUser(value);
      res.status(201).json(
        ApiResponse.success('User profile created successfully', user)
      );
    } catch (error) {
      next(error);
    }
  },

  // Get user profile
  async getProfile(req, res, next) {
    try {
      const { userId } = req.params;
      const user = await userService.getUserById(userId);
      
      if (!user) {
        return res.status(404).json(
          ApiResponse.error('User not found')
        );
      }

      res.json(
        ApiResponse.success('User profile retrieved successfully', user)
      );
    } catch (error) {
      next(error);
    }
  },

  // Update user profile
  async updateProfile(req, res, next) {
    try {
      const { userId } = req.params;
      const { error, value } = validateUserData(req.body, true); // partial validation
      
      if (error) {
        return res.status(400).json(
          ApiResponse.error('Validation failed', error.details)
        );
      }

      const updatedUser = await userService.updateUser(userId, value);
      res.json(
        ApiResponse.success('User profile updated successfully', updatedUser)
      );
    } catch (error) {
      next(error);
    }
  }
};