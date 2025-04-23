import {BadRequestError} from '../../src/errors/BadRequestError';

describe('BadRequestError', () => {
    it('should create an instance with correct properties', () => {
        const error = new BadRequestError('Invalid request data');

        expect(error).toBeInstanceOf(Error); // Check if it's an instance of Error (Error 클래스인지 확인)
        expect(error).toBeInstanceOf(BadRequestError); // Check if it's an instance of BadRequestError (BadRequestError 클래스인지 확인)
        expect(error.message).toBe('Invalid request data'); // Check the custom error message (커스텀 메시지 확인)
        expect(error.statusCode).toBe(400); // Check the status code (상태 코드 확인)
    });

    it('should use default message if none is provided', () => {
        const error = new BadRequestError();

        expect(error.message).toBe('Bad Request');
        expect(error.statusCode).toBe(400);    
    });
});