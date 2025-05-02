# 1단계: 빌드 단계
FROM node:18 AS build

WORKDIR /app

# package.json 및 lock 파일 복사 후 의존성 설치
COPY package*.json ./
RUN npm install

# 앱 전체 복사 및 빌드
COPY . .
RUN npm run build

# 2단계: nginx 이미지로 정적 파일 서빙
FROM nginx:alpine

# CRA의 빌드 결과물 (build/) 복사
COPY --from=build /app/build /usr/share/nginx/html

# 필요한 경우 커스텀 nginx 설정도 복사 가능
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
