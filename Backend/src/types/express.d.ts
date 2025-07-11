// types/express.ts
import { Request as ExpressRequest, Response as ExpressResponse, NextFunction as ExpressNextFunction } from 'express';

export interface UserPayload {
  userId: string; // Changed from userId to _id
  role?: string;
  iat?: number;
  exp?: number;
}

declare module 'express' {
  export interface Request extends ExpressRequest {
    user?: UserPayload;
  }
  export interface Response extends ExpressResponse {}
  export interface NextFunction extends ExpressNextFunction {}
}

export type Request = ExpressRequest;
export type Response = ExpressResponse;
export type NextFunction = ExpressNextFunction;
