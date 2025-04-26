import { Request, Response, NextFunction, RequestHandler } from 'express';

/**
 * Wraps an async route handler and forwards errors to Express.
 * @param fn An Express RequestHandler, possibly async
 * @returns A RequestHandler that calls fn and catches any Promise rejections
 */
export const asyncHandler = (fn: RequestHandler): RequestHandler => {
    return (req: Request, res: Response, next: NextFunction) => {
        // Wrap fn in a Promise so that both synchronous and asynchronous handlers are caught
        // fn이 동기함수이든 비동기함수이든, 항상 Promise로 감싸서 에러를 잡아냄
        Promise.resolve(fn(req, res, next)).catch(next);
    };
  };