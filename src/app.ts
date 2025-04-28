import express, { Application, Request, Response, NextFunction } from 'express';
import { celebrate, Joi, Segments, errors as celebrateErrors } from 'celebrate';          // Request validation middleware (요청 검증 미들웨어)
import { applySecurity } from './middlewares/security';                                   // Helmet & CORS setup (보안 헤더 및 CORS 설정)
import { applyLogging } from './middlewares/logging';                                     // HTTP request logging (HTTP 요청 로깅)
import { setupSwagger } from './config/swagger';                                          // Swagger UI setup (Swagger UI 설정)
import postRouter from './routes/api/post.routes';                                        // Posts API router (게시글 API 라우터)
import testRouter from './routes/test.router';                                            // Test-only routes (테스트 전용 라우터)
import { NotFoundError } from './errors/NotFoundError';                                   // 404 error class (404 에러 클래스)
import { errorHandler } from './middlewares/errorHandler';                                // Central error handler (중앙 에러 핸들러)

// import webRoutes from './routes/web/page.router';

/**
 * createApp
 * - Builds and configures a new Express application.
 * - Useful for tests (여러 인스턴스 생성) or if you need deferred server startup.
 */

export function createApp(): Application {
  const app = express();                         // Create new Express app

  app.use(express.json());                       // JSON body parser (JSON 바디 파싱)

  applySecurity(app);                            // Helmet & CORS (보안 헤더 적용)
  applyLogging(app);                             // Morgan logging (로깅 적용)
  setupSwagger(app);                             // Swagger UI at /api-docs (API 문서 제공)

  app.use('/api/posts', postRouter);             // Mount posts API (게시글 API)

  app.get('/', (req, res) => {
    res.send('Hello World!')
  });

  app.use(celebrateErrors());                    // Celebrate validation errors (Joi 검증 오류)
  
  app.use((req, _res, next: NextFunction) =>     // 404 for unmatched routes (미정의 경로 404)
    next(new NotFoundError('Requested route not found'))
  );
  app.use(errorHandler);                         // Central error handler (중앙 에러 핸들러)

  return app;                                    // Return configured app
}