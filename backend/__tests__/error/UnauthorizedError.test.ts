import { UnauthorizedError } from '../../src/errors/UnauthorizedError';
import { AppError } from '../../src/errors/AppError';

describe('UnauthorizedError', () => {
  it('should default to 401 status code and operational=true', () => {
    const err = new UnauthorizedError();

    // Check instance types (인스턴스 타입 확인)
    expect(err).toBeInstanceOf(UnauthorizedError); // Check if it is an instance of UnauthorizedError (UnauthorizedError 클래스인지 확인)
    expect(err).toBeInstanceOf(AppError);          // Check if it is an instance of AppError (AppError의 인스턴스인지 확인)

    // Check default message and status code (기본 메시지와 상태 코드 확인)
    expect(err.message).toBe('Unauthorized');      // Default message should be 'Unauthorized' (기본 메시지는 'Unauthorized'여야 함)
    expect(err.statusCode).toBe(401);              // Default status code should be 401 (기본 상태 코드는 401여야 함)

    // Check operational flag (운영 오류 플래그 확인)
    expect(err.isOperational).toBe(true);          // Should be marked as operational (운영 오류로 표시되어야 함)
  });

  it('should accept a custom message', () => {
    const err = new UnauthorizedError('No token provided');

    // Check custom message and defaults (커스텀 메시지 및 기본값 확인)
    expect(err.message).toBe('No token provided'); // Message should reflect custom input (메시지는 커스텀 입력을 반영해야 함)
    expect(err.statusCode).toBe(401);              // Status code remains 401 (상태 코드는 여전히 401)
    expect(err.isOperational).toBe(true);          // Still marked as operational (여전히 운영 오류로 표시됨)
  });
});
