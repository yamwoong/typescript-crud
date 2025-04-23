import {UnauthorizedError} from '../../src/errors/UnauthorizedError';

describe('UnexpectedError', () => {
    it('should create an instance with correct properties', () => {
        const error = new UnauthorizedError('Not allowed');

        expect(error).toBeInstanceOf(Error); // Check if it's an instance of Error (Error 클래스인지 확인)
        expect(error).toBeInstanceOf(UnauthorizedError); // Check if it's an instance of UnauthorizedError (UnauthorizedError 클래스인지 확인)
        expect(error.message).toBe('Not allowed');  // Check the custom message (커스텀 메시지 확인)
        expect(error.statusCode).toBe(401);  // Check the status code (상태 코드 확인)
    });

    it('should use default message if none is provided', () => {
        const error = new UnauthorizedError();

        expect(error.message).toBe('Unauthorized'); // Check default message (기본 메시지 확인)
        expect(error.statusCode).toBe(401); // Check default status code (기본 상태 코드 확인)
    });
});