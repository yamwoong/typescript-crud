module.exports = {
  preset: 'ts-jest', // Uses ts-jest to handle TypeScript files (TypeScript 파일을 처리하기 위해 ts-jest 사용)
  testEnvironment: 'node', // Runs tests in a Node.js environment (Node.js 환경에서 테스트 실행)
  testPathIgnorePatterns: ['/node_modules/'], // Ignores test files inside node_modules (node_modules 내부 테스트 파일 무시)
  transform: {
    '^.+\\.ts$': 'ts-jest', // Transforms .ts files using ts-jest with isolated modules enabled (ts-jest로 .ts 파일 변환, isolatedModules 설정 활성화)
  },
};
