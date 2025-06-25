// utils/error.utils.ts

/**
 * Safely extracts error message from unknown error type
 */
export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === 'string') {
    return error;
  }
  if (error && typeof error === 'object' && 'message' in error) {
    return String(error.message);
  }
  return 'An unknown error occurred';
};

/**
 * Safely extracts error stack from unknown error type
 */
export const getErrorStack = (error: unknown): string | undefined => {
  if (error instanceof Error) {
    return error.stack;
  }
  return undefined;
};

/**
 * Type guard to check if error is an instance of Error
 */
export const isError = (error: unknown): error is Error => {
  return error instanceof Error;
};

/**
 * Custom error class for application-specific errors
 */
export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code?: string
  ) {
    super(message);
    this.name = 'AppError';
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Wraps async functions to handle errors consistently
 */
export const asyncErrorHandler = <T extends any[], R>(
  fn: (...args: T) => Promise<R>
) => {
  return async (...args: T): Promise<R> => {
    try {
      return await fn(...args);
    } catch (error) {
      // Log the error
      console.error('Async error:', getErrorMessage(error));
      throw error;
    }
  };
};