"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = createApp;
const express_1 = __importDefault(require("express"));
const celebrate_1 = require("celebrate"); // Request validation middleware (요청 검증 미들웨어)
const security_1 = require("./middlewares/security"); // Helmet & CORS setup (보안 헤더 및 CORS 설정)
const logging_1 = require("./middlewares/logging"); // HTTP request logging (HTTP 요청 로깅)
const swagger_1 = require("./config/swagger"); // Swagger UI setup (Swagger UI 설정)
const post_routes_1 = __importDefault(require("./routes/api/post.routes")); // Posts API router (게시글 API 라우터)
const NotFoundError_1 = require("./errors/NotFoundError"); // 404 error class (404 에러 클래스)
const errorHandler_1 = require("./middlewares/errorHandler"); // Central error handler (중앙 에러 핸들러)
// import webRoutes from './routes/web/page.router';
/**
 * createApp
 * - Builds and configures a new Express application.
 * - Useful for tests (여러 인스턴스 생성) or if you need deferred server startup.
 */
function createApp() {
    const app = (0, express_1.default)(); // Create new Express app
    app.use(express_1.default.json()); // JSON body parser (JSON 바디 파싱)
    (0, security_1.applySecurity)(app); // Helmet & CORS (보안 헤더 적용)
    (0, logging_1.applyLogging)(app); // Morgan logging (로깅 적용)
    (0, swagger_1.setupSwagger)(app); // Swagger UI at /api-docs (API 문서 제공)
    app.use('/api/posts', post_routes_1.default); // Mount posts API (게시글 API)
    app.get('/', (req, res) => {
        res.send('Hello World!');
    });
    app.use((0, celebrate_1.errors)()); // Celebrate validation errors (Joi 검증 오류)
    app.use((req, _res, next) => // 404 for unmatched routes (미정의 경로 404)
     next(new NotFoundError_1.NotFoundError('Requested route not found')));
    app.use(errorHandler_1.errorHandler); // Central error handler (중앙 에러 핸들러)
    return app; // Return configured app
}
