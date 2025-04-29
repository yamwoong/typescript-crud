import {Request, Response} from 'express';
import {BadRequestError} from '../errors/BadRequestError';

/**
 * @desc Throws a custom AppError (커스텀 AppError 발생)
 */

const throwAppError = (req: Request, res: Response) => {
    throw new BadRequestError('This is a test AppError!');
};

/**
 * @desc Throws an unexpected Error (예상치 못한 일반 에러 발생)
 */

const throwUnexpectedError = (req: Request, res: Response) => {
    throw new Error('This is a test unexpected error!');
};

/**
 * @desc Throws an async AppError (비동기 커스텀 에러 발생)
 */

const throwAsyncAppError = async(req: Request, res: Response) => {
    throw new BadRequestError('Async error occurred!');
};

export {
    throwAppError,
    throwUnexpectedError,
    throwAsyncAppError
}