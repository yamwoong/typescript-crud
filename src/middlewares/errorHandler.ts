import {Request, Response, NextFunction} from 'express';
import {AppError} from '../error/AppError';

export const errorHandler = (
    err: unknown,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // If the error is an instance of AppError, it's a known, expected error
    if(err instanceof AppError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message
        });
    }

    // Log unexpected, unknown server errors
    console.error('Unexpected error:', err);

    // Respond with a generic 500 Internal Server Error message
    return res.status(500).json({
        success: false,
        message: 'Internal Server Error'
    });
};