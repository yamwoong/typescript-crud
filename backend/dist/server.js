"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/server.ts
const http_1 = __importDefault(require("http")); // Node HTTP module (Node HTTP 모듈)
const app_1 = require("./app"); // App factory function (앱 팩토리 함수)
const mongo_1 = __importDefault(require("./config/mongo")); // Environment configuration (환경 설정)
const PORT = process.env.PORT || 3000; // Port number (포트 번호)
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, mongo_1.default)();
        const app = (0, app_1.createApp)(); // Build Express app (Express 앱 생성)
        const server = http_1.default.createServer(app); // Wrap app in HTTP server (HTTP 서버 래핑)
        server.listen(PORT, () => {
            console.log(`🚀 Server listening on port ${PORT}`); // Log startup (서버 시작 로그)
        });
        server.on('error', (err) => {
            console.error('Server error:', err); // Log error (에러 로그)
            process.exit(1); // Exit on fatal error (치명적 에러 시 프로세스 종료)
        });
    });
}
startServer()
    .catch(err => {
    console.error('Failed to start server:', err); // Log startup failure (시작 실패 로그)
    process.exit(1); // Exit on failure (실패 시 프로세스 종료)
});
