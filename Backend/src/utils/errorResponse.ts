// utils/errorResponse.ts
import { Response } from 'express';

export class ErrorResponse extends Error {
  statusCode: number;
  code?: string;

  constructor(message: string, statusCode: number, code?: string) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    
    // Maintains proper stack trace for where our error was thrown
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  // Static methods for common error responses
  static badRequest(message: string, code?: string): ErrorResponse {
    return new ErrorResponse(message, 400, code);
  }

  static unauthorized(message: string, code?: string): ErrorResponse {
    return new ErrorResponse(message, 401, code);
  }

  static forbidden(message: string, code?: string): ErrorResponse {
    return new ErrorResponse(message, 403, code);
  }

  static notFound(message: string, code?: string): ErrorResponse {
    return new ErrorResponse(message, 404, code);
  }

  static conflict(message: string, code?: string): ErrorResponse {
    return new ErrorResponse(message, 409, code);
  }

  static internalError(message: string, code?: string): ErrorResponse {
    return new ErrorResponse(message, 500, code);
  }
}

// Interface for standardized error responses
export interface ErrorResponseBody {
  success: false;
  error: string;
  code?: string;
  stack?: string;
}

// Utility function to send error responses
export const sendErrorResponse = (
  res: Response,
  error: Error | ErrorResponse,
  includeStack: boolean = process.env.NODE_ENV === 'development'
): void => {
  const statusCode = error instanceof ErrorResponse ? error.statusCode : 500;
  const response: ErrorResponseBody = {
    success: false,
    error: error.message,
    code: error instanceof ErrorResponse ? error.code : 'INTERNAL_ERROR'
  };

  if (includeStack && error.stack) {
    response.stack = error.stack;
  }

  res.status(statusCode).json(response);
};