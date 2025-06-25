// utils/asyncHandler.utils.ts
import { Request, Response, NextFunction } from 'express';

// Type for async route handlers
type AsyncRouteHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void | Response>;

// Utility to wrap async route handlers
export const asyncHandler = (fn: AsyncRouteHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};