import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { AppError } from '../errors/AppError'; 

/**
 * This middleware handles errors and distinguishes between known AppErrors and unexpected server errors. (이 미들웨어는 에러를 처리하고, 알려진 AppError와 예기치 못한 서버 에러를 구분합니다.)
 * @param {unknown} err - The error object that was thrown (발생한 에러 객체)
 * @param {express.Request} req - The request object (요청 객체)
 * @param {express.Response} res - The      response object (응답 객체)
 * @param {express.NextFunction} next - The next middleware function (다음 미들웨어 호출 함수)
 */

export const errorHandler: ErrorRequestHandler = (
    err: unknown, 
    req: Request, 
    res: Response, 
    next: NextFunction 
): void => {
    // Known application error
    if (err instanceof AppError) {
        res.status(err.statusCode).json({
            success: false,
            message: err.message,
        });
        return; 
    }

    // Log unexpected errors to the console
    console.error('Unexpected error:', {
        message: err instanceof Error ? err.message : String(err),
        stack: err instanceof Error ? err.stack : null,
        path: req.path,
        method: req.method,
    });

    // Respond differently based on environment
    res.status(500).json({
        success: false,
        message: 'Internal Server Error' // Internal Server Error (내부 서버 오류)
    });
};