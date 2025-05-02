# ===== Stage 1: Build =====
FROM node:18 AS builder
WORKDIR /app

# package.json, tsconfig.json 복사 및 npm 설치
COPY package*.json tsconfig.json ./
RUN npm install

# node_modules/.bin을 PATH에 추가
ENV PATH /app/node_modules/.bin:$PATH

# 소스 코드 복사 및 빌드
COPY . .
RUN npm run build

# ===== Stage 2: Runtime =====
FROM node:18-slim
WORKDIR /app

# 빌드 출력물 및 swagger 파일 복사
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/swagger ./swagger

# package.json 복사 및 프로덕션 의존성 설치
COPY package*.json ./
RUN npm install --production

# 포트 3000 노출
EXPOSE 3000

# 애플리케이션 실행
CMD ["node", "dist/server.js"]