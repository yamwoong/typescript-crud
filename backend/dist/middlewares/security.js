"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.applySecurity = void 0;
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
/**
 * applySecurity
 * - Applies security-related HTTP headers and CORS policy
 *   (보안 관련 HTTP 헤더와 CORS 정책을 적용합니다)
 *
 * @param app - Express application instance
 *              (Express 애플리케이션 인스턴스)
 */
const applySecurity = (app) => {
    // 1) Helmet: adds various security headers by default
    app.use((0, helmet_1.default)());
    // 2) CORS: enables cross-origin requests for all domains by default
    app.use((0, cors_1.default)());
};
exports.applySecurity = applySecurity;
