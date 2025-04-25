/**
 * logger utility
 */
// Logger utility with consistent formatting and environment control (일관된 형식 및 환경별 제어를 제공하는 로거 유틸)
import { config } from '../config/config';

// Define allowed log levels (허용되는 로그 레벨 정의)
type LogLevel = 'info' | 'warn' | 'error' | 'debug';

/**
 * Core log function handles formatting and output (핵심 로그 함수: 포맷 지정 및 출력)
 */

const log = (level: LogLevel, message: string, meta?: unknown) => {
    if(config.isTest) return; // Skip logging in test environment (테스트 환경에서는 로그 출력 안 함)

    const timestamp = new Date().toISOString(); // Generate ISO timestamp (ISO 형식 타임스탬프 생성)
    const levelTag  = level.toUpperCase();      // Create level tag (LEVEL 태그 생성)

    // If meta data provided, include it in output (메타 정보가 있으면 함께 출력)
    if(meta !== undefined) {
        console[level](`${timestamp} [${levelTag}] ${message}`, meta);
    } else {
        console[level](`${timestamp} [${levelTag}] ${message}`);
    }
};

/**
 * Exported logger object with methods for each level (레벨별 메서드를 제공하는 로거 객체 반환)
 */

export const logger = {
    info:  (msg: string, meta?: unknown) => log('info',  msg, meta), // Info log (정보 로그)
    warn:  (msg: string, meta?: unknown) => log('warn',  msg, meta), // Warning log (경고 로그)
    error: (msg: string, meta?: unknown) => log('error', msg, meta), // Error log (에러 로그)
    debug: (msg: string, meta?: unknown) => {                        // Debug log only in dev (개발 환경에서만 디버그 로그)
      if (config.isDev) log('debug', msg, meta);
    }
};