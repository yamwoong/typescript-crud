"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = void 0;
const AppError_1 = require("./AppError");
/**
 * NotFoundError is thrown when a requested resource cannot be found.
 * It defaults to HTTP 404 Not Found.
 *
 * @param message – A human-readable description of what was not found (찾을 수 없었던 리소스에 대한 설명)
 */
class NotFoundError extends AppError_1.AppError {
    constructor(message = 'Not Found') {
        super(message, 404, true);
    }
}
exports.NotFoundError = NotFoundError;
