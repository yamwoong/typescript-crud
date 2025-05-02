# ===== Stage 1: Build =====
FROM node:18 AS builder
WORKDIR /app

# package.json 및 tsconfig.json 복사 후 설치
COPY package*.json tsconfig.json ./
RUN npm install

# 실행 파일에 권한 추가
RUN chmod -R +x /app/node_modules/.bin && \
    chmod +x /app/node_modules/typescript/bin/tsc

# PATH 환경 변수 설정
ENV PATH /app/node_modules/.bin:$PATH

# 소스 코드 복사 및 빌드 실행
COPY . .
RUN npm run build

# ===== Stage 2: Runtime =====
FROM node:18-slim
WORKDIR /app

# 빌드 결과물 복사
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/swagger ./swagger

# package.json 복사 후 프로덕션 의존성 설치
COPY package*.json ./
RUN npm install --production

# 포트 3000 노출 및 서버 실행
EXPOSE 3000
CMD ["node", "dist/server.js"]