import { ApiResponse } from '../utils/apiResponse.js';

export const notFound = (req, res, next) => {
  res.status(404).json(
    ApiResponse.error(`Route ${req.originalUrl} not found`)
  );
};