module.exports = {
  preset: 'ts-jest',                                               // Uses ts-jest to handle TypeScript files (TypeScript 파일을 처리하기 위해 ts-jest 사용)
  testEnvironment: 'node',                                         // Runs tests in a Node.js environment (Node.js 환경에서 테스트 실행)
  setupFilesAfterEnv: ['<rootDir>/__tests__/setup/jest.setup.ts'], // Run per-test setup/teardown hooks (각 테스트 파일 실행 전 DB 연결/초기화/해제 훅 실행)
  verbose: true,                                                   // Shows detailed test results (자세한 테스트 결과 출력)
  rootDir: '.',                                                    // Sets the root directory for the project (프로젝트의 루트 디렉토리 설정)
  moduleFileExtensions: ['ts', 'js', 'json'],                      // Recognized file extensions (인식할 파일 확장자 목록)
  testMatch: ['**/__tests__/**/*.test.ts'],                        // Glob pattern for test files (테스트 파일 위치 패턴)
  transform: {
    '^.+\\.ts$': 'ts-jest'                                         // Transforms .ts files using ts-jest (ts-jest로 .ts 파일 변환)
  },
  testPathIgnorePatterns: ['/node_modules/']                       // Ignores test files inside node_modules (node_modules 내부 테스트 파일 무시)
};
