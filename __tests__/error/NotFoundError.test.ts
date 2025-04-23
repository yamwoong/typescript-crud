import {NotFoundError} from '../../src/errors/NotFoundError';

describe('NotFoundError', () => {
    it('should create an instance of NotFoundError', () => {
        const error = new NotFoundError('Resource not found');

        expect(error).toBeInstanceOf(Error); // Check if it's an instance of Error (Error 클래스인지 확인)
        expect(error).toBeInstanceOf(NotFoundError); // Check if it's an instance of NotFoundError (NotFoundError 클래스인지 확인)
        expect(error.message).toBe('Resource not found'); // Check the custom error message (커스텀 메시지 확인)
        expect(error.statusCode).toBe(404); // Check the status code (상태 코드 확인)
    });

    it('should use default message if none is provieded', () => {
        const error = new NotFoundError();

        expect(error.message).toBe('Resource not found'); // Check default message (기본 메시지 확인)
        expect(error.statusCode).toBe(404); // Check default status code (기본 상태 코드 확인)
    });
});