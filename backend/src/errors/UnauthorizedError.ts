import {AppError} from './AppError';

/**
 * UnauthorizedError is thrown when authentication or authorization fails.
 * It defaults to HTTP 401 Unauthorized.
 *
 * @param message – A human-readable description of the authentication issue (인증/인가 실패에 대한 설명)
 */

export class UnauthorizedError extends AppError {
    constructor(message = 'Unauthorized') {
        super(message, 401, true);
    }
}