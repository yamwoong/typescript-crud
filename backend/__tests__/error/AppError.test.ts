import {AppError} from '../../src/errors/AppError'

describe('AppError', () => {
    it('should set message, statusCode, and isOperational correctly', () => {
        // Arrange: custom message, status code, operational flag
        const err = new AppError('Something went wrong', 502, false);

        expect(err).toBeInstanceOf(AppError);               // Check if it's an instance of AppError (AppError의 인스턴스인지 확인)
        expect(err.message).toBe('Something went wrong');   // Check if the error message is correct (에러 메시지가 올바른지 확인)
        expect(err.statusCode).toBe(502);                   // Check if the status code is correct (상태 코드가 올바른지 확인)
        expect(err.isOperational).toBe(false);              // Check if the operational flag is correct (운영 플래그가 올바른지 확인)
    });
});