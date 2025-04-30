// src/server.ts
import http from 'http';                                                      // Node HTTP module (Node HTTP 모듈)
import { createApp } from './app';                                            // App factory function (앱 팩토리 함수)
import connectDB from './config/mongo';                                     // Environment configuration (환경 설정)


const PORT = process.env.PORT || 3000;                                         // Port number (포트 번호)

async function startServer(): Promise<void> {                                  // Async startup for error handling (예외 처리를 위한 async 시작 함수)
  
  await connectDB();

  const app = createApp();                                                    // Build Express app (Express 앱 생성)
  const server = http.createServer(app);                                       // Wrap app in HTTP server (HTTP 서버 래핑)

  server.listen(PORT, () => {                                                  // Start listening (리스닝 시작)
    console.log(`🚀 Server listening on port ${PORT}`);                       // Log startup (서버 시작 로그)
  });

  server.on('error', (err: Error) => {                                         // Handle server errors (서버 에러 핸들러)
    console.error('Server error:', err);                                       // Log error (에러 로그)
    process.exit(1);                                                           // Exit on fatal error (치명적 에러 시 프로세스 종료)
  });
}

startServer()                                                                  
  .catch(err => {                                                             // Catch startup errors (시작 과정 에러 캐치)
    console.error('Failed to start server:', err);                            // Log startup failure (시작 실패 로그)
    process.exit(1);                                                          // Exit on failure (실패 시 프로세스 종료)
});
