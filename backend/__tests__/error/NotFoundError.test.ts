// __tests__/error/NotFoundError.test.ts
import { NotFoundError } from '../../src/errors/NotFoundError';
import { AppError } from '../../src/errors/AppError';

describe('NotFoundError', () => {
  it('should default to 404 status code and operational=true', () => {
    const err = new NotFoundError();

    // Check instance types (인스턴스 타입 확인)
    expect(err).toBeInstanceOf(NotFoundError);  // Check if it is an instance of NotFoundError (NotFoundError 클래스인지 확인)
    expect(err).toBeInstanceOf(AppError);       // Check if it is an instance of AppError (AppError의 인스턴스인지 확인)

    // Check default message and status code (기본 메시지와 상태 코드 확인)
    expect(err.message).toBe('Not Found');      // Default message should be 'Not Found' (기본 메시지는 'Not Found'여야 함)
    expect(err.statusCode).toBe(404);           // Default status code should be 404 (기본 상태 코드는 404여야 함)

    // Check operational flag (운영 오류 플래그 확인)
    expect(err.isOperational).toBe(true);       // Should be marked as operational (운영 오류로 표시되어야 함)
  });

  it('should accept a custom message', () => {
    const err = new NotFoundError('User not found');

    // Check custom message and defaults (커스텀 메시지 및 기본값 확인)
    expect(err.message).toBe('User not found'); // Message should reflect custom input (메시지는 커스텀 입력을 반영해야 함)
    expect(err.statusCode).toBe(404);           // Status code remains 404 (상태 코드는 여전히 404)
    expect(err.isOperational).toBe(true);       // Still marked as operational (여전히 운영 오류로 표시됨)
  });
});
