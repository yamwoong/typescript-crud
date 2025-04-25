// Basic tests for logger utility (로거 유틸리티의 기본 동작 테스트)
import { logger } from '../../src/utils/logger';    // 로거 임포트 (Import the logger)
import { config } from '../../src/config/config';  // 환경 설정 임포트 (Import environment config)

describe('basic logger behavior', () => {
  it('skips all logs in test env', () => {
    // Arrange: simulate test environment (준비: 테스트 환경 시뮬레이션)
    jest.spyOn(config, 'isTest', 'get').mockReturnValue(true);

    // Spy on console methods (console 메서드 스파이)
    const infoSpy  = jest.spyOn(console, 'info').mockImplementation(() => {});
    const warnSpy  = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const debugSpy = jest.spyOn(console, 'debug').mockImplementation(() => {});

    // Act: call all logger levels (실행: 모든 로거 레벨 호출)
    logger.info('a');
    logger.warn('b');
    logger.error('c');
    logger.debug('d');

    // Assert: none of the console methods should be called (검증: console 메서드가 호출되지 않아야 함)
    expect(infoSpy).not.toHaveBeenCalled();
    expect(warnSpy).not.toHaveBeenCalled();
    expect(errorSpy).not.toHaveBeenCalled();
    expect(debugSpy).not.toHaveBeenCalled();

    // Cleanup: restore mocks (정리: 모킹 해제)
    jest.restoreAllMocks();
  });

  it('logs info messages with timestamp and tag', () => {
    // Arrange: simulate non-test environment (준비: 일반 환경 시뮬레이션)
    jest.spyOn(config, 'isTest', 'get').mockReturnValue(false);

    // Spy on console.info (console.info 스파이)
    const infoSpy = jest.spyOn(console, 'info').mockImplementation(() => {});

    // Act: log an info message (실행: info 메시지 로깅)
    logger.info('hello');

    // Assert: console.info called once (검증: console.info가 1회 호출됨)
    expect(infoSpy).toHaveBeenCalledTimes(1);

    // Assert: the first argument matches the format
    // YYYY-MM-DDTHH:MM:SS.sssZ [INFO] hello
    const logged = infoSpy.mock.calls[0][0] as string;
    expect(logged).toMatch(
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z \[INFO\] hello$/
    );

    // Cleanup: restore mocks (정리: 모킹 해제)
    jest.restoreAllMocks();
  });
});