import {AppError} from '../../src/errors/AppError'

describe('AppError', () => {
    it('should create an instance with correct properies', () => {
        const error = new AppError('Something went wrong', 418);

        expect(error).toBeInstanceOf(AppError); // Check if it's an instance of AppError (AppError의 인스턴스인지 확인)
        expect(error.message).toBe('Something went wrong'); // Check if the error message is correct (에러 메시지가 올바른지 확인)
        expect(error.statusCode).toBe(418); // Check if the status code is correct (상태 코드가 올바른지 확인)
    });
});