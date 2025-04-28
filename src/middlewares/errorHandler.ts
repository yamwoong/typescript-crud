import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { AppError } from '../errors/AppError'; 

/**
 * Central error-handling middleware for Express.
 * - AppError: Known application errors with custom status codes and messages
 * - Development: include stack trace for easier debugging
 * - Production/Test: hide internal details for security
 *
 * @param {unknown} err - The thrown error (발생한 에러 객체)
 * @param {Request} req - The Express request object (요청 객체)
 * @param {Response} res - The Express response object (응답 객체)
 * @param {NextFunction} _next - Next middleware function (다음 미들웨어 호출 함수) [unused]
 */

export const errorHandler: ErrorRequestHandler = (
    err, 
    req, 
    res, 
    _next 
): void => {
    // 1) Known AppError
    if (err instanceof AppError) {
        // success: false indicates an error response (에러 응답임을 나타냄)
        res.status(err.statusCode).json({
            success: false,
            message: err.message
        });
        return
    }

    // 2) Log unexpected errors
    console.error(`Unexpected error on ${req.method} ${req.path}:`, err);

    // 3) Build generic 500 response
    const isDev = process.env.NODE_ENV === 'development';
    const payload: {success: false; message: string; stack?: string} = {
        success: false,
        message: isDev && err instanceof Error ? err.message : 'Internal Server Error'
    };

    // Include stack trace in development
    if(isDev && err instanceof Error) {
        payload.stack = err.stack;
    }

    res.status(500).json(payload);
    return;
    
};