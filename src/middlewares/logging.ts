import {Express} from 'express';
import morgan from 'morgan';

/**
 * applyLogging
 * - In non-production environments, logs every incoming HTTP request
 *   (프로덕션이 아닌 환경에서 모든 들어오는 HTTP 요청을 로깅합니다)
 *
 * @param app - Express application instance
 *              (Express 애플리케이션 인스턴스)
 */

export function applyLogging(app: Express) {
    // Only log in development or test, not in production
    if(process.env.NODE_ENV !== 'production') {
        // 'dev' format: concise colored output with method, URL, status, response time
        app.use(morgan('dev'));
    }
}