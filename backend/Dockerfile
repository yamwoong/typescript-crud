# backend/Dockerfile

# ===== Stage 1: Build =====
FROM node:18 AS builder
WORKDIR /app

# Copy dependency definitions only to leverage Docker cache
COPY package*.json ./
# Install all dependencies (including devDependencies)
RUN npm install

# Copy all source code into the container
COPY . .
# Run the build script to transpile TypeScript to JavaScript
RUN npm run build


# ===== Stage 2: Runtime =====
FROM node:18-slim
WORKDIR /app

# Copy the built output from the builder stage
COPY --from=builder /app/dist ./dist
# Copy Swagger specification files for runtime usage
COPY --from=builder /app/swagger ./swagger
# Copy package.json to prepare for production install
COPY package*.json ./
# Install only production dependencies
RUN npm install --production

# Expose port 3000 for incoming requests
EXPOSE 3000
# Start the application by running the compiled server
CMD ["node", "dist/server.js"]
