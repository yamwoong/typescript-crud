import {Request, Response, NextFunction} from 'express';

// Type definition for an async Express handler
type AsyncFunction = (req: Request, res: Response, next: NextFunction) => Promise<void>;

// asyncHandler wraps async route handlers and forwards any thrown errors to Express
export const asyncHandler = (fn: AsyncFunction) => 
    (req: Request, res: Response, next: NextFunction) => {
        fn(req, res, next).catch(next);
    };