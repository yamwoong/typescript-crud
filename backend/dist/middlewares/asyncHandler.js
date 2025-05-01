"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncHandler = void 0;
/**
 * Wraps an async route handler and forwards errors to Express.
 * @param fn An Express RequestHandler, possibly async
 * @returns A RequestHandler that calls fn and catches any Promise rejections
 */
const asyncHandler = (fn) => {
    return (req, res, next) => {
        // Wrap fn in a Promise so that both synchronous and asynchronous handlers are caught
        // fn이 동기함수이든 비동기함수이든, 항상 Promise로 감싸서 에러를 잡아냄
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};
exports.asyncHandler = asyncHandler;
