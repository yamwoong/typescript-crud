FROM node:18

WORKDIR /app

# package.json + lock 복사
COPY package.json package-lock.json ./

# 의존성 설치 + rimraf 전역 설치
RUN npm install && npm install -g rimraf

# 나머지 소스 복사
COPY . .

# 빌드 (clean 포함)
RUN npm run build

CMD ["node", "dist/index.js"]