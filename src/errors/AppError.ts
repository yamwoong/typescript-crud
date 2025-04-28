/**
 * AppError is the base class for all custom application errors.
 * It extends the built-in Error and carries an HTTP status code.
 *
 * @param message    – A human-readable error message (사용자에게 보여줄 에러 메시지)
 * @param statusCode – The HTTP status code to send (응답으로 보낼 HTTP 상태 코드, 기본값 500)
 * @param isOperational – Whether this error is expected/operational (운영 환경에서 처리 가능한 에러인지 여부, 기본 true)
 */
export class AppError extends Error {
    public readonly statusCode: number;
    public readonly isOperational: boolean;

    constructor(message: string, statusCode = 500, isOperational = true) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        // Exclude the AppError constructor from the stack trace
        Error.captureStackTrace(this, this.constructor);
    }
}