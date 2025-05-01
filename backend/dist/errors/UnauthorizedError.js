"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedError = void 0;
const AppError_1 = require("./AppError");
/**
 * UnauthorizedError is thrown when authentication or authorization fails.
 * It defaults to HTTP 401 Unauthorized.
 *
 * @param message – A human-readable description of the authentication issue (인증/인가 실패에 대한 설명)
 */
class UnauthorizedError extends AppError_1.AppError {
    constructor(message = 'Unauthorized') {
        super(message, 401, true);
    }
}
exports.UnauthorizedError = UnauthorizedError;
