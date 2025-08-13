export class ApiResponse {
  static success(message, data = null, statusCode = 200) {
    return {
      success: true,
      message,
      data,
      timestamp: new Date().toISOString(),
    };
  }

  static error(message, details = null, statusCode = 500) {
    return {
      success: false,
      message,
      error: details,
      timestamp: new Date().toISOString(),
    };
  }
}