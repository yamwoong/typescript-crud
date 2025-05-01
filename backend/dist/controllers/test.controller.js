"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.throwAsyncAppError = exports.throwUnexpectedError = exports.throwAppError = void 0;
const BadRequestError_1 = require("../errors/BadRequestError");
/**
 * @desc Throws a custom AppError (커스텀 AppError 발생)
 */
const throwAppError = (req, res) => {
    throw new BadRequestError_1.BadRequestError('This is a test AppError!');
};
exports.throwAppError = throwAppError;
/**
 * @desc Throws an unexpected Error (예상치 못한 일반 에러 발생)
 */
const throwUnexpectedError = (req, res) => {
    throw new Error('This is a test unexpected error!');
};
exports.throwUnexpectedError = throwUnexpectedError;
/**
 * @desc Throws an async AppError (비동기 커스텀 에러 발생)
 */
const throwAsyncAppError = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    throw new BadRequestError_1.BadRequestError('Async error occurred!');
});
exports.throwAsyncAppError = throwAsyncAppError;
