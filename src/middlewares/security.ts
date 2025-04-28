import {Express} from 'express';
import helmet from 'helmet';
import cors from 'cors';

/**
 * applySecurity
 * - Applies security-related HTTP headers and CORS policy
 *   (보안 관련 HTTP 헤더와 CORS 정책을 적용합니다)
 *
 * @param app - Express application instance
 *              (Express 애플리케이션 인스턴스)
 */

export const applySecurity = (app: Express) => {
    // 1) Helmet: adds various security headers by default
    app.use(helmet());

    // 2) CORS: enables cross-origin requests for all domains by default
    app.use(cors());
}