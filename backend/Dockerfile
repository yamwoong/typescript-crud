# 1. Node.js LTS 기반 이미지 사용
FROM node:18

# 2. 작업 디렉토리 설정
WORKDIR /app

# 3. package.json과 lock 파일 복사
COPY package*.json ./

# 4. 의존성 설치
RUN npm install

# 5. 전체 소스 복사
COPY . .

# 6. 타입스크립트 빌드 (또는 정의된 빌드 스크립트 실행)
RUN npm run build

# 7. 애플리케이션 실행 (예: dist/main.js)
CMD ["node", "dist/main.js"]
