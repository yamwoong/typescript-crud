FROM node:18

WORKDIR /app

# package.json 및 lock 파일 복사
COPY package.json package-lock.json ./

# 의존성 + typescript + rimraf 글로벌 설치
RUN npm install && npm install -g typescript rimraf

# 전체 소스 복사
COPY . .

# 빌드 (clean 포함)
RUN npm run build

CMD ["node", "dist/server.js"]

