import { BadRequestError } from '../../src/errors/BadRequestError';
import { AppError } from '../../src/errors/AppError';

describe('BadRequestError', () => {
  it('should default to 400 status code and operational=true', () => {
    const err = new BadRequestError();

    // It is an instance of both BadRequestError and AppError
    expect(err).toBeInstanceOf(BadRequestError); // Check if it's an instance of BadRequestError (BadRequestError 클래스인지 확인)
    expect(err).toBeInstanceOf(AppError);        // Check if it's an instance of AppError (AppError 클래스인지 확인)

    // Default message and statusCode
    expect(err.message).toBe('Bad Request');     // Check the default error message (기본 메시지 확인)
    expect(err.statusCode).toBe(400);            // Check the status code (상태 코드 확인)

    // BadRequest is an operational error
    expect(err.isOperational).toBe(true);        // Check if it's marked as operational (운영 오류인지 확인)
  });

  it('should accept a custom message', () => {
    const err = new BadRequestError('Invalid email');

    expect(err.message).toBe('Invalid email');   // Custom message is applied (커스텀 메시지 적용 확인)
    expect(err.statusCode).toBe(400);            // Status code remains 400 (상태 코드는 여전히 400)
    expect(err.isOperational).toBe(true);        // Still operational (여전히 운영 오류)
  });
});
