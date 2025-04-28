import {AppError} from './AppError';

/**
 * BadRequestError is thrown when the client sends invalid request data.
 * It defaults to HTTP 400 Bad Request.
 *
 * @param message – A human-readable description of what was wrong (잘못된 요청에 대한 설명)
 */
export class BadRequestError extends AppError {
    constructor(message = 'Bad Request') {
        // super(message, statusCode, isOperational)
        super(message, 400, true);
    }
}