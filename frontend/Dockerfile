# 1단계: React 앱 빌드 단계
FROM node:18 AS build

WORKDIR /app

# package.json 및 lock 파일 복사 후 의존성 설치
COPY package*.json ./
RUN npm install

# 전체 소스 복사 후 빌드
COPY . .
RUN npm run build

# 2단계: Nginx를 사용해 정적 파일 서빙
FROM nginx:alpine

# CRA의 빌드 결과물 복사
COPY --from=build /app/build /usr/share/nginx/html

# Nginx 커스텀 설정 복사 (SPA fallback)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
