# backend/Dockerfile

# ===== Stage 1: Build =====
FROM node:18 AS builder
WORKDIR /app

# Copy package.json, package-lock.json (or yarn.lock) AND tsconfig.json to leverage Docker cache
COPY package*.json tsconfig.json ./

# Install all dependencies (including devDependencies)
RUN npm install

# Copy the rest of the source code and build
COPY . .
RUN npm run build


# ===== Stage 2: Runtime =====
FROM node:18-slim
WORKDIR /app

# Copy the built output and swagger files from the builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/swagger ./swagger

# Copy only package.json files to install production deps
COPY package*.json ./
RUN npm install --production

# Expose port 3000 for incoming requests
EXPOSE 3000

# Start the application
CMD ["node", "dist/server.js"]